import { formatTime } from '@/utils/formatDate';
import React, { useRef, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export const Chrono = () => {

  const [title, setTitle] = useState("Title")
  const [time, setTime] = useState(0)
  const [running, setRunning] = useState(false)
  const intervalRef = useRef<number>(null)
  const startTimeRef = useRef(0)

  const startStopwatch = () => {
      startTimeRef.current = Date.now() - time * 1000;
      intervalRef.current = setInterval(() => {
          setTime(Math.floor((Date.now() - 
          startTimeRef.current) / 1000));
      }, 1000);
      setRunning(true);
  };

  const pauseStopwatch = () => {
        clearInterval(intervalRef.current || undefined);
        setRunning(false);
    };

    const resetStopwatch = () => {
        clearInterval(intervalRef.current || undefined);
        setTime(0);
        setRunning(false);
    };

    const resumeStopwatch = () => {
        startTimeRef.current = Date.now() - time * 1000;
        intervalRef.current = setInterval(() => {
            setTime(Math.floor(
                (Date.now() - startTimeRef.current) / 1000));
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
                      <TouchableOpacity onPress={pauseStopwatch}>
                          <Text>Stop</Text>
                      </TouchableOpacity>
                }
                {
                  !running &&
                    <>
                      <TouchableOpacity onPress={time===0?startStopwatch:resumeStopwatch}>
                          <Text>{time===0?"Iniciar":"continuar"}</Text>
                      </TouchableOpacity>
                      <TouchableOpacity onPress={resetStopwatch}>
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
