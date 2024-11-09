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
  hora: string = '';
  solPosition: string = '';

  ngOnInit() {
    setInterval(() => {
      const currentTime = new Date();
      this.hora = currentTime.toLocaleTimeString();

      // Ajustar la posición del sol (basado en la hora)
      const angle = (currentTime.getHours() + currentTime.getMinutes() / 60) * 15; // 360/24
      this.solPosition = `rotate(${angle}deg)`; // Mover la "sombra"
    }, 1000);
  }
}
