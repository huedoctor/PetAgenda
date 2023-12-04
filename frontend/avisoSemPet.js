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

export default function TelaAvisoPet() {

    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            <Text style={styles.obs}>Obs!</Text>
            <View style={styles.avisoBox}>
                <Text style={styles.avisoText}>
                    Parece que  você não tem nenhum pet cadastrado no aplicativo ainda...
                    {'\n'}
                    Mas isso é fácil resolver! Por favor, considere clicar no botão abaixo para começar cadastrando um pet.
                </Text>
            </View>
            <TouchableOpacity
                style={styles.botaoCriarPet} onPress={() => navigation.navigate('Cadastro Primeiro Pet')} >
                <Text style={styles.botaoCriarPetText}>Cadastrar Pet</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#B8E8FC',
    },
    obs: {
        alignSelf: 'center',
        fontSize: 40,
        marginBottom: 40,
    },
    avisoBox: {
        backgroundColor: '#B1AFFF',
        borderRadius: 40,
        padding: 16,
        marginBottom: 35,
        width: 285,
        alignSelf: 'center',
    },
    avisoText: {
        fontSize: 20,
        textAlign: 'justify',
        marginVertical: 15,
        marginHorizontal: 10,
    },
    botaoCriarPet: {
        backgroundColor: '#B1AFFF',
        width: 230,
        height: 60,
        borderRadius: 40,
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
    },
    botaoCriarPetText: {
        fontSize: 24,
    },
});
