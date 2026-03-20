export interface Resolution {
  quality: Number;
  url: String;
}

export interface Episode {
  snapshotUrl: String;
  title: String;
  episode: Number;
  releaseDate: Date;
  res: Resolution[];
}

export interface Show {
  id: string;
  show: string;
  episodes: Episode[];
  showImage: string
}
