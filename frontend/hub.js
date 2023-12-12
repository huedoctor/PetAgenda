import { ScrollView } from 'react-native-gesture-handler';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image,
    Dimensions,
    ActivityIndicator,
    Pressable,
    SafeAreaView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import NavigationKeys from './util/navigationKeys.js';
import { useEffect, useState } from 'react';
import { get } from './util/request.js';
import { LoadingIndicator } from './components/LoadingIndicator.jsx';
import SnackBar from './util/snackBar.js';


// A lista de pets deve trazer um JSON aqui para que possamos começar a usar a partir dessa tela.
// Nessa tela a gente ta pegando o nome e a espécie para pode fazer os botões.
// Clicando nelas vai mandar pra tela do pet e vai enviar junto os dados do pet clicado pelo ID.

export default function TelaPets({ route }) {

    const navigation = useNavigation();

    const [userPets, setUserPets] = useState([]);
    const [userHasPets, setUserHasPets] = useState(false);
    const [loading, setLoading] = useState(false);
    const [showSnackBar, setShowSnackBar] = useState(false);
    const [snackMessage, setSnackMessage] = useState('');

    useEffect(() => {
        let showFeedback = false;

        if (route.params?.petCadastrado) {
            setSnackMessage('Pet cadastrado com sucesso.');
            showFeedback = true;
        }

        if (route.params?.petDeletado) {
            setSnackMessage('Pet excluído com sucesso.');
            showFeedback = true;
        }

        if (showFeedback) {
            setShowSnackBar(true);
            setTimeout(() => {
                setShowSnackBar(false);
            }, SnackBar.LENGTH_LONG);
        }
    }, [route.params])

    useEffect(() => {
        const loadData = async () => {
            setLoading(true);
            const res = await get('pet');
            if (res.ok) {
                console.log(res.body);
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
            <SafeAreaView style={{flex: 1}}>
                <ScrollView>
                    <View style={styles.configRow}>
                        <Pressable
                            style={styles.configButton}
                            onPress={() => navigation.navigate(NavigationKeys.Infos)}>
                            <Image
                                style={styles.configImage}
                                source={require('./assets/gearshape.png')} />
                        </Pressable>
                    </View>
                    <View style={styles.containerRow}>
                        {userPets.map((pet, index) => (
                            <TouchableOpacity key={index} onPress={() => navigation.navigate(NavigationKeys.TelaPet, { id: pet.idPet, })}>
                                <View style={styles.petConteiner}>
                                    <Image
                                        style={styles.petConteinerImg}
                                        source={pet.especie.nomeEspecie.toLowerCase() === 'cachorro' ?
                                            require('./assets/petDogIcon.jpg') :
                                            require('./assets/petCatIcon.jpg')}
                                    />
                                    <Text style={styles.petConteinerTxt}>
                                        {pet.nomePet}
                                    </Text>
                                </View>
                            </TouchableOpacity>
                        ))}
                    </View>
                    <SnackBar textMessage={snackMessage} visible={showSnackBar} />
                </ScrollView>
            </SafeAreaView>
    } else {
        content =
            <View style={styles.emptyImageConteiner}>
                <Image
                    source={require('./assets/sadPet.png')}
                    style={styles.emptyImage}
                />
                <View>

                </View>
                <Text style={styles.messageTitle}>Nenhum pet encontrado...</Text>
                <Text style={styles.messageText}>{"\n"}Clique no botão no canto superior direito da tela para poder começar a cadastrar seus pets.</Text>
            </View>

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
    },
    configRow: {
        flex: 1,
        alignSelf: 'stretch',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'flex-end'
    },
    configButton: {
        height: 24,
        width: 24,
        margin: 2,
        alignSelf: 'stretch',
        marginTop: 6,
        marginRight: 10,
    },
    configImage: {
        width: 24,
        height: 24,
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
    },
    emptyImageConteiner: {
        flex: 1,
        justifyContent: 'center'
    },
    emptyImage: {
        width: 150,
        height: 150,
        marginBottom: 10,
        alignSelf: 'center',
        opacity: 0.5,
    },
    messageTitle: {
        alignSelf: 'center',
        marginTop: 5,
        fontSize: 20,
        opacity: 0.5,
    },
    messageText: {
        alignSelf: 'center',
        width: 250,
        textAlign: 'center',
        fontSize: 15,
        opacity: 0.5,
    },
});