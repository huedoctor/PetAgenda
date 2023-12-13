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
    LogBox,
} from 'react-native';
import BouncyCheckboxGroup from "react-native-bouncy-checkbox-group";
import { useNavigation, CommonActions } from '@react-navigation/native';
import DropDownPicker from 'react-native-dropdown-picker';
import { post } from './util/request';
import navigationKeys from './util/navigationKeys';
LogBox.ignoreLogs(['VirtualizedLists']);

export default function CadastroCuidado({ route }) {

    const navigation = useNavigation();

    const [tipoCuidado, setTipoCuidado] = useState(null);
    const [nome, setNome] = useState(null);
    const [descricao, setDescricao] = useState();
    const [dataInicio, setDataInicio] = useState(null);
    const [dataFinal, setDataFinal] = useState(null);
    const [horario, setHorario] = useState(null);
    const [frequencia, setFrequencia] = useState(null);
    const [lembrete, setLembrete] = useState(null);
    const [inputFinal, setInputFinal] = useState(false);
    const [dataInicioErro, setDataInicioErro] = useState(false);
    const [dataFinalErro, setDataFinalErro] = useState(false);
    const [horarioErro, setHorarioErro] = useState(false);
    const [open, setOpen] = useState(false);
    const [botaoHabilitado, setBotaoHabilitado] = useState(false);
    const [loading, setLoading] = useState(false);
    const [items, setItems] = useState([
        { label: 'Diáriamente', value: '1' },
        { label: 'Semanalmente', value: '2' },
        { label: 'Mensalmente', value: '3' },
        { label: 'Anualmente', value: '4' },
    ]);
    LogBox.ignoreLogs(['VirtualizedLists']);

    const { id } = route.params; //id do pet pra cadastrar o cuidado

    const handleRegistraCuidado = async () => {
        //Método pra cadastrar o cuidado
        setLoading(true);
        const res = await post(`remedio/${id}`, {
            "nomeRemedio": nome,
            "descricaoRemedio": descricao,
            "tipoCuidado": tipoCuidado,
            "agenda": {
                "dataInicioEvento": dataInicio,
                "dataFinalEvento": dataFinal,
                "horarioEvento": horario + ':00',
                "frequenciaEvento": frequencia
            }
        });
        setLoading(false);
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
                            params: { id: id }
                        }
                    ],
                })
            );
        }
    };

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
            setDataInicio(null);
            setDataInicioErro(true);
        } else {
            const [day, month, year] = date.split('/').map(Number);
            if (date.length > 0 && day < 1 || day > 31) {
                setDataInicio(null);
                setDataInicioErro(true);
            } else if (date.length > 0 && month < 1 || month > 12) {
                setDataInicio(null);
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
            setDataFinal(null);
            setDataFinalErro(true);
        } else {
            const [day, month, year] = date.split('/').map(Number);
            if (date.length > 0 && day < 1 || day > 31) {
                setDataFinal(null);
                setDataFinalErro(true);
            } else if (date.length > 0 && month < 1 || month > 12) {
                setDataFinal(null);
                setDataFinalErro(true);
            } else {
                setDataFinalErro(false);
            }
        }
    };

    const validateHour = (time) => {
        const hourRegex = /^\d{2}:\d{2}$/;
        if (time.length > 0 && !hourRegex.test(time)) {
            setHorario(null);
            setHorarioErro(true);
        } else {
            const [hour, minutes] = time.split(':');
            if (hour < 0 || hour > 23) {
                setHorario(null);
                setHorarioErro(true);
            } else if (minutes < 0 || minutes > 59) {
                setHorario(null);
                setHorarioErro(true);
            } else {
                setHorarioErro(false);
            }
        }
    };

    useEffect(() => {
        if (tipoCuidado != null && nome && dataInicio && horario && frequencia) {
            setBotaoHabilitado(true);
        } else {
            setBotaoHabilitado(false);
        }
    }, [tipoCuidado, nome, dataInicio, horario, frequencia])

    useEffect(() => {
        if (inputFinal) {
            setDataFinal(null)
        }
    }, [inputFinal])

    const opcoesTipoTratamento = [
        {
            id: "rotina",
            text: "Rotina",
            fillColor: "#4A1E91",
            textStyle: {
                textDecorationLine: 'none',
            }
        },
        {
            id: "tratamento",
            text: "Tratamento",
            style: styles.checkBoxOptionLeft,
            fillColor: "#4A1E91",
            textStyle: {
                textDecorationLine: 'none',
            }
        },
    ];

    return (
        <ScrollView style={{ backgroundColor: 'white' }}>
            <View style={styles.container}>
                <Text style={[styles.question, { marginBottom: 20 }]}>Qual o tipo do cuidado?*</Text>
                <BouncyCheckboxGroup
                    data={opcoesTipoTratamento}
                    onChange={(selectedItem) => {
                        if (selectedItem.id == "rotina") {
                            setTipoCuidado(false);
                            setInputFinal(true)
                        } else if (selectedItem.id == "tratamento") {
                            setTipoCuidado(true);
                            setInputFinal(false)
                        }
                    }}
                />
                <TextInput
                    style={[styles.input]}
                    placeholder="Nome do cuidado*"
                    placeholderTextColor="#46464C"
                    onChangeText={(text) => setNome(text)}
                    value={nome}
                />
                <Text style={styles.question}>Descrição</Text>
                <TextInput
                    style={[styles.input]}
                    placeholder="Descrição do registro"
                    placeholderTextColor="#46464C"
                    onChangeText={(text) => setDescricao(text)}
                    value={descricao}
                    maxLength={40}
                />
                <Text style={styles.question}>Data de início</Text>
                {dataInicioErro &&
                    <Text style={styles.aviso}>Insira uma data válida</Text>
                }
                <TextInput
                    style={[styles.input, dataInicioErro ? { marginTop: 0 } : { marginTop: 20 }]}
                    keyboardType='numeric'
                    maxLength={10}
                    placeholder="Data inicial do cuidado*"
                    placeholderTextColor="#46464C"
                    onChangeText={(text) => {
                        setDataInicio(inputDateMask(text))
                    }}
                    onEndEditing={() => validateDateInicio(dataInicio)}
                    value={dataInicio}
                />
                <Text
                    style={{ opacity: 0.5, marginLeft: 15 }}
                >DD/MM/AAAA</Text>
                {!inputFinal && (
                    <>
                        <Text style={styles.question}>Data final</Text>
                        {dataFinalErro ? (
                            <Text style={styles.aviso}>Insira uma data válida</Text>
                        ) : null}
                        <TextInput
                            style={[
                                styles.input,
                                dataFinalErro ? { marginTop: 0 } : { marginTop: 20 }
                            ]}
                            keyboardType='numeric'
                            maxLength={10}
                            placeholder="Data final do cuidado"
                            placeholderTextColor="#46464C"
                            onChangeText={(text) => {
                                setDataFinal(inputDateMask(text))
                            }}
                            onEndEditing={() => validateDateFinal(dataFinal)}
                            value={dataFinal}
                        />
                        <Text style={{ opacity: 0.5, marginLeft: 15 }}>DD/MM/AAAA</Text>
                    </>
                )}
                <Text style={styles.question}>Horário</Text>
                {horarioErro &&
                    <Text style={styles.aviso}>Insira um horário válido</Text>
                }
                <TextInput
                    style={[styles.input, horarioErro ? { marginTop: 0 } : { marginTop: 20 }]}
                    placeholder="Horário do dia para o cuidado*"
                    placeholderTextColor="#46464C"
                    keyboardType='numeric'
                    maxLength={5}
                    onChangeText={(text) => {
                        setHorario(inputHourMask(text))
                    }}
                    onEndEditing={() => validateHour(horario)}
                    value={horario}
                />
                <Text
                    style={{ opacity: 0.5, marginLeft: 15 }}
                >HH:MM</Text>
                <Text style={styles.question}>Qual a frequência?</Text>
                <DropDownPicker
                    open={open}
                    value={frequencia}
                    items={items}
                    setOpen={setOpen}
                    setValue={setFrequencia}
                    setItems={setItems}
                    nestedScrollEnabled={false}
                    placeholder='Escolha uma frequência*'
                    style={{ marginTop: 20 }}
                />
                <TouchableOpacity
                    style={[styles.cuidadoSubmitButton, !botaoHabilitado ? { opacity: 0.5 } : { opacity: 1 }]}
                    disabled={!botaoHabilitado}
                    onPress={handleRegistraCuidado}>
                    <Text style={styles.cuidadoSubmitButtonText}>Salvar</Text>
                </TouchableOpacity>
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
    question: {
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 20,
    },
    input: {
        width: 300,
        height: 50,
        borderRadius: 40,
        paddingLeft: 15,
        backgroundColor: '#E4DBF0',
        marginTop: 20,
    },
    checkBoxOptionLeft: {
        marginLeft: 60,
    },
    aviso: {
        fontSize: 12,
        color: 'red',
        marginTop: 5,
        marginLeft: 15,
    },
    cuidadoSubmitButton: {
        marginTop: 40,
        width: 300,
        height: 60,
        backgroundColor: '#4A1E91',
        borderRadius: 40,
        alignItems: 'center',
        justifyContent: 'center',
    },
    cuidadoSubmitButtonText: {
        fontSize: 20,
        color: '#FFFFFF',
    }
});
