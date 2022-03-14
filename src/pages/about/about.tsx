import { PropsWithChildren, ReactElement, useEffect, useRef, useState } from "react"

type InfoProps = PropsWithChildren<{
    hidden?: true,
    onHide: () => void
}>

function Info(props: InfoProps) {
    const [shouldHide, ShouldHide] = useState(false);
    const [isLineHidden, SetLineHidden] = useState(true);
    const ref = useRef<HTMLDivElement>();

    useEffect(() => {
        ShouldHide(props.hidden ? true : false);
    })

    useEffect(() => {
        console.log(shouldHide)

        if (shouldHide) {
            Hide()
        }
        else {
            Show()
        }
    }, [shouldHide])

    useEffect(() => {
        if (isLineHidden) {
            props.onHide()
        }
    }, [isLineHidden])

    function Show() {
        SetLineHidden(false);

        ref.current.style.height = "auto"
        ref.current.style.transition = "none"

        setTimeout(() => {
            const height = window.getComputedStyle(ref.current).height

            console.log(height);

            ref.current.style.height = "0px"
            ref.current.style.transition = "height 0.5s"


            setTimeout(() => {
                ref.current.style.height = height;
            }, 0)
        })
    }

    function Hide() {
        ref.current.style.height = window.getComputedStyle(ref.current).height;

        setTimeout(() => {
            ref.current.style.height = "0px"
        });

        setTimeout(() => {
            SetLineHidden(true);
        }, 300)
    }



    return <div className="info">
        <img src="images/connector_dashed.svg" alt="line" className="connector" style={{ opacity: isLineHidden ? 0 : 1 }} />

        <div ref={ref} className="content-wrapper">
            <div className="content">
                {props.children}
            </div>
        </div>
    </div>
}

const cards = (() => {
    const res = []
    const myBirthday = new Date();
    myBirthday.setFullYear(2005, 4, 2);

    res.push(
        <>
            My name is Artem, I’m {myBirthday.getFullYear()} years old and I’ve done this website so people can learn about me
        </>
    )

    return res;
})()

export default function About() {
    const [currentCard, SetInfoCard] = useState<number>(0);

    useEffect(() => {

    }, [])

    function NextInfo() {
        SetInfoCard(currentCard + 1);


    }

    function OnCardHide() {

    }

    return <div className="page about-page">
        <div className="pivot" />

        <div className="header">
            <img className="connector" src="images/connector.svg" alt="line" />
            <div className="text">About me</div>
        </div>

        <Info onHide={OnCardHide}>
            {cards[currentCard]}
        </Info>
    </div>
}