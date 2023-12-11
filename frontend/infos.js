import { CommonActions, useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { Image, ScrollView } from 'react-native';
import { View, Text, StyleSheet, TouchableOpacity, Pressable } from 'react-native';

import Direitos from './infos/direitos';
import Politica from './infos/politica';
import Sobre from './infos/sobre';
import Termos from './infos/termos';
import navigationKeys from './util/navigationKeys';
import userData from './util/userData';

export default function Infos() {
    const [conteudo, setConteudo] = useState(false);
    const [isLogged, setIsLogged] = useState(false);

    useEffect(() => {
        userData.isLogged().then((result) => {
            setIsLogged(result);
        });
    }, []);

    const handleInfos = (value) => {
        switch (value) {
            case "sobre":
                setConteudo(<Sobre />);
                break;
            case "direitos":
                setConteudo(<Direitos />);
                break;
            case "politica":
                setConteudo(<Politica />);
                break;
            case "termos":
                setConteudo(<Termos />);
                break;
            default:
                setConteudo(false);
        }
    };

    const logout = async () => {
        await userData.removeUser();

        navigation.dispatch(
            CommonActions.reset({
                index: 0,
                routes: [{ name: navigationKeys.Inicio }]
            })
        );
    }

    const navigation = useNavigation();

    return (
        !conteudo ?
            <View style={styles.container}>
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
                {isLogged &&
                    <TouchableOpacity
                        style={styles.logoutButton}
                        onPress={logout}>
                        <Text style={styles.buttonText}>Logout</Text>
                        <Image
                            source={require('./assets/rectangle.portrait.and.arrow.forward.png')}
                            style={styles.logoutImage}
                        />
                    </TouchableOpacity>
                }
            </View>
            :
            <ScrollView>
                {conteudo}
            </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignSelf: 'stretch',
        alignItems: 'center',
        backgroundColor: 'white',
        paddingTop: 20,
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
    },
    logoutButton: {
        flexDirection: 'row',
        textDecorationStyle: 'dashed',
        marginTop: 20
    },
    logoutImage: {
        width: 24,
        height: 24,
        marginLeft: 12
    }
});
