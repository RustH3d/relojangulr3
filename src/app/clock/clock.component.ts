// src/app/clock/clock.component.ts
import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-clock',
  standalone: true,
  templateUrl: './clock.component.html',
  styleUrls: ['./clock.component.css'],
  imports: [CommonModule, FormsModule],
})

export class ClockComponent implements OnInit, OnDestroy {
  showDigital = true; // Controla si se muestra el reloj digital o analógico
  private intervalId: any; // Almacena el ID del intervalo
  private userTime!: Date; // Mantiene la hora modificada por el usuario
  private accumulatedSeconds: number = 0; // Variable para acumular los segundos

  // Variables para controlar los deslizadores
  hourInput: number = 0;
  minuteInput: number = 0;
  secondInput: number = 0;

  // Bandera para controlar si estamos en modo de edición
  isEditing = false;

  ngOnInit() {
    this.userTime = new Date(); // Inicializa la hora modificada por el usuario
    this.startAutoUpdate(); // Empieza a actualizar la hora cada segundo
  }

  ngOnDestroy() {
    clearInterval(this.intervalId); // Limpia el intervalo al destruir el componente
  }

  // Empieza a actualizar la hora cada segundo desde la hora del usuario
  startAutoUpdate() {
    this.intervalId = setInterval(() => {
      if (!this.isEditing) { // Si no estamos editando, avanza la hora
        this.userTime.setSeconds(this.userTime.getSeconds() + 1); // Incrementa el segundo
        this.accumulatedSeconds++; // Acumula los segundos para el movimiento fluido
      }
    }, 1000);
  }

  // Detiene la actualización automática de la hora
  stopAutoUpdate() {
    clearInterval(this.intervalId);
  }

  // Retorna la hora en formato digital
  get currentTime(): string {
    return this.userTime.toLocaleTimeString(); 
  }

  // Reloj analógico
  get hourRotation(): string {
    return `rotate(${this.userTime.getHours() * 30}deg)`; // Cada hora representa 30 grados
  }

  get minuteRotation(): string {
    return `rotate(${this.userTime.getMinutes() * 6}deg)`; // Cada minuto representa 6 grados
  }

  get secondRotation(): string {
    // La aguja de los segundos se mueve en función del acumulado de segundos
    return `rotate(${this.accumulatedSeconds * 6}deg)`; // Cada segundo representa 6 grados
  }

  // Alterna entre la vista digital y analógica
  toggleClockView() {
    this.showDigital = !this.showDigital;
  }

  // Muestra los controles deslizantes para cambiar la hora
  showTimeInputForm() {
    this.isEditing = true; // Activa el modo de edición
    this.stopAutoUpdate(); // Detiene la actualización automática

    // Establece los valores de los deslizadores con la hora actual
    this.hourInput = this.userTime.getHours();
    this.minuteInput = this.userTime.getMinutes();
    this.secondInput = this.userTime.getSeconds();
  }

  // Aplica la hora seleccionada por los deslizadores
  applyTime() {
    // Establecemos la hora del usuario sin sobrescribirla con la hora del sistema
    this.userTime.setHours(this.hourInput);
    this.userTime.setMinutes(this.minuteInput);
    this.userTime.setSeconds(this.secondInput);
    
    this.isEditing = false; // Desactiva el modo de edición
    this.startAutoUpdate(); // Reanuda la actualización automática

    // Reinicia los segundos acumulados para que la aguja de los segundos se mueva suavemente desde el nuevo punto
    this.accumulatedSeconds = this.secondInput;
  }

  // Detecta cuando el usuario está interactuando con el deslizador y detiene la actualización automática
  onSliderChange() {
    if (this.isEditing) {
      this.stopAutoUpdate(); // Detiene la actualización automática mientras se cambia la hora
    }
  }
}