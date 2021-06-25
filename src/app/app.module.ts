import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { AppRoutingModule } from './app-routing.module';
import { FooterComponent } from './components/footer/footer.component';
import { SearchComponent } from './pages/search/search.component';
import { RouteCardComponent } from './components/route-card/route-card.component';
import { RoutesComponent } from './pages/routes/routes.component';
import { RouteComponent } from './components/route/route.component';
import { CreateActivityComponent } from './pages/create-activity/create-activity.component';
import { RegisterComponent } from './pages/register/register.component';
import { HttpClientModule } from '@angular/common/http';
import { RouteService } from './services/route.service';
import { HttpClientService } from './services/http-client.service';
import { CommentCreatorComponent } from './components/route/comment-creator/comment-creator.component';
import { CommentListComponent } from './components/route/comment-list/comment-list.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    DashboardComponent,
    FooterComponent,
    SearchComponent,
    RouteCardComponent,
    RoutesComponent,
    RouteComponent,
    CreateActivityComponent,
    RegisterComponent,
    CommentCreatorComponent,
    CommentListComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
  ],
  providers: [
    HttpClientService,
    RouteService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
}
