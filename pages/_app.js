import Chakra from '../components/chakra'
import Fonts from '../components/fonts'
import Layout from '../components/layouts/main'

const App = ({ Component, pageProps, router }) => {
  return (
    <Chakra>
      <Fonts />
      <Layout router={router}>
        <Component {...pageProps} key={router.route} />
      </Layout>
    </Chakra>
  )
}

export default App
