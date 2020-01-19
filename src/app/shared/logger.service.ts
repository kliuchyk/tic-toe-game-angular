import { Injectable } from '@angular/core';

export interface MoveLog {
  player: string;
  row: number;
  place: number;
  time?: any;
}

@Injectable({
  providedIn: 'root'
})
export class LoggerService {
  constructor() {}

  logs: MoveLog[] = [];

  resetLogs() {
    this.logs = [];
  }

  saveCurrentMove(move: MoveLog) {
    move.time = this.getTime(move.time);
    move.row = this.getRow(+move.row);
    move.place = this.getPlace(move.place);

    this.logs.push(move);
  }

  getTime(time) {
    let hours = time.getHours();
    let minutes = time.getMinutes();

    if (hours < 10) {
      hours = '0' + hours;
    }
    if (minutes < 10) {
      minutes = '0' + minutes;
    }

    return `${hours}:${minutes}`;
  }

  getRow(idx) {
    if (idx <= 2) {
      return 1;
    } else if (idx > 2 && idx <= 5) {
      return 2;
    } else if (idx > 5 && idx <= 8) {
      return 3;
    }
  }

  getPlace(idx) {
    if (idx === 0 || idx === 3 || idx === 6) {
      return 1;
    } else if (idx === 1 || idx === 4 || idx === 7) {
      return 2;
    } else if (idx === 2 || idx === 5 || idx === 8) {
      return 3;
    }
  }

  getAllLogs(): MoveLog[] {
    return this.logs;
  }
}
