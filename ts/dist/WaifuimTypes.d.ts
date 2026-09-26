export interface Artist {
    id?: string;
    name?: string;
    url?: string;
}
export interface ArtistListMatch {
    page?: number;
    page_size?: number;
}
export interface Image {
    artist?: Record<string, any>;
    category?: string;
    height?: number;
    id?: string;
    thumbnail?: string;
    url?: string;
    width?: number;
}
export interface ImageListMatch {
    category?: string;
    page?: number;
    page_size?: number;
}
