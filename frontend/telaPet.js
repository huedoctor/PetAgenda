import React, { useState, useEffect } from 'react';
import {
    View,
    TextInput,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image,
} from 'react-native';
import { useNavigation, CommonActions } from '@react-navigation/native';
import BouncyCheckbox from "react-native-bouncy-checkbox";
import NavigationKeys from './util/navigationKeys';
import LoadingIndicator from './components/LoadingIndicator';
import { get, del, put } from './util/request.js'
import SnackBar from './util/snackBar';


export default function TelaPet({ route }) {

    const [novoPeso, setNovoPeso] = useState(null);
    const [novoNome, setNovoNome] = useState(null);
    const [isCastrado, setIsCastrado] = useState(false);
    const [pet, setPet] = useState({});
    const [loading, setLoading] = useState(false);
    const [sexoPet, setSexoPet] = useState(null);
    const [showSnackBar, setShowSnackBar] = useState(false);

    const navigation = useNavigation();

    const { id } = route.params;

    useEffect(() => {
        const loadData = async () => {
            setLoading(true);
            const res = await get(`pet/${id}`);
            if (res.ok) {
                const petJSON = await res.json();
                setPet(petJSON);
            }
            setLoading(false);
        }
        loadData();
    }, [])

    const handleEditaPet = () => {
        console.log(`Novo nome do pet: ${novoNome}\nNovo peso do pet: ${novoPeso}\nFoi castrado? ${isCastrado}`);
    };

    const handleDeletePet = () => {
        const loadData = async () => {
            setLoading(true);
            const res = await del(`pet/${id}`);
            if (res.ok) {
                navigation.dispatch(
                    CommonActions.reset({
                        index: 0,
                        routes: [
                            {
                                name: NavigationKeys.TelaPets,
                                params: { petDeletado: true }
                            }
                        ],
                    })
                );
            } else {
                setShowSnackBar(true);
                setTimeout(() => {
                    setShowSnackBar(false);
                }, SnackBar.LENGTH_LONG);
            }
            setLoading(false);
        }
        loadData();
    }

    const handleVerificaCastrado = () => {
        if (pet.castradoPet) {
            return (
                <Text>Sim</Text>
            );
        } else {
            return (
                <View>
                    <Text>Não</Text>
                    <BouncyCheckbox
                        style={{ marginTop: 5 }}
                        size={15}
                        fillColor="purple"
                        text="Foi castrado"
                        iconStyle={{ borderColor: "red" }}
                        onPress={() => { setIsCastrado(true) }}
                        textStyle={{
                            textDecorationLine: 'none',
                            fontSize: 14,
                        }}
                        textContainerStyle={{
                            marginLeft: 5,
                        }}
                    />
                </View>
            );
        }
    }

    useEffect(() => {
        navigation.setOptions({ title: pet.nomePet })
        if (pet.sexoPet == 'macho') {
            setSexoPet('Macho');
        } else if (pet.sexoPet == 'femea') {
            setSexoPet('Fêmea');
        }
    }, [pet]);

    let content;

    if (loading) {
        content = <LoadingIndicator />
    } else if (Object.keys(pet).length > 0) {
        content =
            <View style={styles.container}>
                <View style={styles.petProfileContainer}>
                    <View style={styles.petProfileContainerContent}>
                        <View style={{ flexDirection: 'row' }}>
                            <Image
                                source={pet.especie.nomeEspecie.toLowerCase() == 'gato' ? require('./assets/petCatIcon.jpg') : pet.especie.nomeEspecie.toLowerCase() == 'cachorro' ? require('./assets/petDogIcon.jpg') : null}
                                style={styles.petProfileImage}
                            />
                            <View style={{ flexDirection: 'column' }}>
                                <Text>Nome:</Text>
                                <TextInput
                                    placeholder={pet.nomePet}
                                    placeholderTextColor="#46464C"
                                    onChangeText={(text) => setNovoNome(text)}
                                    value={novoNome}
                                    style={styles.input}
                                />
                                <Text style={styles.petProfileContainerText}>Espécie:</Text>
                                <Text>{pet.especie.nomeEspecie}</Text>
                                <Text style={styles.petProfileContainerText}>Raça:</Text>
                                <Text>{pet.racaPet}</Text>
                                <Text style={styles.petProfileContainerText}>Data de nascimento:</Text>
                                <Text>{pet.dataNascPet}</Text>
                                <Text style={styles.petProfileContainerText}>Peso:</Text>
                                <TextInput
                                    placeholder={pet.pesoPet?.toString() + 'kg'}
                                    placeholderTextColor="#46464C"
                                    keyboardType='decimal-pad'
                                    onChangeText={(text) => setNovoPeso(text)}
                                    value={novoPeso}
                                    style={styles.input}
                                />
                                <Text style={styles.petProfileContainerText}>Sexo:</Text>
                                <Text>{sexoPet}</Text>
                                <Text style={styles.petProfileContainerText}>É castrado(a)?</Text>
                                {handleVerificaCastrado()}
                            </View>
                        </View>
                    </View>
                    <View style={styles.petProfileContainerButtons}>
                        <TouchableOpacity style={styles.petProfileButtons} onPress={handleEditaPet}>
                            <Text style={{ color: '#ECC683' }}>Editar</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.petProfileButtons} onPress={handleDeletePet}>
                            <Text style={{ color: '#ECC683' }}>Excluir</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.buttonsContainer}>
                    <TouchableOpacity onPress={() => navigation.navigate(NavigationKeys.Registro, { id: pet.idPet })}>
                        <View style={styles.buttonContainer}>
                            <Image
                                source={require('./assets/calendar.png')}
                                style={styles.buttonContainerIcon}
                            />
                            <Text style={styles.buttonContainerText}>
                                Agenda
                            </Text>
                        </View>
                    </TouchableOpacity>
                </View>
                <SnackBar visible={showSnackBar} textMessage="Não foi possível excluir o pet." />
            </View>
    }

    return (
        content
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    petProfileContainer: {
        width: 300,
        height: 'auto',
        backgroundColor: '#FFC847',
        alignSelf: 'center',
        flexDirection: 'column',
        borderRadius: 20,
        marginTop: 20,
        marginBottom: 20,
    },
    buttonsContainer: {
        alignSelf: 'center',
        flexDirection: 'column',
        gap: 20,
    },
    input: {
        width: 160,
    },
    buttonContainer: {
        flexDirection: 'row',
        backgroundColor: '#FFC847',
        width: 300,
        height: 100,
        justifyContent: 'start',
        alignItems: 'center',
        borderRadius: 20,
        gap: 20,
    },
    buttonContainerIcon: {
        width: 50,
        height: 50,
        marginLeft: 20,
    },
    buttonContainerText: {
        fontSize: 20,
    },
    petProfileImage: {
        height: 125,
        width: 125,
    },
    petProfileContainerContent: {
        marginTop: 10,
        marginLeft: 10,
        marginBottom: 10,
    },
    petProfileContainerText: {
        marginTop: 8,
    },
    petProfileContainerButtons: {
        flexDirection: 'row',
        justifyContent: 'center',
        gap: 60,
        marginBottom: 20,
        marginTop: 10,
    },
    petProfileButtons: {
        backgroundColor: '#4A1E91',
        width: 75,
        height: 30,
        borderRadius: 40,
        alignItems: 'center',
        justifyContent: 'center',
    },
});
