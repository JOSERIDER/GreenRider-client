import { Component, Input, OnInit } from '@angular/core';
import { Comment } from "../../../models/domains/comment.domain";
import Swal from "sweetalert2";
import { AuthService } from "../../../services/auth.service";
import { CommentService } from "../../../services/comment.service";

@Component({
  selector: 'app-comment-list',
  templateUrl: './comment-list.component.html',
  styleUrls: ['./comment-list.component.css']
})
export class CommentListComponent implements OnInit {

  @Input() comments:Comment[];
  loggedIn: boolean;

  constructor(private userService: AuthService, private commentService: CommentService) {}

  ngOnInit(): void {
  }

  deleteComment(id: string): void {
    this.loggedIn = !!this.userService.user;

    if (!this.loggedIn) {
      void Swal.fire({
        icon: "error",
        title: "No tienes permisos para eliminar comentarios",
        text: "Debes registrarte o iniciar sesión",
      });

      return;
    }

    void Swal.fire({
      icon: "info",
      title: "Creating comment...",
    });
    Swal.showLoading();
    this.commentService.delete(id).then(() => {
      void Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Comment deleted",
        showConfirmButton: false,
        timer: 1500,
      }).catch(error => {
        void Swal.fire({
          icon: "error",
          title: "Comment no deleted",
          text: error.message,
          showConfirmButton: true,
        });
      });
    })
  }
}
