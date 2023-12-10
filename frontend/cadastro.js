import React, { useEffect, useState } from 'react';
import 'react-native-gesture-handler';
import { View, TextInput, Text, StyleSheet, TouchableOpacity, ActivityIndicator, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { post } from './util/request';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import NavigationKeys from './util/navigationKeys';
import SnackBar from 'react-native-snackbar-component'

export default function TelaCadastro() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState(false);
  const [toggleCheckBox, setToggleCheckBox] = useState(false);
  const [submitEnabled, setSubmitEnabled] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showSnackBar, setShowSnackBar] = useState(false);

  useEffect(() => {
    if (name.length == 0) {
      setSubmitEnabled(false);
      return;
    }
    if (email.length == 0) {
      setSubmitEnabled(false);
      return;
    }
    if (password.length == 0) {
      setSubmitEnabled(false);
      return;
    }
    if (confirmPassword.length == 0) {
      setSubmitEnabled(false);
      return;
    }
    if (passwordError) {
      setSubmitEnabled(false);
      return;
    }
    if (!toggleCheckBox) {
      setSubmitEnabled(false);
      return;
    }
    setSubmitEnabled(true);


  }, [name, email, password, confirmPassword, passwordError, toggleCheckBox]);

  useEffect(() => {
    checkPasswords();
  }, [password, confirmPassword]);

  const navigation = useNavigation();

  const sendData = async () => {
    setLoading(true);
    const res = await post("usuario/cadastro", {
      "emailUsuario": email,
      "senhaUsuario": password,
      "nomeUsuario": name
    });
    setLoading(false);
    if (res.ok) {
      navigation.navigate(NavigationKeys.Login, {isCadastrado: true});
    } else {
      setShowSnackBar(true);
      setTimeout(() => {
        setShowSnackBar(false);
      }, 5000);
    }
  }

  //Esse método é o método que executa quando a pessoa clica em Criar Conta, precisa fazer ele mandar isso pro back e cadastrar o usuário
  const handleRegister = () => {
    sendData();
  };

  const checkPasswords = () => {
    if (confirmPassword.length > 0 && password !== confirmPassword) {
      setPasswordError(true);
    } else {
      setPasswordError(false);
    }
  };

  const onSubmitClicked = () => {
    checkPasswords();
    console.log(passwordError);

    if (!passwordError) {
      handleRegister();
    }
  };

  const checkBoxText = <Text style={{ color: '#4A1E91' }}>Declaro que li e concordo com os <Text style={{ fontWeight: "bold" }}>Termos de Uso</Text> e <Text style={{ fontWeight: "bold" }}>Políticas de Privacidade</Text>.</Text>

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
        <View style={styles.submitContainer}>
          {loading
            ? <ActivityIndicator size="large" />
            : <TouchableOpacity
              style={[
                styles.button,
                styles.registerButton,
                !submitEnabled ? { opacity: 0.5 } : { opacity: 1 },
              ]}
              disabled={!submitEnabled}
              onPress={onSubmitClicked}>
              <Text style={styles.buttonText}>Criar Conta</Text>
            </TouchableOpacity>}
        </View>
        <View style={styles.checkBox}>
          <BouncyCheckbox
            size={20}
            fillColor="#4A1E91"
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
        <TouchableOpacity onPress={() => navigation.navigate(navigationKeys.Login)}>
          <Text style={[styles.loginButtonText, styles.loginButtonText2]}>
            Entrar
          </Text>
        </TouchableOpacity>
      </View>
      <SnackBar visible={showSnackBar} textMessage="Não foi possível cadastrar a conta"/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    height: '100%',
  },
  registerBox: {
    alignItems: 'center',
    gap: 30,
    marginTop: 30,
  },
  input: {
    width: 300,
    height: 50,
    borderRadius: 40,
    paddingLeft: 15,
    backgroundColor: '#CAC1D6',
  },
  registerButton: {
    width: 300,
    height: 60,
    backgroundColor: '#4A1E91',
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
    color: '#4A1E91',
  },
  passwordError: {
    color: 'red', position: 'absolute', marginTop: 220, paddingRight: 70,
  },
  submitContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 60,
    marginTop: 20,
  },
});
