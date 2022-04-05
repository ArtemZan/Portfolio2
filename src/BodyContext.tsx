import { createContext, Dispatch, PropsWithChildren, SetStateAction, useEffect, useState } from "react"

export const bodyOverflowContext = createContext({
    overflow: true,
    SetOverflow: null as Dispatch<SetStateAction<boolean>>
})

export function BodyOverflowProvider(props: PropsWithChildren<{}>) {
    const [overflow, SetOverflow] = useState(true)

    useEffect(() => {
        document.body.style.overflow = overflow ? "auto" : "hidden"
    })

    return <bodyOverflowContext.Provider value={{ overflow, SetOverflow }}>
        {props.children}
    </bodyOverflowContext.Provider>
}