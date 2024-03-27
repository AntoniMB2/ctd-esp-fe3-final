export interface thumbnail {
    path: string;
    extension: string;
  
}

export interface Comic {
    id: string;
    title: string;
    thumbnail: thumbnail;
  }