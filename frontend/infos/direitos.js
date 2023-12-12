import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export default function Direitos() {

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Direitos Autorais</Text>
            <Text style={styles.description}>
                &copy;2023PetAgenda. Todos os direitos reservados a Carioca & Amigos e seus criadores: 
                {'\n'}
                Caroline Stelitano
                {'\n'}
                Eddie Mauricio Silva dos Santos 
                {'\n'}
                Lucas da Silva Santos
                {'\n'}
                Victor Hugo Enriquetto Marques da Cruz.
                {'\n\n'}
                Imagens dos ícones de licensa gratuita de autoria do site Flaticon.com. 
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