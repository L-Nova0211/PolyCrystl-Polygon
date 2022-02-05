export {}
declare global {
  interface Window {
    dataLayer: {
      push: (event: { [key: string]: unknown }) => void
    }
  }
}
