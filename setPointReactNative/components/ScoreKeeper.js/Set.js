import {Text, View} from 'react-native';
import Game from './Game';
import {useContext, useEffect, useState} from 'react';
import { matchDataContext } from './Match';

export default function Set(props) {
  const {currentSet} = useContext(matchDataContext);

  return (
    <View style={{flexDirection: 'row', flex:1}}>
      <View style={{backgroundColor:'#47e3ff', display:(currentSet.homeGames === 0 && currentSet.awayGames === 0) ? 'none' : 'flex', flex:1, maxWidth:'12%'}}>
        <View style={{justifyContent:'center', alignItems:'center'}}>
            <Text style={{fontWeight:'bold', color:'#1d2f5a',  textAlign:'center', fontSize:10}}>{currentSet.homeGames}</Text>
        </View>
        <View style={{justifyContent:'center', alignItems:'center'}}>
            <Text style={{fontWeight:'bold', color:'#1d2f5a', fontSize:10}}>{currentSet.awayGames}</Text>
        </View>
      </View>
      <Game/>
    </View>
  );
}
