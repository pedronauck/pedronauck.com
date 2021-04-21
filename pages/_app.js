import './index.css'
import { QueryClient, QueryClientProvider } from 'react-query'
import { Chakra } from '../components/Chakra'
import mixpanel from 'mixpanel-browser'

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

mixpanel.init(`${process.env.NEXT_PUBLIC_MIXPANEL_ID}`)
export default MyApp
