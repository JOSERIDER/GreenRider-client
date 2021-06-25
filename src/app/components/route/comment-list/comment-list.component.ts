import { Component, Input, OnInit } from '@angular/core';
import { Comment } from "../../../models/domains/comment.domain";
import Swal from "sweetalert2";
import { AuthGuard } from "../../../guards/auth.guard";

@Component({
  selector: 'app-comment-list',
  templateUrl: './comment-list.component.html',
  styleUrls: ['./comment-list.component.css']
})
export class CommentListComponent implements OnInit {

  @Input() comments:Comment[];
  loggedIn: boolean;

  constructor(private guard: AuthGuard) {}

  ngOnInit(): void {
  }

  deleteComment(id: string): void {
    this.loggedIn = this.guard.authenticated;
    if (!this.loggedIn) {
      void Swal.fire({
        icon: "error",
        title: "No tienes permisos para eliminar comentarios",
        text: "Debes registrarte o iniciar sesión",
      });

      return;
    }
    //TODO DELETE comment
  }
}
