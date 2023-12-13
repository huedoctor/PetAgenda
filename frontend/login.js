import React, { useEffect, useState } from 'react';
import 'react-native-gesture-handler';
import { View, TextInput, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { useNavigation, CommonActions } from '@react-navigation/native';
import { post } from './util/request.js';
import NavigationKeys from './util/navigationKeys.js';
import userData from './util/userData.js';
import SnackBar from './util/snackBar';


export default function TelaLogin({ route }) {

  const [error, setError] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showSnackBar, setShowSnackBar] = useState(false);

  const navigation = useNavigation();

  const isCadastrado = route.params;

  //Método que é executado quando a pessoa clica em entrar.
  const handleLogin = async () => {
    const res = await post("usuario/login", { "emailUsuario": email, "senhaUsuario": password });
    if (res.ok) {
      const json = await res.json();
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
      setError(true)
    }
  };

  useEffect(() => {
    if (isCadastrado) {
      setShowSnackBar(true)
      setTimeout(() => {
        setShowSnackBar(false);
      }, SnackBar.LENGTH_LONG);
    }
  }, []);

  return (
    <View style={styles.container}>
      {error && <Text style={styles.erro}>E-mail ou senha incorretos</Text>}
      <View style={[styles.loginContainer, error ? { marginTop: 0 } : { marginTop: 30 }]}>
        <TextInput
          style={styles.input}
          inputMode='email'
          placeholder="E-mail"
          placeholderTextColor="#46464C"
          autoCapitalize='none'
          onChangeText={(text) => setEmail(text)}
          value={email}
        />
        <TextInput
          style={[styles.input, { marginTop: 30 }]}
          placeholder="Senha"
          placeholderTextColor="#46464C"
          secureTextEntry
          onChangeText={(text) => setPassword(text)}
          value={password}
        />
      </View>
      <TouchableOpacity onPress={() => [navigation.navigate(NavigationKeys.Contato), setError(false)]}>
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
        <TouchableOpacity onPress={() => [navigation.navigate(NavigationKeys.CriarConta), setError(false)]}>
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
    backgroundColor: '#E4DBF0',
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
  erro: {
    color: 'red',
    marginTop: 12,
    marginRight: 100,
  },
});
