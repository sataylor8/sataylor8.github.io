import SeasonViewProps from "../Interfaces/SeasonViewProps";
import AlbumView from "./AlbumView";

export default function SeasonView(props: SeasonViewProps) {
    return (
        <>
            {props.Albums.map(album => {
                return <AlbumView album={album} />
            })}
        </>
    )
}