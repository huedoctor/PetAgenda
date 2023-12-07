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

export default function TelaTratamentos({ route }) {

    const navigation = useNavigation();

    const id = route.params;
    const petId = id.petId;

    //Precisa do metodo pra puxar a lista de tratamentos pelo id do pet. O número do id do pet está guardado em "petId".
    //Depois disso faz um map pra ir renderizando os botões dos trotamentos na view container.
    //Nessa tela só precisa puxar o id do tratamento, o nome, frequência, horário e tipo (permanente ou temporário).
    
    useEffect(() => {
        navigation.setOptions({
          headerRight: () => (
            <TouchableOpacity
              onPress={() => navigation.navigate("Cadastrar Tratamento", { petId: petId })}
              style={{ paddingRight: 15 }}
            >
              <Text style={{ fontSize: 19, color: '#4A1E91' }}>Novo tratamento</Text>
            </TouchableOpacity>
          ),
        });
      }, [navigation, petId]);

    return (
        <View style={styles.container}>
            <TouchableOpacity>
                <View style={styles.tratamentoContainer}>
                    <Text style={styles.nomeTratamento}>Nome do tratamento</Text>
                    <View style={styles.tratamentoContainerRow}>
                        <View style={styles.tratamentoContainerStatus}>
                            <Image style={styles.tratamentoContainerIcons}
                                source={require('./assets/calendar.png')}
                            />
                            <Text>Frequência</Text>
                        </View>
                        <View style={styles.tratamentoContainerStatus}>
                            <Image style={styles.tratamentoContainerIcons}
                                source={require('./assets/clock.png')}
                            />
                            <Text>00{'h'}</Text>
                        </View>
                        <View style={styles.tipoTratamentoConteiner}>
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
    tratamentoContainer: {
        backgroundColor: '#ECC683',
        width: 300,
        height: 100,
        borderRadius: 20,
        marginTop: 25,
    },
    nomeTratamento: {
        marginLeft: 25,
        marginTop: 20,
        fontSize: 15,
    },
    tratamentoContainerRow: {
        flexDirection: 'row',
        marginTop: 20,
        justifyContent: 'space-evenly',
    },
    tipoTratamentoConteiner: {
        backgroundColor: '#4A1E91',
        width: 90,
        height: 25,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 40,
    },
    tratamentoContainerStatus: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 3,
    },
    tratamentoContainerIcons: {
        width: 20,
        height: 20,
    }
});
