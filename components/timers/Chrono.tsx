import { useInitialReloadStateStore } from '@/store/InitialReloadState';
import { useSettingsStore } from '@/store/settingsStore';
import { commonStyles } from '@/styles/common';
import { formatTime } from '@/utils/formatDate';
import React, { useEffect, useRef, useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { WatchTitle } from './WatchTitle';

const TEXTS = {
  "ES": {
    timer:"temporizador",
    chrono: "cronometro",
     accept: "aceptar",
    start: "iniciar",
    stop: "parar",
    reestart: "reiniciar",
    continue: "continuar",
    finishAt: "Finaliza a las",
    finishedAt: "Finalizado a las",
  },
  "EN": {
    timer: "timer",
    chrono: "chronometer",
    accept: "accept",
    start: "start",
    stop: "stop",
    reestart: "reestart",
    continue: "continue",
    finishAt: "Finish at",
    finishedAt: "Finished at",
  }
}

export const Chrono = ({ id }:{id:string}) => {
  const initialReloadState = useInitialReloadStateStore()
  const [title, setTitle] = useState("")
  const [time, setTime] = useState(0)
  const [running, setRunning] = useState(false)
  const intervalRef = useRef<number>(null)
  const startTimeRef = useRef(0)
  const settingsStore = useSettingsStore();

  // used to start and resume 
  const startStopwatch = () => {
      startTimeRef.current = Math.floor(Date.now())/1000 - time;
      const _time = Math.floor((Math.floor(Date.now())/1000 - startTimeRef.current))
      intervalRef.current = setInterval(() => {
        const _time = Math.floor((Math.floor(Date.now())/1000 - startTimeRef.current))
          setTime(_time);
      }, 1000);
      setRunning(true);

      initialReloadState.updateWatch(id, { current_time: _time, start_time: startTimeRef.current, pause_time: 0, is_running: true, title: title, type:"chrono" })
    };
    
    // on the first load, it is called in the same useEffect where we set time state initially, so it reestart to 0 because startTimeRef.current is 0 at the moment. For that we pass the time param in this situation
    // used only if chrono is running 
    const startStopwatchOnFirstLoad = (time:number) => {
      startTimeRef.current = Math.floor(Date.now())/1000 - time;
      const _time = Math.floor((Math.floor(Date.now())/1000 - startTimeRef.current))
      intervalRef.current = setInterval(() => {
        const _time = Math.floor((Math.floor(Date.now())/1000 - startTimeRef.current))
        setTime(_time);
      }, 1000);
      setRunning(true);
      initialReloadState.updateWatch(id, { current_time: _time, start_time: startTimeRef.current, pause_time: 0, is_running: true, title: title, type:"chrono" })
    };
    
    const pauseStopwatch = () => {
      clearInterval(intervalRef.current || undefined);
      setRunning(false);
      const _pause_time = Math.floor(Date.now())/1000
      initialReloadState.updateWatch(id, { current_time: time, start_time: startTimeRef.current, pause_time: _pause_time, is_running: false, title: title, type:"chrono" })
    };

    const resetStopwatch = () => {
        clearInterval(intervalRef.current || undefined);
        setTime(0);
        setRunning(false);
        initialReloadState.updateWatch(id, { current_time: 0, start_time: 0, pause_time: 0, is_running: false, title: title, type:"chrono" })
    };

    // read store data on first load
    useEffect(()=>{
        const chronoData = initialReloadState.chronos[id];
        setTime(chronoData.current_time); // @dev the start time ref is setted to the correspondant value when call startStopwatch or stopWatchOnFirstLoad
        setRunning(chronoData.is_running);
        setTitle(chronoData.title);
        if(chronoData.is_running) startStopwatchOnFirstLoad(chronoData.current_time); // start the stopwatch if it was running

        // for cleanup when the component unmounts        
        return () => {
          if (intervalRef.current !== null) { 
            clearInterval(intervalRef.current);
            console.log('watch unmounted: Timer cleared!');
          }
        };
    }, [])

    useEffect(() => {
        const chrono = initialReloadState.chronos[id]
        initialReloadState.updateWatch(id, { ...chrono, title: title });
    }, [title]);



  return (
      <>
          <WatchTitle title={title} setTitle={setTitle}  />
          <View style={{ justifyContent:"space-between", alignItems:"flex-end" }}>
              <View style={{ backgroundColor:"white", }}>
                {/* <Text style={{ fontSize:12, textAlign:"right" }}>
                      {TEXTS[settingsStore.language].chrono}
                </Text> */}
                <Text style={{ ...commonStyles.watchTime }}>
                  { formatTime(time) }
                </Text>
              </View>
              <View style={{ ...commonStyles.watchButtonsWrapper }}>
                {
                  running &&
                      <TouchableOpacity onPress={pauseStopwatch} style={{ ...commonStyles.watchButton, backgroundColor:"#0b5edb" }}>
                          <Text style={{ ...commonStyles.watchButtonText, color:"#fefefe" }}>{TEXTS[settingsStore.language].stop}</Text>
                      </TouchableOpacity>
                }
                {
                  !running &&
                    <>
                      {
                        time !== 0 && 
                          <TouchableOpacity onPress={resetStopwatch} style={{ ...commonStyles.watchButton, backgroundColor:"#ca0404" }}>
                              <Text style={{ ...commonStyles.watchButtonText, color:"#fefefe" }}>{TEXTS[settingsStore.language].reestart}</Text>
                          </TouchableOpacity>
                      }
                      <TouchableOpacity style={{ ...commonStyles.watchButton, backgroundColor:"#2501c9" }} onPress={startStopwatch}>
                          <Text style={{ ...commonStyles.watchButtonText, color:"#fefefe" }}>{time===0?TEXTS[settingsStore.language].start:TEXTS[settingsStore.language].continue}</Text>
                      </TouchableOpacity>
                    </>
                }
              </View>
          </View>
      </>
  )
}

