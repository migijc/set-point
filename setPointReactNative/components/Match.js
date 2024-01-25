import {React, createContext, useEffect, useState} from 'react';
import {Game} from '../classes/Game';
import {Button, Pressable, Text, View} from 'react-native';
import {MatchData} from '../classes/MatchData';
import CurrentSetScore from './CurrentSetScore';

export default function Match() {
  const [matchData, setMatchData] = useState(new MatchData());

  return (
    <matchContext.Provider value={{matchData, setMatchData}}>
      <View>
        <CurrentSetScore />
      </View>
    </matchContext.Provider>
  );
}

export const matchContext = createContext(null);
