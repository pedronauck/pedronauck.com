import './index.css'
import { QueryClient, QueryClientProvider } from 'react-query'
import { Chakra } from '../components/Chakra'

const queryClient = new QueryClient()

function MyApp({ Component, pageProps }) {
  return (
    <Chakra>
      <QueryClientProvider client={queryClient}>
        <Component {...pageProps} />
      </QueryClientProvider>
    </Chakra>
  )
}

export default MyApp
