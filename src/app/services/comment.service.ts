import { Injectable } from "@angular/core";
import {
  CommentApiClientInterface,
  CommentApiClientUrlInterface,
} from "../models/api-client/comment";
import { Comment } from "../models/domains/comment.domain";
import { HttpClientService } from "./http-client.service";
import { HttpRequestParamsInterface } from "../models/http-client";

@Injectable({
  providedIn: "root",
})
export class CommentService implements CommentApiClientInterface {
  private commentUrl: CommentApiClientUrlInterface;

  constructor(private httpClient: HttpClientService) {
    this.commentUrl = {
      comment: "comments",
    };
  }

  create(comment: Comment): Promise<Comment> {
    const params: HttpRequestParamsInterface = {
      url: this.commentUrl.comment,
      payload: comment,
      requireAuthorization: true
    };

    return this.httpClient.post(params);
  }

  delete(id: string): Promise<void> {
    const params: HttpRequestParamsInterface = {
      url: `${this.commentUrl.comment}/${id}`,
    };

    return this.httpClient.delete(params);
  }

  get(id: string): Promise<Comment> {
    const params: HttpRequestParamsInterface = {
      url: `${this.commentUrl.comment}/${id}`,
    };

    return this.httpClient.get(params);
  }

  update(comment: Comment): Promise<Comment> {
    const params: HttpRequestParamsInterface = {
      url: this.commentUrl.comment,
      payload: comment
    };

    return this.httpClient.put(params);
  }
}
