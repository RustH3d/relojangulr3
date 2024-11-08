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
  
}
