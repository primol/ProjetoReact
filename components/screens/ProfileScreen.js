import React, { useState, useEffect } from 'react';
import {
  Text, View, StyleSheet, TouchableOpacity
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Haptics from 'expo-haptics'; // <-- IMPORTADO AQUI

export default function ProfileScreen({ setIsUserLoggedIn, user }) {
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

  function logout() {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium); // <-- VIBRA AQUI
    if (setIsUserLoggedIn) {
      setIsUserLoggedIn(false);
    }
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
  text: {
    color: 'white',
    fontSize: 18,
    marginBottom: 10,
  },
  buttonClashLogout: {
    backgroundColor: '#8B0000',
    padding: 12,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#FF4500',
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
});
