import "./AlbumView.css";

export default function AlbumArtView(props: { artURL: string }) {
    return (
        <div className={"AlbumArt_Container"}> 
        <img className={"AlbumArt_Image"} src={props.artURL}/>
        </div>
    )
}