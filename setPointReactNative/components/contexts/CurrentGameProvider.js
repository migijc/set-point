import {createContext, useState, React} from 'react';
import {View} from 'react-native';

export default function CurrentGameProvider() {
  const [currentGameScore, setcurrentGameScore] = useState({
    homeTotalPoints: 0,
    awayTotalPoints: 0,
    pointsRequiredToWin: 4,
  });

  return (
    <currentGameScoreContext.Provider value={{currentGameScore, setcurrentGameScore}}>
      {/* <View style={{flex:1}}> */}
      {/* <CurrentGameScoreDisplay /> */}
      {/* </View> */}
    </currentGameScoreContext.Provider>
  );
}

export const currentGameScoreContext = createContext({
  homeTotalPoints: 0,
  awayTotalPoints: 0,
  pointsRequiredToWin: 4,
});
