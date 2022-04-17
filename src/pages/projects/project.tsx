import { useState, PropsWithChildren, useContext, useEffect, Children } from "react"
import { bodyOverflowContext } from "../_bodyContext"
import { Tooltip, Link, Button, DialogWindow, Dropdown } from "../../components"

type GitHubLinks = string | {
    name: string,
    link: string
}[]

type GitHubLinksProps = {
    github: GitHubLinks
}

function GitHubLinks(props: GitHubLinksProps) {
    const [isWindowOpened, SetWindowOpened] = useState(false)

    if (typeof props.github === "string") {
        return <Tooltip tooltip="See the project on GitHub">
            <Link className="github__link" newTab secondary link={props.github}>
                <i className="fab fa-github hoverable" />
            </Link>
        </Tooltip>
    }

    useEffect(() => {
        window.addEventListener("click", () => { })
    }, [])

    return <div className="github">
        <Dropdown
            buttonWrapper={Tooltip}
            buttonWrapperProps={{ tooltip: "See the project on GitHub" }}
            buttonProps={{
                className: "github__button",
                secondary: true,
                onClick: SetWindowOpened.bind(null, true),
                children: [
                    <i className="fab fa-github hoverable" key = {0}/>,
                    <i className="fas fa-caret-down hoverable" key = {1}/>
                ]
            }}
            items={props.github.map(({ name, link }) => <Link primary newTab link={link}>{name}</Link>)} />

        {/* {isWindowOpened && <DialogWindow onClose={SetWindowOpened.bind(null, false)}>
            {props.github.map(({ name, link }) => <Link primary newTab link={link}>{name}</Link>)}
        </DialogWindow>} */}
    </div>
}

export type ProjectProps = PropsWithChildren<{
    title: string,
    link?: string,
    github?: GitHubLinks,
    tags?: string[]
}>

export default function Project(props: ProjectProps) {
    const [showEmbeded, ShowEmbeded] = useState(false)
    const context = useContext(bodyOverflowContext)

    function OpenEmbededWebsite() {
        ShowEmbeded(true)
        context.SetOverflow(false)
    }

    function CloseEmbededWebsite() {
        ShowEmbeded(false)
        context.SetOverflow(true)
    }

    return <div className="project">
        <header>
            {props.title}
            {props.github && <GitHubLinks github={props.github} />}
        </header>


        {props.children}

        <div className="view">
            {props.link && <><Link primary newTab link={props.link}>Open the website</Link> or <Button primary onClick={OpenEmbededWebsite}>Open embeded version</Button></>}

            {showEmbeded &&
                <div className="embeded">
                    <iframe allowFullScreen src={props.link} frameBorder="0" />
                    <Button onClick={CloseEmbededWebsite}><i className="fas fa-window-close" /></Button>
                </div>
            }
        </div>
    </div>

}