import 'react-native-gesture-handler';
import { View, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function TelaContato() {

  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.contatoBox}>
        <Text style={styles.contatoText}>
          Para esclarecer quaisquer dúvidas ou problemas referentes ao aplicativo e exclusão de conta entre em contato através do email: 
          {'\n'}
          <Text style={{ fontWeight: "bold" }}>pet.agenda@gmail.com</Text>
          {'\n\n'}
          <Text style={styles.contatoText}>Será um prazer lhe atender da melhor forma!
          </Text>
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingHorizontal: '8%',
    paddingVertical: '10%',
    paddingBottom: 30,
    minHeight: '100%',
  },
  contatoBox: {
    backgroundColor: '#ECC683',
    borderRadius: 40,
    padding: 16,
    marginBottom: 35,
    width: 285,
    alignSelf: 'center',
  },
  contatoText: {
    fontSize: 20,
    textAlign: 'justify',
    marginVertical: 15,
    marginHorizontal: 10,
    color: '#4A1E91'
  },
});
