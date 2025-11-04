import React, { useState, useEffect } from 'react';

import {
  TextInput, Text, View, Button, StyleSheet, FlatList, TouchableOpacity, Image, ScrollView, Platform
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Card } from 'react-native-paper';

const Tab = createBottomTabNavigator();


const Stack = createStackNavigator();

import DecksScreen from './components/screens/DecksScreen';
import FavoriteDecksScreen from './components/screens/FavoriteDecksScreen';
import ProfileScreen from './components/screens/ProfileScreen';
import EmptyScreen from './components/screens/EmptyScreen';

// ------------------- TELA DE LOGIN -------------------
function LoginScreen({ navigation, setIsUserLoggedIn }) { // navigation added for potential future use
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
          if (setIsUserLoggedIn) {
            setIsUserLoggedIn(true);
          }
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

// ------------------- TELA  CADASTRO 
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

function AppTabs({ setIsUserLoggedIn }) {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: '#FFD700', // Gold
        tabBarInactiveTintColor: '#C0C0C0', // Silver
        tabBarStyle: styles.tabBarClash,
        tabBarLabelStyle: styles.tabBarLabelClash,
        tabBarIcon: ({ color, size }) => {
          let iconName;

          if (route.name === 'Decks') {
            iconName = 'cards-outline';
          } else if (route.name === 'Favoritos') {
            iconName = 'star-outline';
          } else if (route.name === 'Perfil') {
            iconName = 'account-outline';
          } else if (route.name === 'Em Breve') {
            iconName = 'help-circle-outline';
          }

          return <MaterialCommunityIcons name={iconName} color={color} size={size} />;
        },
      })}
    >
      <Tab.Screen name="Decks">
        {props => <DecksScreen {...props} setIsUserLoggedIn={setIsUserLoggedIn} />}
      </Tab.Screen>
      <Tab.Screen name="Favoritos" component={FavoriteDecksScreen} />
      <Tab.Screen name="Perfil" component={ProfileScreen} />
      <Tab.Screen name="Em Breve" component={EmptyScreen} />
    </Tab.Navigator>
  );
}

export default function App() {
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  return (
    <NavigationContainer>
      {isUserLoggedIn ? (
        <AppTabs setIsUserLoggedIn={setIsUserLoggedIn} />
      ) : (
        <Tab.Navigator
          screenOptions={({ route }) => ({
            headerShown: false,
            tabBarActiveTintColor: '#FFD700', // Gold
            tabBarInactiveTintColor: '#C0C0C0', // Silver
            tabBarStyle: styles.tabBarClash,
            tabBarLabelStyle: styles.tabBarLabelClash,
            tabBarIcon: ({ color, size }) => {
              let iconName;

              if (route.name === 'Login') {
                iconName = 'sword-cross'; // More game-like icon
              } else if (route.name === 'Criar Usuário') {
                iconName = 'castle'; // Castle for creating a kingdom/account
              }

              return <MaterialCommunityIcons name={iconName} color={color} size={size} />;
            },
          })}
        >
          <Tab.Screen
            name="Login"
            options={{ title: 'Arena de Batalha' }}
          >
            {props => <LoginScreen {...props} setIsUserLoggedIn={setIsUserLoggedIn} />}
          </Tab.Screen>
          <Tab.Screen
            name="Criar Usuário"
            component={Cadastro}
            options={{ title: 'Novo Recruta' }}
          />
        </Tab.Navigator>
      )}
    </NavigationContainer>
  );
}

// ------------------- ESTILOS CLASH ROYALE -------------------
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