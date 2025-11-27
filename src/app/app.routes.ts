import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { EmitirComponent } from './pages/emitir/emitir.component';
import { VerificarComponent } from './pages/verificar/verificar.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
//import { AuthGuard } from './guards/auth.guard';

export const routes: Routes = [
 
  { path: '', component: HomeComponent },

  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },

  { path: 'emitir', component: EmitirComponent },
  { path: 'validar', component: VerificarComponent },
];
