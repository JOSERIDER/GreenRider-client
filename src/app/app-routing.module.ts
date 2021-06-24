import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { DashboardComponent } from "./pages/dashboard/dashboard.component";
import { RouteComponent } from "./components/route/route.component";
import { RoutesComponent } from "./pages/routes/routes.component";
import { SearchComponent } from "./pages/search/search.component";
import { CreateActivityComponent } from "./pages/create-activity/create-activity.component";
import { AuthGuard } from "./guards/auth.guard";
import { RegisterComponent } from "./pages/register/register.component";

const routes: Routes = [
  { path: "dashboard", component: DashboardComponent },
  { path: "routes", component: RoutesComponent },
  { path: "route/:id", component: RouteComponent },

  { path: 'register', component: RegisterComponent },
  { path: "search/:word", component: SearchComponent },
  {
    path: "create",
    component: CreateActivityComponent,
    canActivate: [AuthGuard],
  },
  { path: "**", pathMatch: "full", redirectTo: "dashboard" },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
