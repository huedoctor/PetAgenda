import { ScrollView } from 'react-native-gesture-handler';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image,
    Dimensions,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import NavigationKeys from './util/navigationKeys.js';


// A lista de pets deve trazer um JSON aqui para que possamos começar a usar a partir dessa tela.
// Nessa tela a gente ta pegando o nome e a espécie para pode fazer os botões.
// Clicando nelas vai mandar pra tela do pet e vai enviar junto os dados do pet clicado pelo ID.

// O FORMATO PRECISA SEGUIR O MESMO FORMATO DO JSON ABAIXO:

let userPets = [
    {
        id: 1,
        nome: "Dodo",
        especie: "cachorro",
        raca: "aaaaaaaa",
        dataNasc: "00/00/0000",
        peso: 12.3,
        sexo: "macho",
        castradoPet: true,

    },
    {
        id: 1,
        nome: "Belinha",
        raca: "bbbbbbbbbbb",
        especie: "gato",
        dataNasc: "22/22/2222",
        peso: 10.3,
        sexo: "femea",
        castradoPet: false,
    },
    {
        id: 1,
        nome: "Belinha",
        raca: "bbbbbbbbbbb",
        especie: "gato",
        dataNasc: "22/22/2222",
        peso: 10.3,
        sexo: "femea",
        castradoPet: false,
    },
    {
        id: 2,
        nome: "Belinha",
        raca: "bbbbbbbbbbb",
        especie: "gato",
        dataNasc: "22/22/2222",
        peso: 10.3,
        sexo: "femea",
        castradoPet: false,
    },

];

export default function TelaPets() {

    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            <ScrollView>
                <View style={styles.containerRow}>
                    {userPets.map((pet, index) => (
                        <TouchableOpacity key={index} onPress={() => navigation.navigate(NavigationKeys.TelaPet, { 
                            id: pet.id,
                            nome: pet.nome,
                            especie: pet.especie,
                            raca: pet.raca,
                            dataNasc: pet.dataNasc,
                            peso: pet.peso,
                            sexo: pet.sexo,
                            castradoPet: pet.castradoPet,
                            })}>
                            <View style={styles.petConteiner}>
                                <Image
                                    style={styles.petConteinerImg}
                                    source={pet.especie === 'cachorro' ?
                                        require('./assets/petDogIcon.jpg') :
                                        require('./assets/petCatIcon.jpg')}
                                />
                                <Text style={styles.petConteinerTxt}>
                                    {pet.nome}
                                </Text>
                            </View>
                        </TouchableOpacity>
                    ))}
                </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    containerRow: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'flex-start',
        
    },
    petConteiner: {
        alignItems: 'center',
        marginTop: 20,
        marginBottom: Dimensions.get('window').height * 0.05,
        marginLeft: Dimensions.get('window').height * 0.037,
    },
    petConteinerImg: {
        width: 150,
        height: 150,
    },
    petConteinerTxt: {
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 10,
        color: '#4A1E91',
    }
});