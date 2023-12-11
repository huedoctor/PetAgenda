import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export default function Direitos() {

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Direitos Autorais</Text>
            <Text style={styles.description}>
                &copy;2023PetAgenda. Todos os direitos reservados a Carioca & Amigos e seus criadores: Caroline Stelitano, Eddie Mauricio Silva dos Santos, Lucas da Silva Santos e Victor Hugo Enriquetto Marques da Cruz.
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