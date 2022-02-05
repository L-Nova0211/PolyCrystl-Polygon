/* eslint-disable no-console */
import { VercelRequest, VercelResponse } from '@vercel/node';
import { isString } from 'lodash';
import type Web3 from "web3"
import web3NoAccount from "../src/utils/web3"

const {
  VERCEL_URL, 
  REACT_APP_MATIC_FAUCET_PAYOUT_AMOUNT, 
  REACT_APP_MATIC_FAUCET_MAX_BALANCE, 
  MATIC_FAUCET_PRIVATE_KEY,
  MATIC_FAUCET_GAS
} = process.env;

function strStartsWith(str: string, prefix: string) {
  return str.indexOf(prefix) === 0;
}

// check for valid Eth address
function isAddress(address: unknown): address is string {
  return isString(address) && /^(0x)?[0-9a-f]{40}$/i.test(address);
}

// strip any spaces and add 0x
function fixAddress(address: string) {
  const cleanedAddress = address.replace(" ", "").toLowerCase();
  if (!strStartsWith(cleanedAddress, "0x")) {
      return `0x${cleanedAddress}`;
  }
  return cleanedAddress;
}

async function getAccountBalance(web3: Web3, account: string) {
  const balance = Number.parseFloat(await web3.eth.getBalance(account));

  if (Number.isNaN(balance)) {
    return 0;
  }

  return balance;
}

async function transferMatic(web3: Web3, to: string, amount: number) {
  console.log('---start tx---')
  const from = web3.eth.accounts.wallet[0].address
  const gasPrice = await web3.eth.getGasPrice();
  const amt = (amount * (10 ** 18)).toString();
  console.log('destination address= ', to);
  const r = await web3.eth.sendTransaction({
    from,
    to,
    value: amt,
    gas: parseInt(MATIC_FAUCET_GAS),
    gasPrice
  }).on('receipt', (receipt) => {
    console.log('txn id= ', receipt.transactionHash)
  })
  .on('error', (err) => {
    return Promise.reject(err);
  })
  console.log('---end tx---')
  return Promise.resolve(r.transactionHash);
}

// Black Listed IP's
const ipBlacklist = [
  "49.228.199.83", 
  "14.237.61.154",
  "14.237.37.17",
  "8.38.147.28", 
  "110.169.31.214", 
  "83.56.143.225", 
  "49.228.150.17",
  "85.136.117.33",
  "49.104.36.81",
  "92.177.0.226",
  "180.12.150.132",
  "187.109.122.128",
  "73.246.200.222",
  "85.148.44.186",
  "188.85.59.237",
  "200.148.40.71",
  "5.25.107.244"
];

export default async (request: VercelRequest, response: VercelResponse) => {
  try {
    console.log('---new request:claim-matic---')
    const ip = request.headers["x-forwarded-for"];
    const deploymentUrl = request.headers['x-vercel-deployment-url'];
    console.log("client IP=", ip);
    console.log("VERCEL_URL=", VERCEL_URL);

    if (isString(ip) && ipBlacklist.includes(ip)) {
      // banned ip
      console.log("UNAUTHORIZED. 403")
      return response.status(403).json({
          err: "Something went wrong."
      });
    }

    if (VERCEL_URL !== 'localhost:3000' && deploymentUrl !== VERCEL_URL) {
      // invalid origin host e.g. not coming from client
      console.log("INVALID HOST. 400")
      return response.status(400).json({
          err: "Something went wrong."
      });
    }

    const {token} = request.query;
    if (!token || !isString(token)) {
      // invalid origin host e.g. not coming from client
      console.log("UNAUTHORIZED. 403")
      return response.status(403).json({
          err: "Something went wrong."
      });
    }

    const buff = Buffer.from(token, 'base64');
    const decodedToken = buff.toString('utf-8');
    const { account, lastFaucetUsage } = JSON.parse(decodedToken);

    const now = +new Date()
    const oneDay = 60 * 60 * 24
    if (lastFaucetUsage && now - lastFaucetUsage < oneDay) {
      // invalid origin host e.g. not coming from client
      console.log("Too Many Request. 429")
      return response.status(429).json({
          err: "Don't be greedy, you already used the faucet today!"
      });
    }

    const payoutAmount = parseFloat(REACT_APP_MATIC_FAUCET_PAYOUT_AMOUNT);
    const maxBalance = parseFloat(REACT_APP_MATIC_FAUCET_MAX_BALANCE);
    web3NoAccount.eth.accounts.wallet.add(MATIC_FAUCET_PRIVATE_KEY)
  
    const sanitizedAddress = isString(account) ? fixAddress(account) : false;
    if (isAddress(sanitizedAddress)) {

      const scaleFactor = (1 * (10 ** 18));
      const accountBalance = await getAccountBalance(web3NoAccount, sanitizedAddress) / scaleFactor;

      if (accountBalance >= maxBalance) {
        console.log(sanitizedAddress, "has a too high balance");
        return response.status(429).json({
          err: `You already have ${accountBalance} MATIC!`
        });
      }

      return transferMatic(web3NoAccount, sanitizedAddress, payoutAmount).then((hash: string) => {
        // successful transaction
        console.log("OK. 200")
        return response.status(200).json({
            hash,
            timestamp: +new Date()
        });
      }).catch(err => {
          // either tx error/ greylisted
          console.log("ERROR:500")
          console.log(err)
          return response.status(500).json({
              err: err.message
          });
      })
    }

    // invalid addr
    console.log("INVALID ADDR. 400")
    return response.status(400).json({
        err: new Error("Invalid address.")
    });
  } catch (err) {
    // unknown error
    console.log("ERROR:500")
    console.log(err)
    return response.status(500).json({
      err: "Something went wrong!"
    });
  }
};
