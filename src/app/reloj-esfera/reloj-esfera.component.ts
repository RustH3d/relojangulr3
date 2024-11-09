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

  horas: number= 0;
  minutos: number = 0;
  segundos: number = 0;
  private interval: any;

  constructor() { }

  ngOnInit(): void {
    this.iniciarReloj();
  }

  ngOnDestroy(): void {
    clearInterval(this.interval);
  }

  iniciarReloj() {
    this.interval = setInterval(() => {
      const now = new Date();
      this.horas = now.getHours();
      this.minutos = now.getMinutes();
      this.segundos = now.getSeconds();
    }, 1000);
  }
}
