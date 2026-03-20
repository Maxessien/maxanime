export interface Resolution {
  quality: number;
  url: string;
  sizeBytes: number;
}

export interface Episode {
  showId: string,
  releaseId: string,
  snapshotUrl: string,
  title: string,
  episode: number,
  releaseDate: Date,
  res: Resolution[],
}

export interface Show {
    id: string,
    show: string,
    showImage: string,
    description: string
  }
