import { useContext ,React} from "react";
import { setScoreContext } from "../SetScoreProvider";

export const useSetScore = () => {
  const {setSetScore} = useContext(setScoreContext);
  const addHomeGame = () => {
    setSetScore(prev => {
        const copy ={...prev};
        copy.homeTotalGames += 1;
        return copy
    })
  }

  const addAwayGame = () => {
    setSetScore(prev => {
        const copy ={...prev};
        copy.awayTotalGames += 1;
        return copy
    })
  }

  return {addHomeGame, addAwayGame}
}