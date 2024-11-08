import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-reloj-marcador',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './reloj-marcador.component.html',
  styleUrls: ['./reloj-marcador.component.css']
})
export class RelojMarcadorComponent implements OnInit, OnDestroy {
  private intervalId: any;
  private segundosContador: number = 0; // Contador de segundos para modo manual

  public horas: number = 0;
  public minutos: number = 0;
  public horaSlider: number = 0;
  public minutosSlider: number = 0;
  private isManualUpdate: boolean = false;

  ngOnInit(): void {
    this.iniciarReloj();
  }

  ngOnDestroy(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  iniciarReloj(): void {
    this.intervalId = setInterval(() => {
      if (!this.isManualUpdate) {
        const fecha = new Date();
        this.horas = fecha.getHours();
        this.minutos = fecha.getMinutes();
      } else {
        this.segundosContador++;
        if (this.segundosContador >= 60) {
          this.incrementarTiempo();
          this.segundosContador = 0; // Reinicia el contador de segundos
        }
      }
    }, 1000); // Se ejecuta cada segundo para actualizar la vista
  }

  get horasFormateadas(): string {
    return this.horas < 10 ? `0${this.horas}` : `${this.horas}`;
  }
  
  get minutosFormateados(): string {
    return this.minutos < 10 ? `0${this.minutos}` : `${this.minutos}`;
  }

  incrementarTiempo(): void {
    this.minutos++;
    if (this.minutos >= 60) {
      this.minutos = 0;
      this.horas++;
    }
    if (this.horas >= 24) {
      this.horas = 0;
    }
  }

  actualizarHoraMinutos(): void {
    this.horas = this.horaSlider;
    this.minutos = this.minutosSlider;
    this.isManualUpdate = true; // Activa el modo manual

    this.segundosContador = 0; // Resetea el contador de segundos

    // Reinicia el intervalo para que refleje el cambio y continúe en modo manual
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
    this.iniciarReloj();
  }

  volverModoAutomatico(): void {
    this.isManualUpdate = false; // Regresa al modo automático

    // Reinicia el intervalo para seguir la hora del sistema
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
    this.iniciarReloj();
  
 /*  restablecerHora(): void {
    this.isManualUpdate = false; // Permite la actualización automática
  } */
}}
