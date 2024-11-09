import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-reloj-zen',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './reloj-zen.component.html',
  styleUrl: './reloj-zen.component.css'
})
export class RelojZenComponent implements OnInit{
  horas: number = 0;
  minutos: number = 0;
  segundos: number = 0;
  progresoHoras: number = 0;
  progresoMinutos: number = 0;
  progresoSegundos: number = 0;
  horaDigital: string = '';

  // Variables para los sliders, los valores iniciales serán los del sistema
  sliderHoras: number = 0;
  sliderMinutos: number = 0;
  sliderSegundos: number = 0;

  ngOnInit(): void {
    this.obtenerHoraActual(); // Obtener la hora actual al iniciar
    setInterval(() => {
      this.actualizarReloj(); // Actualizar el reloj cada segundo
    }, 1000);  // Intervalo de 1 segundo
  }

  // Método para obtener la hora actual del sistema
  obtenerHoraActual(): void {
    const ahora = new Date();
    this.horas = ahora.getHours();
    this.minutos = ahora.getMinutes();
    this.segundos = ahora.getSeconds();

    // Inicializar los valores de los sliders con la hora actual
    this.sliderHoras = this.horas;
    this.sliderMinutos = this.minutos;
    this.sliderSegundos = this.segundos;

    // Actualizar el reloj y la hora digital
    this.actualizarReloj();
  }

  // Método para actualizar el progreso de las barras
  actualizarReloj(): void {
    this.progresoHoras = (this.horas % 12) / 12 * 100;
    this.progresoMinutos = this.minutos / 60 * 100;
    this.progresoSegundos = this.segundos / 60 * 100;

    // Formato de 24 horas para el reloj digital
    this.horaDigital = this.formatTime(this.horas, this.minutos, this.segundos);

    // Incrementar los segundos
    this.segundos++;
    if (this.segundos >= 60) {
      this.segundos = 0;
      this.minutos++;
      if (this.minutos >= 60) {
        this.minutos = 0;
        this.horas++;
        if (this.horas >= 24) {
          this.horas = 0;
        }
      }
    }

    // No actualizamos los sliders cuando el reloj avanza
    // Los sliders reflejan solo la hora elegida por el usuario
  }

  // Método para cambiar la hora digital en formato HH:mm:ss
  formatTime(hours: number, minutes: number, seconds: number): string {
    const hourString = hours < 10 ? `0${hours}` : `${hours}`;
    const minuteString = minutes < 10 ? `0${minutes}` : `${minutes}`;
    const secondString = seconds < 10 ? `0${seconds}` : `${seconds}`;
    return `${hourString}:${minuteString}:${secondString}`;
  }

  // Método para aplicar los cambios de hora, minutos y segundos
  aplicarCambios(): void {
    this.horas = this.sliderHoras;
    this.minutos = this.sliderMinutos;
    this.segundos = this.sliderSegundos;
    this.actualizarReloj();  // Actualizar el reloj con los nuevos valores
  }
}
