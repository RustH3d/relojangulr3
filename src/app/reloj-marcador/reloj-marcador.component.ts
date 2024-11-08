import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-reloj-marcador',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './reloj-marcador.component.html',
  styleUrl: './reloj-marcador.component.css'
})
export class RelojMarcadorComponent implements OnInit, OnDestroy {
  private intervalId: any;
  
  public horas: number = 0;
  public minutos: number = 0;
  
  ngOnInit(): void {
    this.iniciarReloj();
  }

  ngOnDestroy(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  // Actualiza la hora y los minutos
  iniciarReloj(): void {
    this.intervalId = setInterval(() => {
      const fecha = new Date();
      this.horas = fecha.getHours();
      this.minutos = fecha.getMinutes();
    }, 1000); // Actualiza cada segundo
  }

  // Formatea las horas con 2 dígitos
  get horasFormateadas(): string {
    return this.horas < 10 ? `0${this.horas}` : `${this.horas}`;
  }

  // Formatea los minutos con 2 dígitos
  get minutosFormateados(): string {
    return this.minutos < 10 ? `0${this.minutos}` : `${this.minutos}`;
  }
}