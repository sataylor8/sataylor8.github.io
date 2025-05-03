import { useRef, useState } from "react";
import Album from "../Interfaces/Album";
import { InfoIcon } from "./InfoIcon";
import { Overlay} from "react-bootstrap";

export default function AlbumInfo(props: { album: Album }) {
    const [showInfo, setShowInfo] = useState(false);
    const target = useRef(null);
    const { album } = props;

    return (
        <div className={"AlbumInfo_Container"}> 
            <InfoIcon
                ref={target}
                onClick={() => {setShowInfo(!showInfo)}}
                onMouseEnter={() => {setShowInfo(true)}}
                onMouseLeave={() => setShowInfo(false)}
                className={"AlbumInfo_Icon"}
                stroke={props.album.InvertInfoIcon ? "white" : "black"}
                fill={props.album.InvertInfoIcon ? "black" : "white"} />
            <Overlay transition={true} target={target.current} show={showInfo} placement="left">
                <div className={"AlbumInfo_OverlayContainer"}>
                    <p>{`${album.Title} - ${album.Artist}`}<br/>
                    {`Submitted by ${album.Submitter}`}<br/>
                    {`Discussed on ${album.Date.toLocaleDateString()}`}</p>
                </div>
            </Overlay>
        </div>
    )
}