import React, { useState, useEffect } from 'react';
import {
    View,
    TextInput,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function TelaPet({ route }) {

    const navigation = useNavigation();
    const [dropdownVisible, setDropdownVisible] = useState(false);

    const { id, nome, especie, raca, dataNasc, peso, sexo, castradoPet } = route.params;

    useEffect(() => {
        navigation.setOptions({ title: nome })
    });

    return (
        <View style={styles.container}>
            <View style={styles.buttonContainer}>
                <Text>
                    Tratamentos
                </Text>
            </View>
            <View style={styles.buttonContainer}>
                <Text>
                    Atividades
                </Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#B8E8FC',
    },
    buttonContainer: {
        alignSelf: 'center',
        backgroundColor: '#B1AFFF',
    }
});
