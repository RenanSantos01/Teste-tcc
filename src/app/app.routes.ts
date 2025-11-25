import { Routes } from '@angular/router';

import { HomeComponent } from './pages/home/home.component';
import { EmitirComponent } from './pages/emitir/emitir.component';
import { VerificarComponent } from './pages/verificar/verificar.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'emitir', component: EmitirComponent },
  { path: 'validar', component: VerificarComponent }
];
