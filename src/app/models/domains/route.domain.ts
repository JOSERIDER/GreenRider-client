import { Comment } from "./comment.domain";

export interface Route {
  id?: string;
  image?: string;
  name?: string;
  duration?: string;
  difficult?: string;
  unit?: string;
  description?: string;
  distance?: number;
  mapUrl?: string;
  img?: string;
  comments?:Comment[];
}
