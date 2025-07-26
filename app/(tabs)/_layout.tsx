import { Tabs } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';

import { HapticTab } from '@/components/HapticTab';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

import { useSettingsStore } from '@/store/settingsStore';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';


export default function TabLayout() {
  const colorScheme = useColorScheme();
  const settingsStore = useSettingsStore();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarStyle: Platform.select({
          ios: {
            // Use a transparent background on iOS to show the blur effect
            position: 'absolute',
          },
          default: {},
        }),
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: settingsStore.language == "ES" ? 'cronometro' : 'chrono',
          tabBarIcon: ({ color }) => <MaterialIcons size={28} color={color} name='watch-later' />,
        }}
      />
      <Tabs.Screen
        name="timer"
        options={{
          title: settingsStore.language == "ES" ? "temporizador" : "timer",
          tabBarIcon: ({ color }) => <MaterialIcons size={28} color={color} name='watch-later' />,
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: settingsStore.language == "ES" ? "configuracion" : "config",
          tabBarIcon: ({ color }) => <MaterialIcons size={28} color={color} name='settings' />,
        }}
      />
    </Tabs>
  );
}
