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

  ngOnInit(): void {
    setInterval(() => {
      const currentTime = new Date();
      this.horas = currentTime.getHours();
      this.minutos = currentTime.getMinutes();
      this.segundos = currentTime.getSeconds();
      
      this.progresoHoras = (this.horas % 12) / 12 * 100; // De 0 a 100%
      this.progresoMinutos = this.minutos / 60 * 100;  // De 0 a 100%
      this.progresoSegundos = this.segundos / 60 * 100;  // De 0 a 100%
    }, 1000);  // Actualizar cada segundo
  }
}
