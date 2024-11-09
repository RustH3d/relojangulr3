import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-reloj-flip',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './reloj-flip.component.html',
  styleUrl: './reloj-flip.component.css'
})
export class RelojFlipComponent {
  public horas: number = 0;
  public minutos: number = 0;
  public segundos: number = 0;
  private intervalId: any;
  public modoManual: boolean = false;
  private usandoHoraManual: boolean = false;

  ngOnInit(): void {
    this.iniciarReloj();
  }

  ngOnDestroy(): void {
    clearInterval(this.intervalId);
  }

  private iniciarReloj(): void {
    this.intervalId = setInterval(() => this.actualizarReloj(), 1000);
  }

  private actualizarReloj(): void {
    if (!this.usandoHoraManual) {
      const now = new Date();
      this.horas = now.getHours();
      this.minutos = now.getMinutes();
      this.segundos = now.getSeconds();
    } else {
      this.incrementarTiempo();
    }
  }

  

  

  
  /* public formatearNumero(num: number): string {
    return num < 10 ? `0${num}` : `${num}`;
  } */


  public onSliderChange(): void {
    clearInterval(this.intervalId);
    this.modoManual = true; // Activa el modo manual
  }

  public guardarCambios(): void {
    this.usandoHoraManual = true;
    clearInterval(this.intervalId);
    this.iniciarReloj();
  }

  private incrementarTiempo(): void {
    this.segundos++;
    if (this.segundos >= 60) {
      this.segundos = 0;
      this.minutos++;
    }
    if (this.minutos >= 60) {
      this.minutos = 0;
      this.horas++;
    }
    if (this.horas >= 24) {
      this.horas = 0;
    }
  }


  public colorGota: string = '#00aaff';

onMouseEnter(): void {
  this.colorGota = '#ffcc00'; // Cambia el color al pasar el mouse
  this.mostrarOndas = true;
  setTimeout(() => this.mostrarOndas = false, 500); // Desactiva la onda después de 500ms
}

onMouseLeave(): void {
  this.colorGota = '#00aaff'; // Vuelve al color original
}

public mostrarOndas: boolean = false;


  
}