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
  public horas: string = '00';
  public minutos: string = '00';
  public segundos: string = '00';

  ngOnInit(): void {
    this.actualizarReloj();
    setInterval(() => this.actualizarReloj(), 1000);
  }

  private actualizarReloj(): void {
    const now = new Date();
    this.horas = this.formatearNumero(now.getHours());
    this.minutos = this.formatearNumero(now.getMinutes());
    this.segundos = this.formatearNumero(now.getSeconds());
  }

  private formatearNumero(num: number): string {
    return num < 10 ? `0${num}` : `${num}`;
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
