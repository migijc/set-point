import {Button, Text, View} from 'react-native';
import {useContext, useEffect} from 'react';
import {matchContext} from './contexts/MatchContextProvider';

export default function CurrentSetScore() {
  const {currentSetData} = useContext(matchContext);

  return (
    <View style={{flexDirection: 'row'}}>
      <View>
        <View style={{backgroundColor: '#c8ff00', aspectRatio:1}}>
          <Text style={{textAlign:'center', fontWeight:'bold'}}>{currentSetData.homeTotalGames}</Text>
        </View>
        <View style={{backgroundColor: '#c8ff00', aspectRatio:1}}>
          <Text style={{textAlign:'center', fontWeight:'bold'}}>{currentSetData.awayTotalGames}</Text>
        </View>
      </View>
    </View>
  );
}
