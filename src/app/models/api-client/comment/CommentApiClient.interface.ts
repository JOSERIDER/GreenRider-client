import { Comment } from "../../domains/comment.domain";

export interface CommentApiClientInterface {
  get(id: string): Promise<Comment>;

  create(comment: Comment): Promise<Comment>;

  update(comment: Comment): Promise<Comment>;

  delete(id: string): Promise<void>;
}
