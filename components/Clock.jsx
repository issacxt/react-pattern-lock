import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Image } from 'react-native';
import Svg, { Text } from 'react-native-svg';

const getCurrentTime = () => {
  const now = new Date();
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  return `${hours}:${minutes}`;
};

const getCurrentDayAndDate = () => {
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'
  ];
  const now = new Date();
  const day = days[now.getDay()];
  const month = months[now.getMonth()];
  const date = now.getDate();
  return `${day}, ${month} ${date}`;
};

const Clock = ({ isUnlocked }) => {
  const [time, setTime] = useState(getCurrentTime());
  const [dayAndDate, setDayAndDate] = useState(getCurrentDayAndDate());

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(getCurrentTime());
      setDayAndDate(getCurrentDayAndDate());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <View style={styles.container}>
      {!isUnlocked && <Image
        source={require('../assets/lock.png')}
        style={styles.lockIcon}
      />}
      <Svg height="200" width="200">
        <Text
          x="100"
          y="80"
          fill={isUnlocked ? "black" : "white"}
          fontSize="45"
          fontWeight="400"
          textAnchor="middle"
          alignmentBaseline="middle"
        >
          {time}
        </Text>
        <Text
          x="100"
          y="110" 
          fill={isUnlocked ? "black" : "white"}
          fontSize="17"
          fontWeight="400"
          textAnchor="middle"
          alignmentBaseline="middle"
        >
          {dayAndDate}
        </Text>
      </Svg>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  lockIcon: {
    width: 30,
    height: 30,
    marginBottom: -40
  }
});

export default Clock;
