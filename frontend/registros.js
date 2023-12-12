import React, { useEffect } from 'react';
import 'react-native-gesture-handler';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import navigationKeys from './util/navigationKeys';

export default function TelaRegistros({ route }) {

    const navigation = useNavigation();
    const {id} = route.params;
    
    //Precisa do metodo pra puxar a lista de tratamentos pelo id do pet. O número do id do pet está guardado em "petId".
    //Depois disso faz um map pra ir renderizando os botões dos trotamentos na view container.
    //Nessa tela só precisa puxar o id do tratamento, o nome, frequência, horário e tipo (permanente ou temporário).
    
    useEffect(() => {
        navigation.setOptions({
          headerRight: () => (
            <TouchableOpacity
              onPress={() => navigation.navigate(navigationKeys.SelecaoRegistro, {id})}
              style={{ paddingRight: 15 }}
            >
              {/* <Text style={{ fontSize: 30, color: '#4A1E91' }}>+</Text> */}
              <Image
              source={require('./assets/plusButtonPurple.png')}
              style={{width: 35, height: 35}}
              />
            </TouchableOpacity>
          ),
        });
      },[]);    

    return (
        <View style={styles.container}>
            <TouchableOpacity>
                <View style={styles.registroContainer}>
                    <Text style={styles.nomeRegistro}>Nome do registro</Text>
                    <View style={styles.registroContainerRow}>
                        <View style={styles.registroContainerStatus}>
                            <Image style={styles.registroContainerIcons}
                                source={require('./assets/calendar.png')}
                            />
                            <Text>Frequência</Text>
                        </View>
                        <View style={styles.registroContainerStatus}>
                            <Image style={styles.registroContainerIcons}
                                source={require('./assets/clock.png')}
                            />
                            <Text>00{'h'}</Text>
                        </View>
                        <View style={styles.tipoRegistroConteiner}>
                            <Text style={{ color: '#ECC683' }}>
                                Tipo Atvd
                            </Text>
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'start',
    },
    registroContainer: {
        backgroundColor: '#ECC683',
        width: 300,
        height: 100,
        borderRadius: 20,
        marginTop: 25,
    },
    nomeRegistro: {
        marginLeft: 25,
        marginTop: 20,
        fontSize: 15,
    },
    registroContainerRow: {
        flexDirection: 'row',
        marginTop: 20,
        justifyContent: 'space-evenly',
    },
    tipoRegistroConteiner: {
        backgroundColor: '#4A1E91',
        width: 90,
        height: 25,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 40,
    },
    registroContainerStatus: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 3,
    },
    registroContainerIcons: {
        width: 20,
        height: 20,
    }
});
