import React, { useState } from 'react';
import 'react-native-gesture-handler';
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

export default function TelaContato() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Image
        source={{ uri: 'https://i.imgur.com/fRHWOOB.png' }}
        style={styles.image}
      />
      <Text style={styles.title}>AgendaPet</Text>
      <View style={styles.contatoBox}>
        <Text style={styles.contatoTitle}>Contato</Text>
        <Text style={styles.contatoText}>
          Em caso de desejo de contato ou problemas referentes ao nosso
          aplicativo, por favor, contate-nos! Será um prazer lhe atender da
          melhor forma que pudermos.
          {'\n'}
          {'\n'}
          Email para contato:
          {'\n'}
          agendapet@gmail.com
        </Text>
      </View>
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          navigation.goBack();
        }}>
        <Text style={styles.buttonText}>Voltar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  contatoTitle: {
    alignSelf: 'center',
    marginBottom: 35,
    fontSize: 25,
    fontWeight: 'bold',
  },
  contatoBox: {
    backgroundColor: '#F7F5FF',
    borderColor: 'gray',
    borderWidth: 4,
    borderRadius: 10,
    padding: 16,
    marginBottom: 35,
    width: 285,
    alignSelf: 'center',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 35,
    textAlign: 'center',
  },
  contatoText: {
    fontSize: 18,
    marginBottom: 35,
    textAlign: 'justify',
  },
  button: {
    padding: 10,
    width: 150,
    borderRadius: 10,
    alignSelf: 'center',
    alignItems: 'center',
    backgroundColor: '#CAB8F5',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
  image: {
    width: 160,
    height: 120,
    alignSelf: 'center',
    marginBottom: 30,
  },
});
