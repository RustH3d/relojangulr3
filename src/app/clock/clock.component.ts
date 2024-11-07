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
  showDigital = false;
  showAnalog = false;
  showBinary = false;
  showCustom = false;
  private intervalId: any;
  userTime: Date = new Date();
  isEditing = false;

  // Variables para los sliders
  hourInput: number = this.userTime.getHours();
  minuteInput: number = this.userTime.getMinutes();
  secondInput: number = this.userTime.getSeconds();

  ngOnInit() {
    this.startAutoUpdate();
  }

  ngOnDestroy() {
    clearInterval(this.intervalId);
  }

  startAutoUpdate() {
    this.intervalId = setInterval(() => {
      if (!this.isEditing) {
        this.userTime.setSeconds(this.userTime.getSeconds() + 1);
      }
    }, 1000);
  }

  stopAutoUpdate() {
    clearInterval(this.intervalId);
  }

  toggleClockView(type: string) {
    this.showDigital = type === 'digital';
    this.showAnalog = type === 'analog';
    this.showBinary = type === 'binary';
    this.showCustom = type === 'custom';
  }

  enableEditing() {
    this.isEditing = true;
    this.stopAutoUpdate();  // Detener la actualización automática cuando estamos editando
  }

  applyTimeChanges() {
    this.userTime.setHours(this.hourInput);
    this.userTime.setMinutes(this.minuteInput);
    this.userTime.setSeconds(this.secondInput);
    this.isEditing = false;
    this.startAutoUpdate(); // Reinicia la actualización automática
  }

  // Métodos para obtener las rotaciones y binarios
  get currentTime(): string {
    return this.userTime.toLocaleTimeString();
  }

  get hourRotation(): string {
    return `rotate(${this.userTime.getHours() * 30}deg)`;
  }

  get minuteRotation(): string {
    return `rotate(${this.userTime.getMinutes() * 6}deg)`;
  }

  get secondRotation(): string {
    return `rotate(${this.userTime.getSeconds() * 6}deg)`;
  }

  toBinaryArray(value: number, bits: number): number[] {
    return value.toString(2).padStart(bits, '0').split('').map(Number);
  }

  get hoursBinary(): number[][] {
    const hours = this.userTime.getHours();
    return [this.toBinaryArray(Math.floor(hours / 10), 2), this.toBinaryArray(hours % 10, 4)];
  }

  get minutesBinary(): number[][] {
    const minutes = this.userTime.getMinutes();
    return [this.toBinaryArray(Math.floor(minutes / 10), 3), this.toBinaryArray(minutes % 10, 4)];
  }

  get secondsBinary(): number[][] {
    const seconds = this.userTime.getSeconds();
    return [this.toBinaryArray(Math.floor(seconds / 10), 3), this.toBinaryArray(seconds % 10, 4)];
  }

  // Funciones para manejar el fondo y los íconos del reloj personalizado
  get customClockBackground(): string {
    const hour = this.userTime.getHours();
    if (hour >= 6 && hour < 18) {
      return 'linear-gradient(to right, #FF7E5F, #FEB47B)'; // Colores cálidos (mañana/día)
    } else {
      return 'linear-gradient(to right, #2C3E50, #34495E)'; // Colores fríos (noche)
    }
  }

  get sunOrMoonIcon(): string {
    const hour = this.userTime.getHours();
    return hour >= 6 && hour < 18 ? '☀️' : '🌙'; // Sol durante el día, luna durante la noche
  }
}