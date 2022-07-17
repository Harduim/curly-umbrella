import Head from 'next/head'
import { NextPage } from 'next'


const Layout: NextPage<any> = ({children}) => {
    return (
        <div>
            <Head>
                <title>Curly Umbrella</title>
                <meta name="description" content="Curly Umbrella TODO App" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main>
                <div className='m-8'>
                    {children}
                </div>
            </main>

        </div>
    )
}


export default Layout