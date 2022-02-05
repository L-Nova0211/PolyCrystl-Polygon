import React from 'react'

interface WalletBalanceProps {
  displayUSD: string
}
const WalletBalance: React.FC<WalletBalanceProps> = ({ displayUSD }) => {
  return <div>{displayUSD}</div>
}

export default WalletBalance
