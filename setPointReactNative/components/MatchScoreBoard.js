import {useContext, useState, useEffect} from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {matchContext} from './contexts/MatchContextProvider';
import CurrentGameScore from './CurrentGameScore';
import CurrentSetScore from './CurrentSetScore';
import {colors} from '../styles/appColors';

export default function MatchScoreBoard() {
  const {currentSetData, currentGameData, matchData, winningTeam} =
    useContext(matchContext);
  const {homeTotalGames, awayTotalGames} = currentSetData;
  const {homeTotalPoints, awayTotalPoints} = currentGameData;
  const {completedSetsList} = matchData;

  return (
    <View
      style={{
        flexDirection: 'row',
        backgroundColor: '#ffffff23',
        borderRadius: 3,
      }}>
      <ScoreContainer
        homeTotalGames={homeTotalGames}
        awayTotalGames={awayTotalGames}
        completedSetsList={completedSetsList}
        homeTotalPoints={homeTotalPoints}
        awayTotalPoints={awayTotalPoints}
        winningTeam={winningTeam}
      />
    </View>
  );
}

function ScoreContainer(props) {
  const {
    completedSetsList,
    homeTotalGames,
    awayTotalGames,
    homeTotalPoints,
    awayTotalPoints,
    winningTeam,
  } = props;
  const [homeSetScoresList, setHomeSetScoresList] = useState([]);
  const [awaySetScoresList, setAwaySetScoresList] = useState([]);

  useEffect(() => {
    const homeScores = [];
    const awayScores = [];
    completedSetsList.forEach(set => {
      homeScores.push(set.homeTotalGames);
      awayScores.push(set.awayTotalGames);
    });
    setHomeSetScoresList(homeScores);
    setAwaySetScoresList(awayScores);
  }, [props]);

  return (
    <View
      style={{
        borderRadius: 2,
        // backgroundColor: colors.usOpenBlue,
        // borderWidth: 0.5,
        // borderColor: '#ffffff33',
        flex: 1,
      }}>
      <HomeTeamScoresDisplay
        homeSetScoresList={homeSetScoresList}
        awaySetScoresList={awaySetScoresList}
        homeTotalGames={homeTotalGames}
        awayTotalGames={awayTotalGames}
        homeTotalPoints={homeTotalPoints}
        awayTotalPoints={awayTotalPoints}
        winningTeam={winningTeam}
      />
      <AwayTeamScoresDisplay
        homeSetScoresList={homeSetScoresList}
        awaySetScoresList={awaySetScoresList}
        homeTotalGames={homeTotalGames}
        awayTotalGames={awayTotalGames}
        homeTotalPoints={homeTotalPoints}
        awayTotalPoints={awayTotalPoints}
        winningTeam={winningTeam}
      />
    </View>
  );
}

const HomeTeamScoresDisplay = props => {
  const {
    homeSetScoresList,
    awaySetScoresList,
    awayTotalGames,
    homeTotalGames,
    homeTotalPoints,
    awayTotalPoints,
    winningTeam,
  } = props;
  const awaitingGame =
    homeTotalGames === 0 && awayTotalGames === 0 ? false : true;
  return (
    <View style={scoreContainerStyles.mainContainer}>
      <View style={scoreContainerStyles.teamNameContainer}>
        <Text style={scoreContainerStyles.teamName}>
          {/* {currentSet.teamsData.home.teamName} */}
          HOME
        </Text>
      </View>
      <View style={scoreContainerStyles.completedSetSListcoresContainer}>
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
      {awaitingGame && !winningTeam && (
        <View style={scoreContainerStyles.scoreWrapper}>
          <Text style={scoreContainerStyles.setGamesText}>
            {homeTotalGames}
          </Text>
        </View>
      )}
      {!winningTeam && (
        <View style={scoreContainerStyles.scoreWrapper}>
          <Text style={scoreContainerStyles.currentGameScoreText}>
            {awayTotalPoints === 4 ? '' : gamePointsMap[homeTotalPoints] }
          </Text>
        </View>
      )}
    </View>
  );
};

const AwayTeamScoresDisplay = props => {
  const {
    homeSetScoresList,
    awaySetScoresList,
    awayTotalGames,
    homeTotalGames,
    homeTotalPoints,
    awayTotalPoints,
    winningTeam,
  } = props;
  console.log({homeTotalPoints, awayTotalPoints});

  const awaitingGame =
    homeTotalGames === 0 && awayTotalGames === 0 ? false : true;

  return (
    <View style={scoreContainerStyles.mainContainer}>
      <View style={scoreContainerStyles.teamNameContainer}>
        <Text style={scoreContainerStyles.teamName}>
          {/* {currentSet.teamsData.away.teamName} */}
          AWAY
        </Text>
      </View>
      <View style={scoreContainerStyles.completedSetSListcoresContainer}>
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
      {awaitingGame && !winningTeam && (
        <View style={scoreContainerStyles.scoreWrapper}>
          <Text style={scoreContainerStyles.setGamesText}>
            {awayTotalGames}
          </Text>
        </View>
      )}
      {!winningTeam && (
        <View style={scoreContainerStyles.completeSetsWrapper}>
          <Text style={scoreContainerStyles.currentGameScoreText}>
            {homeTotalPoints === 4 ? '' : gamePointsMap[awayTotalPoints]}
          </Text>
        </View>
      )}
       {/* {!winningTeam && (
        <View style={scoreContainerStyles.scoreWrapper}>
          <Text style={scoreContainerStyles.currentGameScoreText}>
            {awayTotalPoints !== 4 ? gamePointsMap[homeTotalPoints] : ''}
          </Text>
        </View>
      )} */}
    </View>
  );
};

const gamePointsMap = {
  0: 0,
  1: 15,
  2: 30,
  3: 40,
  4: 'AD',
  5: '',
};

const scoreContainerStyles = StyleSheet.create({
  mainContainer: {
    // backgroundColor: colors.usOpenBlue,
    flexDirection: 'row',
    borderBottomWidth: 0.5,
    borderBottomColor: '#ffffff3a',
    // padding: 3,
    gap: 7,
  },

  teamNameContainer: {
    flex: 1,
    justifyContent: 'center',
    paddingLeft: 5,
  },
  completedSetSListcoresContainer: {
    flexDirection: 'row',
    gap: 7,
    backgroundColor:'#adadad52'
  },
  scoreWrapper: {
    // padding: 2.5,
  },

  currentGameScoreText: {
    backgroundColor: 'white',
    aspectRatio: 1,
    textAlign: 'center',
    borderRadius: 2,
    fontWeight: 'bold',
    color: colors.darkText,
  },

  winningScoreText: {
    color: colors.usOpenYellow,
    fontWeight: 'bold',
    aspectRatio:1,
    textAlign:'center',
  },

  setGamesText: {
    fontWeight: 'bold',
    color: '#ffffff',
  },

  teamName: {
    color: '#ffffff',
    fontSize: 11,
    fontWeight: 'normal',
  },
  losingSetScore: {
    fontWeight: 'bold',
    color: 'white',
    aspectRatio:1,
    textAlign:'center',
  },
});
