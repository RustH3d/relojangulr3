import { Component } from '@angular/core';
import { FormsModule

 } from '@angular/forms';
 import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-reloj-led',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './reloj-led.component.html',
  styleUrl: './reloj-led.component.css'
})
export class RelojLedComponent {

  public hora: number = 0;
  public minutos: number = 0;
  public segundos: number = 0;
  public colorFondo: string = '#87CEEB'; // Color de fondo azul claro (cielo)

  constructor() {}

  ngOnInit(): void {
    this.actualizarHora();
    setInterval(() => {
      this.actualizarHora();
    }, 1000); // Actualiza cada segundo
  }

  actualizarHora(): void {
    const fecha = new Date();
    this.hora = fecha.getHours();
    this.minutos = fecha.getMinutes();
    this.segundos = fecha.getSeconds();

    // Cambiar el color de fondo según la hora
    if (this.hora >= 6 && this.hora < 12) {
      this.colorFondo = '#87CEEB'; // Cielo azul claro (mañana)
    } else if (this.hora >= 12 && this.hora < 18) {
      this.colorFondo = '#FFCC00'; // Cielo dorado (tarde)
    } else if (this.hora >= 18 && this.hora < 21) {
      this.colorFondo = '#FF4500'; // Atardecer (naranja)
    } else {
      this.colorFondo = '#2F4F4F'; // Noche (oscuro)
    }
  }

  get horaFormateada(): string {
    return `${this.hora < 10 ? '0' + this.hora : this.hora}:${this.minutos < 10 ? '0' + this.minutos : this.minutos}:${this.segundos < 10 ? '0' + this.segundos : this.segundos}`;
  }

}
