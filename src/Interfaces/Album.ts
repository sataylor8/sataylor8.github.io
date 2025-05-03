export type Submitter = 'Amanda' | 'Jordan' | 'Matt' | 'Mike' | 'Peter' | 'Stauffer';

export type Track = {
    Title: string;
    SpotifyUrl: string;
    Submitters: Submitter[];
}

type Album = {
    Artist: string;
    Title: string;
    Submitter: Submitter;
    Date: Date;
    FavoriteTracks: Track[];
    LeastFavoritTracks: Track[];
    ImageURl: string;
    ThemeColor: string;
    InvertInfoIcon?: boolean;
}

export default Album;