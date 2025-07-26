import { useInitialReloadStateStore } from '@/store/InitialReloadState';
import { commonStyles } from '@/styles/common';
import { formatTime } from '@/utils/formatDate';
import React, { useEffect, useRef, useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { WatchTitle } from './WatchTitle';

export const Chrono = ({ id }:{id:string}) => {
  const initialReloadState = useInitialReloadStateStore()
  const [title, setTitle] = useState("")
  const [time, setTime] = useState(0)
  const [running, setRunning] = useState(false)
  const intervalRef = useRef<number>(null)
  const startTimeRef = useRef(0)
  const [lockFirstLoad, setLockFirstLoad] = useState(false)

  const startStopwatch = () => {
      startTimeRef.current = Date.now() - time * 1000;
      intervalRef.current = setInterval(() => {
          setTime(Math.floor((Date.now() - startTimeRef.current) / 1000));
      }, 1000);
      setRunning(true);
  };

  // on the first load, it is called in the same useEffect where we set time state initially, so it reestart to 0. For that we pass the time param in this situation
  const startStopwatchOnFirstLoad = (time:number) => {
      startTimeRef.current = Date.now() - time * 1000;
      intervalRef.current = setInterval(() => {
          setTime(Math.floor((Date.now() - startTimeRef.current) / 1000));
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

    // updates store every second
    useEffect(()=>{
      if(!lockFirstLoad) {
        const chronoData = initialReloadState.chronos[id];
        setTime(chronoData.current_time);
        setRunning(chronoData.is_running);
        setTitle(chronoData.title);
        setLockFirstLoad(true)
        if(chronoData.is_running) startStopwatchOnFirstLoad(chronoData.current_time); // start the stopwatch if it was running
      }
      if(lockFirstLoad) {
        initialReloadState.updateChrono(id, { current_time: time, is_running: running, type: "chrono", title: title });
      }
    }, [time, running])

     // for cleanup when the component unmounts
    useEffect(() => {
      return () => {
        if (intervalRef.current !== null) { 
          clearInterval(intervalRef.current);
          console.log('watch unmounted: Timer cleared!');
        }
      };
    }, []); 

    useEffect(() => {
      if(!running) {
        initialReloadState.updateChrono(id, { current_time: time, is_running: running, type: "chrono", title: title });
      }
    }, [title]);



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

