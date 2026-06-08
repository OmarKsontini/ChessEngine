import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('chess-ui');
 squares: any[] = [];

  constructor() {
    this.initBoard();
  }

  initBoard() {
    const backRow = ['R', 'N', 'B', 'Q', 'K', 'B', 'N', 'R'];





    for (let row = 0; row < 8; row++) {
      for (let col = 0; col < 8; col++) {
        let piece = null;

        if (row === 0) piece = 'b' + backRow[col];
        if (row === 1) piece = 'bP';
        if (row === 6) piece = 'wP';
        if (row === 7) piece = 'w' + backRow[col];

        this.squares.push({
          index: row * 8 + col,
          color: (row + col) % 2 === 0 ? 'light' : 'dark',
          piece
        });
      }

    }

    console.log(this.squares)
  }



}