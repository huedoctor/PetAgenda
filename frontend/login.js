import React, { useState } from 'react';
import 'react-native-gesture-handler';
import { View, TextInput, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Dimensions } from 'react-native';
import { post } from './util/request.js';

export default function TelaLogin() {

  const [error, setError] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigation = useNavigation();

  //Método que é executado quando a pessoa clica em entrar, precisa alterar ele para mandar para o back as infos e logar o usuário.
  const handleLogin = async () => {
    const res = await post("usuario/login",{"emailUsuario": email,"senhaUsuario": password});
     if (res.ok) {
       const json = await res.json();
       console.log(`Nome: ${json.nomeUsuario}, ID: ${json.idUsuario}`);
       console.log(`${json}`);
       navigation.navigate('Tela Pets');
     } else {
       setError("Usuário ou senha incorretos")
     }
    navigation.navigate("Tela Pets");
  };

  return (
    <View style={styles.container}>
      <View style={styles.loginContainer}>
        <TextInput
          style={styles.input}
          placeholder="E-mail"
          onChangeText={(text) => setEmail(text)}
          value={email}
        />
        <TextInput
          style={[styles.input, { marginTop: 30 }]}
          placeholder="Senha"
          secureTextEntry
          onChangeText={(text) => setPassword(text)}
          value={password}
        />
      </View>
      <TouchableOpacity onPress={() => navigation.navigate('Contato')}>
        <Text style={styles.passwordButton}>Esqueceu sua senha?</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.loginButton}
        onPress={handleLogin}>
        <Text style={styles.buttonText}>Entrar</Text>
      </TouchableOpacity>
      <View style={styles.registerButton}>
        <Text style={styles.registerButtonText}>
          Ainda não possui uma conta?
        </Text>
        <TouchableOpacity onPress={() => navigation.navigate('Criar Conta')}>
          <Text style={[styles.registerButtonText, styles.registerButtonText2]}>
            Criar conta
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    backgroundColor: 'white',
    alignItems: 'center',
  },
  loginContainer: {
    marginTop: 30,
  },
  input: {
    width: 300,
    height: 50,
    borderRadius: 40,
    paddingLeft: 15,
    backgroundColor: '#CAC1D6',
  },
  passwordButton: {
    textAlign: 'center',
    position: 'absolute',
    color: '#4A1E91',
    marginTop: 25,
  },
  loginButton: {
    width: 300,
    height: 60,
    marginTop: 85,
    backgroundColor: '#4A1E91',
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 20,
    color: '#FFFFFF',
  },
  image: {
    width: 160,
    height: 120,
    alignSelf: 'center',
    marginBottom: 30,
  },
  registerButton: {
    marginTop: Dimensions.get('window').height * 0.82,
    alignSelf: 'center',
    flexDirection: 'row',
    position: 'absolute',
  },
  registerButtonText: {
    fontSize: 17,
  },
  registerButtonText2: {
    marginLeft: 5,
    fontWeight: 'bold',
    color: '#4A1E91',
  },
});
