import { NgModule, isDevMode } from '@angular/core';
import {
  BrowserModule,
  provideClientHydration,
} from '@angular/platform-browser';

import { provideHttpClient } from '@angular/common/http';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CardComponent } from './components/card/card.component';
import { BookMarkIconComponent } from './components/icons/book-mark-icon/book-mark-icon.component';
import { HomeIconComponent } from './components/icons/home-icon/home-icon.component';
import { MoviesIconComponent } from './components/icons/movies-icon/movies-icon.component';
import { TvIconComponent } from './components/icons/tv-icon/tv-icon.component';
import { NavComponent } from './components/nav/nav.component';
import { SmallCardComponent } from './components/small-card/small-card.component';
import { ToastComponent } from './components/toast/toast.component';
import { environment } from './enviroments/production.prod';
import { BookMarksPageComponent } from './page/book-marks-page/book-marks-page.component';
import { HomePageComponent } from './page/home-page/home-page.component';
import { LogInComponent } from './page/log-in/log-in.component';
import { MoviesPageComponent } from './page/movies-page/movies-page.component';
import { RegisterComponent } from './page/register/register.component';
import { TvSeriesPageComponent } from './page/tv-series-page/tv-series-page.component';
import { authReducer } from './store/auth/auth.reducers';
import { RecommendedMoviesEffect } from './store/recommended/recommended.effects';
import { recommendedReducer } from './store/recommended/recommended.reducers';
import { TrendingMoviesEffect } from './store/trending/treding.effects';
import { trendingReducer } from './store/trending/trending.reducers';
// import { AuthEffects } from "./store/auth/auth.effects";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { BookMarkEffects } from './store/book-marks/book-mark.effects';
import { bookMarksReducer } from './store/book-marks/book-mark.reducers';
import { TvSeriesEffect } from './store/tv-series/tv.effects';
import { tvSeriesReducer } from './store/tv-series/tv.reducers';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    HomePageComponent,
    CardComponent,
    SmallCardComponent,
    MoviesPageComponent,
    TvSeriesPageComponent,
    BookMarksPageComponent,
    HomeIconComponent,
    MoviesIconComponent,
    TvIconComponent,
    BookMarkIconComponent,
    LogInComponent,
    RegisterComponent,
    ToastComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,

    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    StoreModule.forRoot({
      trending: trendingReducer,
      recommended: recommendedReducer,
      bookMark: bookMarksReducer,
      series: tvSeriesReducer,
      auth: authReducer,
    }),
    EffectsModule.forRoot([
      TrendingMoviesEffect,
      RecommendedMoviesEffect,
      BookMarkEffects,
      TvSeriesEffect,
      // AuthEffects,
    ]),
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
      logOnly: !isDevMode(), // Restrict extension to log-only mode
      autoPause: true, // Pauses recording actions and state changes when the extension window is not open
      trace: false, //  If set to true, will include stack trace for every dispatched action, so you can see it in trace tab jumping directly to that part of code
      traceLimit: 75, // maximum stack trace frames to be stored (in case trace option was provided as true)
      connectInZone: true, // If set to true, the connection is established within the Angular zone
    }),
  ],
  providers: [provideClientHydration(), provideHttpClient()],
  bootstrap: [AppComponent],
})
export class AppModule {}
