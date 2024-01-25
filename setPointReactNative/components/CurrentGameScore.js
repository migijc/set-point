import {View, Text, Button} from 'react-native';
import {matchContext} from './Match';
import {useContext, useEffect, useState} from 'react';

export default function CurrentGameScore(props) {
  const {matchData, setMatchData} = useContext(matchContext);
  const [deuceCount, setDeuceCount] = useState(0);
  const [isGameSet, setIsGameSet] = useState(false);


  return (
    <View>
      <View style={{backgroundColor:'#eeeeee', alignSelf:'flex-start', padding:3}}>
        <Text>{matchData.currentSet.currentGame.homeScore}</Text>
        <Text>{matchData.currentSet.currentGame.awayScore}</Text>
      </View>

      {/* <Button title="ADD HOME" onPress={addHomePoint} />
      <Button title="ADD Away" onPress={addAwayPoint} /> */}
    </View>
  );
}
