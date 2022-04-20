import BodyOverflowProvider from "../components/bodyContext/provider"
import Head from "next/head"

import "../styles/global.css"
import "./index.css"

export default function App({ Component, pageProps }) {
    return (
        <>
            <Head>
                <meta charSet="UTF-8" />
                <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <title>Artem Zankovskiy</title>
            </Head>
            <BodyOverflowProvider>
                <Component {...pageProps} />
            </BodyOverflowProvider>
        </>
    )
}