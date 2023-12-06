import 'react-native-gesture-handler';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';

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
            onPress={() => navigation.navigate('Criar Conta')}>
            <Text style={styles.buttonTextCadastro}>Criar Conta</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.loginButton}
            onPress={() => navigation.navigate('Login')}>
            <Text style={styles.buttonTextEntrar}>Entrar</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.helpButton}>
        <TouchableOpacity onPress={() => navigation.navigate('Contato')}>
          <Text style={styles.helpButtonText}>Precisa de ajuda?</Text>
        </TouchableOpacity>
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
    flex: 1,
    backgroundColor: '#4A1E91',
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
    marginBottom: 40,
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
    position: 'absolute',
    bottom: '4%',
  },
  helpButtonText: {
    fontSize: 18,
    color: '#FFB400',
  },
  
});