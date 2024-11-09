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

  // Variables para los sliders
  horasSlider: number = this.horas; 
  minutosSlider: number = this.minutos;
  segundosSlider: number = this.segundos;

  private interval: any;

  // Variable para controlar la actualización del reloj
  horaPersonalizada: boolean = false;  // Esto indica si la hora está personalizada por el usuario

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
      if (!this.horaPersonalizada) {
        // Si la hora no ha sido personalizada, obtenemos la hora del sistema
        const now = new Date();
        this.horas = now.getHours() % 12;  // Para mostrar horas de 12 horas
        this.minutos = now.getMinutes();
        this.segundos = now.getSeconds();
      } else {
        // Si la hora ha sido personalizada, avanzamos los segundos, minutos y horas
        this.segundos++;
        if (this.segundos === 60) {
          this.segundos = 0;
          this.minutos++;
        }
        if (this.minutos === 60) {
          this.minutos = 0;
          this.horas++;
        }
        if (this.horas === 12) {  // Limitar a 12 horas
          this.horas = 0;
        }
      }

      // Actualizamos las posiciones de las constelaciones
      document.querySelector('.horas')?.setAttribute('style', `transform: rotate(${this.horas * 30}deg);`);
      document.querySelector('.minutos')?.setAttribute('style', `transform: rotate(${this.minutos * 6}deg);`);
      document.querySelector('.segundos')?.setAttribute('style', `transform: rotate(${this.segundos * 6}deg);`);

    }, 1000);  // El reloj se actualiza cada segundo
  }

  // Método para guardar los cambios realizados en los sliders
  guardarCambios() {
    // Actualiza las variables del reloj con los valores de los sliders
    this.horas = this.horasSlider;
    this.minutos = this.minutosSlider;
    this.segundos = this.segundosSlider;

    // Marca que la hora ha sido personalizada
    this.horaPersonalizada = true;

    // Mostrar los cambios en consola
    console.log(`Hora actualizada a: ${this.horas}:${this.minutos}:${this.segundos}`);
    
    // Aquí puedes añadir lógica adicional, como guardar estos valores en un servidor o localmente
  }

  generarEstrellas() {
    // Inicializamos las estrellas con el número adecuado
    this.estrellasHoras = Array(12).fill(null);  // Generar 12 estrellas para las horas
    this.estrellasMinutos = Array(60).fill(null);  // Generar 60 estrellas para los minutos
    this.estrellasSegundos = Array(60).fill(null);  // Generar 60 estrellas para los segundos
  }
}
