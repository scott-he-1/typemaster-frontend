import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PlayComponent } from './play/play.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HighScoresComponent } from './high-scores/high-scores.component';
import { UserGuard } from './user.guard';

const routes: Routes = [
  { path: '', component: PlayComponent },
  { path: 'play', component: PlayComponent, canActivate: [UserGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'highscores', component: HighScoresComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
