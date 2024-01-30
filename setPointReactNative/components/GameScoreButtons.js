import {Button, Pressable, Text, View} from 'react-native';
import {useMatchContext} from './contexts/customHooks/useMatchContext';
import {useContext, useRef, useState} from 'react';
import {matchContext} from './contexts/MatchContextProvider';
import { colors } from '../styles/appColors';

export default function GameScoreButtons() {
  const {addHomePoint, addAwayPoint} = useMatchContext();
  const {currentGameData} = useContext(matchContext);



  return (
    <View style={{flexDirection:'row', gap:5}}>
      {/* <Button title="add Home" onPress={addHomePoint} /> */}
      <AddPointButton textValue="HOME" onPressCallBack={addHomePoint}/>
      <AddPointButton textValue={'AWAY'} onPressCallBack={addAwayPoint}/>
    </View>
  );
}

const AddPointButton = props => {
  const {textValue, onPressCallBack} = props;
  const buttonRef = useRef(null)
  const [isPressed, setIsPressed] = useState(false);

  return (
    <Pressable
      onPress={(onPressCallBack)}
      onPressOut={()=>setIsPressed(false)}
      onPressIn={()=>setIsPressed(true)}
      ref={buttonRef}
      style={{flex:1, backgroundColor: isPressed ? colors.usOpenYellow : '#ffffff23', justifyContent:'center', padding:10, borderRadius:5}}>
      <Text style={{color: isPressed ? 'black' : 'white', textAlign:'center', fontWeight:'bold'}}>{textValue}</Text>
    </Pressable>
  );
};
