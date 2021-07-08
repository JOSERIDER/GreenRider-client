import { Component, Input } from "@angular/core";
import { Comment } from "../../../models/domains/comment.domain";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import Swal from "sweetalert2";
import { CommentService } from "../../../services/comment.service";
import { Route } from "../../../models/domains/route.domain";

@Component({
  selector: "app-comment-creator",
  templateUrl: "./comment-creator.component.html",
  styleUrls: ["./comment-creator.component.css"],
})
export class CommentCreatorComponent {
  @Input() showDialog: boolean;
  @Input() route: Route;

  commentForm: FormGroup;
  privacityControl = false;

  constructor(private commentService: CommentService) {
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
    const name = this.commentForm.get("user")?.value as string;
    const title = this.commentForm.get("title")?.value as string;
    const content = this.commentForm.get("comment")?.value as string;

    this.commentForm.reset();
    const comment: Comment = {
      routeId: this.route.id,
      id: "",
      title,
      name,
      content,
    };

    void Swal.fire({
      icon: "info",
      title: "Creating comment...",
    });
    Swal.showLoading();
    this.commentService
      .create(comment)
      .then(() => {
        void Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Comment create",
          showConfirmButton: false,
          timer: 1500,
        });
      })
      .catch((error) => {
        void Swal.fire({
          icon: "error",
          title: "Comment no create",
          text: error.message,
          showConfirmButton: true,
        });
      });
  }

  showConditions(): void {
    void Swal.fire({
      icon: "info",
      title: "Condiciones de uso",
      text: "Cuando envias un comentario, debes respetar las normas y condiciones de uso.",
    });
  }
}
