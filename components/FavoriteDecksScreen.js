import React, { useState, useEffect } from 'react';
import {
  Text, View, StyleSheet, FlatList, TouchableOpacity, Image
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Card } from 'react-native-paper';
import { decksMaisUsados } from '../data/decks';

export default function FavoriteDecksScreen({ user }) {
  const [favoriteDecks, setFavoriteDecks] = useState([]);

  useEffect(() => {
    const loadFavoriteDecks = async () => {
      try {
        const storedLikes = await AsyncStorage.getItem(`deckLikes_${user}`);
        if (storedLikes !== null) {
          const likedDecks = JSON.parse(storedLikes);
          const favoriteDecksArray = Object.keys(likedDecks).filter(deckId => likedDecks[deckId] > 0);
          const favoriteDecksDetails = decksMaisUsados.filter(deck => favoriteDecksArray.includes(deck.id));
          setFavoriteDecks(favoriteDecksDetails);
        }
      } catch (e) {
        console.log('Failed to load favorite decks.', e);
      }
    };
    if (user) {
      loadFavoriteDecks();
    }
  }, [user]);

  return (
    <View style={styles.container}>
      <Text style={styles.tituloClash}>Meus Decks Favoritos</Text>
      <FlatList
        data={favoriteDecks}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Card style={styles.cardClash}>
            <View style={styles.deckContainer}>
              <Image source={item.img} style={styles.deckImgClash} />
              <Text style={styles.deckNomeClash}>{item.nome}</Text>
            </View>
          </Card>
        )}
      />
    </View>
  );
}

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
