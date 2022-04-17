import { ChangeEventHandler, Component, ComponentType, FormEvent, FormEventHandler, Fragment, KeyboardEventHandler, MouseEventHandler, PropsWithChildren, useState } from "react"
import NextLink from "next/link"

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
    return <NextLink href={props.link}>
        <a target={props.newTab ? "_blank" : "_self"} className={CreateClassName("link", props)}>
            {props.content}
            {props.children}
        </a>
    </NextLink>
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
    buttonWrapper?: ComponentType
    buttonWrapperProps?: { [prop: string]: any }
    buttonContent?: any,
    buttonProps?: ButtonProps
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
            isOpen: props.closed === false,
            isHovered: false
        }
    }

    static defaultProps = {
        closeOnClickOutside: true
    }

    OnClickAnywhere(e: MouseEvent) {
        if (!this.state.isHovered && this.state.isOpen && this.props.closeOnClickOutside) {
            e.stopPropagation()

            this.setState({ isOpen: false })
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

        if (!this.props.closed) {
            this.setState({ isOpen: true })
        }

        this.props.onOpen && this.props.onOpen()
    }

    componentDidUpdate(prevProps: DropdownProps) {
        if (prevProps.closed !== this.props.closed) {
            this.setState({ isOpen: !this.props.closed })
        }
    }

    componentDidMount() {
        window.addEventListener("click", this.OnClickAnywhere.bind(this))
    }

    componentWillUnmount() {
        window.removeEventListener("click", this.OnClickAnywhere.bind(this))
    }

    render() {
        let className = "dropdown";

        if (this.state.isOpen) {
            className += " dropdown--open"
        }

        this.props.className && (className += " " + this.props.className)

        const buttonWrapper = { comp: this.props.buttonWrapper || Fragment };

        return <div className={className}>
            <buttonWrapper.comp {...this.props.buttonWrapperProps}>
                <Button {...this.props.buttonProps} onClick={this.OnClick.bind(this)} className={CreateClassName("dropdown__button", this.props.buttonProps || {})}>
                    {this.props.buttonContent || this.props.buttonProps.children}
                </Button>
            </buttonWrapper.comp>

            <div className="dropdown__content" onMouseEnter={() => this.setState({ isHovered: true })} onMouseLeave={() => this.setState({ isHovered: false })}>

                <ul className="dropdown__items">
                    {this.props.items.map((item, index) => <li key={index}>{item}</li>)}
                </ul>
            </div>
        </div>
    }
}

type WindowProps = PropsWithChildren<{
    onClose: () => any
}>

function DialogWindow(props: WindowProps) {
    function OnClose() {
        props.onClose()
    }

    return <div className="window-wrapper" onClick={OnClose}>
        <div className="window" onClick={e => e.stopPropagation()}>
            <Button className="close" onClick={OnClose}> <i className="fas fa-window-close"></i> </Button>

            {props.children}
        </div>
    </div>
}

type SearchFieldProps = {
    onSearch: (request: string) => void
} |
{
    onInput: (request: string) => void
}

function SearchField(props: SearchFieldProps) {
    const [request, SetRequest] = useState("")

    const OnInput: ChangeEventHandler<HTMLInputElement> = e => {
        "onInput" in props && props.onInput(e.target.value)
        SetRequest(e.target.value)
    }

    const OnKey: KeyboardEventHandler<HTMLInputElement> = e => {
        if (e.key === "Enter") {
            OnSearch()
        }
    }

    const OnSearch = () => {
        "onSearch" in props && props.onSearch(request)
    }

    return <div className="search">
        <Button onClick={OnSearch}><i className="fas fa-search hoverable" /></Button>
        <input type="text" onChange={OnInput} onKeyDown={OnKey} />
    </div>
}

export { Button, Link, Tooltip, Position, DialogWindow, Dropdown, SearchField }