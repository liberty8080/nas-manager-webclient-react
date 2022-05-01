export const GB = 8 * 1024 * 1024 * 1024
export const MB = 8 * 1024 * 1024
export const KB = 8 * 1024


export interface Torrent {
    ID: number
    Name: string
    TorrentSize: number
    DownloadDir: string
    Status: string
    RateDownload: number
    RateUpload: number
}