export class MatchData {
  constructor(gamesRequiredToWin) {
    this.gamesRequiredToWin = gamesRequiredToWin || 2;
    this.homeTeam = null;
    this.awayTeam = null;
    this.homeTotalSets = 0;
    this.awayTotalSets = 0;
    this.completedSetsDataList = [];
    this.currentSet = {
      gamesRequiredToWin: 6,
      homeTotalGames: 0,
      awayTotalGames: 0,
      currentGame: {
        homeTotalPoints: 0,
        awayTotalPoints: 0,
        deuceCount: 0,
        pointsRequiredToWin: 4,
      },
    }; //init new set
  }
}
