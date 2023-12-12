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
import DropDownPicker from 'react-native-dropdown-picker';
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { useNavigation } from '@react-navigation/native';
import { get } from './util/request.js';
LogBox.ignoreLogs(['VirtualizedLists']); 


export default function CadastroVacina({ route }) {

    const navigation = useNavigation();

    const classificacao = "vacina";
    const [nomeVacina, setNomeVacina] = useState(null);
    const [dataInicio, setDataInicio] = useState(null);
    const [dataFinal, setDataFinal] = useState(null);
    const [horario, setHorario] = useState(null);
    const [frequencia, setFrequencia] = useState(null);
    const [inputFinal, setInputFinal] = useState(false);
    const [lembrete, setLembrete] = useState(null);
    const [dataInicioErro, setDataInicioErro] = useState(false);
    const [dataFinalErro, setDataFinalErro] = useState(false);
    const [horarioErro, setHorarioErro] = useState(false);
    const [open, setOpen] = useState(false);
    const [open2, setOpen2] = useState(false);
    const [botaoHabilitado, setBotaoHabilitado] = useState(false);
    const [items, setItems] = useState([
        { label: 'Diáriamente', value: '1' },
        { label: 'Semanalmente', value: '2' },
        { label: 'Mensalmente', value: '3' },
        { label: 'Anualmente', value: '4' },
    ]);
    const [vacinas, setVacinas] = useState([]);

    const { id } = route.params; //id do pet pra cadastrar a vacina

    const handleRegistraVacina = async () => {
        //Comando para cadastrar a Vacina
    };

    useEffect(() => {
        const loadData = async () => {
            const res = await get(`vacina/pet/${id}`);
            if (res.ok) {
                const vacinasJSON = await res.json();
                const jsonFormatado = vacinasJSON.map((e) => {
                    return {
                        label: e.nomeVacina,
                        value: e.idVacina,
                    }
                })
                setVacinas(jsonFormatado);
            }
        }
        loadData();
    }, [])

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
        if (dataInicio && horario && frequencia) {
            setBotaoHabilitado(true);
        } else {
            setBotaoHabilitado(false);
        }
    }, [dataInicio, horario, frequencia])

    useEffect(() => {
        if (inputFinal) {
            setDataFinal(null)
        }
    }, [inputFinal])

    return (
        <ScrollView style={{backgroundColor: 'white'}}>
            <View style={styles.container}>
                <DropDownPicker
                    open={open2}
                    value={frequencia}
                    items={vacinas}
                    setOpen={setOpen2}
                    setValue={setNomeVacina}
                    setItems={setVacinas}
                    nestedScrollEnabled={false}
                    placeholder='Selecione a vacina'
                    style={{ marginTop: 20 }}
                />
                <Text style={styles.question}>Data de início*</Text>
                {dataInicioErro &&
                    <Text style={styles.aviso}>Insira uma data válida</Text>
                }
                <TextInput
                    style={[styles.input, dataInicioErro ? { marginTop: 0 } : { marginTop: 20 }]}
                    keyboardType='numeric'
                    maxLength={10}
                    placeholder="Data inicial da vacina"
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
                <BouncyCheckbox
                    size={20}
                    fillColor="#4A1E91"
                    text={"É uma vacina permanente?"}
                    textStyle={{
                        textDecorationLine: 'none',
                    }}
                    style={{ marginTop: 20 }}
                    innerIconStyle={{ borderWidth: 2 }}
                    onPress={(isChecked) => {
                        setInputFinal(isChecked);
                    }}
                />
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
                            placeholder="Data final da vacina"
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
                <Text style={styles.question}>Horário*</Text>
                {horarioErro &&
                    <Text style={styles.aviso}>Insira um horário válido</Text>
                }
                <TextInput
                    style={[styles.input, horarioErro ? { marginTop: 0 } : { marginTop: 20 }]}
                    placeholder="Horário do dia para a vacina"
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
                <Text style={styles.question}>Qual a frequência?*</Text>
                <DropDownPicker
                    open={open}
                    value={frequencia}
                    items={items}
                    setOpen={setOpen}
                    setValue={setFrequencia}
                    setItems={setItems}
                    nestedScrollEnabled={false}
                    placeholder='Escolha uma frequência'
                    style={{ marginTop: 20 }}
                />
                <TouchableOpacity
                    style={[styles.vacinaSubmitButton, !botaoHabilitado ? { opacity: 0.5 } : { opacity: 1 }]}
                    disabled={!botaoHabilitado}
                    onPress={handleRegistraVacina}>
                    <Text style={styles.vacinaSubmitButtonText}>Salvar</Text>
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
        backgroundColor: '#CAC1D6',
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
    vacinaSubmitButton: {
        marginTop: 40,
        width: 300,
        height: 60,
        backgroundColor: '#4A1E91',
        borderRadius: 40,
        alignItems: 'center',
        justifyContent: 'center',
    },
    vacinaSubmitButtonText: {
        fontSize: 20,
        color: '#FFFFFF',
    }
});
