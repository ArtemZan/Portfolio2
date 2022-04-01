import { useState } from "react"
import { Dropdown, Link } from "../../components/components"

const links = [
    { href: "/", icon: "home", name: "Home" },
    { href: "/about", icon: "about", name: "About me" },
    { href: "/projects", icon: "project", name: "My projects" },
    { href: "/contact", icon: "contact", name: "Contact me" }
]

function Footer(props: {currentPage: number}) {
    return <div className="footer">
        {links.map((link, index) => <a key={index} className="hoverable" aria-disabled={index === props.currentPage} href={link.href}>{link.name}</a>)}
    </div>
}

type DropdownProps = {
    currentPage: number
}

function DropdownNavigation(props: DropdownProps) {
    const [closed, SetClosed] = useState(true)

    return <div className="menu" >
        <Dropdown
            buttonContent={
                <svg viewBox="0 0 50 32" >
                    <line x1="0" y1="4" x2="50" y2="4" />
                    <line x1="0" y1="16" x2="50" y2="16" />
                    <line x1="0" y1="28" x2="50" y2="28" />
                </svg>
            }
            items={links.map((link, index) => index === props.currentPage ? null :
                <Link key={index} className="hoverable" link={link.href}>
                    <img src={"images/" + link.icon + ".svg"} alt={link.icon} />
                    {link.name}
                </Link>).filter(el => el)}
            closeOnSecondClick
            closed={closed}
            onOpen={() => SetClosed(false)}
        />

        <div className="background" onClick={e => { e.stopPropagation(); SetClosed(true) }} />
    </div>
}

type NavbarProps = {
    currentPage: number
}

function Navbar(props: NavbarProps) {
    return <div className="navbar">
        {links.map((link, index) => <a key={index} className="hoverable" aria-disabled={index === props.currentPage} href={link.href}>{link.name}</a>)}
    </div>
}

export {
    DropdownNavigation as Dropdown,
    Navbar,
    Footer
}