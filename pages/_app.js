import Chakra from '../components/chakra'
import Fonts from '../components/fonts'
import Layout from '../components/layouts/main'

const App = ({ Component, pageProps }) => {
  return (
    <Chakra>
      <Fonts />
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Chakra>
  )
}

export default App
