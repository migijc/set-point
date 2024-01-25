import {Button, Text, View} from 'react-native';
import CurrentGameScore from './CurrentGameScore';
import { useContext, useEffect } from 'react';
import { matchContext } from './Match';

export default function CurrentSetScore() {
    const {matchData} = useContext(matchContext); 
    useEffect(()=>{
        console.log(matchData)
    })
  return (
    <View style={{flexDirection:'row'}}>
      <View style={{padding:3, backgroundColor:'cyan'}}>
        <Text>{matchData.currentSet.homeTeamTotalGames}</Text>
        <Text>{matchData.currentSet.awayTeamTotalGames}</Text>
      </View>
      <CurrentGameScore />
    </View>
  );
}
