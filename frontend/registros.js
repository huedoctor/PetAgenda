import React, { useEffect, useState } from 'react';
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
import { FlatList } from 'react-native-gesture-handler';
import FilterChip from './components/FilterChip';

//  MASSA DE DADOS
const dados = [{
    nomeRegistro: "Corrida Matinal",
    descricaoRegistro: "Corrida leve no parque",
    classificacao: "Atividade",
    dataInicio: "2023-12-15",
    dataFinal: "2023-12-15",
    frequencia: "Diária",
    horario: "07:00"
}, {
    nomeRegistro: "Vacina contra Raiva",
    descricaoRegistro: "Vacina anual obrigatória",
    classificacao: "Vacina",
    dataInicio: "2023-12-20",
    dataFinal: "2023-12-20",
    frequencia: "Anual",
    horario: "10:30"
}, {
    nomeRegistro: "Antibiótico para Gripe",
    descricaoRegistro: "Tratamento para combater a gripe",
    classificacao: "Tratamento",
    dataInicio: "2023-12-10",
    dataFinal: "2023-12-15",
    frequencia: "Semanal",
    horario: "09:00"
}, {
    nomeRegistro: "Remédio para FIV",
    descricaoRegistro: "A tal da AIDS de gato",
    classificacao: "Rotina",
    dataInicio: "2023-12-10",
    dataFinal: "2023-12-15",
    frequencia: "Semanal",
    horario: "09:00"
}, {
    nomeRegistro: "Corrida Matinal 2",
    descricaoRegistro: "Corrida leve no parque",
    classificacao: "Atividade",
    dataInicio: "2023-12-15",
    dataFinal: "2023-12-15",
    frequencia: "Diária",
    horario: "07:00"
}, {
    nomeRegistro: "Vacina contra Raiva 2",
    descricaoRegistro: "Vacina anual obrigatória",
    classificacao: "Vacina",
    dataInicio: "2023-12-20",
    dataFinal: "2023-12-20",
    frequencia: "Anual",
    horario: "10:30"
}, {
    nomeRegistro: "Antibiótico para Gripe 2",
    descricaoRegistro: "Tratamento para combater a gripe",
    classificacao: "Tratamento",
    dataInicio: "2023-12-10",
    dataFinal: "2023-12-15",
    frequencia: "Semanal",
    horario: "09:00"
}, {
    nomeRegistro: "Remédio para FIV 2",
    descricaoRegistro: "A tal da AIDS de gato",
    classificacao: "Rotina",
    dataInicio: "2023-12-10",
    dataFinal: "2023-12-15",
    frequencia: "Semanal",
    horario: "09:00"
}, {
    nomeRegistro: "Corrida Matinal 3",
    descricaoRegistro: "Corrida leve no parque",
    classificacao: "Atividade",
    dataInicio: "2023-12-15",
    dataFinal: "2023-12-15",
    frequencia: "Diária",
    horario: "07:00"
}, {
    nomeRegistro: "Vacina contra Raiva 3",
    descricaoRegistro: "Vacina anual obrigatória",
    classificacao: "Vacina",
    dataInicio: "2023-12-20",
    dataFinal: "2023-12-20",
    frequencia: "Anual",
    horario: "10:30"
}, {
    nomeRegistro: "Antibiótico para Gripe 3",
    descricaoRegistro: "Tratamento para combater a gripe",
    classificacao: "Tratamento",
    dataInicio: "2023-12-10",
    dataFinal: "2023-12-15",
    frequencia: "Semanal",
    horario: "09:00"
}, {
    nomeRegistro: "Remédio para FIV 3",
    descricaoRegistro: "A tal da AIDS de gato",
    classificacao: "Rotina",
    dataInicio: "2023-12-10",
    dataFinal: "2023-12-15",
    frequencia: "Semanal",
    horario: "09:00"
}]
// FIM MASSA DE DADOS

