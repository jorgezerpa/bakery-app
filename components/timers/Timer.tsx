import { commonStyles } from '@/styles/common';
import { formatTime } from '@/utils/formatDate';
import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export const Timer = () => {

  const initialTime = 3600; // Start from 60 seconds
  const [title, setTitle] = useState("Timer");
  const [time, setTime] = useState(initialTime);
  const [running, setRunning] = useState(false);
  const intervalRef = useRef<number>(null);
  const startTimeRef = useRef(0); // This will still be useful for accurate pausing/resuming

  useEffect(() => {
    if (time === 0 && running) {
      pauseTimer(); // Automatically stop when time reaches 0
    }
  }, [time, running]);

  const startTimer = () => {
    // Calculate startTimeRef so that the countdown begins from the current 'time'
    startTimeRef.current = Date.now() + time * 1000;
    intervalRef.current = setInterval(() => {
      const remainingTime = Math.ceil((startTimeRef.current - Date.now()) / 1000);
      setTime(remainingTime >= 0 ? remainingTime : 0); // Ensure time doesn't go negative
    }, 1000);
    setRunning(true);
  };

  const pauseTimer = () => {
    clearInterval(intervalRef.current || undefined);
    setRunning(false);
  };

  const resetTimer = () => {
    clearInterval(intervalRef.current || undefined);
    setTime(initialTime); // Reset to the initial time
    setRunning(false);
  };

  const resumeTimer = () => {
    // Recalculate startTimeRef based on the current 'time' to resume accurately
    startTimeRef.current = Date.now() + time * 1000;
    intervalRef.current = setInterval(() => {
      const remainingTime = Math.ceil((startTimeRef.current - Date.now()) / 1000);
      setTime(remainingTime >= 0 ? remainingTime : 0);
    }, 1000);
    setRunning(true);
  };

  useEffect(() => {
    // This return function will be called when the component unmounts
    return () => {
      if (intervalRef.current !== null) {
        clearInterval(intervalRef.current);
        console.log('watch unmounted: Timer cleared!');
      }
    };
  }, []); // The empty dependency array ensures this effect runs only once on mount and once on unmount.

  return (
      <>
          <Text style={{...commonStyles.watchTitle}}>{title}</Text>
          <View style={{ justifyContent:"space-between" }}>
              <View style={{ backgroundColor:"white", }}>
                <Text style={{...commonStyles.watchTime}}>
                  { formatTime(time) }
                </Text>
              </View>
              <View style={{ ...commonStyles.watchButtonsWrapper }}>
                {
                  running &&
                      <TouchableOpacity onPress={pauseTimer} style={{ ...commonStyles.watchButton }}>
                          <Text>Stop</Text>
                      </TouchableOpacity>
                }
                {
                  !running &&
                    <>
                      <TouchableOpacity onPress={time===0?startTimer:resumeTimer} style={{ ...commonStyles.watchButton }}>
                          <Text>{time===initialTime?"Iniciar":"continuar"}</Text>
                      </TouchableOpacity>
                      <TouchableOpacity onPress={resetTimer} style={{ ...commonStyles.watchButton }}>
                          <Text>Reiniciar</Text>
                      </TouchableOpacity>
                    </>
                }
              </View>
          </View>
      </>
  )
}

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
  },
});
