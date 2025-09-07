export interface S3Config {
  bucketName: string
  region: string
  accessKeyId: string
  secretAccessKey: string
  signedUrlExpiry: number // seconds
}

export interface S3ObjectMetadata {
  'x-amz-meta-alt'?: string
  'x-amz-meta-caption'?: string
  'x-amz-meta-aspect-ratio'?: string
}

export interface PhotoMetadata {
  alt: string
  caption?: string
  aspectRatio?: number
}

export interface S3PhotoService {
  listPhotos(): Promise<Photo[]>
  getPhotoMetadata(_key: string): Promise<PhotoMetadata>
  generateSignedUrl(_key: string): Promise<string>
  listSubfolders(): Promise<Subfolder[]>
  listPhotosInSubfolder(_subfolderName: string): Promise<Photo[]>
  getSubfolderCoverImage(_subfolderName: string): Promise<string | null>
}

export interface Photo {
  src: string
  alt: string
  caption?: string
  aspectRatio?: number
}

export interface PhotosAPIResponse {
  photos: Photo[]
  error?: string
  cached?: boolean
}

export interface Subfolder {
  name: string
  displayName: string
  coverImageUrl?: string
  photoCount: number
  path: string
}

export interface SubfoldersAPIResponse {
  subfolders: Subfolder[]
  error?: string
  cached?: boolean
}
