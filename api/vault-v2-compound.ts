import { VercelRequest, VercelResponse } from '@vercel/node';
import { isArray } from 'lodash';
import Web3 from 'web3';
import { AbiItem } from 'web3-utils';
import vaultHealerABI from '../src/config/abi/vaultHealerV2.json'

const { 
  POLYGON_WEB3_PROVIDER
} = process.env;

const VAULT_HEALER_V2 = '0xD4d696ad5A7779F4D3A0Fc1361adf46eC51C632d';

const compoundVaults = async (key: string) => {
    const web3 = new Web3(new Web3.providers.HttpProvider(POLYGON_WEB3_PROVIDER));
    const contract = new web3.eth.Contract(vaultHealerABI as AbiItem[], VAULT_HEALER_V2);
    const ownerAccount = web3.eth.accounts.privateKeyToAccount(key);
    const compound = contract.methods.earnAll();
    const encodedCompound = compound.encodeABI();
    
    const transaction = {
        from: ownerAccount.address,
        to: VAULT_HEALER_V2,
        gas: 20000000,
        data: encodedCompound,
        gasPrice: web3.utils.toWei('100', 'gwei')
    };

    const signedTx = await ownerAccount.signTransaction(transaction);
    console.log('Attempting transaction... Dreaming of Gjolund while I wait 😍');

    const txReciept = await web3.eth.sendSignedTransaction(signedTx.rawTransaction as string);
    return txReciept.transactionHash
};

export default async (request: VercelRequest, response: VercelResponse) => {
  try {
    console.log('---new request:vault-compound---')
    // eslint-disable-next-line dot-notation
    const key = request.headers["vault_compound_private_key"];

    if (key && !isArray(key)) {
      const transactionHash = await compoundVaults(key);
      return response.status(200).json({
        transactionHash
      });
    }

    console.log("ERROR:500")
    return response.status(500).json({
      err: "Invalid private key."
    })
  } catch (err) {
    // unknown error
    console.log("ERROR:500")
    return response.status(500).json({
      err,
      transactionHash: err?.receipt?.transactionHash
    });
  }
};
