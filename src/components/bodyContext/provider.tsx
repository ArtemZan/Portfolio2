import { PropsWithChildren, useState, useEffect } from "react"
import bodyOverflowContext from "."

export default function BodyOverflowProvider(props: PropsWithChildren<{}>) {
    const [overflow, SetOverflow] = useState(true)

    useEffect(() => {
        document.body.style.overflow = overflow ? "auto" : "hidden"
    })

    return <bodyOverflowContext.Provider value={{ overflow, SetOverflow }}>
        {props.children}
    </bodyOverflowContext.Provider>
}