export type Track = {
    Title: string;
    SpotifyUrl: string;
    Submitters: string[];
}

type Album = {
    Artist: string;
    Title: string;
    Submitter: string;
    Date: Date;
    FavoriteTracks: Track[];
    LeastFavoritTracks: Track[];
    ImageURl: string;
    IconColor: string;
}

export default Album;