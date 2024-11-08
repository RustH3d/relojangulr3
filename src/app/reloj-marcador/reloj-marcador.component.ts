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
  private segundosContador: number = 0;

  public horas: number = 0;
  public minutos: number = 0;
  public horaSlider: number = 0;
  public minutosSlider: number = 0;
  private isManualUpdate: boolean = false;
  public cantidadDeGente: number = 0;
  public modoCelebracion: boolean = false;

  ngOnInit(): void {
    this.iniciarReloj();
    this.actualizarGente(); // Inicializa la cantidad de gente
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
        this.actualizarGente();
      } else {
        this.segundosContador++;
        if (this.segundosContador >= 60) {
          this.incrementarTiempo();
          this.segundosContador = 0;
        }
      }
    }, 1000);
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
      this.animarCelebracion(); // Animación al cambiar la hora
    }
    if (this.horas >= 24) {
      this.horas = 0;
    }
  }

  actualizarHoraMinutos(): void {
    this.horas = this.horaSlider;
    this.minutos = this.minutosSlider;
    this.isManualUpdate = true;
    this.segundosContador = 0;

    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
    this.iniciarReloj();
  }

  volverModoAutomatico(): void {
    this.isManualUpdate = false;
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
    this.iniciarReloj();
  }

  actualizarGente(): void {
    if (this.horas >= 6 && this.horas < 9) {
      this.cantidadDeGente = 20; // Temprano, poca gente
    } else if (this.horas >= 9 && this.horas < 15) {
      this.cantidadDeGente = 50; // Mañana/mediodía, más gente
    } else if (this.horas >= 15 && this.horas < 20) {
      this.cantidadDeGente = 100; // Tarde, lleno total
    } else {
      this.cantidadDeGente = 30; // Noche, menor cantidad
    }
  }

  animarCelebracion(): void {
    this.modoCelebracion = true;
    setTimeout(() => {
      this.modoCelebracion = false;
    }, 2000); // Duración de la animación
  }
}