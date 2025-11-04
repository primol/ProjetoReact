
import React, { useState, useEffect } from 'react';
import {
  Text, View, StyleSheet, FlatList, TouchableOpacity, Image
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Card } from 'react-native-paper';

import { decksMaisUsados } from '../../data/decks';

export default function FavoriteDecksScreen({ user }) {

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#303030',
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
  cardClash: {
    marginVertical: 8,
    padding: 15,
    backgroundColor: '#5C4033',
    borderWidth: 3,
    borderColor: '#7B3F00',
    borderRadius: 10,
  },
  deckContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  deckImgClash: {
    width: 60,
    height: 60,
    marginRight: 15,
    borderWidth: 2,
    borderColor: '#FFD700',
    borderRadius: 5,
  },
  deckNomeClash: {
    flex: 1,
    fontSize: 18,
    fontWeight: '800',
    color: '#fff',
  },
});
}