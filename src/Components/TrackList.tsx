import { Track } from "../Interfaces/Album";
import { PlayIcon } from "./PlayIcon";

export default function TrackList(props: { IconColor: string; Tracks: Track[] }) {
    props.Tracks.sort((a, b) =>{
        return a.Submitters[0][0].localeCompare(b.Submitters[0][0]);
    })
    return (
        <div  className={"TrackList_Container"}>
        <div className={"TrackList_ContainerBG"}>
            <h3>Favorite Tracks:</h3>
            {props.Tracks.map(track => {
                return (
                    <>
                        <div className={"TrackList_Title_Container"}>
                            <div 
                                className={"TrackList_Title_PlayButton"}
                                onClick={() => {
                                    window.EmbedController.loadUri(`spotify:track:${track.SpotifyUrl}`);
                                    window.EmbedController.play()}}>
                                        <PlayIcon height={25} fill={props.IconColor}/>
                            </div>
                            <div className={"TrackList_Title"} >
                                {track.Title}
                            </div>
                            
                        </div>
                        <div className={"TrackList_Submitters"}>
                            {`-${track.Submitters.join(", ")}`}
                        </div>
                    </>
                )
            })}
        </div>
        </div>
    )
}