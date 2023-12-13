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
import NavigationKeys from './util/navigationKeys';

export default function TelaSelecaoRegistro({ route }) {

    const navigation = useNavigation();

    const {id} = route.params;


    return (
        <View style={styles.container}>
            <View style={styles.selecaoConteiner}>
                <Text style={styles.title}>Selecione o tipo de registro:</Text>
                <View style={styles.options}>
                    <TouchableOpacity onPress={() => navigation.navigate(NavigationKeys.CadastroCuidado, {id})}>
                        <View style={styles.containerRow}>
                            <View style={styles.optionTitle}>
                                <Text style={styles.optionTitle}>Cuidado</Text>
                            </View>
                            <Image
                                source={require('./assets/health.png')}
                                style={styles.imageIcons}
                            />
                        </View>
                    </TouchableOpacity>
                    {/* <View style={styles.line}></View>
                    <TouchableOpacity onPress={() => navigation.navigate(NavigationKeys.CadastroVacina, {id})}>
                        <View style={styles.containerRow}>
                            <View style={styles.optionTitle}>
                                <Text style={styles.optionTitle}>Vacina</Text>
                            </View>
                            <Image
                                source={require('./assets/injection.png')}
                                style={styles.imageIcons}
                            />
                        </View>
                    </TouchableOpacity> */}
                    <View style={styles.line}></View>
                    <TouchableOpacity onPress={() => navigation.navigate(NavigationKeys.CadastroAtividade, {id})}>
                        <View style={styles.containerRow}>
                            <View style={styles.optionTitle}>
                                <Text style={styles.optionTitle}>Atividade</Text>
                            </View>
                            <Image
                                source={require('./assets/activity.png')}
                                style={styles.imageIcons}
                            />
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'white',
    },
    selecaoConteiner: {
        backgroundColor: '#FFC847',
        marginHorizontal: '15%',
        borderRadius: 20,
    },
    title: {
        alignSelf: 'center',
        marginTop: 20,
        fontSize: 20,
    },
    options: {
        marginTop: 40,
        flexDirection: 'column',
        gap: 5,
        marginBottom: 20,
    },
    containerRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    optionTitle: {
        fontSize: 20,
        width: 85,
        marginLeft: 10,
    },
    imageIcons: {
        width: 40,
        height: 40,
        marginRight: 10,
    },
    line: {
        backgroundColor: 'black',
        height: 0.5,
        marginHorizontal: '4%',
        marginVertical: '5%',
    },
});
