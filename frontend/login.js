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
import TelaCadastro from './cadastro.js';
import TelaContato from './contato.js';

export default function TelaLogin() {
  const navigation = useNavigation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  //Método que é executado quando a pessoa clica em entrar, precisa alterar ele para mandar para o back as infos e logar o usuário.
  const handleLogin = () => {
    console.log(`Email: ${email}, Senha: ${password}`);
  };

  //Precisa adicionar os tratamentos do login

  return (
    <View style={styles.container}>
      <Image
        source={{ uri: 'https://i.imgur.com/fRHWOOB.png' }}
        style={styles.image}
      />
      <Text style={styles.title}>AgendaPet</Text>
      <View style={styles.loginBox}>
        <Text style={styles.loginTitle}>Login</Text>
        <TextInput
          style={[styles.input, styles.emailInput]}
          placeholder="Email"
          onChangeText={(text) => setEmail(text)}
          value={email}
        />
        <TextInput
          style={styles.input}
          placeholder="Senha"
          secureTextEntry
          onChangeText={(text) => setPassword(text)}
          value={password}
        />
        <TouchableOpacity onPress={() => navigation.navigate('Contato')}>
          <Text style={styles.link}>Esqueceu sua senha?</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, styles.loginButton]}
          onPress={handleLogin}>
          <Text style={styles.buttonText}>Entrar</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        style={[styles.button, styles.createAccountButton]}
        onPress={() => navigation.navigate('Cadastro')}>
        <Text style={styles.buttonText}>Criar Conta</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Contato')}>
        <Text style={styles.link}>Contate-nos!</Text>
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
  loginTitle: {
    alignSelf: 'center',
    marginBottom: 35,
    fontSize: 25,
    fontWeight: 'bold',
  },
  loginBox: {
    backgroundColor: '#F7F5FF',
    borderColor: 'gray',
    borderWidth: 4,
    borderRadius: 10,
    padding: 16,
    marginBottom: 16,
    width: 285,
    alignSelf: 'center',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 35,
    textAlign: 'center',
  },
  input: {
    height: 40,
    marginBottom: 16,
    paddingLeft: 8,
    backgroundColor: '#DCDBFF',
    borderRadius: 20,
  },
  emailInput: {
    marginBottom: 20,
  },
  link: {
    color: 'black',
    textAlign: 'center',
    marginBottom: 16,
  },
  button: {
    padding: 10,
    width: 150,
    borderRadius: 10,
    alignItems: 'center',
    backgroundColor: '#CAB8F5',
  },
  loginButton: {
    alignSelf: 'center',
  },
  createAccountButton: {
    alignSelf: 'center',
    marginBottom: 10,
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
