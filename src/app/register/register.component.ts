import { Component } from '@angular/core';
import { AuthService } from '../../servicees/auth.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css'],
    standalone: true, // Asegúrate de que esté definido como standalone si es necesario
    imports: [FormsModule, CommonModule] // Aquí importas FormsModule
})
export class RegisterComponent {
    username: string = '';
    password: string = '';
    message: string = '';
    isError: boolean = false;

    constructor(private authService: AuthService) {}

    register() {
        this.authService.register(this.username, this.password).subscribe({
            next: (response) => {
                this.message = 'Registro exitoso';
                this.isError = false;
            },
            error: (error) => {
                console.error('Error al registrar:', error);
                this.message = 'Error en el registro';
                this.isError = true;
            }
        });
    }
}