export default function TelaRegistros({ route }) {

    const classificacoes = ['atividade', 'vacina', 'tratamento', 'rotina'];

    const [originalData, setOriginalData] = useState([]);
    //      \          /
    //       \        /
    //        \      /
    //         \    /
    const [filters, setFilters] = useState(classificacoes);
    //           \/
    //           || 
    //           || 
    const [filteredData, setFilteredData] = useState([]);

    useEffect(() => {
        const novosDados = originalData.filter((e) => filters.includes(e.classificacao.toLowerCase()));
        setFilteredData(novosDados);
    }, [filters]);

    const adicionarFiltro = (filtro) => {
        if (filters.includes(filtro)) return;
        const novosFiltros = [...filters];
        novosFiltros.push(filtro);
        setFilters(novosFiltros);
    };

    const removerFiltro = (filtro) => {
        if (!filters.includes(filtro)) return;
        const novosFiltros = [...filters];
        const foundIndex = novosFiltros.indexOf(filtro);
        if (foundIndex > -1) { novosFiltros.splice(foundIndex, 1); }
        setFilters(novosFiltros);
    };

    const getColor = (classificacao) => {
        switch (classificacao.toLowerCase()) {
            case 'atividade': return 'red';
            case 'vacina': return 'blue';
            case 'tratamento': return 'green';
            case 'rotina': return 'yellow';
        }
    }

    const navigation = useNavigation();
    const { id } = route.params;

    //Precisa do metodo pra puxar a lista de tratamentos pelo id do pet. O número do id do pet está guardado em "petId".
    //Depois disso faz um map pra ir renderizando os botões dos trotamentos na view container.
    //Nessa tela só precisa puxar o id do tratamento, o nome, frequência, horário e tipo (permanente ou temporário).

    useEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <TouchableOpacity
                    onPress={() => navigation.navigate(navigationKeys.SelecaoRegistro, { id })}
                    style={{ paddingRight: 15 }}
                >
                    {/* <Text style={{ fontSize: 30, color: '#4A1E91' }}>+</Text> */}
                    <Image
                        source={require('./assets/plusButtonPurple.png')}
                        style={{ width: 35, height: 35 }}
                    />
                </TouchableOpacity>
            ),
        });
        // Fazer a requisição GET aqui
        setOriginalData(dados);
        setFilteredData(dados);
    }, []);

    return (
        <View style={styles.container}>
            <FlatList
                data={classificacoes}
                horizontal
                style={{ marginBottom: 2 }}
                contentContainerStyle={{ gap: 6 }}
                renderItem={({ item, index }) => {
                    const filtro = classificacoes[index];
                    return (<FilterChip
                        color={getColor(filtro)}
                        label={filtro}
                        onChange={(newValue) => {
                            if (newValue) { adicionarFiltro(filtro) }
                            else { removerFiltro(filtro) }
                        }} />)
                }}
            />
            <FlatList
                showsVerticalScrollIndicator={false}
                data={filteredData}
                contentContainerStyle={{ alignItems: "stretch", paddingBottom: 20 }}
                renderItem={({ item }) => {
                    return (
                        <TouchableOpacity
                            onPress={() => {
                                switch (item.classificacao.toLowerCase()) {
                                    case "atividade":
                                        navigation.navigate(NavigationKeys.Atividade, {id});
                                        break;

                                    case "vacina":
                                        navigation.navigate(NavigationKeys.Vacina, {id});
                                        break;

                                    case "tratamento":
                                        navigation.navigate(NavigationKeys.Cuidado, {id});
                                        break;
                                    
                                    case "rotina":
                                        navigation.navigate(NavigationKeys.Cuidado, {id});
                                }
                            }
                            }>
                            <View style={[styles.registroContainer, { backgroundColor: getColor(item.classificacao) }]}>
                                <Text style={styles.nomeRegistro}>{item.nomeRegistro}</Text>
                                <View style={styles.registroContainerRow}>
                                    <View style={styles.registroContainerStatus}>
                                        <Image style={styles.registroContainerIcons}
                                            source={require('./assets/calendar.png')}
                                        />
                                        <Text>{item.frequencia}</Text>
                                    </View>
                                    <View style={styles.registroContainerStatus}>
                                        <Image style={styles.registroContainerIcons}
                                            source={require('./assets/clock.png')}
                                        />
                                        <Text>{item.horario}{'h'}</Text>
                                    </View>
                                    <View style={styles.tipoRegistroConteiner}>
                                        <Text style={{ color: '#ECC683' }}>
                                            {item.classificacao}
                                        </Text>
                                    </View>
                                </View>
                            </View>
                        </TouchableOpacity>
                    )
                }} />
        </View>
    )

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'white',
        alignItems: 'center',
    },
    registroContainer: {
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