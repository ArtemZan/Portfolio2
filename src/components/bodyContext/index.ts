import { createContext, Dispatch, SetStateAction } from "react";

export default createContext({
    overflow: true,
    SetOverflow: null as Dispatch<SetStateAction<boolean>>
})