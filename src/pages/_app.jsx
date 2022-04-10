import { BodyOverflowProvider } from "./_bodyContext"
import Head from "next/head"

import "../styles/global.css"
import "./index.css"

export default function App({ Component, pageProps }) {
    return (
        <>
            <Head>
                <meta charset="UTF-8" />
                <meta http-equiv="X-UA-Compatible" content="IE=edge" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <title>Artem Zankovskiy</title>
            </Head>
            <BodyOverflowProvider>
                <Component {...pageProps} />
            </BodyOverflowProvider>
        </>
    )
}