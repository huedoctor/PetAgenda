import React, { useEffect, useState } from 'react';
import 'react-native-gesture-handler';
import { View, TextInput, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { useNavigation, CommonActions } from '@react-navigation/native';
import { post } from './util/request.js';
import NavigationKeys from './util/navigationKeys.js';
import userData from './util/userData.js';
import SnackBar from 'react-native-snackbar-component'


export default function TelaLogin({ route }) {

  const [error, setError] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showSnackBar, setShowSnackBar] = useState(false);

  const navigation = useNavigation();

  const isCadastrado = route.params;

  //Método que é executado quando a pessoa clica em entrar, precisa alterar ele para mandar para o back as infos e logar o usuário.
  const handleLogin = async () => {
    const res = await post("usuario/login", { "emailUsuario": email, "senhaUsuario": password });
    if (res.ok) {
      const json = await res.json();
      console.log(json);
      await userData.setUser(json.nomeUsuario, json.idUsuario)

      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [
            { name: NavigationKeys.TelaPets },
          ],
        })
      );
    } else {
      setError("Usuário ou senha incorretos")
    }
  };

  useEffect(() => {
    if (isCadastrado) {
      console.log('aaaaaaaaaaaaaaaaaaa')
      setShowSnackBar(true)
      setTimeout(() => {
        console.log('bbbbbbbbbbbbbbb')
        setShowSnackBar(false);
      }, 5000);
    }
  },[]);

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
      <TouchableOpacity onPress={() => navigation.navigate(NavigationKeys.Contato)}>
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
        <TouchableOpacity onPress={() => navigation.navigate(NavigationKeys.CriarConta)}>
          <Text style={[styles.registerButtonText, styles.registerButtonText2]}>
            Criar conta
          </Text>
        </TouchableOpacity>
      </View>
      <SnackBar visible={showSnackBar} textMessage="Usuário cadastrado com sucesso" />
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
