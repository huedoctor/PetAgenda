import { ScrollView } from 'react-native-gesture-handler';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image,
    Dimensions,
    ActivityIndicator,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import NavigationKeys from './util/navigationKeys.js';
import { useEffect, useState } from 'react';
import { get } from './util/request.js';
import { LoadingIndicator } from './components/LoadingIndicator.jsx';


// A lista de pets deve trazer um JSON aqui para que possamos começar a usar a partir dessa tela.
// Nessa tela a gente ta pegando o nome e a espécie para pode fazer os botões.
// Clicando nelas vai mandar pra tela do pet e vai enviar junto os dados do pet clicado pelo ID.

// O FORMATO PRECISA SEGUIR O MESMO FORMATO DO JSON ABAIXO:

// let userPets = [
//     {
//         id: 1,
//         nome: "Dodo",
//         especie: "cachorro",
//         raca: "aaaaaaaa",
//         dataNasc: "00/00/0000",
//         peso: 12.3,
//         sexo: "macho",
//         castradoPet: true,
//     },
// ];

export default function TelaPets() {

    const navigation = useNavigation();

    const [userPets, setUserPets] = useState([]);
    const [userHasPets, setUserHasPets] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const loadData = async () => {
            setLoading(true);
            const res = await get('pet');
            if (res.ok) {
                const pets = await res.json();
                setUserPets(pets);
            }
            setLoading(false);
        }
        loadData();
    }, [])

    useEffect(() => {
        setUserHasPets(userPets.length > 0)
    }, [userPets])

    let content;

    if (loading) {
        content = <ActivityIndicator justifyContent="center" alignSelf="center" />
    } else if (userHasPets) {
        content =
            <ScrollView>
                <View style={styles.containerRow}>
                    {userPets.map((pet, index) => (
                        <TouchableOpacity key={index} onPress={() => navigation.navigate(NavigationKeys.TelaPet, { id: pet.id, })}>
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
    } else {
        content =
            <Image
                source={require('./assets/empty.svg')}
                style={styles.emptyImage}
            />
    }

    return (
        <View style={styles.container}>
            {content}
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