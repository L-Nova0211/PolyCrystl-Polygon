import { RiskLevel } from 'config'

export default (riskString: string): string => {
  const riskNum = Number(riskString)
  switch (riskNum) {
    case 10:
      return RiskLevel[1]
    default:
      return RiskLevel[riskNum]
  }
}
