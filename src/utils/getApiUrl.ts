export default (endpoint: string) => {
  if (window.location.hostname === 'localhost') {
    return `http://localhost:3000${endpoint}`
  }
  return endpoint
}
