import { commonStyles } from '@/styles/common';
import { formatTime } from '@/utils/formatDate';
import React, { useEffect, useRef, useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { WatchTitle } from './WatchTitle';

export const Chrono = () => {

  const [title, setTitle] = useState("")
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

     // useEffect for cleanup when the component unmounts
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
          <WatchTitle title={title} setTitle={setTitle}  />
          <View style={{ justifyContent:"space-between", alignItems:"flex-end" }}>
              <View style={{ backgroundColor:"white", }}>
                <Text style={{ fontSize:12, textAlign:"right" }}>
                      cronometro
                </Text>
                <Text style={{ ...commonStyles.watchTime }}>
                  { formatTime(time) }
                </Text>
              </View>
              <View style={{ ...commonStyles.watchButtonsWrapper }}>
                {
                  running &&
                      <TouchableOpacity onPress={pauseStopwatch} style={{ ...commonStyles.watchButton, backgroundColor:"#0b5edb" }}>
                          <Text style={{ ...commonStyles.watchButtonText, color:"#fefefe" }}>Stop</Text>
                      </TouchableOpacity>
                }
                {
                  !running &&
                    <>
                      {
                        time !== 0 && 
                          <TouchableOpacity onPress={resetStopwatch} style={{ ...commonStyles.watchButton, backgroundColor:"#ca0404" }}>
                              <Text style={{ ...commonStyles.watchButtonText, color:"#fefefe" }}>Reiniciar</Text>
                          </TouchableOpacity>
                      }
                      <TouchableOpacity style={{ ...commonStyles.watchButton, backgroundColor:"#2501c9" }} onPress={time===0?startStopwatch:resumeStopwatch}>
                          <Text style={{ ...commonStyles.watchButtonText, color:"#fefefe" }}>{time===0?"Iniciar":"continuar"}</Text>
                      </TouchableOpacity>
                    </>
                }
              </View>
          </View>
      </>
  )
}

