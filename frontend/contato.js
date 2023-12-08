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
      <View style={styles.contatoBox}>
        <Text style={styles.contatoText}>
          Em caso de desejo de contato ou problemas referentes ao nosso
          aplicativo, por favor, contate-nos! Será um prazer lhe atender da
          melhor forma que pudermos.
          {'\n'}
          {'\n'}
          Email para contato:
          {'\n'}
          <Text style={{ fontWeight: "bold" }}>agendapet@gmail.com</Text>
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  contatoBox: {
    backgroundColor: '#ECC683',
    borderRadius: 40,
    padding: 16,
    marginBottom: 35,
    width: 285,
    alignSelf: 'center',
  },
  contatoText: {
    fontSize: 20,
    textAlign: 'justify',
    marginVertical: 15,
    marginHorizontal: 10,
    color: '#4A1E91'
  },
});
