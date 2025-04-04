export type VolumeInfo = {
    title: string
    description?: string
    authors?: string[]
    infoLink?: string
    imageLinks?: {
        thumbnail?: string
    }
}

export type Book = {
    id?: string
    etag?: string
    volumeInfo: VolumeInfo
}
