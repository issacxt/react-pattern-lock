import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, ImageBackground } from 'react-native';
import Svg, { Circle, Line } from 'react-native-svg';
import { PanGestureHandler, GestureHandlerRootView} from 'react-native-gesture-handler';
import Clock from './Clock';
import { Col, Row } from './Grid';

const DEFAULT_PATTERN = [2, 6, 8, 4, 2];

const PatternLock = () => {
  const [pattern, setPattern] = useState([]);
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [message, setMessage] = useState('Unlock Device');

  const grid = [
    { id: 1, x: 50, y: 50 },
    { id: 2, x: 150, y: 50 },
    { id: 3, x: 250, y: 50 },
    { id: 4, x: 50, y: 150 },
    { id: 5, x: 150, y: 150 },
    { id: 6, x: 250, y: 150 },
    { id: 7, x: 50, y: 250 },
    { id: 8, x: 150, y: 250 },
    { id: 9, x: 250, y: 250 },
  ];

  const handleGesture = ({ nativeEvent }) => {
    const { x, y } = nativeEvent;
    const newPoint = getPatternPoint(x, y);

    if (newPoint) {
      const lastPoint = pattern[pattern.length - 1];
      if (lastPoint) {
        const skippedPoint = getSkippedPoint(lastPoint, newPoint);
        if (skippedPoint && pattern.includes(skippedPoint)) {
          return;
        }
      }
      if (lastPoint !== newPoint) setPattern([...pattern, newPoint]);
    }
  };

  const getPatternPoint = (x, y) => {
    return grid.find((point) => Math.abs(point.x - x) < 50 && Math.abs(point.y - y) < 50)?.id;
  };

  const getSkippedPoint = (start, end) => {
    const connections = {
      '1-3': 2, '1-7': 4, '1-9': 5,
      '2-8': 5, '3-7': 5, '3-9': 6,
      '4-6': 5, '7-9': 8,
    };
    const key = `${Math.min(start, end)}-${Math.max(start, end)}`;
    return connections[key];
  };

  const checkPattern = () => {
    if (JSON.stringify(pattern) === JSON.stringify(DEFAULT_PATTERN)) {
      setIsUnlocked(true);
      setMessage('');
    } else {
      setPattern([]);
      setMessage('Incorrect Pattern');
    }
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={isUnlocked ? require('../assets/wall.jpeg') : require('../assets/black.jpg')}
        resizeMode='cover'
        style={styles.background}
      >
      <Clock isUnlocked={isUnlocked} />
      <GestureHandlerRootView style={styles.patternArea}>
        <Text style={styles.header}>{message}</Text>
        {!isUnlocked && <PanGestureHandler onGestureEvent={handleGesture} onEnded={checkPattern}>
          <Svg height="300" width="300">
            {grid.map(({ id, x, y }) => (
              <Circle key={id} cx={x} cy={y} r="7" fill="gray" />
            ))}
            {pattern.map((point, index) => {
              const start = getPatternPointCoords(pattern[index - 1]);
              const end = getPatternPointCoords(point);
              return start && end ? (
                <Line
                  key={index}
                  x1={start.x}
                  y1={start.y}
                  x2={end.x}
                  y2={end.y}
                  stroke="blue"
                  strokeWidth="5"
                />
              ) : null;
            })}
          </Svg>
        </PanGestureHandler>}
      </GestureHandlerRootView>
      <Row>
        <Col allign={'flex-start'}>
          <Image
            source={require('../assets/flash.png')}
            style={styles.cameraIcon}
          />
        </Col>
        <Col allign={'flex-end'}>
          <Image
            source={require('../assets/camera-new.png')}
            style={styles.cameraIcon}
          />
        </Col>
      </Row>
      </ImageBackground>
    </View>
  );
};

const getPatternPointCoords = (id) => {
  const grid = [
    { id: 1, x: 50, y: 50 },
    { id: 2, x: 150, y: 50 },
    { id: 3, x: 250, y: 50 },
    { id: 4, x: 50, y: 150 },
    { id: 5, x: 150, y: 150 },
    { id: 6, x: 250, y: 150 },
    { id: 7, x: 50, y: 250 },
    { id: 8, x: 150, y: 250 },
    { id: 9, x: 250, y: 250 },
  ];
  return grid.find((point) => point.id === id);
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    fontSize: 12,
    color: 'white',
    textAlign: 'center'
  },
  patternArea: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cameraIcon: {
    width: 40,
    height: 40,
    color: 'white',
    marginBottom: 20,
  }
});

export default PatternLock;
