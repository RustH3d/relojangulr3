import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';;

@Component({
  selector: 'app-reloj-esfera',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './reloj-esfera.component.html',
  styleUrl: './reloj-esfera.component.css'
})
export class RelojEsferaComponent implements OnInit, OnDestroy{

  horas: number = 0;
  minutos: number = 0;
  segundos: number = 0;
  inputHoras: number = 0;
  inputMinutos: number = 0;
  inputSegundos: number = 0;
  private interval: any;

  constructor() {}

  ngOnInit(): void {
    this.iniciarReloj();
  }

  ngOnDestroy(): void {
    clearInterval(this.interval);
  }

  iniciarReloj() {
    clearInterval(this.interval);
    this.interval = setInterval(() => {
      const now = new Date();
      this.horas = now.getHours();
      this.minutos = now.getMinutes();
      this.segundos = now.getSeconds();
    }, 1000);
  }

  detenerReloj() {
    clearInterval(this.interval);
  }

  aplicarCambios() {
    // Asignamos los valores de los inputs al reloj y detenemos la actualización automática
    this.horas = this.inputHoras;
    this.minutos = this.inputMinutos;
    this.segundos = this.inputSegundos;
    this.detenerReloj();
    this.iniciarRelojManual();
  }

  iniciarRelojManual() {
    clearInterval(this.interval);
    this.interval = setInterval(() => {
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
    }, 1000);
  }
}