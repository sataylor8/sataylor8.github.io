import Album from "../Interfaces/Album";
import AlbumInfo from "./AlbumInfo";
import "./AlbumView.css";

export default function AlbumArtView(props: { album: Album }) {
    return (
        <div className={"AlbumArt_Container"}>
            <AlbumInfo album={props.album} />
            <img className={"AlbumArt_Image"} src={props.album.ImageURl} />
        </div>
    )
}