import {useContext, useEffect, useState} from 'react';
import {Pressable, Text, View} from 'react-native';
import {matchDataContext} from './Match';

export default function Game(props) {
  const {currentSet} = useContext(matchDataContext);

  return (
    <View style={{backgroundColor: 'white', flex:1, maxWidth:'15%'}}>
        <View style={{ justifyContent:'center', alignItems:'center', }} >
            <Text
                style={{
                fontWeight: 'bold',
                color: '#1d2f5a',
                textAlign: 'center',
                fontSize: 10,
                opacity: currentSet.currentGame.awayPoints === 4 ? 0 : 1,
                }}>
                {gameScoreMap[currentSet.currentGame.homePoints]}
            </Text>
        </View>
        {/* <View style={{borderBottomWidth:.5, borderColor:'#0000003a'}}/> */}
        <View style={{ justifyContent:'center', alignItems:'center',}} >
            <Text
                style={{
                fontWeight: 'bold',
                color: '#1d2f5a',
                textAlign: 'center',
                fontSize: 10,
                opacity: currentSet.currentGame.homePoints === 4 ? 0 : 1,
            }}>
            {gameScoreMap[currentSet.currentGame.awayPoints]}
        </Text>
        </View>
     
    
    </View>
  );
}

export const gameScoreMap = {
  0: 0,
  1: 15,
  2: 30,
  3: 40,
  4: 'Ad',
  5: 0,
};
