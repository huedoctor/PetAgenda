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
import { get } from './util/request.js'

export default function TelaRegistros({ route }) {

    const classificacoes = ['atividade', 'tratamento', 'rotina']; {/* 'vacina', */} 

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

    const frequencias = [
        "Diariamente", "Semanalmente", "Mensalmente", "Anualmente"
    ];

    useEffect(() => {
        const novosDados = originalData.filter((e) => filters.includes(e.classificacao?.toLowerCase()));
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
        switch (classificacao?.toLowerCase()) {
            case 'atividade': return '#9BB8CD';
            case 'vacina': return '#F9E8D9';
            case 'tratamento': return '#9bdb87';
            case 'rotina': return '#b5a4ff';
        }
    }

    const navigation = useNavigation();
    const { id } = route.params;

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
        const loadData = async () => {
            const res = await get(`agenda/s/${id}`);
            if (res.ok) {
                console.log(res.body);
                const dados = await res.json();
                setOriginalData(dados);
                setFilteredData(dados);
            }
        }
        loadData();
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
                                switch (item?.classificacao?.toLowerCase()) {
                                    case "atividade":
                                        navigation.navigate(NavigationKeys.Atividade, { idPet: id, idRegistro: item.idRegistro });
                                        break;

                                    case "vacina":
                                        navigation.navigate(NavigationKeys.Vacina, { idPet: id, idRegistro: item.idRegistro });
                                        break;

                                    case "tratamento":
                                        navigation.navigate(NavigationKeys.Cuidado, { idPet: id, idRegistro: item.idRegistro });
                                        break;

                                    case "rotina":
                                        navigation.navigate(NavigationKeys.Cuidado, { idPet: id, idRegistro: item.idRegistro });
                                }
                            }
                            }>
                            <View style={styles.registroContainer}>
                                <Text style={styles.nomeRegistro}>{item.nomeRegistro}</Text>
                                <View style={styles.registroContainerRow}>
                                    <View style={styles.registroContainerStatus}>
                                        <Image style={styles.registroContainerIcons}
                                            source={require('./assets/calendar.png')}
                                        />
                                        <Text>{frequencias[item.frequencia - 1]}</Text>
                                    </View>
                                    <View style={styles.registroContainerStatus}>
                                        <Image style={styles.registroContainerIcons}
                                            source={require('./assets/clock.png')}
                                        />
                                        <Text>{item.horario.substring(0, 5)}{'h'}</Text>
                                    </View>
                                    <View style={[styles.tipoRegistroConteiner, { backgroundColor: getColor(item.classificacao) }]}>
                                        <Text>
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
        backgroundColor: '#FFC847'
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