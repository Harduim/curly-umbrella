import { NextPage } from 'next'
import Link from "next/link";
import { useRouter } from "next/router";
import Head from 'next/head'
import { useState } from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faHome, faUsers, faUser } from '@fortawesome/free-solid-svg-icons'

const Layout: NextPage<any> = ({ children }) => {
    const [isNavOpen, setNavOpen] = useState(true)

    const router = useRouter();

    return (
        <div>
            <Head>
                <title>Curly Umbrella</title>
                <meta name="description" content="Curly Umbrella TODO App" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div className='w-screen h-screen flex'>
                <div className='w-28'>
                    <div className='m-0 flex flex-col bg-gray-900 text-white h-screen'>
                        <div className={`max-auto m-2 ${router.asPath === '/' ? 'border-r-2' : ''}`}>
                            <Link href="/">
                                <a>
                                    <FontAwesomeIcon icon={faHome} className="w-6 m-1 inline" /><span >Home</span>
                                </a>
                            </Link>
                        </div>
                        <div className={`max-auto m-2 ${router.asPath === '/users' ? 'border-r-2' : ''}`}>
                            <Link href="/users">
                                <a>
                                    <FontAwesomeIcon icon={faUsers} className="w-6 m-1 inline" /><span >Users</span>
                                </a>
                            </Link>
                        </div>
                        <div className={`max-auto m-2 ${router.asPath === '/profile' ? 'border-r-2' : ''}`}>
                            <Link href="/profile">
                                <a>
                                    <FontAwesomeIcon icon={faUser} className="w-5 m-1 inline" /><span >Profile</span>
                                </a>
                            </Link>
                        </div>
                    </div>
                </div>
                <div className='grow'>
                    {children}
                </div>
            </div>
        </div>
    )
}


export default Layout