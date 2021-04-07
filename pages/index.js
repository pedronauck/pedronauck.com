import Head from 'next/head'

import Content from 'components/Content'
import Info from 'components/Info'

export default function Home() {
  return (
    <div className="flex flex-col-reverse sm:flex-row sm:justify-between">
      <Head>
        <title>@pedronauck</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Content />
      <Info />
    </div>
  )
}
