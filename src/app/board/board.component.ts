import { Component, OnInit } from '@angular/core';
import { MoveLog, LoggerService } from '../shared/logger.service';
import { ModalService } from '../shared/modal.service';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {
  squares: any[];
  isBotNext: boolean;
  winner: string;
  showedOnce: boolean;
  player: string;
  logs: MoveLog[];
  isGameFinished: boolean;

  constructor(
    private loggerService: LoggerService,
    private modalService: ModalService
  ) {}

  newGame() {
    this.squares = Array(9).fill(null);
    this.isBotNext = false;
    this.winner = null;
    this.showedOnce = false;
    this.player = 'You';
    this.logs = [];
    this.loggerService.resetLogs();
    this.isGameFinished = false;
  }

  currentPlayer() {
    return this.isBotNext ? 'O' : 'X';
  }

  makeMove(idx: number) {
    if (!this.squares[idx]) {
      this.squares.splice(idx, 1, this.currentPlayer());
      this.isBotNext = !this.isBotNext;
      this.player = this.isBotNext ? 'You' : 'Bot';

      this.loggerService.saveCurrentMove({
        player: this.player,
        row: idx,
        place: idx,
        time: new Date()
      });
    }

    this.winner = this.calculateWinner();

    if (this.winner) {
      this.showModal('winner');
    }

    const allSquaresFilled = this.squares.every(sqr => {
      return sqr === 'X' || sqr === 'O';
    });

    this.isGameFinished = this.winner || allSquaresFilled ? true : false;
  }

  calculateWinner() {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];
    // tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (
        this.squares[a] &&
        this.squares[a] === this.squares[b] &&
        this.squares[a] === this.squares[c]
      ) {
        return this.squares[a];
      }
    }
    return null;
  }

  showModal(name) {
    this.logs = this.loggerService.getAllLogs();
    this.modalService.showModal(name);
  }

  closeModal(name) {
    this.modalService.closeModal(name);
  }

  ngOnInit() {
    this.newGame();
  }
}
