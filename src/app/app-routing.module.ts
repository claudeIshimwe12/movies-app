import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './page/home-page/home-page.component';
import { MoviesPageComponent } from './page/movies-page/movies-page.component';
import { TvSeriesPageComponent } from './page/tv-series-page/tv-series-page.component';
import { BookMarksPageComponent } from './page/book-marks-page/book-marks-page.component';
import { LogInComponent } from './page/log-in/log-in.component';
import { RegisterComponent } from './page/register/register.component';
import { authGuard } from './guards/auth.guard';
const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  { path: 'login', component: LogInComponent },
  { path: 'register', component: RegisterComponent },
  {
    path: 'home',
    canActivate: [authGuard],
    component: HomePageComponent,
  },
  {
    path: 'movies',
    canActivate: [authGuard],
    component: MoviesPageComponent,
  },
  {
    path: 'tv-series',
    canActivate: [authGuard],
    component: TvSeriesPageComponent,
  },
  {
    path: 'book-marks',
    canActivate: [authGuard],
    component: BookMarksPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
