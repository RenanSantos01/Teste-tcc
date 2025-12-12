import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { EmitirComponent } from './pages/emitir/emitir.component';
import { VerificarComponent } from './pages/verificar/verificar.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { SobreComponent } from './pages/sobre/sobre.component';
import { AuthGuard } from './guards/auth.guard';
import { GuestGuard } from './guards/guest.guard';

export const routes: Routes = [

  
  { path: 'sobre', component: SobreComponent },

  
  { path: '', component: HomeComponent, canActivate: [AuthGuard] },

  
  { path: 'login', component: LoginComponent, canActivate: [GuestGuard] },
  { path: 'register', component: RegisterComponent, canActivate: [GuestGuard] },

  
  { path: 'emitir', component: EmitirComponent, canActivate: [AuthGuard] },
  { path: 'validar', component: VerificarComponent, canActivate: [AuthGuard] },

  
  { path: '**', redirectTo: '' }

];
