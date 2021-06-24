import { Component } from "@angular/core";
import { DomSanitizer, SafeUrl } from "@angular/platform-browser";
import { Comment } from "../../models/domains/comment.domain";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Route } from "../../models/domains/route.domain";
import { ActivatedRoute } from "@angular/router";
import swal from "sweetalert";
import Swal from "sweetalert2";
import { AuthGuard } from "../../guards/auth.guard";

@Component({
  selector: "app-route",
  templateUrl: "./route.component.html",
  styleUrls: ["./route.component.css"],
})
export class RouteComponent {
  route: Route;
  validUrl: SafeUrl;
  comment: Comment;
  commentForm: FormGroup;
  logedIn: boolean;
  comments: Comment[] = [];
  routeLength?: string;
  privacityControl = false;

  constructor(
    private _activatedRoute: ActivatedRoute,
    //private rutasService: RutasService,
    private sanitizer: DomSanitizer,
    private guard: AuthGuard
  ) {
    this.logedIn = false;
    this.route = {};
    this.comment = {};
    this._activatedRoute.params.subscribe((params) => {
      //this.ruta = this.rutasService.getRuta(params["id"]);
    });
    this.validUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
      this.route.mapUrl || ""
    );

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
    this.routeLength = this.route.mapUrl;
  }

  validatePrivacy(isChecked: boolean): void {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    this.privacityControl = isChecked;
  }

  showPrivacity(): void {
    void Swal.fire({
      icon: "info",
      title: "Política de privacidad",
      text: "Al enviar el comentario, alamcenamos los datos referentes al mismo, como puede ser ( nombe, correo electrónico...) estos datos serán almacenados para fines de mejora de experiencia del usuario. Y para una mejor calidad de los anuncios que percibes.",
    });
  }

  showConditions(): void {
    void Swal.fire({
      icon: "info",
      title: "Condiciones de uso",
      text: "Cuando envias un comentario, debes respetar las normas y condiciones de uso.",
    });
  }

  newComment(): void {
    this.comment.name = this.commentForm.get("user")?.value as string;
    this.comment.title = this.commentForm.get("titulo")?.value as string;
    this.comment.content = this.commentForm.get("content")?.value as string;

    //Resetear los campos cuando envia el comentario
    this.commentForm.reset();
    //Añadir el comentario a la propiedad comentario de la ruta en concreto.
    //this.rutasService.rutasInfo[this.index].comentario.push(this.comentario);

    // this.comentarios = this.rutasService.rutasInfo[this.index].comentario;
  }

  //Eliminar un comentario:
  deleteComment(id: string): void {
    this.logedIn = this.guard.authenticated;
    if (!this.logedIn) {
      void Swal.fire({
        icon: "error",
        title: "No tienes permisos para eliminar comentarios",
        text: "Debes registrarte o iniciar sesión",
      });
    } else {
      // this.rutasService.rutasInfo[this.index].comentario.splice(index, 1);
    }
  }
}
