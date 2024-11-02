// src/app/app.routes.ts
import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
//import { RelojComponent } from './reloj/reloj.component';
 
export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' }, // Redirige a login al cargar la aplicación
  { path: 'login', component: LoginComponent }, // Ruta para el componente de inicio de sesión
   { path: 'register', component: RegisterComponent }, // Ruta para el componente de registro
 // { path: 'reloj', component: RelojComponent }, // Ruta para el componente del reloj 
  { path: '**', redirectTo: '/login' } // Redirige a login si la ruta no es válida
];

