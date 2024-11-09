import { Component } from '@angular/core';
import { AuthService } from '../../servicees/auth.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  standalone: true,
  imports: [FormsModule, CommonModule]
})
export class RegisterComponent {
  username: string = '';
  password: string = '';
  message: string = '';
  isError: boolean = false;

  constructor(private authService: AuthService, private router: Router) {}

  register() {
    // Verifica si el nombre de usuario o la contraseña solo contienen espacios
    if (this.username.trim() === '' || this.password.trim() === '') {
      this.message = 'El nombre de usuario y la contraseña no pueden contener solo espacios';
      this.isError = true;
      return;
    }

    this.authService.register(this.username, this.password).subscribe({
      next: (response: any) => {
        this.message = response?.message || 'Registro exitoso';
        this.isError = false;
        // Redirige o realiza otra acción después del registro exitoso
      },
      error: (error: any) => {
        console.error('Error al registrar:', error);
        this.message = error.error?.error || 'Error en el registro';
        this.isError = true;
      }
    });
  }

  // Método para redirigir al login
  goToLogin() {
    this.router.navigate(['/login']);
  }
}
