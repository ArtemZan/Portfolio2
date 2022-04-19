import { Dropdown, Footer, Navbar } from "../_components";
import Project from "./project";
import InfiniteScroll from "react-infinite-scroll-component";
import { ReactElement, useEffect, useState } from "react";
import { Button, DialogWindow, SearchField } from "../../components";
import tags from "../api/projects/tags";

type FiltersProps = {
    tags: string[]
    onUpdate: (tags: string[]) => void
}

function Filters(props: FiltersProps) {
    const [selected, SetSelected] = useState<string[]>([])
    const [tagsWindowOpen, SetTagsWindowState] = useState(false)
    const [foundTags, SetFoundTags] = useState<string[]>([])
    const [hasChanges, HasChanges] = useState<boolean>(null)
    const [clearSearch, ClearSearch] = useState(false)

    useEffect(() => {
        if(clearSearch)
        {
            ClearSearch(false)
        }
    }, [clearSearch])

    useEffect(() => {
        SetFoundTags(GetNotSelectedTags())

        ClearSearch(true)

        hasChanges !== null && HasChanges(true)
    }, [selected])

    useEffect(() => {
        HasChanges(false)
    }, [])

    function GetNotSelectedTags() {
        return [...props.tags].filter(tag => !selected.find(selTag => selTag === tag))
    }

    function OpenTagsWindow() {
        SetTagsWindowState(true)

        SetFoundTags(GetNotSelectedTags())
    }

    function AddTag() {
        OpenTagsWindow()
    }

    function UpdateSearch(request: string) {
        SetFoundTags(GetNotSelectedTags().filter(tag => tag.toLowerCase().search(request.toLowerCase()) !== -1))
    }

    function UpdateParent()
    {
        props.onUpdate(selected)

        HasChanges(false)
    }

    return <div className="filters">
        <header>Filters</header>
        <div className="selected">
            {selected.map((tag, index) =>
                <Button hoverable primary onClick={() => SetSelected(selected.filter(selTag => selTag !== tag))} key={index}>
                    {tag}
                    <i className="fa fa-close"></i>
                </Button>)}
            <Button className="add-tags" onClick={AddTag} primary>+</Button>
        </div>
        {hasChanges && <Button className = "update" primary onClick = {UpdateParent}>Update</Button>}
        {tagsWindowOpen && <DialogWindow onClose={() => SetTagsWindowState(false)}>
            <SearchField value = {clearSearch ? "" : undefined} onInput={UpdateSearch} />
            <div className="tags">
                {foundTags.length ? foundTags.map(tag => <Button key = {tag} onClick={() => SetSelected([...selected, tag])} className="hoverable">{tag}</Button>) : "No results found"}
            </div>
        </DialogWindow>}
    </div>
}

function MapChildrenToElements(children: ReactElement[] | ReactElement) {
    if (!Array.isArray(children)) {
        if (typeof children === "object") {
            return <children.type {...children.props}>{MapChildrenToElements(children.props.children)}</children.type>
        }

        return children
    }

    return children.map((child, index) => {

        if (typeof child === "object") {
            return <child.type {...child.props} key={index}>{MapChildrenToElements(child.props.children)}</child.type>
        }

        return child
    })
}

export default function Projects() {
    const [loadedProjects, SetLoadedProjects] = useState([])
    const [projectsLeft, SetProjectsLeft] = useState(1)
    const [filters, SetFilters] = useState<string[]>([])

    useEffect(() => {
        LoadNext()
    }, [filters])

    function FilterProjects(tags: string[])
    {
        SetFilters(tags)
        SetLoadedProjects([])
        SetProjectsLeft(1)
    }

    function LoadNext() {
        const req = new XMLHttpRequest()

        req.open("GET", `http://localhost:3000/api/projects?start=${loadedProjects.length}&count=${1}${filters.reduce((prev, filter) => prev + "&tags=" + filter, "")}`)

        req.addEventListener("load", (e) => {
            const resp = JSON.parse(req.response)

            const projects = resp.projects.map((project: ReactElement, index: number) => {
                return <Project key={loadedProjects.length + index} {...project.props}>
                    {MapChildrenToElements(project.props.children)}
                </Project>
            })

            SetProjectsLeft(resp.left)
            SetLoadedProjects([...loadedProjects, ...projects])
        })

        req.send()
    }

    return <div className="page projects-page">
        <Navbar currentPage={2}></Navbar>
        <Dropdown currentPage={2} />

        <img src="images/factory.svg" alt="factory" className="background" />

        <header className="title">
            My projects
        </header>

        <Filters onUpdate = {FilterProjects} tags={Array.from(tags)} />

        <div className="content">
            <InfiniteScroll
                next={LoadNext}
                hasMore={projectsLeft !== 0}
                dataLength={loadedProjects.length}
                loader={<h3 style={{ color: "white" }}>Loading...</h3>}
                endMessage={<div className="coming-soon">
                    New projects coming soon...
                </div>}
            >
                {loadedProjects}
            </InfiniteScroll>


        </div>

        <Footer currentPage={2} />
    </div>
}