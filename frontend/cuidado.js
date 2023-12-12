import React, { useEffect, useState } from 'react';
import 'react-native-gesture-handler';
import {
    View,
    TextInput,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image,
    ScrollView
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function Cuidado({ route }) {

    const navigation = useNavigation();

    useEffect(() => {
        navigation.setOptions({ title: "{Nome do cuidado}" })
    }, [])

    return (
        <ScrollView>
            <View style={styles.container}>
                <Text style={styles.title}>Tipo do cuidado:</Text>
                <View style={styles.textLabel}>
                    <Text style={styles.textLabelText}>
                        {"{Tipo do cuidado}"}
                    </Text>
                </View>
                <Text style={styles.title}>Descrição:</Text>
                <View style={styles.textLabel}>
                    <TextInput
                        style={styles.textLabelText}
                        placeholder='{Descrição do cuidado}'
                        maxLength={40}
                    >
                    </TextInput>
                </View>
                <Text style={styles.title}>Data de início:</Text>
                <View style={styles.textLabel}>
                    <TextInput
                        style={styles.textLabelText}
                        placeholder='{Data de início}'
                    >
                    </TextInput>
                </View>
                <Text style={styles.title}>Data final:</Text>
                <View style={styles.textLabel}>
                    <TextInput
                        style={styles.textLabelText}
                        placeholder='{Data final}'
                    >
                    </TextInput>
                </View>
                <Text style={styles.title}>Horário:</Text>
                <View style={styles.textLabel}>
                    <TextInput
                        style={styles.textLabelText}
                        placeholder='{Horário}'
                    >
                    </TextInput>
                </View>
                <Text style={styles.title}>Frequência:</Text>
                <View style={styles.textLabel}>
                    <Text style={styles.textLabelText}>
                        {"{Frequência}"}
                    </Text>
                </View>
                <View style={{ alignItems: 'center' }}>
                    <View style={styles.buttonsConteiner}>
                        <TouchableOpacity style={styles.button}>
                            <Text style={styles.buttonText}>
                                Editar
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.button}>
                            <Text style={styles.buttonText}>
                                Apagar
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
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
    textLabel: {
        width: 300,
        minHeight: 50,
        borderRadius: 40,
        paddingLeft: 15,
        backgroundColor: '#CAC1D6',
        marginTop: 15,
        justifyContent: 'center',
        flexWrap: 'wrap',
        flex: 1, // adicionado
    },
    textLabelText: {
        fontSize: 15,
        flexShrink: 1,
        width: 270,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 20,
    },
    buttonsConteiner: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 70,
        marginTop: 35,
    },
    button: {
        width: 100,
        height: 50,
        backgroundColor: '#4A1E91',
        borderRadius: 40,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonText: {
        fontSize: 20,
        color: '#ECC683',
    },
});
