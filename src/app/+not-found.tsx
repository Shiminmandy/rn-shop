import { Link, Stack } from 'expo-router';
import { View, StyleSheet } from 'react-native';
import React from 'react';

/**
 * If you add a +not-found.tsx file to a route directory, 
 * it will be rendered when a route is not found.
 * 
 */
export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: "Oops! This screen doesn't exist." }} />
      <View style={styles.container}>
        <Link href='/'>Go to home screen</Link>
      </View>
    </>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});