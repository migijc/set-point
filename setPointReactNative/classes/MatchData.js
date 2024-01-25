import {Game} from './Game';

export class MatchData {
  constructor() {
    this.homeTeamTotalSets = 0;
    this.awayTeamTotalSets = 0;
    this.completedSets = [];
    this.currentSet = new Set();
  }
}

class Set {
  constructor() {
    this.homeTeamTotalGames = 0;
    this.awayTeamTotalGames = 0;
    this.currentGame = new Game();
  }
}
