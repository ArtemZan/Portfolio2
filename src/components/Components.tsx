import { MouseEventHandler, PropsWithChildren } from "react"

type ButtonPropsType = PropsWithChildren<{
    content?: any
    className?: string
    secondary?: boolean
    onClick: MouseEventHandler<HTMLButtonElement>
}>

export function Button(props: ButtonPropsType)
{
    return <button className = {"button" + (props.secondary ? " secondary" : "") + (props.className ? " " + props.className : "")} onClick = {props.onClick}>
        {props.content}
        {props.children}
    </button>
}

type LinkPropsType = PropsWithChildren<{
    content?: any
    className?: string
    secondary?: boolean
    link: string
}>

export function Link(props: LinkPropsType)
{
    return <a className = {"link hoverable" + (props.secondary ? " secondary" : "") + (props.className ? " " + props.className : "")} href={props.link}>
        {props.content}
        {props.children}
    </a>
}