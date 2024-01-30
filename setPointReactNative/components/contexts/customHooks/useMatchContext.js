import {useContext} from 'react';
import {matchContext} from '../MatchContextProvider';

export const useMatchContext = () => {
  const {currentSetData, setCurrentGameData} = useContext(matchContext);
  const addHomePoint = () => {
    setCurrentGameData(prev => {
      const copy = {...prev};
      copy.homeTotalPoints =copy.homeTotalPoints+ 1;
      return copy;
    });
  };

  const addAwayPoint = () => {
    setCurrentGameData(prev => {
      const copy = {...prev};
      copy.awayTotalPoints =copy.awayTotalPoints+ 1;
      return copy;
    });
  };

  return {addHomePoint, addAwayPoint};
};
