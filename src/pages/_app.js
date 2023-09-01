
import Router, { useRouter } from 'next/router';
import NProgress from 'nprogress'; //nprogress module
import Head from 'next/head'

import 'nprogress/nprogress.css'; //styles of nprogress 

Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

import Next13NProgress from 'next13-nprogress';

import '@/styles/style.sass'
import '@/styles/beta.sass'
import RootLayout from '@/theme/layout';

function MyApp({ Component, pageProps }) {
    return (
        < >
            <Head>
                <meta name="theme-color" content="#fff" />
                {/* <link rel="manifest" href="/manifest.json" /> */}

                <link rel="shortcut icon" href="/image/logo.png" />
            </Head>
            <Next13NProgress />
            <RootLayout>
                <Component {...pageProps} />
            </RootLayout>
        </ >
    )
}

export default MyApp  