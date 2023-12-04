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
  buttonsText: {
    alignSelf: 'center',
    fontSize: 24,
  },
  helpButton: {
    alignSelf: 'center',
    position: 'absolute',
    bottom: '41%',
  },
  helpButtonText: {
    fontSize: 18,
  },
});