import React, { useState } from 'react';
import 'react-native-gesture-handler';
import {
    View,
    TextInput,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ScrollView } from 'react-native-gesture-handler';
import { Dimensions } from 'react-native';

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

];

export default function TelaPets() {

    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            <ScrollView>
                <View style={styles.containerRow}>
                    {userPets.map((pet, index) => (
                        <TouchableOpacity key={index} onPress={() => navigation.navigate('Tela Pet', { 
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
            <View style={styles.plusButtonContainer}>
                <TouchableOpacity onPress={() => navigation.navigate('Cadastrar Pet')}>
                    <Image
                        style={styles.plusButtonImg}
                        source={require('./assets/plusButton.png')}
                    />
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#B8E8FC',
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
    },
    plusButtonContainer: {
        position: 'absolute',
        marginLeft: '72%',
        bottom: '13%',
    },
    plusButtonImg: {
        width: 65,
        height: 65,
    },
});