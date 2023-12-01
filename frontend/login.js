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
import TelaAvisoPet from './avisoSemPet.js';

export default function TelaLogin() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigation = useNavigation();

  //Método que é executado quando a pessoa clica em entrar, precisa alterar ele para mandar para o back as infos e logar o usuário.
  const handleLogin = () => {
    /*
    A gente precisa de um tratamento de login aqui.

    A gente precisa de um IF aqui para verificar se o usuário possui um pet ou não para, caso ele não tiver, ele ser direcionado para a tela de aviso que ele não tem nenhum pet.
    if (userHasPet == true { */
    navigation.navigate('Tela Pets');
    /*
  } else {
    navigation.navigate('Aviso Nenhum Pet');  
    }
    */
    console.log(`Email: ${email}, Senha: ${password}`);
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
    backgroundColor: '#B8E8FC',
    alignItems: 'center',
  },
  loginContainer: {
    marginTop: 40,
  },
  input: {
    width: 300,
    height: 50,
    borderRadius: 40,
    paddingLeft: 15,
    backgroundColor: '#B1AFFF',
  },
  passwordButton: {
    textAlign: 'center',
    position: 'absolute',
    marginTop: 25,
  },
  loginButton: {
    width: 300,
    height: 60,
    marginTop: 85,
    backgroundColor: '#B1AFFF',
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 20,
  },
  image: {
    width: 160,
    height: 120,
    alignSelf: 'center',
    marginBottom: 30,
  },
  registerButton: {
    marginTop: 625,
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
  },
});
