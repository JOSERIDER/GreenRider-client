import { Component, Input } from '@angular/core';
import { Comment } from "../../../models/domains/comment.domain";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import Swal from "sweetalert2";

@Component({
  selector: 'app-comment-creator',
  templateUrl: './comment-creator.component.html',
  styleUrls: ['./comment-creator.component.css']
})
export class CommentCreatorComponent {

  @Input()showDialog: boolean;

  commentForm: FormGroup;
  privacityControl = false;
  comment: Comment;

  constructor() {
    this.commentForm = new FormGroup({
      user: new FormControl("", Validators.required),
      title: new FormControl("", [
        Validators.required,
        Validators.minLength(4),
      ]),
      comment: new FormControl("", [
        Validators.required,
        Validators.maxLength(100),
        Validators.minLength(10),
      ]),
    });
  }

  validatePrivacy(isChecked: boolean): void {
    this.privacityControl = isChecked;
  }

  showPrivacity(): void {
    void Swal.fire({
      icon: "info",
      title: "Política de privacidad",
      text: "Al enviar el comentario, alamcenamos los datos referentes al mismo, como puede ser ( nombe, correo electrónico...) estos datos serán almacenados para fines de mejora de experiencia del usuario. Y para una mejor calidad de los anuncios que percibes.",
    });
  }

  newComment(): void {
    this.comment.name = this.commentForm.get("user")?.value as string;
    this.comment.title = this.commentForm.get("title")?.value as string;
    this.comment.content = this.commentForm.get("comment")?.value as string;

    this.commentForm.reset();
    //TODO Create comment
  }

  showConditions(): void {
    void Swal.fire({
      icon: "info",
      title: "Condiciones de uso",
      text: "Cuando envias un comentario, debes respetar las normas y condiciones de uso.",
    });
  }
}
