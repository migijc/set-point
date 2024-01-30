import {createContext, useEffect, useState, React} from 'react';
import {Button, Text, View} from 'react-native';
import {colors} from '../../styles/appColors';
import GameScoreButtons from '../GameScoreButtons';
import MatchScoreBoard from '../MatchScoreBoard';
export const matchContext = createContext(null);

export default function MatchContextProvider() {
  // const [matchData, setMatchData] = useState(new MatchData())
  const [currentSetData, setCurrentSetData] = useState(new CurrentSetData());
  const [currentGameData, setCurrentGameData] = useState(new CurrentGameData());
  const [matchData, setMatchData] = useState(new MatchData(2));
  const [winningTeam, setWinningTeam] = useState(null);


  useEffect(() => {
    console.log('ren')
    const {homeTotalPoints, awayTotalPoints, pointsRequiredToWin} =
      currentGameData;
    if (
      homeTotalPoints === 3 &&
      awayTotalPoints === 3 
    //   pointsRequiredToWin === 4
    ) {
      setCurrentGameData(prev => {
        const copy = {...prev};
        copy.pointsRequiredToWin = 5;
        copy.deuceCount += 1;
        return copy;
      });
    }
    
    if (homeTotalPoints === awayTotalPoints && homeTotalPoints > 3) {
      setCurrentGameData(prev => {
        const copy = {...prev};
        copy.awayTotalPoints = 3;
        copy.homeTotalPoints = 3;
        return copy;
      });
    }
    if (homeTotalPoints === pointsRequiredToWin) {
      setCurrentSetData(prev => {
        const copy = {...prev};
        copy.homeTotalGames += 1;
        return copy;
      });
      setCurrentGameData(new CurrentGameData());
    } else if (awayTotalPoints === pointsRequiredToWin) {
      setCurrentSetData(prev => {
        const copy = {...prev};
        copy.awayTotalGames += 1;
        return copy;
      });
      setCurrentGameData(new CurrentGameData());
    }
  }, [currentGameData.homeTotalPoints, currentGameData.awayTotalPoints]);

  useEffect(() => {
    const {homeTotalGames, awayTotalGames, gamesRequiredToWin} = currentSetData;
    if (homeTotalGames === gamesRequiredToWin) {
      setMatchData(prev => {
        const copy = {...prev};
        copy.homeTotalSets += 1;
        copy.completedSetsList.push(currentSetData);
        return copy;
      });
      return;
    }
    if (awayTotalGames === gamesRequiredToWin) {
      setMatchData(prev => {
        const copy = {...prev};
        copy.awayTotalSets += 1;
        copy.completedSetsList.push(currentSetData);
        return copy;
      });
      return;
    }
  }, [currentSetData]);

  useEffect(() => {
    const {homeTotalSets, awayTotalSets, setsRequiredToWin} = matchData;
    if (
      homeTotalSets === setsRequiredToWin ||
      awayTotalSets === setsRequiredToWin
    ) {
      if (homeTotalSets === setsRequiredToWin) {
        return setWinningTeam('home');
      } else return setWinningTeam('away');
    }
    setCurrentSetData(prev => {
      return new CurrentSetData();
    });
  }, [matchData]);

  return (
    <matchContext.Provider
      value={{
        currentSetData,
        currentGameData,
        setCurrentGameData,
        matchData,
        winningTeam,
      }}>
      <View style={{flex: 1, justifyContent: 'space-between'}}>
        <MatchScoreBoard winningTeam={winningTeam} />
        {!winningTeam && <GameScoreButtons />}
      </View>
    </matchContext.Provider>
  );
}

class MatchData {
  constructor(setsRequiredToWin) {
    this.homeTotalSets = 0;
    this.awayTotalSets = 0;
    this.setsRequiredToWin = setsRequiredToWin || 2;
    this.completedSetsList = [];
    this.currentMessage = '';
  }
}

class CurrentSetData {
  constructor() {
    this.homeTotalGames = 0;
    this.awayTotalGames = 0;
    this.gamesRequiredToWin = 6;
    this.currentMessage = '';
  }
}

class CurrentGameData {
  constructor() {
    this.homeTotalPoints = 0;
    this.awayTotalPoints = 0;
    this.pointsRequiredToWin = 4;
    this.deucePointValue = 3;
    this.deuceCount = 0;
    this.currentMessage = '';
  }
}
