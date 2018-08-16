import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AngularFireModule} from 'angularfire2';
import {AngularFirestoreModule} from 'angularfire2/firestore';
import {AngularFireStorageModule} from 'angularfire2/storage';
import {AngularFireAuthModule} from 'angularfire2/auth';
import {AppComponent} from './app.component';
import {environment} from '../environments/environment';
import {MainNavComponent} from './main-nav/main-nav.component';
import {LayoutModule} from '@angular/cdk/layout';
import {
  MatToolbarModule, MatButtonModule, MatSidenavModule, MatIconModule, MatListModule, MatFormFieldModule, MatSelectModule,
  MatInputModule, MatCardModule
} from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {LogEatingComponent} from './log-eating/log-eating.component';
import {RouterModule} from '@angular/router';
import {SignInComponent} from './sign-in/sign-in.component';
import {SignUpComponent} from './sign-up/sign-up.component';
import { ProfileComponent } from './profile/profile.component';
import { FoodComponent } from './food/food.component';
import { EatingHistoryComponent } from './eating-history/eating-history.component';
import { EatingDayComponent } from './eating-day/eating-day.component';
import { FitProgressComponent } from './fit-progress/fit-progress.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

const appRoutes = [
  {path: '', component: LogEatingComponent},
  {path: 'log-eating', component: LogEatingComponent},
  {path: 'food', component: FoodComponent},
  {path: 'eating-day', component: EatingDayComponent},
  {path: 'eating-history', component: EatingHistoryComponent},
  {path: 'profile', component: ProfileComponent},
  {path: 'fit-progress', component: FitProgressComponent},
  {path: 'sign-in', component: SignInComponent},
  {path: 'sign-up', component: SignUpComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    MainNavComponent,
    LogEatingComponent,
    SignInComponent,
    SignUpComponent,
    ProfileComponent,
    FoodComponent,
    EatingHistoryComponent,
    EatingDayComponent,
    FitProgressComponent
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireStorageModule,
    AngularFireAuthModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    BrowserAnimationsModule,
    MatCardModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
