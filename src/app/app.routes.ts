import { Routes } from '@angular/router';
import { HomeComponent } from './features/home/home.component';
import { MantenimientosComponent } from './features/mantenimientos/mantenimientos.component';
import { LoginComponent } from './features/login/login.component';

import { CameraComponent } from './features/camera/camera.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'mantenimientos', component: MantenimientosComponent },
  { path: 'login', component: LoginComponent },
  { path: 'camera', component: CameraComponent },
  { path: '**', redirectTo: '' }
];

