import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { GlobalProvider } from '../context/global'

function App({ Component, pageProps }: AppProps) {
  return <GlobalProvider><Component {...pageProps} /></GlobalProvider>
}

export default App
