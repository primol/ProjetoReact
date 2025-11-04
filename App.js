import React, { useState, useEffect } from 'react';
import {
  TextInput, Text, View, Button, StyleSheet, FlatList, TouchableOpacity, Image, ScrollView, Platform, Vibration
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Card } from 'react-native-paper';
import CatalogScreen from './components/CatalogScreen';

const Tab = createBottomTabNavigator();

const decksMaisUsados = [
  {
    id: '1',
    nome: 'Deck 2.6 Hog Cycle',
    img: require('./imagens_cartas/hogrider.png'),
    cartas: [
      { nome: 'Hog Rider', img: require('./imagens_cartas/corredor.jpg') },
      { nome: 'Ice Spirit', img: require('./imagens_cartas/ice.png') },
      { nome: 'Musketeer', img: require('./imagens_cartas/mosque.png') },
      { nome: 'Cannon', img: require('./imagens_cartas/canhao.png') },
      { nome: 'The Log', img: require('./imagens_cartas/log.png') },
      { nome: 'Fireball', img: require('./imagens_cartas/bola.png') },
      { nome: 'Skeletons', img: require('./imagens_cartas/skele.png') },
      { nome: 'Ice Golem', img: require('./imagens_cartas/icegolem.png') },
  
    ],
  },
  {
    id: '2',
    nome: 'Deck Log Bait',
    img: require('./imagens_cartas/barril.png'),
    cartas: [
      { nome: 'Goblin Barrel', img: require('./imagens_cartas/barril.png') },
      { nome: 'Princess', img: require('./imagens_cartas/princesa.png') },
      { nome: 'Inferno Tower', img: require('./imagens_cartas/torrei.png') },
      { nome: 'Rocket', img: require('./imagens_cartas/foguete.png') },
      { nome: 'Knight', img: require('./imagens_cartas/cavaleiro.png') },
      { nome: 'Tornado', img: require('./imagens_cartas/tornado.png') },
      { nome: 'Log', img: require('./imagens_cartas/log.png') },
      { nome: 'Ice Spirit', img: require('./imagens_cartas/ice.png') },
    ],
  },
  {
    id: '3',
    nome: 'Deck Golem Beatdown',
    img: require('./imagens_cartas/log.png'),
    cartas: [
      { nome: 'Golem', img: require('./imagens_cartas/golem.png') },
      { nome: 'Baby Dragon', img: require('./imagens_cartas/bebe.png') },
      { nome: 'Lumberjack', img: require('./imagens_cartas/lumber.png') },
      { nome: 'Night Witch', img: require('./imagens_cartas/bruxasomb.png') },
      { nome: 'Lightning', img: require('./imagens_cartas/hogrider.png') },
      { nome: 'Tornado', img: require('./imagens_cartas/tornado.png') },
      { nome: 'Elixir Collector', img: require('./imagens_cartas/elixircolec.png') },
      { nome: 'Mega ', img: require('./imagens_cartas/mega.png') },
    ],
  },

  {
    id: '4',
    nome: 'Mega Barrel',
    img: require('./imagens_cartas/bebe.png'),
    cartas: [
      { nome: 'Goblin Barrel', img: require('./imagens_cartas/barril.png') },
      { nome: 'Baby Dragon', img: require('./imagens_cartas/bebe.png') },
      { nome: 'Lumberjack', img: require('./imagens_cartas/lumber.png') },
      { nome: 'Skeletons', img: require('./imagens_cartas/skele.png') },
      { nome: 'Ice Golem', img: require('./imagens_cartas/icegolem.png') },
      { nome: 'Log', img: require('./imagens_cartas/log.png') },
      { nome: 'Ice Spirit', img: require('./imagens_cartas/ice.png') },
      { nome: 'Mega ', img: require('./imagens_cartas/mega.png') },
    ],
  },

];

import { useFocusEffect } from '@react-navigation/native';

