// src/app/clock/clock.component.ts
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-clock',
  templateUrl: './clock.component.html',
  styleUrls: ['./clock.component.css']
})
export class ClockComponent implements OnInit {
  currentTime: string = '';

  ngOnInit() {
    this.updateTime();
    setInterval(() => this.updateTime(), 1000); // Actualiza la hora cada segundo
  }

  updateTime() {
    const now = new Date();
    this.currentTime = now.toLocaleTimeString(); // Formato de hora local
  }
}
