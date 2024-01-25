import {createContext, useEffect, useState} from 'react';
import {Button, Pressable, Text, View} from 'react-native';
import Set from './Set';
import ScoreContainer from './ScoreContainer';
export const matchDataContext = createContext(null);

export default function Match() {
  const [completedSets, setCompletedSets] = useState([]);
  const [currentServer, setCurrentServer] = useState('HOME');
  const [isGameSetMatch, setIsGameSetMatch] = useState(false)
  const [currentSet, setCurrentSet] = useState({
    teamsData:{
        home:{
            teamType: 'singles',
            teamName: 'Home',
        },
        away:{
            teamType: 'singles',
            teamName: 'Away',
        }
    
    },
    homeGames: 0,
    awayGames: 0,
    setsNeededToWin: 2,
    scoreDifference: 0,
    gamesToWin: 6,
    isSetComplete: false,
    currentGame: {
      homePoints: 0,
      awayPoints: 0,
      deuceCount: 0,
      scoreDifference: 0,
      pointsToWin: 4,
      isGameSet: false,
    },
  });

  useEffect(() => {
    updateScoreDifference();
    if (isGameDeuce()) {
      console.log(true);
      incrementDeuceCount();
    }
    if (
      currentSet.currentGame.homePoints === 4 &&
      currentSet.currentGame.awayPoints === 4
    ) {
      setCurrentSet(prev => {
        const copy = {...prev};
        copy.currentGame.awayPoints = 3;
        copy.currentGame.homePoints = 3;
        return copy;
      });
    }
  }, [currentSet.currentGame.homePoints, currentSet.currentGame.awayPoints]);

  useEffect(() => {
    if (isSetTiedAtFive()) {
      setCurrentSet(prev => {
        const copy = {...prev};
        copy.gamesToWin = 7;
        return copy;
      });
    }
    updateSetDifference();
  }, [currentSet.homeGames, currentSet.awayGames]);

  useEffect(() => {
    if (currentSet.scoreDifference >= 2) {
      if (currentSet.homeGames === currentSet.gamesToWin) {
        resetSet();
        setCurrentSet(prev => {
          const copy = {...prev};
          copy.isSetComplete = true;
          return copy;
        });
        setCompletedSets(prev => {
          const copy = [...prev];
          copy.push({
            homeGames: currentSet.homeGames,
            awayGames: currentSet.awayGames,
          });
          return copy;
        });
      } else if (currentSet.awayGames === currentSet.gamesToWin) {
        resetSet();
        setCurrentSet(prev => {
          const copy = {...prev};
          copy.isSetComplete = true;
          return copy;
        });
        setCompletedSets(prev => {
          const copy = [...prev];
          copy.push({
            homeGames: currentSet.homeGames,
            awayGames: currentSet.awayGames,
          });
          return copy;
        });
      }
    }
  }, [currentSet.scoreDifference]);

  useEffect(() => console.log(completedSets));

  //handle Game Winner
  useEffect(() => {
    if (currentSet.currentGame.scoreDifference >= 2) {
      if (
        currentSet.currentGame.homePoints === currentSet.currentGame.pointsToWin
      ) {
        console.log('home Wins');
        addHomeGame();
        return resetGame();
      } else if (
        currentSet.currentGame.awayPoints === currentSet.currentGame.pointsToWin
      ) {
        addAwayGame();
        return resetGame();
      }
    }
  }, [currentSet.currentGame.scoreDifference]);

  useEffect(() => {
    if (currentSet.currentGame.deuceCount) {
      setCurrentSet(prev => {
        const copy = {...prev};
        copy.currentGame.pointsToWin = 5;
        return copy;
      });
    }
  }, [currentSet.currentGame.deuceCount]);

  const resetGame = () => {
    setCurrentSet(prev => {
      const copy = {...prev};
      copy.currentGame.awayPoints = 0;
      copy.currentGame.homePoints = 0;
      copy.currentGame.deuceCount = 0;
      copy.currentGame.isGameSet = false;
      copy.currentGame.pointsToWin = 4;
      return copy;
    });
  };

  const resetSet = () => {
    setCurrentSet(prev => {
      const copy = {...prev};
      copy.awayGames = 0;
      copy.homeGames = 0;
      copy.gamesToWin = 6;
      return copy;
    });
  };

  const isGameDeuce = () => {
    let result;
    if (
      currentSet.currentGame.homePoints === currentSet.currentGame.awayPoints &&
      currentSet.currentGame.homePoints === 3
    ) {
      return (result = true);
    } else result = false;
    return result;
  };

  const addHomePoint = () => {
    setCurrentSet(prev => {
      const copy = {...prev};
      copy.currentGame.homePoints += 1;
      return copy;
    });
  };

  const addAwayPoint = () => {
    setCurrentSet(prev => {
      const copy = {...prev};
      copy.currentGame.awayPoints += 1;
      return copy;
    });
  };

  const addHomeGame = () => {
    setCurrentSet(prev => {
      const copy = {...prev};
      copy.homeGames += 1;
      return copy;
    });
  };

  const addAwayGame = () => {
    setCurrentSet(prev => {
      const copy = {...prev};
      copy.awayGames += 1;
      return copy;
    });
  };

  //on Deuce
  const incrementDeuceCount = () => {
    console.log('executed');
    setCurrentSet(prev => {
      const copy = {...prev};
      copy.currentGame.deuceCount += 1;
      return copy;
    });
  };

  const isSetTiedAtFive = () => {
    if (currentSet.homeGames === 5 && currentSet.awayGames === 5) {
      return true;
    } else return false;
  };

  //scoreDifference Value is used to validate win. must be 2 || greater.
  const updateScoreDifference = () => {
    setCurrentSet(prev => {
      const copy = {...prev};
      let difference =
        copy.currentGame.homePoints - copy.currentGame.awayPoints;
      difference < 0 ? (difference *= -1) : null;
      copy.currentGame.scoreDifference = difference;
      return copy;
    });
  };

  const updateSetDifference = () => {
    setCurrentSet(prev => {
      const copy = {...prev};
      let difference = copy.homeGames - copy.awayGames;
      difference < 0 ? (difference *= -1) : null;
      copy.scoreDifference = difference;
      return copy;
    });
  };

  return (
    <matchDataContext.Provider
      value={{currentSet, completedSets, currentServer}}>
      <View style={{flex: 1}}>
        <View>
          {isGameDeuce() ? (
            <Text style={{color: '#ffffffa6', fontSize: 10, borderWidth: 1}}>
              Deuce #{currentSet.currentGame.deuceCount}
            </Text>
          ) : null}
        </View>

        <ScoreContainer />

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            backgroundColor: '#ffffff0c',
            padding: 10,
          }}>
          <Pressable
            onPress={addAwayPoint}
            style={{
              borderRadius: 900,
              aspectRatio: 1,
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: 'white',
            }}>
            <Text
              style={{
                textAlign: 'center',
                fontWeight: 'bold',
                fontSize: 12,
                color: '#080b16',
                width: 30,
              }}>
              +
            </Text>
          </Pressable>
          <Pressable
            onPress={addHomePoint}
            style={{
              borderRadius: 900,
              aspectRatio: 1,
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: '#daff35',
            }}>
            <Text
              style={{
                textAlign: 'center',
                color: '#080b16',
                fontWeight: 'bold',
                fontSize: 12,
              }}>
              +
            </Text>
          </Pressable>
        </View>
      </View>
    </matchDataContext.Provider>
  );
}
