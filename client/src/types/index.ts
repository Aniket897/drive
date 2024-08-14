export interface authSliceType {
  token: string;
  userData: {
    username: string;
    email: string;
    avatar: string;
    id: string;
  };
}

export interface Document {
  _id: string;
  owner: {
    username: string;
    email: string;
    avatar: string;
    id: string;
  };
  name: string;
  url: string;
  isPublic: boolean;
  type: "image" | "pdf" | "text";
  createdAt: string;
  size: number;
}

export interface DocumentSliceType {
  documents: Document[];
}
