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

export default function TelaCadastroTratamentos({ route }) {

    const navigation = useNavigation();

    const petId = route.params;
    const idPet = petId.petId;


    return (
        <View style={styles.container}>
            <Text>{idPet}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'white',
    },
});
