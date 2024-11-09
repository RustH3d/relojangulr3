import { CommonModule } from '@angular/common';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-reloj-estrellas',
  standalone: true,
  imports: [ CommonModule, FormsModule],
  templateUrl: './reloj-estrellas.component.html',
  styleUrl: './reloj-estrellas.component.css'
})
export class RelojEstrellasComponent implements OnInit{
  horas: number = new Date().getHours();  // Inicializa con la hora actual
  minutos: number = new Date().getMinutes();  // Inicializa con el minuto actual
  segundos: number = new Date().getSeconds();  // Inicializa con el segundo actual
  private interval: any;

  // Declaración de las propiedades que contienen las estrellas
  estrellasHoras: Array<any> = [];
  estrellasMinutos: Array<any> = [];
  estrellasSegundos: Array<any> = [];

  constructor() {}

  ngOnInit(): void {
    this.iniciarReloj();
    this.generarEstrellas();
  }

  ngOnDestroy(): void {
    clearInterval(this.interval);
  }

  iniciarReloj() {
    this.interval = setInterval(() => {
      const now = new Date();
      this.horas = now.getHours() % 12;  // Para mostrar horas de 12 horas
      this.minutos = now.getMinutes();
      this.segundos = now.getSeconds();

      // Actualizar las posiciones de las constelaciones
      document.querySelector('.horas')?.setAttribute('style', `transform: rotate(${this.horas * 30}deg);`);
      document.querySelector('.minutos')?.setAttribute('style', `transform: rotate(${this.minutos * 6}deg);`);
      document.querySelector('.segundos')?.setAttribute('style', `transform: rotate(${this.segundos * 6}deg);`);
    }, 1000);  // El reloj se actualiza cada segundo
  }

  guardarCambios() {
    console.log(`Hora actualizada a: ${this.horas}:${this.minutos}:${this.segundos}`);
   
  }

  generarEstrellas() {
    // Inicializamos las estrellas con el número adecuado
    this.estrellasHoras = Array(12).fill(null);  // Generar 12 estrellas para las horas
    this.estrellasMinutos = Array(60).fill(null);  // Generar 60 estrellas para los minutos
    this.estrellasSegundos = Array(60).fill(null);  // Generar 60 estrellas para los segundos
  }
}
