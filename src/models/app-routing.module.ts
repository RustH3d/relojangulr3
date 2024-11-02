// src/app/app-routing.module.ts
import { provideRouter, RouterModule } from '@angular/router';
import { LoginComponent } from '../app/login/login.component';
import { RegisterComponent } from '../app/register/register.component';
import { Route } from '@angular/router';
import { NgModule } from '@angular/core'

const routes: Route[] = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
];

NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export const AppRoutingModule = [provideRouter(routes)];

