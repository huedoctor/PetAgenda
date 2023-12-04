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
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import { Dimensions } from 'react-native';


export default function TelaCadastro() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState(false);
  const [toggleCheckBox, setToggleCheckBox] = useState(false);

  const navigation = useNavigation();

  //Esse método é o método que executa quando a pessoa clica em Criar Conta, precisa fazer ele mandar isso pro back e cadastrar o usuário
  const handleRegister = () => {
    console.log(`Nome: ${name}, Email: ${email}, Senha: ${password}`);
  };

  const checkPasswords = () => {
    if (password !== confirmPassword) {
      setPasswordError(true);
    } else {
      setPasswordError(false);
      handleRegister();
    }
  };

  const checkBoxText = <Text>Declaro que li e concordo com os <Text style={{ fontWeight: "bold", color: "black" }}>Termos de Uso</Text> e <Text style={{ fontWeight: "bold", color: "black" }}>Políticas de Privacidade</Text>.</Text>

  return (
    <View style={styles.container}>
      <View style={styles.registerBox}>
        <TextInput
          style={styles.input}
          placeholder="Nome"
          onChangeText={(text) => setName(text)}
          value={name}
        />
        <TextInput
          style={styles.input}
          placeholder="E-mail"
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
        {passwordError && <Text style={styles.passwordError}>As senhas precisam ser iguais</Text>}
        <TextInput
          style={styles.input}
          placeholder="Confirme sua senha"
          secureTextEntry
          onChangeText={(text) => setConfirmPassword(text)}
          value={confirmPassword}
        />
        <TouchableOpacity
          style={[
            styles.button,
            styles.registerButton,
            !toggleCheckBox ? { opacity: 0.5 } : { opacity: 1 },
          ]}
          disabled={!toggleCheckBox}
          onPress={() => {
            checkPasswords();
          }}>
          <Text style={styles.buttonText}>Criar Conta</Text>
        </TouchableOpacity>
        <View style={styles.checkBox}>
          <BouncyCheckbox
            size={20}
            fillColor="#B1AFFF"
            unfillColor="#B8E8FC"
            text={checkBoxText}
            textStyle={{
              textDecorationLine: 'none',
            }}
            innerIconStyle={{ borderWidth: 2 }}
            onPress={(isChecked) => {
              setToggleCheckBox(isChecked);
            }}
          />
        </View>
      </View>
      <View style={styles.loginButton}>
        <Text style={styles.loginButtonText}>
          Já possui uma conta?
        </Text>
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={[styles.loginButtonText, styles.loginButtonText2]}>
            Entrar
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#B8E8FC',
    height: '100%',
  },
  registerBox: {
    alignItems: 'center',
    gap: 30,
    marginTop: 40,
  },
  input: {
    width: 300,
    height: 50,
    borderRadius: 40,
    paddingLeft: 15,
    backgroundColor: '#B1AFFF',
  },
  registerButton: {
    width: 300,
    height: 60,
    marginTop: 20,
    backgroundColor: '#B1AFFF',
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 20,
  },
  checkBox: {
    width: 320,
  },
  loginButton: {
    alignSelf: 'center',
    flexDirection: 'row',
    position: 'absolute',
    marginTop: Dimensions.get('window').height * 0.82,
  },
  loginButtonText: {
    fontSize: 17,
  },
  loginButtonText2: {
    marginLeft: 5,
    fontWeight: 'bold',
  },
  passwordError: {
    color: 'red', position: 'absolute', marginTop: 220, paddingRight: 70,
  },
});
