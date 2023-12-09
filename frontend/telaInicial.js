import 'react-native-gesture-handler';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';
import NavigationKeys from './util/navigationKeys';

export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.mainContainer}>
      <Image
        source={require('./assets/title.png')}
        style={styles.welcomeImage}
      />
      <Image style={styles.image} source={require('./assets/homeLogo.jpg')} />
      <View style={styles.buttonsContainer}>
        <View style={styles.buttons}>
          <TouchableOpacity
            style={styles.criarContaButton}
            onPress={() => navigation.navigate(NavigationKeys.CriarConta)}>
            <Text style={styles.buttonTextCadastro}>Criar Conta</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.loginButton}
            onPress={() => navigation.navigate(NavigationKeys.Login)}>
            <Text style={styles.buttonTextEntrar}>Entrar</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.helpButton}>
          <TouchableOpacity onPress={() => navigation.navigate(NavigationKeys.Contato)}>
            <Text style={styles.helpButtonText}>Precisa de ajuda?</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: 'white',
  },
  welcomeImage: {
    alignSelf: 'center',
    marginTop: '25%',
    width: 300,
    height: 110,
  },
  buttonsContainer: {
    height: '100%',
    backgroundColor: '#4A1E91',
    borderTopLeftRadius: 35,
    borderTopRightRadius: 35,
    marginTop: 25,
  },
  image: {
    height: Dimensions.get('window').height * 0.33,
    width: Dimensions.get('window').height * 0.33,
    alignSelf: 'center',
    marginTop: 20,
  },
  buttons: {
    alignItems: 'center',
    marginTop: '13%',
  },
  criarContaButton: {
    backgroundColor: '#FFB400',
    width: 275,
    height: 60,
    marginBottom: 30,
    justifyContent: 'center',
    borderRadius: 40,
  },
  loginButton: {
    width: 275,
    height: 60,
    marginBottom: Dimensions.get('window').height * 0.045,
    borderWidth: 5,
    borderColor: '#FFB400',
    justifyContent: 'center',
    borderRadius: 40,
  },
  buttonTextCadastro: {
    alignSelf: 'center',
    fontSize: 24,
    color: '#4A1E91',
  },
  buttonTextEntrar: {
    alignSelf: 'center',
    fontSize: 24,
    color: '#FFB400',
  },
  helpButton: {
    alignSelf: 'center',
  },
  helpButtonText: {
    fontSize: 18,
    color: '#FFB400',
  },
});