import { Tabs } from 'expo-router';
import { theme } from '../../constants/theme';
import { View } from 'react-native';

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: theme.colors.surface,
          borderTopColor: theme.colors.border,
          height: 60,
          paddingBottom: 8,
        },
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: theme.colors.textMuted,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => (
            <View style={{ width: 24, height: 24, backgroundColor: color, borderRadius: 12 }} />
          ),
        }}
      />
      <Tabs.Screen
        name="diet"
        options={{
          title: 'Diet',
          tabBarIcon: ({ color }) => (
            <View style={{ width: 24, height: 24, backgroundColor: color, borderRadius: 4 }} />
          ),
        }}
      />
      <Tabs.Screen
        name="training"
        options={{
          title: 'Workout',
          tabBarIcon: ({ color }) => (
            <View style={{ width: 24, height: 24, backgroundColor: color, borderRadius: 12, transform: [{ scaleY: 0.5 }] }} />
          ),
        }}
      />
      <Tabs.Screen
        name="calculator"
        options={{
          title: 'Calc',
          tabBarIcon: ({ color }) => (
            <View style={{ width: 20, height: 24, backgroundColor: color }} />
          ),
        }}
      />
      <Tabs.Screen
        name="ai"
        options={{
          title: 'AI',
          tabBarIcon: ({ color }) => (
            <View style={{ width: 24, height: 24, borderRadius: 12, borderWidth: 2, borderColor: color }} />
          ),
        }}
      />
      <Tabs.Screen
        name="progress"
        options={{
          title: 'Stats',
          tabBarIcon: ({ color }) => (
            <View style={{ width: 16, height: 24, borderBottomWidth: 3, borderLeftWidth: 3, borderColor: color }} />
          ),
        }}
      />
    </Tabs>
  );
}
