
import React from 'react';
import {
  Text, View, StyleSheet
} from 'react-native';

export default function EmptyScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.tituloClash}>Em breve...</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#303030',
    alignItems: 'center',
    justifyContent: 'center',
  },
  tituloClash: {
    fontSize: 26,
    fontWeight: '900',
    textAlign: 'center',
    marginBottom: 15,
    color: '#FFD700',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 3,
  },
});
