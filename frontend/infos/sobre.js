import { View, Text, StyleSheet } from 'react-native';

export default function Sobre(){

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Sobre</Text>
            <Text style={styles.description}>
                Pet Agenda é um aplicativo desenvolvido para o controle geral de atividades relacionadas aos pets.
            </Text>
            <Text style={styles.description}>
                O usuário poderá cadastrar e acessar rapidamente informações sobre seus pets e ter sempre em mãos de forma segura o histórico de seu animalzinho.  
            </Text>
            <Text style={styles.description}>
                Cuide de seu pet com carinho!  
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        paddingHorizontal: '8%',
        paddingBottom: 30,
        minHeight: '100%',
    },
    title: {
        color: '#4A1E91',
        fontSize: 20,
        alignSelf: 'center',
        margin: 30,
        fontWeight: 'bold',
    },
    description: {
        color: '#4A1E91',
        fontSize: 16,
        textAlign: 'justify', 
        lineHeight: 25,
        paddingVertical: 5,
    },
});