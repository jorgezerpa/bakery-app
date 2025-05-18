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

  return (
    <View style={styles.item}>
      <View style={{ borderColor:"#ccc", borderWidth:1, flex:1 }}>
          <Text style={styles.title}>{title}</Text>
          <View>
              <View style={{ backgroundColor:"white", height:100 }}>
                <Text>
                  { formatTime(time) }
                </Text>
              </View>
              <View style={{ backgroundColor:"white", height:50, justifyContent:"space-between" }}>
                {
                  running &&
                      <TouchableOpacity onPress={pauseTimer}>
                          <Text>Stop</Text>
                      </TouchableOpacity>
                }
                {
                  !running &&
                    <>
                      <TouchableOpacity onPress={time===0?startTimer:resumeTimer}>
                          <Text>{time===initialTime?"Iniciar":"continuar"}</Text>
                      </TouchableOpacity>
                      <TouchableOpacity onPress={resetTimer}>
                          <Text>Reiniciar</Text>
                      </TouchableOpacity>
                    </>
                }
              </View>
          </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  item: {
    padding:5,
    width: "50%",
    height: 250,
    display:"flex", justifyContent:"space-between",
  },
  title: {
    fontSize: 20,
  },
});
