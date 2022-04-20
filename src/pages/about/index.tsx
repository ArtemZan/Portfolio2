import React, { PropsWithChildren, useEffect, useRef, useState } from "react"
import { Link, Position, Tooltip } from "../../components";
import { Dropdown, Navbar } from "../../components/default";


type CardProps = PropsWithChildren<{
    hidden?: true,
    onHide: () => void
}>

function Card(props: CardProps) {
    const [isLineHidden, SetLineHidden] = useState(true);
    const ref = useRef<HTMLDivElement>();

    useEffect(() => {
        if (props.hidden) {
            Hide()
        }
        else {
            Show()
        }
    }, [])

    useEffect(() => {
        if (isLineHidden) {
            props.onHide()
        }
    }, [isLineHidden])



    function Show() {
        SetLineHidden(false);
        ref.current.style.transition = "none"
        ref.current.style.visibility = "hidden"
        ref.current.style.height = "auto"

        setTimeout(() => {


            const rect = ref.current.querySelector(".content").getBoundingClientRect()
            const { height } = rect;

            ref.current.style.height = "0px"
            ref.current.style.transition = "height 0.7s"


            setTimeout(() => {
                if(ref.current === null)
                {
                    return
                }

                ref.current.style.visibility = "visible"
                ref.current.style.height = height + "px"

                setTimeout(() => {
                    ref.current && (ref.current.style.height = "auto")
                }, 700)
            }, 100)
        })
    }

    function Hide() {
        ref.current.style.height = window.getComputedStyle(ref.current).height;

        setTimeout(() => {
            ref.current && (ref.current.style.height = "0px")
        });

        setTimeout(() => {
            SetLineHidden(true);
        }, 300)
    }

    return <div className="card">
        <img src="images/connector_dashed.svg" alt="line" className="connector" style={{ opacity: isLineHidden ? 0 : 1 }} />

        <div ref={ref} className="content-wrapper">
            <div className="content">
                {props.children}
            </div>
        </div>
    </div>
}


type ImageProps = { src: string, alt: string }

function CardContent(props: { text: string, image: ImageProps | ImageProps[] }): any {
    return <>
        <div className="text">
            {props.text}
        </div>
        <div className="image">
            {"src" in props.image ?
                <img src = {"images/" + props.image.src} alt = {props.image.alt} />
                :
                props.image.map((imgProps, i) => <img key={i} src = {"images/" + imgProps.src} alt = {imgProps.alt} />)
            }
        </div>
    </>
}



const cards: { text: string, image: ImageProps | (ImageProps[]) }[] = (() => {
    const myBirthday = new Date();
    myBirthday.setFullYear(2005, 3, 2);

    return [
        {
            text: `My name is Artem, I’m ${new Date(Date.now() - new Date(2005, 3, 2).getTime()).getFullYear() - 1970} years old and I’ve created this website so people can learn about me`,
            image: [
                { src: "hand.svg", alt: "hand" },
                { src: "face.svg", alt: "face" }
            ]
        },
        {
            text: "I am fullstack developer with experience in game development",
            image: { src: "programming.svg", alt: "programming" }
        },
        {
            text: "I'm studying in Sofia High School of Mathematics",
            image: { src: "graduation.svg", alt: "graduation" }
        },
        {
            text: "For me programming is a way to challenge myself and get better at solving problems",
            image: { src: "thinking.svg", alt: "thinking" }
        },
        {
            text: "I am ukrainian but I live in Sofia, Bulgaria. I speak russian, ukrainian, bulgarian, english and a little german",
            image: { src: "world.svg", alt: "world" }
        }
    ];
})()

export default function About() {
    const showedCards = useRef<JSX.Element[]>([])
    const [cardsShowed, SetCardsShowed] = useState(0)
    const images = useRef<HTMLImageElement[]>([])
    const touchStartPos = useRef(-1)
    const disableScroll = useRef(false)

    function OnClick() {
        if (document.scrollingElement.scrollTop + 20 >= document.scrollingElement.scrollHeight - window.innerHeight) {
            ShowNextCard()
        }
    }

    function OnScroll(e: WheelEvent) {
        if (disableScroll.current) {
            return
        }

        if (e.deltaY > 0 && document.scrollingElement.scrollTop + 5 >= document.scrollingElement.scrollHeight - window.innerHeight) {
            ShowNextCard()
            disableScroll.current = true
            setTimeout(() => {
                disableScroll.current = false
            }, 500)
        }
    }

    function OnTouchStart(e: TouchEvent) {
        touchStartPos.current = e.touches[0].clientY
    }

    function OnTouchEnd(e: TouchEvent) {
        if (e.touches[0].clientY < touchStartPos.current && document.scrollingElement.scrollTop + 20 >= document.scrollingElement.scrollHeight - window.innerHeight) {
            ShowNextCard()
        }
    }

    function ShowNextCard() {
        if (showedCards.current.length === cards.length) {
            return
        }

        const content = cards[showedCards.current.length]

        showedCards.current.push(<Card key={showedCards.current.length} onHide={() => { }}>
            <CardContent {...content}></CardContent>
        </Card>)

        SetCardsShowed(showedCards.current.length)
        console.log(showedCards, cards)
    }

    useEffect(() => {
        for (const cardData of cards) {
            if ("src" in cardData.image) {
                const image = new Image()
                image.src = "images/" + cardData.image.src
                images.current.push(image)
                continue
            }

            for (const imgData of cardData.image) {
                const image = new Image()
                image.src = "images/" + imgData.src
                images.current.push(image)
            }
        }

        images.current[0].onload = () => {
            showedCards.current.push(<Card key={0} onHide={() => { }}>
                <CardContent {...cards[0]} />
            </Card>)
            SetCardsShowed(cardsShowed + 1)
        }


        window.addEventListener("click", OnClick)
        window.addEventListener("wheel", OnScroll)
        window.addEventListener("touchstart", OnTouchStart)
        window.addEventListener("touchmove", OnTouchEnd)

        return () => {
            window.removeEventListener("click", OnClick)
            window.removeEventListener("wheel", OnScroll)
            window.removeEventListener("touchstart", OnTouchStart)
            window.removeEventListener("touchmove", OnTouchEnd)

        }
    }, [])

    return <div className="page about-page">
        <Dropdown currentPage={1} />

        <div className="sidebar">
            <div className="navigation">
                <Tooltip position={Position.right} tooltip="Home">
                    <Link hoverable link="/">
                        <img src="images/home.svg" alt="home" />
                    </Link>
                </Tooltip>

                <Tooltip position={Position.right} tooltip="Contact me">
                    <Link hoverable link="/contact">
                        <img src="images/contact.svg" alt="contact" />
                    </Link>
                </Tooltip>

                <Tooltip position={Position.right} tooltip="My projects">
                    <Link hoverable link="/projects">
                        <img src="images/project.svg" alt="project" />
                    </Link>
                </Tooltip>
            </div>
        </div>

        <div className="header">
            <img className="connector" src="images/connector.svg" alt="line" />
            <div className="text">About me</div>
        </div>

        <div className="info">
            {showedCards.current}
        </div>


        <div className="instructions">
            <div className="mouse">
                <img style={{ height: "50px" }} src="images/mouse.svg" alt="mouse" />
                <i className='fas fa-long-arrow-alt-down' />
            </div>

            <div className="click">
                or click anywhere
            </div>
        </div>
    </div>
}