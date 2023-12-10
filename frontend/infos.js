import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export default function Infos() {
    const [conteudo, setConteudo] = useState(null);
    // const [sobre, setSobre] = useState(false);
    // const [direitos, setDireitos] = useState(false);
    // const [privacidade, setPrivacidade] = useState(false);
    // const [termos, setTermos] = useState(false);

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
        }
    };

    const limpaConteudo = () => {
        setConteudo(null);
    }
    
    return (
        conteudo == null ? 
        <View>
            <TouchableOpacity
                style={styles.button}
                onPress={handleInfos("sobre")}>
                <Text style={styles.buttonText}>Sobre</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.button}
                onPress={handleInfos("direitos")}>
                <Text style={styles.buttonText}>Direitos Autorais</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.button}
                onPress={handleInfos("politica")}>
                <Text style={styles.buttonText}>Política de Privacidade</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.button}
                onPress={handleInfos("termos")}>
                <Text style={styles.buttonText}>Termos de Uso</Text>
            </TouchableOpacity>
        </View>
        :
        <View>
            <Pressable
                style={styles.button}
                onPress={limpaConteudo}>
                <Text style={styles.text}>&lt; Voltar</Text>
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
        width: 80,
        padding: 15,
        marginTop: 10,
        alignItems: 'center',
      },
    buttonText: {
    color: 'green',
    fontWeight: 'bold',
    fontSize: 16
    },
});
