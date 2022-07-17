import { NextPage } from 'next'
import Head from 'next/head'
import { useState } from 'react'


const Layout: NextPage<any> = ({ children }) => {
    const [isNavOpen, setNavOpen] = useState(true)


    return (
        <div>
            <Head>
                <title>Curly Umbrella</title>
                <meta name="description" content="Curly Umbrella TODO App" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div className='grid grid-cols-12 h-screen'>
                <div className='m-0 flex flex-col bg-gray-900 text-white col-span-1'>
                    <i className='max-auto m-2'>Menu</i>
                    <i className='max-auto m-2'>Home</i>
                    <i className='max-auto m-2 border-l-2 p-2'>Users</i>
                    <i className='max-auto m-2'>Profile</i>
                </div>
                <div className='col-span-11 h-screen'>
                    {children}
                </div>
            </div>
        </div>
    )
}


export default Layout