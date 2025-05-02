import Album from "../Interfaces/Album";
import "./AlbumView.css";
import AlbumArtView from "./AlbumArtView";
import TrackList from "./TrackList";

export default function AlbumView(props: { album: Album }) {
    return (
        <div className={"Album_Container"}>
            <AlbumArtView artURL={props.album.ImageURl}/>
            <TrackList Tracks={props.album.FavoriteTracks} IconColor={props.album.IconColor} />
        </div>
    )
}