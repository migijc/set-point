import {React, useContext, useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {matchDataContext} from './Match';
import { gameScoreMap } from './Game';

export default function ScoreContainer() {
  const {completedSets, currentSet} = useContext(matchDataContext);
  const [homeSetScoresList, setHomeSetScoresList] = useState([]);
  const [awaySetScoresList, setAwaySetScoresList] = useState([]);

  useEffect(() => {
    const homeScores = [];
    const awayScores = [];
    completedSets.forEach(set => {
      homeScores.push(set.homeGames);
      awayScores.push(set.awayGames);
    });
    setHomeSetScoresList(homeScores);
    setAwaySetScoresList(awayScores);
  }, [completedSets]);

  useEffect(() => {
    console.log(homeSetScoresList);
  });

  return (
    <View>
      <HomeTeamScoresDisplay
        currentSet={currentSet}
        homeSetScoresList={homeSetScoresList}
        awaySetScoresList={awaySetScoresList}
      />
      <AwayTeamScoresDisplay
        currentSet={currentSet}
        homeSetScoresList={homeSetScoresList}
        awaySetScoresList={awaySetScoresList}
      />
    </View>
  );
}

const HomeTeamScoresDisplay = props => {
  const {currentSet, homeSetScoresList, awaySetScoresList} = props;
  const awaitingGame =
    currentSet.homeGames === 0 && currentSet.awayGames === 0 ? false : true;
  return (
    <View style={scoreContainerStyles.mainContainer}>
      <View style={scoreContainerStyles.teamNameContainer}>
        <Text style={scoreContainerStyles.teamName}>
          {currentSet.teamsData.home.teamName}
        </Text>
      </View>
      <View style={scoreContainerStyles.completedSetScoresContainer}>
        {homeSetScoresList.map((score, i) => {
          const isWinner = score > awaySetScoresList[i];
          return (
            <View key={i} style={scoreContainerStyles.scoreWrapper}>
              <Text
                style={
                  isWinner
                    ? scoreContainerStyles.winningScoreText
                    : scoreContainerStyles.losingSetScore
                }>
                {score}
              </Text>
            </View>
          );
        })}
      </View>
      {awaitingGame && (
        <View style={scoreContainerStyles.scoreWrapper}>
          <Text style={scoreContainerStyles.setGamesText}>
            {currentSet.homeGames}
          </Text>
        </View>
      )}

      <View style={scoreContainerStyles.scoreWrapper}>
        <Text style={scoreContainerStyles.currentGameScoreText}>
          {gameScoreMap[currentSet.currentGame.homePoints]}
        </Text>
      </View>
    </View>
  );
};

const AwayTeamScoresDisplay = props => {
  const {currentSet, homeSetScoresList, awaySetScoresList} = props;
  const awaitingGame =
    currentSet.homeGames === 0 && currentSet.awayGames === 0 ? false : true;
  return (
    <View style={scoreContainerStyles.mainContainer}>
      <View style={scoreContainerStyles.teamNameContainer}>
        <Text style={scoreContainerStyles.teamName}>
          {currentSet.teamsData.away.teamName}
        </Text>
      </View>
      <View style={scoreContainerStyles.completedSetScoresContainer}>
        {awaySetScoresList.map((score, i) => {
          const isWinner = score > homeSetScoresList[i];
          return (
            <View key={i} style={scoreContainerStyles.scoreWrapper}>
              <Text
                style={
                  isWinner
                    ? scoreContainerStyles.winningScoreText
                    : scoreContainerStyles.losingSetScore
                }>
                {score}
              </Text>
            </View>
          );
        })}
      </View>
      {awaitingGame && (
        <View style={scoreContainerStyles.scoreWrapper}>
          <Text style={scoreContainerStyles.setGamesText}>
            {currentSet.awayGames}
          </Text>
        </View>
      )}

      <View style={scoreContainerStyles.scoreWrapper}>
        <Text style={scoreContainerStyles.currentGameScoreText}>
          {gameScoreMap[currentSet.currentGame.awayPoints]}
        </Text>
      </View>
    </View>
  );
};

const scoreContainerStyles = StyleSheet.create({
  mainContainer: {
    backgroundColor: '#0041cc',
    flexDirection: 'row',
    // borderWidth:3
  },

  teamNameContainer: {
    flex: 1,
    justifyContent: 'center',
    paddingLeft: 2,
  },
  completedSetScoresContainer: {
    flexDirection: 'row',
  },
  scoreWrapper: {
    padding: 2.5,
  },

  currentGameScoreText: {
    backgroundColor: 'white',
    aspectRatio: 1,
    textAlign: 'center',
    borderRadius: 2,
    fontWeight: 'bold',
  },

  winningScoreText: {
    color: '#ffee03',
    fontWeight: 'bold',
  },

  setGamesText: {
    fontWeight: 'bold',
    color: '#ffffff',
  },

  teamName: {
    color: '#ffffff',
  },
  losingSetScore: {
    fontWeight: 'bold',
    color: 'white',
  },
});
