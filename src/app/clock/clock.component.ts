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
export class ClockComponent implements OnInit {
  currentView: string = 'digital'; // 'digital', 'analog', 'colorChanging'
  currentTime: string = '';
  hourRotation: string = 'rotate(0deg)';
  minuteRotation: string = 'rotate(0deg)';
  secondRotation: string = 'rotate(0deg)';
  backgroundColor: string = ''; // Color de fondo
  originalBackgroundColor: string = '#FFFFFF'; // Color de fondo original (normal)
  usingCustomTime: boolean = false; // Variable para controlar si se está usando una hora personalizada
  customStartTime: Date | null = null; // Almacena la hora personalizada o null
  timeOffset: number = 0; // Diferencia en milisegundos de la hora personalizada

  inputHours: number = 0;   // Hora personalizada
  inputMinutes: number = 0;  // Minutos personalizados
  inputSeconds: number = 0;  // Segundos personalizados

  ngOnInit() {
    this.updateTime();
    setInterval(() => {
      this.updateTime();
    }, 1000);
  }

  toggleClockView() {
    // Cambiar la vista del reloj
    if (this.currentView === 'digital') {
      this.currentView = 'analog';
    } else if (this.currentView === 'analog') {
      this.currentView = 'colorChanging';
    } else {
      this.currentView = 'digital';
    }

    // Resetear el color de fondo a la normalidad si no es el reloj cambiante
    if (this.currentView !== 'colorChanging') {
      this.backgroundColor = this.originalBackgroundColor; // Restablece el color de fondo
    }
  }

  setCustomTime() {
    const now = new Date();
    this.customStartTime = new Date(); // Guarda la hora actual como el tiempo de inicio
    this.customStartTime.setHours(this.inputHours, this.inputMinutes, this.inputSeconds);
    
    this.timeOffset = this.customStartTime.getTime() - now.getTime(); // Calcula la diferencia

    this.usingCustomTime = true; // Establece que se está usando la hora personalizada
    this.updateTime(); // Actualiza la hora para mostrar la personalizada

    if (this.currentView === 'colorChanging') {
      this.updateBackgroundColor(this.customStartTime.getHours());
    }
  }

  private updateTime() {
    const now = new Date();
    let displayTime: Date;

    if (this.usingCustomTime && this.customStartTime) {
      displayTime = new Date(now.getTime() + this.timeOffset); // Aplica el offset a la hora actual
    } else {
      displayTime = now;
    }

    this.currentTime = displayTime.toLocaleTimeString();
    this.updateClockHands(displayTime);

    if (this.currentView === 'colorChanging') {
      this.updateBackgroundColor(displayTime.getHours());
    }
  }

  private updateClockHands(date: Date) {
    const seconds = date.getSeconds();
    const minutes = date.getMinutes();
    const hours = date.getHours();

    this.secondRotation = `rotate(${seconds * 6}deg)`;
    this.minuteRotation = `rotate(${minutes * 6 + seconds / 10}deg)`;
    this.hourRotation = `rotate(${hours * 30 + minutes / 2}deg)`;
  }

  private updateBackgroundColor(hours: number) {
    if (hours >= 6 && hours < 12) {
      this.backgroundColor = '#FFEB3B'; // Amarillo (Mañana)
    } else if (hours >= 12 && hours < 18) {
      this.backgroundColor = '#2196F3'; // Azul (Tarde)
    } else {
      this.backgroundColor = '#3F51B5'; // Azul Oscuro (Noche)
    }
  }
}