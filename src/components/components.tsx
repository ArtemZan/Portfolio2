import React, { Component, MouseEventHandler, PropsWithChildren, useEffect, useState } from "react"
import { ProgressPlugin } from "webpack"

type ButtonOrLinkProps = PropsWithChildren<{
    content?: any
    className?: string
    primary?: boolean
    secondary?: boolean
    hoverable?: boolean
}>

function CreateClassName(className: string, props: ButtonOrLinkProps) {
    if (props.primary) {
        className += " primary"

        if (props.secondary) {
            console.warn("Property 'secondary' is ignored on 'Button' or 'Link' component as property 'primary' is set")
        }
    }
    else if (props.secondary) {
        className += " secondary"
    }

    if (props.hoverable) {
        className += " hoverable"
    }

    if (props.className) {
        className += " " + props.className
    }

    return className
}

type ButtonProps = {
    onClick: MouseEventHandler<HTMLButtonElement>
} & ButtonOrLinkProps

function Button(props: ButtonProps) {
    return <button className={CreateClassName("button", props)} onClick={props.onClick}>
        {props.content}
        {props.children}
    </button>
}

type LinkPropsType = {
    link: string
    newTab?: boolean
} & ButtonOrLinkProps

function Link(props: LinkPropsType) {
    return <a target = {props.newTab ? "_blank" : "_self"} className={CreateClassName("link", props)} href={props.link}>
        {props.content}
        {props.children}
    </a>
}

const enum Position {
    top,
    right,
    bottom,
    left
}

type TooltipProps = PropsWithChildren<{
    className?: string,
    tooltip: any,
    position?: Position
}>

function Tooltip(props: TooltipProps) {
    let position = props.position || Position.top

    let className = "tooltip"

    switch (position) {
        case Position.top: className += " top"; break
        case Position.right: className += " right"; break
        case Position.bottom: className += " bottom"; break
        case Position.left: className += " left"
    }

    return <div className={"tooltip-wrapper" + (props.className ? " " + props.className : "")}>
        <div className={className}>
            {props.tooltip}
        </div>

        {props.children}
    </div>
}

type DropdownProps = {
    className?: string
    closed?: boolean
    closeOnClickOutside?: boolean
    closeOnSecondClick?: boolean
    onOpen?: () => void
    onClose?: () => void
    buttonContent: any
    items: any[]
}

type DropdownState = {
    isOpen: boolean
    isHovered: boolean
}

class Dropdown extends Component<DropdownProps, DropdownState> {
    constructor(props: DropdownProps) {
        super(props)

        this.state = {
            isOpen: !props.closed,
            isHovered: false
        }
    }

    static defaultProps = {
        closeOnClickOutside: true
    }

    OnClickAnywhere(e: MouseEvent) {
        if (!this.state.isHovered && this.state.isOpen && this.props.closeOnClickOutside) {
            e.stopPropagation()

            this.setState({isOpen: false })
            this.props.onClose && this.props.onClose()
        }
    }

    OnClick(e: MouseEvent) {
        e.stopPropagation()

        
        if (this.state.isOpen && this.props.closeOnSecondClick) {
            this.setState({ isOpen: false })
            this.props.onClose && this.props.onClose()
            
            return
        }
        
        if(!this.props.closed)
        {
            this.setState({ isOpen: true })
        }

        this.props.onOpen && this.props.onOpen()
    }

    componentDidMount()
    {
        window.addEventListener("click", this.OnClickAnywhere.bind(this))
        
        return () => window.removeEventListener("click", this.OnClickAnywhere.bind(this))
    }
    
    componentDidUpdate(prevProps: DropdownProps)
    {
        if(prevProps.closed !== this.props.closed)
        {
            this.setState({isOpen: !this.props.closed})
        }
    }

    render() {
        let className = "dropdown";

        if (this.state.isOpen) {
            className += " dropdown--open"
        }

        this.props.className && (className += " " + this.props.className)

        return <div onClick = {e => e.stopPropagation()} onMouseEnter={() => this.setState({ isHovered: true })} onMouseLeave={() => this.setState({ isHovered: false })} className={className}>
            <button onClick={this.OnClick.bind(this)} className="dropdown__button">
                {this.props.buttonContent}
            </button>

            <ul className="dropdown__items">
                {this.props.items.map((item, index) => <li key={index}>{item}</li>)}
            </ul>
        </div>
    }
}

export { Button, Link, Tooltip, Position, Dropdown }