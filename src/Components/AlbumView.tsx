import Album from "../Interfaces/Album";
import "./AlbumView.css";
import AlbumArtView from "./AlbumArtView";
import TrackList from "./TrackList";
import { Col, Container, Row } from "react-bootstrap";

export default function AlbumView(props: { album: Album }) {
    return (
        <Container className={"Album_Container"}>
            <Row>
                <Col>
                    <AlbumArtView artURL={props.album.ImageURl} />
                </Col>
                <Col>
                    <TrackList Tracks={props.album.FavoriteTracks} IconColor={props.album.IconColor} />
                </Col>
            </Row>
        </Container>
    )
}