import {View, Text, Button} from 'react-native';
import {useContext, useEffect, useState, React} from 'react';
import {matchContext} from './contexts/MatchContextProvider';
import {useMatchContext} from './contexts/customHooks/useMatchContext';

export default function CurrentGameScore(props) {
  const {currentGameData} = useContext(matchContext);
  const {homeTotalPoints, awayTotalPoints} = currentGameData;

  return (
    <View style={{backgroundColor: '#ffffff'}}>
      <View style={{aspectRatio:1}}>
        <Text style={{textAlign:'center', fontWeight:'bold'}}>{gamePointsMap[homeTotalPoints]}</Text>
      </View>
      <View>
        <Text style={{textAlign:'center', fontWeight:'bold'}}>{gamePointsMap[awayTotalPoints]}</Text>
      </View>
    </View>
  );
}

const gamePointsMap = {
  0: 0,
  1: 15,
  2: 30,
  3: 40,
  4: 'AD',
  5: '',
}
