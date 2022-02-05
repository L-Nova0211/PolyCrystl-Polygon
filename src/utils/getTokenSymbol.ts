export default (tokenName: string) => {
  return `/images/tokens/${tokenName.toLocaleLowerCase('en-US')}.svg`
}