function DecksScreen({ user }) {
  const [pesquisa, setPesquisa] = useState('');
  const [deckSelecionado, setDeckSelecionado] = useState(null);
  const [likeCounts, setLikeCounts] = useState({});

  useFocusEffect(
    React.useCallback(() => {
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
    }, [user])
  );

  const handleLike = async (deckId) => {
    const newCounts = { ...likeCounts };
    if (newCounts[deckId]) {
      delete newCounts[deckId];
    } else {
      newCounts[deckId] = 1;
    }
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
          source={require('./imagens_cartas/coroa.png')}
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
         
                <Image source={require('./imagens_cartas/elixir.png')} style={styles.elixirIcon} />
                <Text style={styles.elixirText}>3.0</Text> 
              </View>
            </TouchableOpacity>

            {/* Like Button */}
            <View style={{flexDirection: 'row', alignItems: 'center', alignSelf: 'flex-end'}}>
              <Text style={{color: 'white', marginRight: 5}}>{likeCounts[item.id] ? '1 Like' : '0 Likes'}</Text>
              <TouchableOpacity 
                style={styles.buttonClashSecondary}
                onPress={() => handleLike(item.id)} 
              >
                <Text style={styles.buttonTextSmall}>{likeCounts[item.id] ? 'Descurtir' : 'Curtir Deck'}</Text>
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

function FavoriteDecksScreen({ user }) {
  const [favoriteDecks, setFavoriteDecks] = useState([]);

  useFocusEffect(
    React.useCallback(() => {
      const loadFavoriteDecks = async () => {
        try {
          const storedLikes = await AsyncStorage.getItem(`deckLikes_${user}`);
          if (storedLikes !== null) {
            const likedDecks = JSON.parse(storedLikes);
            const favoriteDecksArray = Object.keys(likedDecks);
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
    }, [user])
  );

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

function ProfileScreen({ setIsUserLoggedIn, user }) {
  const [registrationDate, setRegistrationDate] = useState(null);

  useEffect(() => {
    const fetchRegistrationDate = async () => {
      const date = await AsyncStorage.getItem(`${user}_registrationDate`);
      if (date) {
        setRegistrationDate(date);
      }
    };
    fetchRegistrationDate();
  }, [user]);

  const calculateDaysRegistered = () => {
    if (!registrationDate) {
      return 0;
    }
    const today = new Date();
    const regDate = new Date(registrationDate);
    const diffTime = Math.abs(today - regDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  async function logout() {
    await AsyncStorage.removeItem('user');
    setIsUserLoggedIn(false);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.tituloClash}>Meu Perfil</Text>
      <Text style={styles.text}>Nome de usuário: {user}</Text>
      <Text style={styles.text}>Dias registrado: {calculateDaysRegistered()}</Text>
      <TouchableOpacity
        style={styles.buttonClashLogout}
        onPress={logout}
      >
        <Text style={styles.buttonText}>SAIR (LOGOUT)</Text>
      </TouchableOpacity>
    </View>
  );
}

function EmptyScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.tituloClash}>Em breve...</Text>
    </View>
  );
}

function DeckBuilderScreen({ user }) {
  const [selectedCards, setSelectedCards] = useState([]);
  const [deckName, setDeckName] = useState('');

  const allCards = decksMaisUsados.flatMap(deck => deck.cartas);

  const handleCardSelection = (card) => {
    if (selectedCards.length < 8) {
      setSelectedCards([...selectedCards, card]);
    }
  };

  const saveDeck = async () => {
    if (selectedCards.length === 8 && deckName) {
      const newDeck = { id: Date.now().toString(), nome: deckName, cartas: selectedCards, img: selectedCards[0].img };
      try {
        const userDecks = await AsyncStorage.getItem(`userDecks_${user}`);
        const decks = userDecks ? JSON.parse(userDecks) : [];
        decks.push(newDeck);
        await AsyncStorage.setItem(`userDecks_${user}`, JSON.stringify(decks));
        alert('Deck salvo com sucesso!');
        setSelectedCards([]);
        setDeckName('');
      } catch (e) {
        console.log('Failed to save deck.', e);
      }
    } else {
      alert('Selecione 8 cartas and dê um nome ao seu deck.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.tituloClash}>Crie seu Deck</Text>
      <TextInput
        style={styles.inputClash}
        placeholder="Nome do Deck"
        value={deckName}
        onChangeText={setDeckName}
      />
      <View style={{ height: 200 }}>
        <FlatList
          data={allCards}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => handleCardSelection(item)}>
              <Image source={item.img} style={{ width: 50, height: 50 }} />
            </TouchableOpacity>
          )}
          horizontal
        />
      </View>
      <Text style={styles.text}>Cartas Selecionadas: {selectedCards.length}/8</Text>
      <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
        {selectedCards.map((card, index) => (
          <Image key={index} source={card.img} style={{ width: 50, height: 50, margin: 5 }} />
        ))}
      </View>
      <TouchableOpacity style={styles.buttonClashPrimary} onPress={saveDeck}>
        <Text style={styles.buttonText}>Salvar Deck</Text>
      </TouchableOpacity>
    </View>
  );
}

function LoginScreen({ setIsUserLoggedIn, setUser }) {
  const [usuario, setUsuario] = useState('');
  const [senha, setSenha] = useState('');
  const [loading, setLoading] = useState(false);

  async function ler() {
    if (!usuario || !senha) {
      alert('Preencha usuário e senha!');
      return;
    }
    try {
      setLoading(true);
      const senhaArmazenada = await AsyncStorage.getItem(usuario);
      if (senhaArmazenada !== null) {
        if (senhaArmazenada === senha) {
          await AsyncStorage.setItem('user', usuario);
          setUser(usuario);
          setIsUserLoggedIn(true);
          Vibration.vibrate();
        } else {
          alert('Senha incorreta!');
        }
      } else {
        alert('Usuário não encontrado! Tente criar uma conta.');
      }
    } catch (e) {
      console.log(e);
      alert('Ocorreu um erro ao tentar logar.');
    }
    setLoading(false);
  }

  return (
    <View style={[styles.container, styles.loginBackground]}>
      <Image
        source={{ uri: 'coroa.png' }}
        style={styles.gameLogo}
      />
      <View style={styles.loginCard}>
        <Text style={styles.loginTitle}>Melhores Decks!</Text>
        <Text style={styles.label}>Nome do Usuario:</Text>
        <TextInput
          style={styles.inputClash}
          value={usuario}
          onChangeText={setUsuario}
          placeholderTextColor="#a09070"
          autoCapitalize="none"
        />
        <Text style={styles.label}>Senha:</Text>
        <TextInput
          style={styles.inputClash}
          value={senha}
          onChangeText={setSenha}
          placeholderTextColor="#a09070"
          secureTextEntry
        />
        <TouchableOpacity
          style={styles.buttonClashPrimary}
          onPress={ler}
          disabled={loading}
        >
          <Text style={styles.buttonText}>{loading ? 'Aguarde...' : 'Login'}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

function Cadastro() {
  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');

  async function gravar() {
    if (!user || !password) {
      alert('Entradas estao vazias');
      return;
    }
    try {
      await AsyncStorage.setItem(user, password);
      const registrationDate = new Date().toISOString();
      await AsyncStorage.setItem(`${user}_registrationDate`, registrationDate);
      alert('Usuário criado .');
      setUser('');
      setPassword('');
    } catch (e) {
      alert('Erro');
    }
  }

  return (
    <View style={[styles.container, styles.loginBackground]}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Image 
          source={{ uri: 'https://upload.wikimedia.org/wikipedia/en/thumb/e/ee/Clash_Royale_logo.svg/1200px-Clash_Royale_logo.svg.png' }}
          style={styles.gameLogoSmall}
        />
        <View style={styles.loginCard}>
          <Text style={styles.loginTitle}>REGISTRAR NO ROYALE</Text>
          <Text style={styles.label}>NOVO NOME DE JOGADOR:</Text>
          <TextInput
            style={styles.inputClash}
            value={user}
            onChangeText={setUser}
            placeholder=" seu usuário..."
            placeholderTextColor="#a09070"
            autoCapitalize="none"
          />
          <Text style={styles.label}>SENHA:</Text>
          <TextInput
            style={styles.inputClash}
            value={password}
            onChangeText={setPassword}
            placeholder=" sua senha..."
            placeholderTextColor="#a09070"
            secureTextEntry
          />
          <TouchableOpacity
            style={styles.buttonClashPrimary}
            onPress={gravar}
          >
            <Text style={styles.buttonText}>Cadastrar</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

export default function App() {
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkLogin = async () => {
      const storedUser = await AsyncStorage.getItem('user');
      if (storedUser) {
        setUser(storedUser);
        setIsUserLoggedIn(true);
      }
      setLoading(false);
    };
    checkLogin();
  }, []);

  if (loading) {
    return (
      <View style={styles.container}>
        <Text style={styles.tituloClash}>Carregando...</Text>
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarActiveTintColor: '#FFD700', // Gold
          tabBarInactiveTintColor: '#C0C0C0', // Silver
          tabBarStyle: styles.tabBarClash,
          tabBarLabelStyle: styles.tabBarLabelClash,
          tabBarIcon: ({ color, size }) => {
            let iconName;

            if (isUserLoggedIn) {
              if (route.name === 'Decks') {
                iconName = 'cards-outline';
              } else if (route.name === 'Favoritos') {
                iconName = 'star-outline';
              } else if (route.name === 'Catálogo') {
                iconName = 'books-outline';
              } else if (route.name === 'Perfil') {
                iconName = 'account-outline';
              } else if (route.name === 'Em Breve') {
                iconName = 'help-circle-outline';
              }
            } else {
              if (route.name === 'Login') {
                iconName = 'sword-cross'; // More game-like icon
              } else if (route.name === 'Criar Usuário') {
                iconName = 'castle'; // Castle for creating a kingdom/account
              }
            }

            return <MaterialCommunityIcons name={iconName} color={color} size={size} />;
          },
        })}
      >
        {isUserLoggedIn ? (
          <>
            <Tab.Screen name="Decks">
              {props => <DecksScreen {...props} user={user} />}
            </Tab.Screen>
            <Tab.Screen name="Favoritos">
              {props => <FavoriteDecksScreen {...props} user={user} />}
            </Tab.Screen>
            <Tab.Screen name="Catálogo" component={CatalogScreen} />
            <Tab.Screen name="Perfil">
              {props => <ProfileScreen {...props} setIsUserLoggedIn={setIsUserLoggedIn} user={user} />}
            </Tab.Screen>
          </>
        ) : (
          <>
            <Tab.Screen
              name="Login"
              options={{ title: 'Arena de Batalha' }}
            >
              {props => <LoginScreen {...props} setIsUserLoggedIn={setIsUserLoggedIn} setUser={setUser} />}
            </Tab.Screen>
            <Tab.Screen
              name="Criar Usuário"
              component={Cadastro}
              options={{ title: 'Novo Recruta' }}
            />
          </>
        )}
      </Tab.Navigator>
    </NavigationContainer>
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
    marginTop: 20,
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
  text: {
    color: 'white',
    fontSize: 18,
    marginBottom: 10,
  },
});
