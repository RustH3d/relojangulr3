// src/app/clock/clock.component.ts
import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-clock',
  standalone: true,
  templateUrl: './clock.component.html',
  styleUrls: ['./clock.component.css'],
  imports: [CommonModule],
})
export class ClockComponent implements OnInit, OnDestroy {
  showDigital = true; // Controla si se muestra el reloj digital o analógico
  private intervalId: any; // Almacena el ID del intervalo
  private time!: string; // Usamos el operador ! para indicar que se inicializará más adelante

  ngOnInit() {
    this.time = this.getCurrentTime(); // Inicializa el tiempo
    this.intervalId = setInterval(() => {
      this.time = this.getCurrentTime(); // Actualiza la hora
    }, 1000);
  }

  ngOnDestroy() {
    clearInterval(this.intervalId); // Limpia el intervalo al destruir el componente
  }

  get currentTime(): string {
    return this.time; // Retorna la variable privada
  }

  private getCurrentTime(): string {
    const now = new Date();
    return now.toLocaleTimeString(); // Formato de hora
  }

  get hourRotation(): string {
    const now = new Date();
    return `rotate(${now.getHours() * 30}deg)`; // Cada hora representa 30 grados
  }

  get minuteRotation(): string {
    const now = new Date();
    return `rotate(${now.getMinutes() * 6}deg)`; // Cada minuto representa 6 grados
  }

  get secondRotation(): string {
    const now = new Date();
    return `rotate(${now.getSeconds() * 6}deg)`; // Cada segundo representa 6 grados
  }

  toggleClockView() {
    this.showDigital = !this.showDigital; // Alterna entre las vistas
  }
}
