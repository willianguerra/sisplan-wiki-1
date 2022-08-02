export interface PrismicPostProps {
  uid: string;
  last_publication_date: string;
  title: string;
  description: string;
  content: any[];
}

export interface Post  {
  slug: string;
  title: string;
  description: string;
  excerpt: string;
  updatedAt: string;
  type?: string;
}


export interface PostSearchProps {
  title: string;
  description: string;
  hour: string;
  id: string;
  onCloseModal?: () => void;
  type?: string;
}
export interface PostProps {
  posts: Post[];
}
