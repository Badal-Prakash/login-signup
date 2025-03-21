import { Routes } from '@angular/router';
import { UserComponent } from './user/user.component';
import { RegisterationComponent } from './user/registeration/registeration.component';
import { LoginComponent } from './user/login/login.component';

export const routes: Routes = [
  {
    path: '',
    component: UserComponent,
    children: [
      { path: 'signup', component: RegisterationComponent },
      { path: 'login', component: LoginComponent },
    ],
  },
];
