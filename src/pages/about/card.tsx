import { PropsWithChildren, useEffect, useRef, useState } from "react";

export type CardProps = PropsWithChildren<{
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
                ref.current.style.visibility = "visible"
                ref.current.style.height = height + "px";

                setTimeout(() => {
                    ref.current.style.height = "auto"
                }, 700)
            }, 100)
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

    return <div className="card">
        <img src="images/connector_dashed.svg" alt="line" className="connector" style={{ opacity: isLineHidden ? 0 : 1 }} />

        <div ref={ref} className="content-wrapper">
            <div className="content">
                {props.children}
            </div>
        </div>
    </div>
}

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

export type ImageProps = { src: string, alt: string }

export {
    Card,
    CardContent
}