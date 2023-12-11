import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Pressable } from 'react-native';

import Direitos from './infos/direitos';
import Politica from './infos/politica';
import Sobre from './infos/sobre';
import Termos from './infos/termos';

export default function Infos() {
    const [conteudo, setConteudo] = useState(false);

    const handleInfos = (value) => {
        switch (value) {
            case "sobre" :
                setConteudo(<Sobre/>);
                break;
            case "direitos" : 
                setConteudo(<Direitos/>);
                break;
            case "politica" :
                setConteudo(<Politica/>);
                break;
            case "termos" : 
                setConteudo(<Termos/>);
                break;
            default : 
                setConteudo(false);
        }
    };

    const limpaConteudo = () => {
        setConteudo(false);
    }
    console.log(conteudo)
    return (
        !conteudo ? 
        <View>
            <TouchableOpacity
                style={styles.button}
                onPress={() => handleInfos("sobre")}>
                <Text style={styles.buttonText}>Sobre</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.button}
                onPress={() => handleInfos("direitos")}>
                <Text style={styles.buttonText}>Direitos Autorais</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.button}
                onPress={() => handleInfos("politica")}>
                <Text style={styles.buttonText}>Política de Privacidade</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.button}
                onPress={() => handleInfos("termos")}>
                <Text style={styles.buttonText}>Termos de Uso</Text>
            </TouchableOpacity>
        </View>
        :
        <View>
            <Pressable
                style={styles.backButton}
                onPress={limpaConteudo}>
                <Text style={styles.backButtonText}>&lt; Voltar</Text>
            </Pressable>
            {conteudo}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    button: {
        backgroundColor: '#FFCD57',
        width: 275,
        height: 60,
        marginBottom: 30,
        justifyContent: 'center',
        borderRadius: 40,
    },
    buttonText: {
        alignSelf: 'center',
        fontSize: 18,
        color: '#2F135D',
    },
    backButton: {
        fontSize: 18,
        color: '#4A1E91',
        fontWeight: 'bold',
        margin: 20,
    },
    backButtonText: {
        fontSize: 18,
        color: '#4A1E91',
        fontWeight: 'bold',
    }
});
