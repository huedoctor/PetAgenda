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

export default function TelaAtividades({ route }) {

    const navigation = useNavigation();

    const id = route.params;
    const petId = id.petId;

    //Precisa do metodo pra puxar a lista de atividades pelo id do pet. O número do id do pet está guardado em "petId".
    //Depois disso faz um map pra ir renderizando os botões das atividades na view container.
    //Nessa tela só precisa puxar o id da atividade, o nome, frequência, horário e tipo (permanente ou temporário).
    
    useEffect(() => {
        navigation.setOptions({
          headerRight: () => (
            <TouchableOpacity
              onPress={() => navigation.navigate("Cadastrar Atividade", { petId: petId })}
              style={{ paddingRight: 15 }}
            >
              <Text style={{ fontSize: 19, color: '#4A1E91' }}>Nova atividade</Text>
            </TouchableOpacity>
          ),
        });
      }, [navigation, petId]);

    return (
        <View style={styles.container}>
            <TouchableOpacity>
                <View style={styles.atividadeContainer}>
                    <Text style={styles.nomeAtividade}>Nome da atividade</Text>
                    <View style={styles.atividadeContainerRow}>
                        <View style={styles.atividadeContainerStatus}>
                            <Image style={styles.atividadeContainerIcons}
                                source={require('./assets/calendar.png')}
                            />
                            <Text>Frequência</Text>
                        </View>
                        <View style={styles.atividadeContainerStatus}>
                            <Image style={styles.atividadeContainerIcons}
                                source={require('./assets/clock.png')}
                            />
                            <Text>00{'h'}</Text>
                        </View>
                        <View style={styles.tipoAtividadeConteiner}>
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
    atividadeContainer: {
        backgroundColor: '#ECC683',
        width: 300,
        height: 100,
        borderRadius: 20,
        marginTop: 25,
    },
    nomeAtividade: {
        marginLeft: 25,
        marginTop: 20,
        fontSize: 15,
    },
    atividadeContainerRow: {
        flexDirection: 'row',
        marginTop: 20,
        justifyContent: 'space-evenly',
    },
    tipoAtividadeConteiner: {
        backgroundColor: '#4A1E91',
        width: 90,
        height: 25,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 40,
    },
    atividadeContainerStatus: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 3,
    },
    atividadeContainerIcons: {
        width: 20,
        height: 20,
    }
});
