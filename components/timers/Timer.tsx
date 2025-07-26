import { useInitialReloadStateStore } from '@/store/InitialReloadState';
import { commonStyles } from '@/styles/common';
import { convertTimestampToMilitaryTime, formatTime } from '@/utils/formatDate';
import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { WatchTitle } from './WatchTitle';

// ############

export const Timer = ({ id }:{id:string}) => {
  const initialReloadState = useInitialReloadStateStore()
  const [initialTime, setInitialTime] = useState(0);
  const [virtualInitialTime, setVirtualInitialTime] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0
  })
  const [title, setTitle] = useState("");
  const [time, setTime] = useState(initialTime);
  const [running, setRunning] = useState(false);
  const intervalRef = useRef<number>(null);
  const startTimeRef = useRef<number>(0);

  const [lockFirstLoad, setLockFirstLoad] = useState(false)

    const startTimer = () => {
      // Calculate startTimeRef so that the countdown begins from the current 'time'
      startTimeRef.current = Date.now() + time * 1000;
      intervalRef.current = setInterval(() => {
        const remainingTime = Math.ceil((startTimeRef.current - Date.now()) / 1000);
        setTime(remainingTime >= 0 ? remainingTime : 0); // Ensure time doesn't go negative
      }, 1000);
      setRunning(true);
    };

    const startTimerOnFirstLoad = (time:number) => {
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


  // updates store every second
      useEffect(()=>{
        if(!lockFirstLoad) {
          const timerData = initialReloadState.timers[id];
          if(typeof timerData.timer_initial_time === "undefined") return
          
          setTime(timerData.current_time);
          setRunning(timerData.is_running && timerData.current_time > 0);
          setTitle(timerData.title);
          setInitialTime(timerData.timer_initial_time);
          setVirtualInitialTime({
            hours: Math.floor(timerData.timer_initial_time / 3600),
            minutes: Math.floor((timerData.timer_initial_time % 3600) / 60),
            seconds: timerData.timer_initial_time % 60
          });
          setLockFirstLoad(true)
          if(timerData.is_running && timerData.current_time > 0) startTimerOnFirstLoad(timerData.current_time); // start the timer if it was running and has time left
        }

        if(lockFirstLoad) {
          if (time === 0 && running) {
            pauseTimer(); // Automatically stop when time reaches 0
          }
          initialReloadState.updateTimer(id, { current_time: time, is_running: running, type: "timer", timer_initial_time: initialTime, title: title });
        }
      }, [time, running])

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
      initialReloadState.updateTimer(id, { current_time: time, is_running: running, type: "timer", timer_initial_time: initialTime, title: title });
    }
  }, [title]);


  return (
      <>
          <WatchTitle title={title} setTitle={setTitle} />
          {
            initialTime === 0 && (
              <View>
                <View style={{ flexDirection:"row", gap:5 }}>
                  <TextInput style={{...commonStyles.watchTitle, borderBottomColor:"#ccc", borderBottomWidth:1 }} keyboardType='numeric' placeholder='HH' value={virtualInitialTime.hours>0?(virtualInitialTime.hours||0).toString():""} onChangeText={(t)=>setVirtualInitialTime({ ...virtualInitialTime, hours: parseInt(t) })} />
                  <TextInput style={{...commonStyles.watchTitle, borderBottomColor:"#ccc", borderBottomWidth:1 }} keyboardType='numeric' placeholder='MM' value={virtualInitialTime.minutes>0?(virtualInitialTime.minutes||0).toString():""} onChangeText={(t)=>setVirtualInitialTime({ ...virtualInitialTime, minutes: parseInt(t) })} />
                  <TextInput style={{...commonStyles.watchTitle, borderBottomColor:"#ccc", borderBottomWidth:1 }} keyboardType='numeric' placeholder='SS' value={virtualInitialTime.seconds>0?(virtualInitialTime.seconds||0).toString():""} onChangeText={(t)=>setVirtualInitialTime({ ...virtualInitialTime, seconds: parseInt(t) })} />
                </View>
                  <TouchableOpacity
                    style={{
                      alignItems:"flex-end"
                    }}
                    onPress={()=>{
                      const hoursToSeconds = (virtualInitialTime.hours||0) * 3600
                      const minutesToSeconds = (virtualInitialTime.minutes||0) * 60
                      const totalSeconds = hoursToSeconds + minutesToSeconds + virtualInitialTime.seconds
                      setInitialTime(totalSeconds)
                      setTime(totalSeconds)
                      setVirtualInitialTime({ hours:0, minutes: 0, seconds: 0 })
                    }}
                  >
                    <Text style={{ fontSize:16, paddingHorizontal:5, paddingVertical:5, color:"#fefefe", backgroundColor:"#0ebced", borderRadius:5, textAlign:"center", textAlignVertical:"center", marginTop:15  }}>
                      aceptar
                    </Text>
                  </TouchableOpacity>
              </View>
            )
          }
          {
            initialTime !== 0 && (
              <View style={{ justifyContent:"space-between", alignItems:"flex-end" }}>
                  <View style={{ backgroundColor:"white" }}>
                    <Text style={{ fontSize:12, textAlign:"right" }}>
                          temporizador
                    </Text>
                    <Text style={{...commonStyles.watchTime}}>
                      { formatTime(time) }
                    </Text>
                    {
                      running && 
                        <Text style={{ fontSize:12 }}>
                          Finaliza a las { convertTimestampToMilitaryTime((Date.now()/1000) + time) }
                        </Text>
                    }
                  </View>
                  <View style={{ ...commonStyles.watchButtonsWrapper }}>
                    {
                      running &&
                          <TouchableOpacity onPress={pauseTimer} style={{ ...commonStyles.watchButton, backgroundColor:"#0b5edb" }}>
                              <Text style={{ ...commonStyles.watchButtonText, color:"#fefefe" }}>Stop</Text>
                          </TouchableOpacity>
                    }
                    {
                      !running &&
                        <>
                          {
                            time !== initialTime &&
                            <TouchableOpacity onPress={resetTimer} style={{ ...commonStyles.watchButton, backgroundColor:"#ca0404" }}>
                                <Text style={{ ...commonStyles.watchButtonText, color:"#fefefe" }}>Reiniciar</Text>
                            </TouchableOpacity>
                          }
                          <TouchableOpacity onPress={time===0?startTimer:resumeTimer} style={{ ...commonStyles.watchButton, backgroundColor:"#2501c9" }}>
                              <Text style={{ ...commonStyles.watchButtonText, color:"#fefefe" }}>{time===initialTime?"Iniciar":"continuar"}</Text>
                          </TouchableOpacity>
                        </>
                    }
                  </View>
              </View>
            )
          }
      </>
  )
}

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
  },
});
