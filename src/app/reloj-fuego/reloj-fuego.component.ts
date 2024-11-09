import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-reloj-fuego',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './reloj-fuego.component.html',
  styleUrl: './reloj-fuego.component.css'
})
export class RelojFuegoComponent implements OnInit{
  tamanoFogata: number = 100; // Tamaño inicial de la fogata
  hora: number = new Date().getHours();  // Hora actual
  minutos: number = new Date().getMinutes();  // Minutos actuales

  llamas: number[] = [1, 2, 3, 4];  // Número de llamas

  ngOnInit(): void {
    this.actualizarTamanoFogata();
  }

  // Método para actualizar el tamaño de la fogata según la hora
  actualizarTamanoFogata() {
    // Condición para cambiar el tamaño de la fogata dependiendo de si es de día o de noche
    if (this.hora >= 18 || this.hora < 6) {
      // Noche: la fogata más grande
      this.tamanoFogata = 200 + (Math.random() * 50);  // Tamaño entre 200px y 250px
    } else {
      // Día: la fogata más pequeña
      this.tamanoFogata = 50 + (Math.random() * 50);   // Tamaño entre 50px y 100px
    }
  }

  // Método para cambiar la hora manualmente y actualizar el tamaño de la fogata
  cambiarHora() {
    this.actualizarTamanoFogata();
  }

  calcularPosicionLlama() {
    // Llama más a la izquierda cuando la fogata es más pequeña
    return (this.tamanoFogata < 100) ? 10 : 100; // Si la fogata es pequeña, la llama está muy a la izquierda
  }
}
