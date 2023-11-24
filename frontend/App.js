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
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import TelaCadastro from './cadastro.js';
import TelaContato from './contato.js';
import TelaLogin from './login.js';

const Stack = createStackNavigator();

function HomeScreen({ navigation }) {
  return (
    <View style={styles.mainContainer}>
      <Text style={styles.title}>
        Bem-vindo(a) à{'\n'}
        {'   '}PetAgenda!
      </Text>
      <Image style={styles.image} source={require('./assets/homeLogo.jpg')} />
      <View style={styles.buttonsContainer}>
        <View style={styles.buttons}>
          <TouchableOpacity
            style={styles.criarContaButton}
            onPress={() => navigation.navigate('Criar Conta')}>
            <Text style={styles.buttonsText}>Criar Conta</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.loginButton}
            onPress={() => navigation.navigate('Login')}>
            <Text style={styles.buttonsText}>Entrar</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Contato')}>
            <Text style={styles.helpButton}>Precisa de ajuda?</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Início"
        screenOptions={{
          headerStyle: {
            backgroundColor: '#B8E8FC', 
          },
        }}
      >
        <Stack.Screen
          name="Início"
          component={HomeScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen name="Criar Conta" component={TelaCadastro} />
        <Stack.Screen name="Login" component={TelaLogin} />
        <Stack.Screen name="Contato" component={TelaContato} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: '#B8E8FC',
  },
  title: {
    alignSelf: 'center',
    marginTop: '25%',
    fontSize: 35,
  },
  buttonsContainer: {
    height: '100%',
    backgroundColor: '#B1AFFF',
    borderTopLeftRadius: 35,
    borderTopRightRadius: 35,
    marginTop: 25,
  },
  image: {
    height: 250,
    width: 250,
    alignSelf: 'center',
    marginTop: 20,
  },
  buttons: {
    alignItems: 'center',
    marginTop: '13%',
  },
  buttonsText: {
    alignSelf: 'center',
    fontSize: 24,
  },
  criarContaButton: {
    backgroundColor: '#B8E8FC',
    width: 275,
    height: 60,
    marginBottom: 30,
    justifyContent: 'center',
    borderRadius: 40,
  },
  loginButton: {
    width: 275,
    height: 60,
    marginBottom: 40,
    borderWidth: 5,
    borderColor: '#B8E8FC',
    justifyContent: 'center',
    borderRadius: 40,
  },
  helpButton: {
    fontSize: 18,
  },
});
