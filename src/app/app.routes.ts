import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { EmitirComponent } from './pages/emitir/emitir.component';
import { VerificarComponent } from './pages/verificar/verificar.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { AuthGuard } from './guards/auth.guard';
import { GuestGuard } from './guards/guest.guard';

export const routes: Routes = [
  // Home protegido — só acessível quando logado
  { path: '', component: HomeComponent, canActivate: [AuthGuard] },

  // Login / Cadastro bloqueados para quem já está logado
  { path: 'login', component: LoginComponent, canActivate: [GuestGuard] },
  { path: 'register', component: RegisterComponent, canActivate: [GuestGuard] },

  // Páginas internas protegidas
  { path: 'emitir', component: EmitirComponent, canActivate: [AuthGuard] },
  { path: 'validar', component: VerificarComponent, canActivate: [AuthGuard] },

  // fallback
  { path: '**', redirectTo: '' }
];
