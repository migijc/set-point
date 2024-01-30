/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useEffect} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import { colors } from './styles/appColors';
import NewMatch from './components/NewMatch';


function App() {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <SafeAreaView style={{flex:1, backgroundColor:colors.darkText ,padding:8 }}>
      <View style={{flex:1}}>
        {/* <View style={{padding:2, justifyContent:'center', alignItems:'center', backgroundColor:'#616161ff'}}>
          <Text style={{color:'#d0ff00', textAlign:'center', fontStyle:'italic' }}>SetPoint</Text>
        </View> */}
        {/* <Match /> */}
        {/* <SetScoreProvider /> */}
        <NewMatch/>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
