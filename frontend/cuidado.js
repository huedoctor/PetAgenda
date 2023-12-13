import React, { useEffect, useState } from 'react';
import 'react-native-gesture-handler';
import {
    View,
    TextInput,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image,
    ScrollView,
    LogBox
} from 'react-native';
import { useNavigation, CommonActions } from '@react-navigation/native';
import { get, del, put } from './util/request.js';
import navigationKeys from './util/navigationKeys.js';
import LoadindIndicator from './components/LoadingIndicator.jsx';
import DropDownPicker from 'react-native-dropdown-picker';
LogBox.ignoreLogs(['VirtualizedLists']);

export default function Cuidado({ route }) {

    const [novoNome, setNovoNome] = useState(null);
    const [novaDescricao, setNovaDescricao] = useState(null);
    const [novaDataInicio, setNovaDataInicio] = useState(null);
    const [novaDataFinal, setNovaDataFinal] = useState(null);
    const [novoHorario, setNovoHorario] = useState(null);
    const [novaFrequencia, setNovaFrequencia] = useState(null);
    const [dataInicioErro, setDataInicioErro] = useState(false);
    const [dataFinalErro, setDataFinalErro] = useState(false);
    const [inputFinal, setInputFinal] = useState(false);
    const [horarioErro, setHorarioErro] = useState(false);
    const [cuidadoObject, setCuidadoObject] = useState({});
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const [opcoesTipoTratamento, setOpcoesTipoTratamento] = useState("");
    const [items, setItems] = useState([
        { label: 'Diáriamente', value: '1' },
        { label: 'Semanalmente', value: '2' },
        { label: 'Mensalmente', value: '3' },
        { label: 'Anualmente', value: '4' },
    ]);


    const navigation = useNavigation();

    const { idPet, idRegistro } = route.params;

    useEffect(() => {
        const loadData = async () => {
            setLoading(true);
            const res = await get(`remedio/${idRegistro}`);
            if (res.ok) {
                const cuidadoJSON = await res.json();
                setCuidadoObject(cuidadoJSON);
                navigation.setOptions({ title: cuidadoJSON.nomeRemedio })
            }
            setLoading(false);
        }
        loadData();
    }, [])

    useEffect(() => {
        if (!cuidadoObject.tipoCuidado) {
            setOpcoesTipoTratamento("Rotina");
            setInputFinal(true)
        } else {
            setOpcoesTipoTratamento("Tratamento");
        }
    }, [cuidadoObject])

    const handleSubmitEdit = () => {
        const loadData = async () => {
            const res = await put(`remedio/${cuidadoObject.agenda.idAgenda}`, {
                "nomeRemedio": novoNome || cuidadoObject.nomeRemedio,
                "descricaoRemedio": novaDescricao || cuidadoObject.descricaoRemedio,
                "agenda": {
                    "dataInicioEvento": novaDataInicio || cuidadoObject.agenda.dataInicioEvento,
                    "dataFinalEvento": novaDataFinal || cuidadoObject.agenda.dataFinalEvento,
                    // "horarioEvento": novoHorario + ':00' || cuidadoObject.agenda.horarioEvento,
                    "frequenciaEvento": novaFrequencia || cuidadoObject.agenda.frequenciaEvento
                }
            });
            if (res.ok) {
                navigation.dispatch(
                    CommonActions.reset({
                        index: 0,
                        routes: [
                            {
                                name: navigationKeys.TelaPets,
                            },
                            {
                                name: navigationKeys.Registro,
                                params: { id: idPet }
                            }
                        ],
                    })
                );
            }
        }
        loadData();
    }

    const handleSubmitDelet = () => {
        const loadData = async () => {
            const res = await del(`agenda/${cuidadoObject.agenda.idAgenda}`);
            if (res.ok) {
                navigation.dispatch(
                    CommonActions.reset({
                        index: 0,
                        routes: [
                            {
                                name: navigationKeys.TelaPets,
                            },
                            {
                                name: navigationKeys.Registro,
                                params: { id: idPet }
                            }
                        ],
                    })
                );
            }
        }
        loadData();
    }

    const inputDateMask = (value) => {
        return value
            .replace(/\D/g, '')
            .replace(/(\d{2})(\d)/, '$1/$2')
            .replace(/(\d{2})(\d)/, '$1/$2')
            .replace(/(\d{4})(\d)/, '$1');
    }

    const inputHourMask = (value) => {
        return value
            .replace(/\D/g, '')
            .replace(/(\d{2})(\d)/, '$1:$2')
            .replace(/(\d{2})(\d)/, '$1:$2');
    };

    const validateDateInicio = (date) => {
        if (!date) {
            return;
        }
        const dateRegex = /^\d{2}\/\d{2}\/\d{4}$/;
        if (date.length > 0 && !dateRegex.test(date)) {
            setNovaDataInicio(null);
            setDataInicioErro(true);
        } else {
            const [day, month, year] = date.split('/').map(Number);
            if (date.length > 0 && day < 1 || day > 31) {
                setNovaDataInicio(null);
                setDataInicioErro(true);
            } else if (date.length > 0 && month < 1 || month > 12) {
                setNovaDataInicio(null);
                setDataInicioErro(true);
            } else {
                setDataInicioErro(false);
            }
        }
    };

    const validateDateFinal = (date) => {
        if (!date) {
            return;
        }
        const dateRegex = /^\d{2}\/\d{2}\/\d{4}$/;
        if (date.length > 0 && !dateRegex.test(date)) {
            setNovaDataFinal(null);
            setDataFinalErro(true);
        } else {
            const [day, month, year] = date.split('/').map(Number);
            if (date.length > 0 && day < 1 || day > 31) {
                setNovaDataFinal(null);
                setDataFinalErro(true);
            } else if (date.length > 0 && month < 1 || month > 12) {
                setNovaDataFinal(null);
                setDataFinalErro(true);
            } else {
                setDataFinalErro(false);
            }
        }
    };

    const frequencias = [
        "Diariamente", "Semanalmente", "Mensalmente", "Anualmente"
    ];

    const validateHour = (time) => {
        const hourRegex = /^\d{2}:\d{2}$/;
        if (time.length > 0 && !hourRegex.test(time)) {
            setNovoHorario(null);
            setHorarioErro(true);
        } else {
            const [hour, minutes] = time.split(':');
            if (hour < 0 || hour > 23) {
                setNovoHorario(null);
                setHorarioErro(true);
            } else if (minutes < 0 || minutes > 59) {
                setNovoHorario(null);
                setHorarioErro(true);
            } else {
                setHorarioErro(false);
            }
        }
    };

    return (
        <ScrollView>
            <View style={styles.container}>
                <Text style={styles.title}>Tipo do cuidado</Text>
                <View style={styles.textLabel}>
                    <Text style={styles.textLabelText}>
                        {opcoesTipoTratamento}
                    </Text>
                </View>
                <Text style={styles.title}>Nome do cuidado</Text>
                <TextInput
                    style={styles.textLabel}
                    placeholder={cuidadoObject.nomeRemedio}
                    placeholderTextColor="#46464C"
                    onChangeText={(text) => {
                        setNovoNome(text)
                    }}
                    value={novoNome}
                />
                <Text style={styles.title}>Descrição</Text>
                <View style={styles.textLabel}>
                    <TextInput
                        style={styles.textLabelText}
                        placeholder={cuidadoObject.descricaoRemedio}
                        placeholderTextColor="#46464C"
                        maxLength={40}
                        onChangeText={(text) => {
                            setNovaDescricao(text)
                        }}
                        value={novaDescricao}
                    >
                    </TextInput>
                </View>
                <Text style={styles.title}>Data de início</Text>
                {dataInicioErro &&
                    <Text style={styles.aviso}>Insira uma data válida</Text>
                }
                <TextInput
                    style={[styles.textLabel, dataInicioErro ? { marginTop: 0 } : { marginTop: 20 }]}
                    keyboardType='numeric'
                    maxLength={10}
                    placeholder={cuidadoObject.agenda?.dataInicioEvento}
                    placeholderTextColor="#46464C"
                    onChangeText={(text) => {
                        setNovaDataInicio(inputDateMask(text))
                    }}
                    onEndEditing={() => validateDateInicio(novaDataInicio)}
                    value={novaDataInicio}
                />
                <Text
                    style={{ opacity: 0.5, marginLeft: 15 }}
                >DD/MM/AAAA</Text>
                {!inputFinal && (
                    <>
                        <Text style={styles.title}>Data final</Text>
                        {dataFinalErro ? (
                            <Text style={styles.aviso}>Insira uma data válida</Text>
                        ) : null}
                        <TextInput
                            style={[styles.textLabel, dataFinalErro ? { marginTop: 0 } : { marginTop: 20 }]}
                            keyboardType='numeric'
                            maxLength={10}
                            placeholder={cuidadoObject.agenda?.dataFinalEvento ?? "Data final do cuidado"}
                            placeholderTextColor="#46464C"
                            onChangeText={(text) => {
                                setNovaDataFinal(inputDateMask(text))
                            }}
                            onEndEditing={() => validateDateFinal(novaDataFinal)}
                            value={novaDataFinal}
                        />
                        <Text style={{ opacity: 0.5, marginLeft: 15 }}>DD/MM/AAAA</Text>
                    </>
                )}
                <Text style={styles.title}>Horário</Text>
                {horarioErro &&
                    <Text style={styles.aviso}>Insira um horário válido</Text>
                }
                <TextInput
                    style={[styles.textLabel, horarioErro ? { marginTop: 0 } : { marginTop: 20 }]}
                    placeholder={cuidadoObject.agenda?.horarioEvento.substring(0, 5)}
                    placeholderTextColor="#46464C"
                    keyboardType='numeric'
                    maxLength={5}
                    onChangeText={(text) => {
                        setNovoHorario(inputHourMask(text))
                    }}
                    onEndEditing={() => validateHour(novoHorario)}
                    value={novoHorario}
                />
                <Text
                    style={{ opacity: 0.5, marginLeft: 15 }}
                >HH:MM</Text>
                <Text style={styles.title}>Frequência</Text>
                <DropDownPicker
                    open={open}
                    value={novaFrequencia}
                    items={items}
                    setOpen={setOpen}
                    setValue={setNovaFrequencia}
                    setItems={setItems}
                    nestedScrollEnabled={false}
                    placeholder={frequencias[cuidadoObject.agenda?.frequenciaEvento - 1]}
                    style={{ marginTop: 20 }}
                />
                <View style={{ alignItems: 'center' }}>
                    <View style={styles.buttonsConteiner}>
                        <TouchableOpacity style={styles.button} onPress={handleSubmitEdit}>
                            <Text style={styles.buttonText}>
                                Salvar
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.button} onPress={handleSubmitDelet}>
                            <Text style={styles.buttonText}>
                                Excluir
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
        backgroundColor: '#E4DBF0',
        marginTop: 15,
        justifyContent: 'center',
    },
    textLabelText: {
        fontSize: 15,
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
    aviso: {
        fontSize: 12,
        color: 'red',
        marginTop: 5,
        marginLeft: 15,
    },
});
