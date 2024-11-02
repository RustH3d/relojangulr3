// src/app/login/login.component.ts
import { Component } from '@angular/core';
import { AuthService } from '../../servicees/auth.service';
import { Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true, // Declaración de componente independiente
  imports: [HttpClientModule, FormsModule, CommonModule], // Importación de los módulos necesarios
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username = '';
  password = '';

  constructor(private authService: AuthService, private router: Router) {}

  login() {
    this.authService.login(this.username, this.password).subscribe(
      (response) => {
        localStorage.setItem('token', response.token);
        this.router.navigate(['/dashboard']);
      },
      (error) => {
        alert('Credenciales incorrectas');
      }
    );
  }

  navigateToRegister() {
    this.router.navigate(['/register']); // Navega a la página de registro
  }
}
