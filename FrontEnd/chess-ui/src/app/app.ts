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
  ok = 0 ;
  oldSquare : any ;
  whiteOrBlack=0;

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
          first_move: 0,
          rowI : row+1 ,
          colI : col+1 ,
          color: (row + col) % 2 === 0 ? 'light' : 'dark',
          piece
        });
      }

    }

  }
  move(square : any){
    if (this.ok === 0){
      this.oldSquare = square ;
      console.log(this.oldSquare)
      square.color="highlight";
      this.ok = 1;
      console.log(this.oldSquare)
      

    }
    else {
      console.log("old square: ") ;
      console.log(this.oldSquare)
      this.squares[square.index].piece = this.oldSquare.piece 
      this.squares[this.oldSquare.index].piece = null 
      this.squares[this.oldSquare.index].color = this.oldSquare.color

      this.ok=0;
    }

  }


selectedSquare: any = null;

onSquareClick(square: any) {
  // first click - select a white piece
  if (!this.selectedSquare) {
    if (square.piece && square.piece[0] === 'w') {
      this.selectedSquare = square;
      square.color = 'highlight';
    }
  } 
  // second click - move
  else {
    // restore old color
    this.squares[this.selectedSquare.index].color = 
      (Math.floor(this.selectedSquare.index / 8) + this.selectedSquare.index % 8) % 2 === 0 ? 'light' : 'dark';
    
    // move piece
    this.squares[square.index].piece = this.selectedSquare.piece;
    this.squares[this.selectedSquare.index].piece = null;
    
    this.selectedSquare = null;
  }
}



}