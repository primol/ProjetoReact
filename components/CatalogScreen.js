import React from 'react';
import { View, Text, FlatList, Image, StyleSheet } from 'react-native';
import { Card } from 'react-native-paper';

const allCards = [
    { nome: 'Hog Rider', img: require('../imagens_cartas/corredor.jpg') },
    { nome: 'Ice Spirit', img: require('../imagens_cartas/ice.png') },
    { nome: 'Musketeer', img: require('../imagens_cartas/mosque.png') },
    { nome: 'Cannon', img: require('../imagens_cartas/canhao.png') },
    { nome: 'The Log', img: require('../imagens_cartas/log.png') },
    { nome: 'Fireball', img: require('../imagens_cartas/bola.png') },
    { nome: 'Skeletons', img: require('../imagens_cartas/skele.png') },
    { nome: 'Ice Golem', img: require('../imagens_cartas/icegolem.png') },
    { nome: 'Goblin Barrel', img: require('../imagens_cartas/barril.png') },
    { nome: 'Princess', img: require('../imagens_cartas/princesa.png') },
    { nome: 'Inferno Tower', img: require('../imagens_cartas/torrei.png') },
    { nome: 'Rocket', img: require('../imagens_cartas/foguete.png') },
    { nome: 'Knight', img: require('../imagens_cartas/cavaleiro.png') },
    { nome: 'Tornado', img: require('../imagens_cartas/tornado.png') },
    { nome: 'Golem', img: require('../imagens_cartas/golem.png') },
    { nome: 'Baby Dragon', img: require('../imagens_cartas/bebe.png') },
    { nome: 'Lumberjack', img: require('../imagens_cartas/lumber.png') },
    { nome: 'Night Witch', img: require('../imagens_cartas/bruxasomb.png') },
    { nome: 'Lightning', img: require('../imagens_cartas/hogrider.png') },
    { nome: 'Elixir Collector', img: require('../imagens_cartas/elixircolec.png') },
    { nome: 'Mega', img: require('../imagens_cartas/mega.png') },
];

export default function CatalogScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.tituloClash}>Catálogo de Cartas</Text>
      <FlatList
        data={allCards}
        keyExtractor={(item, index) => index.toString()}
        numColumns={3}
        renderItem={({ item }) => (
          <Card style={styles.cardClash}>
            <View style={styles.carta}>
              <Image source={item.img} style={styles.cartaImgClash} />
              <Text style={styles.cartaNomeClash}>{item.nome}</Text>
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
        backgroundColor: '#303030', // Dark background for contrast
    },
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
    cardClash: {
        margin: 4,
        padding: 5,
        backgroundColor: '#5C4033', // Dark wood background for card
        borderWidth: 3,
        borderColor: '#7B3F00', // Darker wood border
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        width: '30%',
    },
    carta: {
        alignItems: 'center',
        padding: 2,
    },
    cartaImgClash: {
        width: 65,
        height: 65,
        borderRadius: 5,
        borderWidth: 1.5,
        borderColor: '#FFD700', // Gold border for card
    },
    cartaNomeClash: {
        fontSize: 10,
        textAlign: 'center',
        color: '#fff',
        fontWeight: '600',
        marginTop: 3,
    },
});
