export class Game {
  constructor() {
    this.homeScore = 0;
    this.awayScore = 0;
    this.isDeuce = false;
    this.deuceCount = 0;
  }

  resetGame(){
    this.homeScore = 0;
    this.awayScore = 0;
    this.isDeuce = false;
    this.deuceCount = 0;
  }
}
