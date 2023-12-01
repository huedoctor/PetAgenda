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

// A lista de pets deve trazer um JSON aqui para que possamos começar a usar a partir dessa tela.
// Nessa tela a gente ta pegando o nome e a espécie para pode fazer os botões.
// Clicando nelas vai mandar pra tela do pet e vai enviar junto os dados do pet clicado pelo ID.

let pets = [
    {
        nome: "Dodo",
        especie: "cachorro",
    },
    {
        nome: "Chatran",
        especie: "gato",
    },
    {
        nome: "Chatran",
        especie: "gato",
    },
    {
        nome: "Chatran",
        especie: "gato",
    },
    {
        nome: "Chatran",
        especie: "gato",
    },
];

export default function TelaPets() {

    const navigation = useNavigation();

    //A gente precisa receber um JSON aqui com todos os pets do usuário.

    return (
        <View style={styles.container}>
            <ScrollView>
                <View style={styles.containerRow}>
                    {pets.map((pet, index) => (
                        <TouchableOpacity key={index}>
                            <View style={styles.petConteiner}>
                                <Image style={styles.petConteinerImg}
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
        backgroundColor: '#B8E8FC',
    },
    containerRow: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'start',
    },
    petConteiner: {
        flexDirection: 'column',
        alignItems: 'center',
    },
    petConteinerImg: {
        width: 125,
        height: 200,
    },
    petConteinerTxt: {
        fontSize: 20,
        fontWeight: 'bold',
        position: 'absolute',
        marginTop: 180,
    }
});