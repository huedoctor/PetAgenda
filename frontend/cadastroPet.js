import React, { useState, useRef, useEffect } from 'react';
import 'react-native-gesture-handler';
import {
    View,
    TextInput,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image,
    Pressable,
    ScrollView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import BouncyCheckboxGroup from "react-native-bouncy-checkbox-group";
import PetSelect from './components/PetSelect'

export default function TelaCadastroPet() {

    const [especiePet, setEspeciePet] = useState(null);
    const [nomePet, setNomePet] = useState(null);
    const [racaPet, setRacaPet] = useState(null);
    const [pesoPet, setPesoPet] = useState(null);
    const [dataNascimentoPet, setDataNascimentoPet] = useState(null);
    const [isCastrado, setIsCastrado] = useState(null);
    const [sexoPet, setSexoPet] = useState(null);

    const inputDateMask = (value) => {
        return value
            .replace(/\D/g, '')
            .replace(/(\d{2})(\d)/, '$1/$2')
            .replace(/(\d{2})(\d)/, '$1/$2')
            .replace(/(\d{4})(\d)/, '$1');
    }

    const navigation = useNavigation();

    //Comando para executar o cadastro do pet, ta retornando todas as informações.
    //Nome -> String
    //Peso -> Number
    const handleRegisterPet = () => {
        console.log(`EspeciePet: ${especiePet}\nNomePet: ${nomePet}\nRaçaPet: ${racaPet}\nPesoPet: ${pesoPet}\nNascimentoPet: ${dataNascimentoPet}\nCastrado?: ${isCastrado}\nSexo: ${sexoPet}`);
    };

    const opcoesIsCasatrado = [
        {
            id: "sim",
            text: "Sim",
            style: styles.checkBoxOptionRight,
            fillColor: "#B1AFFF",
            unfillColor: "#B8E8FC",
            textStyle: {
                textDecorationLine: 'none',
            }
        },
        {
            id: "nao",
            text: "Não",
            style: styles.checkBoxOptionLeft,
            fillColor: "#B1AFFF",
            unfillColor: "#B8E8FC",
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
            fillColor: "#B1AFFF",
            unfillColor: "#B8E8FC",
            textStyle: {
                textDecorationLine: 'none',
            }
        },
        {
            id: "femea",
            text: "Fêmea",
            style: styles.checkBoxOptionLeftSexo,
            fillColor: "#B1AFFF",
            unfillColor: "#B8E8FC",
            textStyle: {
                textDecorationLine: 'none',
            }
        },
    ];

    return (
        <ScrollView>
            <View style={styles.container}>
                <Text style={styles.especieQuestion}>Qual a espécie do seu pet?</Text>
                <PetSelect onSelect={(selected) => setEspeciePet(selected)} />
                <TextInput
                    style={[styles.input, { marginTop: 35 }]}
                    placeholder="Nome"
                    onChangeText={(text) => setNomePet(text)}
                    value={nomePet}
                >
                </TextInput>
                <TextInput
                    style={[styles.input]}
                    placeholder="Raça"
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
                <TextInput
                    style={styles.input}
                    keyboardType='numeric'
                    placeholder="Nascimento (DD/MM/AAAA)"
                    maxLength={10}
                    onChangeText={(text) => {
                        setDataNascimentoPet(inputDateMask(text))
                    }}
                    value={dataNascimentoPet}
                >
                </TextInput>
                <Text style={styles.question}>Seu pet é castrado?</Text>
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
                <Text style={styles.question}>Qual o sexo do seu pet?</Text>
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
                    style={styles.registerPetButton}
                    onPress={handleRegisterPet}>
                    <Text style={styles.petRegisterButtonText}>Cadastrar Pet</Text>
                </TouchableOpacity>
            </View >
        </ScrollView>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#B8E8FC',
        alignItems: 'center',
        paddingBottom: 30,
    },
    especieQuestion: {
        alignSelf: 'center',
        fontSize: 20,
        marginTop: 10,
        marginBottom: 50,
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
        backgroundColor: '#B1AFFF',
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
        backgroundColor: '#B1AFFF',
        borderRadius: 40,
        alignItems: 'center',
        justifyContent: 'center',
    },
    petRegisterButtonText: {
        fontSize: 20,
    },
});
