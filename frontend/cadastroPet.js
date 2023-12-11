import React, { useState, useRef, useEffect } from 'react';
import 'react-native-gesture-handler';
import {
    View,
    TextInput,
    Text,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
} from 'react-native';
import { useNavigation, CommonActions } from '@react-navigation/native';
import BouncyCheckboxGroup from "react-native-bouncy-checkbox-group";
import { post } from './util/request';
import PetSelect from './components/PetSelect';
import NavigationKeys from './util/navigationKeys';
import SnackBar from './util/snackBar';

export default function TelaCadastroPet() {

    const [especiePet, setEspeciePet] = useState(null);
    const [nomePet, setNomePet] = useState(null);
    const [racaPet, setRacaPet] = useState(null);
    const [pesoPet, setPesoPet] = useState(null);
    const [dataNascimentoPet, setDataNascimentoPet] = useState(null);
    const [isCastrado, setIsCastrado] = useState(null);
    const [sexoPet, setSexoPet] = useState(null);
    const [avisoData, setAvisoData] = useState(false);
    const [loading, setLoading] = useState(false);
    const [showSnackBar, setShowSnackBar] = useState(false);
    const [botaoHabilitado, setBotaoHabilitado] = useState(false);
    const [isPetEscolhido, setIsPetEscolhido] = useState(false);

    const inputDateMask = (value) => {
        return value
            .replace(/\D/g, '')
            .replace(/(\d{2})(\d)/, '$1/$2')
            .replace(/(\d{2})(\d)/, '$1/$2')
            .replace(/(\d{4})(\d)/, '$1');
    }

    useEffect(() => {
        if (especiePet && nomePet && racaPet && sexoPet) {
            setBotaoHabilitado(true);
        } else {
            setBotaoHabilitado(false);
        }
    }, [especiePet, nomePet, racaPet, sexoPet])

    useEffect(() => {
        setIsPetEscolhido(especiePet != null)
    }, [especiePet])

    const navigation = useNavigation();

    const handleRegisterPet = async () => {
        setLoading(true);
        const res = await post("pet", {
            "especie": especiePet,
            "nomePet": nomePet,
            "pesoPet": pesoPet,
            "racaPet": racaPet,
            "dataNascPet" : dataNascimentoPet,
            "castradoPet": isCastrado,
            "sexoPet": sexoPet,
        });
        setLoading(false);
        if (res.ok) {
            navigation.navigate(NavigationKeys.TelaPets, { petCadastrado: true });
            navigation.dispatch(
                CommonActions.reset({
                  index: 0,
                  routes: [
                    { name: NavigationKeys.TelaPets },
                  ],
                })
              );
        } else {
            setShowSnackBar(true);
            setTimeout(() => {
                setShowSnackBar(false);
            }, SnackBar.LENGTH_LONG);
        }
    };

    const validateDate = (date) => {
        const dateRegex = /^\d{2}\/\d{2}\/\d{4}$/;
        if (date.length > 0 && !dateRegex.test(date)) {
            setDataNascimentoPet(null);
            setAvisoData(true);
        } else {
            const [day, month, year] = date.split('/').map(Number);
            if (date.length > 0 && day < 1 || day > 31) {
                setDataNascimentoPet(null);
                setAvisoData(true);
            } else if (date.length > 0 && month < 1 || month > 12) {
                setDataNascimentoPet(null);
                setAvisoData(true);
            } else {
                setAvisoData(false);
            }
        }
    };

    const opcoesIsCasatrado = [
        {
            id: "sim",
            text: "Sim",
            style: styles.checkBoxOptionRight,
            fillColor: "#4A1E91",
            textStyle: {
                textDecorationLine: 'none',
            }
        },
        {
            id: "nao",
            text: "Não",
            style: styles.checkBoxOptionLeft,
            fillColor: "#4A1E91",
            textStyle: {
                textDecorationLine: 'none',
            }
        },
    ];

    const opcoesSexo = [
        {
            id: "macho",
            text: "Macho",
            style: styles.checkBoxOptionRightSexo,
            fillColor: "#4A1E91",
            textStyle: {
                textDecorationLine: 'none',
            }
        },
        {
            id: "femea",
            text: "Fêmea",
            style: styles.checkBoxOptionLeftSexo,
            fillColor: "#4A1E91",
            textStyle: {
                textDecorationLine: 'none',
            }
        },
    ];

    return (
        <ScrollView style={{ backgroundColor: 'white' }}>
            <View style={styles.container}>
                <Text style={styles.especieQuestion}>Qual é o seu pet?</Text>
                <PetSelect onSelect={(selected) => setEspeciePet(selected)} />
                {isPetEscolhido &&
                    <View style={{ alignItems: 'center' }}>
                        <TextInput
                            style={[styles.input, { marginTop: 35 }]}
                            placeholder="Nome*"
                            onChangeText={(text) => setNomePet(text)}
                            value={nomePet}
                        >
                        </TextInput>
                        <TextInput
                            style={[styles.input]}
                            placeholder="Raça*"
                            onChangeText={(text) => setRacaPet(text)}
                            value={racaPet}
                        >
                        </TextInput>
                        <TextInput
                            style={styles.input}
                            keyboardType='decimal-pad'
                            placeholder="Peso (Kg)"
                            onChangeText={(text) => setPesoPet(text)}
                            value={pesoPet}
                        >
                        </TextInput>
                        {avisoData &&
                            <Text style={styles.avisoData}>Insira uma data válida.</Text>
                        }
                        <TextInput
                            style={[styles.input, avisoData ? { marginTop: 0 } : { marginTop: 20 }]}
                            placeholder='Data de nascimento'
                            keyboardType='numeric'
                            maxLength={10}
                            onChangeText={(text) => {
                                setDataNascimentoPet(inputDateMask(text))
                            }}
                            onEndEditing={() => validateDate(dataNascimentoPet)}
                            value={dataNascimentoPet}
                        />
                        <Text
                            style={{ opacity: 0.5, marginRight: 180 }}
                        >DD/MM/AAAA</Text>
                        <Text style={[styles.question, { marginTop: 20 }]}>Seu pet é castrado?</Text>
                        <View style={styles.isCastradoConteiner}>
                            <BouncyCheckboxGroup
                                data={opcoesIsCasatrado}
                                onChange={(selectedItem) => {
                                    if (selectedItem.id == "sim") {
                                        setIsCastrado(true);
                                    } else if (selectedItem.id == "nao") {
                                        setIsCastrado(false);
                                    }
                                }}
                            />
                        </View>
                        <Text style={styles.question}>Qual o sexo do seu pet?*</Text>
                        <View style={styles.sexoPetConteiner}>
                            <BouncyCheckboxGroup
                                data={opcoesSexo}
                                onChange={(selectedItem) => {
                                    if (selectedItem.id == "macho") {
                                        setSexoPet("macho");
                                    } else if (selectedItem.id == "femea") {
                                        setSexoPet("femea");
                                    }
                                }}
                            />
                        </View>
                        <TouchableOpacity
                            style={[styles.registerPetButton, !botaoHabilitado ? { opacity: 0.5 } : { opacity: 1 }]}
                            disabled={!botaoHabilitado}
                            onPress={handleRegisterPet}>
                            <Text style={styles.petRegisterButtonText}>Cadastrar Pet</Text>
                        </TouchableOpacity>
                    </View>
                }
            </View >
            <SnackBar visible={showSnackBar} textMessage="Não foi possível cadastrar o pet."/>
        </ScrollView>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'white',
        paddingHorizontal: '10%',
        paddingBottom: 30,
    },
    especieQuestion: {
        alignSelf: 'center',
        fontSize: 20,
        marginTop: 5,
        marginBottom: 30,
        fontWeight: 'bold',
    },
    optionCheckBox: {
        marginTop: 20,
        flexDirection: 'column',
    },
    input: {
        width: 300,
        height: 50,
        borderRadius: 40,
        paddingLeft: 15,
        backgroundColor: '#CAC1D6',
        marginTop: 20,
    },
    dataNascimentoPetButton: {
        width: 300,
        height: 50,
        borderRadius: 40,
        paddingLeft: 15,
        backgroundColor: '#B1AFFF',
        marginTop: 20,
    },
    question: {
        marginTop: 30,
        fontSize: 20,
        fontWeight: 'bold',
    },
    isCastradoConteiner: {
        justifyContent: 'center',
        marginTop: 30,
    },
    checkBoxOptionRight: {
        marginRight: 30,
    },
    checkBoxOptionLeft: {
        marginLeft: 30,
    },
    sexoPetConteiner: {
        justifyContent: 'center',
        marginTop: 30,
    },
    checkBoxOptionRightSexo: {
        marginRight: 110,
    },
    checkBoxOptionLeftSexo: {
        marginLeft: 128,
        position: 'absolute',
    },
    registerPetButton: {
        marginTop: 40,
        width: 300,
        height: 60,
        backgroundColor: '#4A1E91',
        borderRadius: 40,
        alignItems: 'center',
        justifyContent: 'center',
    },
    petRegisterButtonText: {
        fontSize: 20,
        color: '#FFFFFF',
    },
    avisoData: {
        fontSize: 12,
        color: 'red',
        marginTop: 5,
        marginRight: 153,
    }
});
