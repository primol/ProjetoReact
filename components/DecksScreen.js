import React, { useState, useEffect } from 'react';
import {
  TextInput, Text, View, Button, StyleSheet, FlatList, TouchableOpacity, Image, ScrollView, Platform
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Card } from 'react-native-paper';
import { decksMaisUsados } from '../data/decks';

export default function DecksScreen({ navigation, user }) {
  const [pesquisa, setPesquisa] = useState('');
  const [deckSelecionado, setDeckSelecionado] = useState(null);
  const [likeCounts, setLikeCounts] = useState({});

  useEffect(() => {
    const loadLikes = async () => {
      try {
        const storedLikes = await AsyncStorage.getItem(`deckLikes_${user}`);
        if (storedLikes !== null) {
          setLikeCounts(JSON.parse(storedLikes));
        }
      } catch (e) {
        console.log('Failed to load likes.', e);
      }
    };
    if (user) {
      loadLikes();
    }
  }, [user]);

  const handleLike = async (deckId) => {
    const newCounts = {
      ...likeCounts,
      [deckId]: (likeCounts[deckId] || 0) + 1,
    };
    setLikeCounts(newCounts);
    try {
      await AsyncStorage.setItem(`deckLikes_${user}`, JSON.stringify(newCounts));
    } catch (e) {
      console.log('Failed to save likes.', e);
    }
  };

  const decksFiltrados = decksMaisUsados.filter((d) =>
    d.nome.toLowerCase().includes(pesquisa.toLowerCase())
  );

  return (
    <View style={styles.container}>
      {Platform.OS === 'web' && (
        <Image
          source={require('../imagens_cartas/coroa.png')}
          style={{ width: 100, height: 100, alignSelf: 'center', marginVertical: 10 }}
        />
      )}
      <Text style={styles.tituloClash}>DECKs MAIS USADOS 🔥</Text>

    
      <TextInput
        style={styles.inputClashSearch}
        placeholder="⚔️ Pesquisar deck..."
        placeholderTextColor="#a09070"
        value={pesquisa}
        onChangeText={setPesquisa}
      />

     
      <FlatList
        data={decksFiltrados}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Card style={styles.cardClash}>
            <TouchableOpacity
              onPress={() =>
                setDeckSelecionado(deckSelecionado === item.id ? null : item.id)
              }
            >
              <View style={styles.deckContainer}>
                <Image source={item.img} style={styles.deckImgClash} />
                <Text style={styles.deckNomeClash}>{item.nome}</Text>
         
                <Image source={require('../imagens_cartas/elixir.png')} style={styles.elixirIcon} />
                <Text style={styles.elixirText}>3.0</Text> 
              </View>
            </TouchableOpacity>

            {/* Like Button */}
            <View style={{flexDirection: 'row', alignItems: 'center', alignSelf: 'flex-end'}}>
              <Text style={{color: 'white', marginRight: 5}}>{likeCounts[item.id] || 0} Likes</Text>
              <TouchableOpacity 
                style={styles.buttonClashSecondary}
                onPress={() => handleLike(item.id)} 
              >
                <Text style={styles.buttonTextSmall}>Curtir Deck</Text>
              </TouchableOpacity>
            </View>

      

            {deckSelecionado === item.id && (
              <View style={styles.cartasContainer}>
                {item.cartas.map((carta, index) => (
                  <View key={index} style={styles.carta}>
                    <Image source={carta.img} style={styles.cartaImgClash} />
                    <Text style={styles.cartaNomeClash}>{carta.nome}</Text>
                  </View>
                ))}
              </View>
            )}
          </Card>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  // --- Geral ---
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#303030', // Dark background for contrast
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  // --- Títulos/Textos ---
  tituloClash: {
    fontSize: 26,
    fontWeight: '900',
    textAlign: 'center',
    marginBottom: 15,
    color: '#FFD700', // Gold/Yellow
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 3,
  },
  // --- Navegação ---
  headerClash: {
    backgroundColor: '#404040', // Dark header
  },
  headerTitleClash: {
    color: '#FFD700',
    fontWeight: 'bold',
    fontSize: 20,
  },
  tabBarClash: {
    backgroundColor: '#404040', // Dark tab bar
    borderTopColor: '#FFD700', // Gold border top
    borderTopWidth: 2,
    height: 60,
  },
  tabBarLabelClash: {
    fontWeight: 'bold',
    fontSize: 12,
  },
  // --- Login/Cadastro ---
  loginBackground: {
    backgroundColor: '#5C4033', // Dark wood/earth tone
    justifyContent: 'center',
    alignItems: 'center',
  },
  gameLogo: {
    width: 200,
    height: 50,
    resizeMode: 'contain',
    marginBottom: 30,
  },
  gameLogoSmall: {
    width: 150,
    height: 40,
    resizeMode: 'contain',
    marginBottom: 20,
  },
  loginCard: {
    backgroundColor: 'rgba(50, 50, 50, 0.85)', // Semi-transparent dark card
    padding: 25,
    borderRadius: 15,
    width: '90%',
    maxWidth: 400,
    borderWidth: 3,
    borderColor: '#FFD700', // Gold border
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 8,
  },
  loginTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#FF6347', // Tomato Red
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  label: {
    color: '#FFD700',
    fontWeight: '600',
    marginTop: 10,
    marginBottom: 5,
  },
  inputClash: {
    backgroundColor: '#707070', // Grey input field
    color: '#fff',
    borderWidth: 2,
    borderColor: '#FFD700',
    padding: 10,
    marginVertical: 8,
    borderRadius: 8,
    fontSize: 16,
  },
  // --- Botões ---
  buttonClashPrimary: {
    backgroundColor: '#FF6347', // Primary Red button
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
    borderWidth: 2,
    borderColor: '#FFA07A', // Lighter red border
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.4,
    shadowRadius: 3,
    elevation: 5,
  },
  buttonClashSecondary: {
    backgroundColor: '#4682B4', // Steel Blue secondary button
    padding: 8,
    borderRadius: 8,
    marginTop: 5,
    borderWidth: 1,
    borderColor: '#ADD8E6', // Light blue border
    alignSelf: 'flex-end',
  },
  buttonClashLogout: {
    backgroundColor: '#8B0000', // Dark Red/Maroon logout button
    padding: 12,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#FF4500', // Orange-Red border
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.4,
    shadowRadius: 3,
    elevation: 5,
  },
  buttonText: {
    color: 'white',
    fontWeight: '900',
    textAlign: 'center',
    fontSize: 16,
  },
  buttonTextSmall: {
    color: 'white',
    fontWeight: '700',
    textAlign: 'center',
    fontSize: 12,
  },
  // --- Decks e Cartas ---
  inputClashSearch: {
    backgroundColor: '#404040',
    color: '#fff',
    borderWidth: 1,
    borderColor: '#FFD700',
    padding: 10,
    marginVertical: 10,
    borderRadius: 20, // Rounded for search bar
    fontSize: 16,
    paddingLeft: 15,
  },
  cardClash: {
    marginVertical: 8,
    padding: 15,
    backgroundColor: '#5C4033', // Dark wood background for card
    borderWidth: 3,
    borderColor: '#7B3F00', // Darker wood border
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.6,
    shadowRadius: 5,
    elevation: 8,
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
    borderColor: '#FFD700', // Gold border for main card image
    borderRadius: 5,
  },
  deckNomeClash: {
    flex: 1,
    fontSize: 18,
    fontWeight: '800',
    color: '#fff',
  },
  elixirIcon: {
    width: 20,
    height: 20,
    marginLeft: 10,
    marginRight: 2,
  },
  elixirText: {
    color: '#FFD700',
    fontWeight: 'bold',
    fontSize: 16,
  },
  cartasContainer: {
    marginTop: 15,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.2)', // Light separator
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  carta: {
    alignItems: 'center',
    width: '24%', // Adjust width for 4 per row
    marginBottom: 10,
    padding: 2,
  },
  cartaImgClash: {
    width: 65,
    height: 65,
    borderRadius: 5,
    borderWidth: 1.5,
    borderColor: '#FFD700', // Gold border for card
    // Add a slight shadow to card image
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 1,
  },
  cartaNomeClash: {
    fontSize: 10,
    textAlign: 'center',
    color: '#fff',
    fontWeight: '600',
    marginTop: 3,
  },
});
