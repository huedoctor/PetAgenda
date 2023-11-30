import { useState } from 'react';
import { StyleSheet, View, Image, Text } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default function PetSelect({ onSelect }) {

    const [petVisivel, setPetVisivel] = useState(null);

    return (
        <View style={styles.selecaoEspecie}>
            {petVisivel === 'gato' ? null : (
                <View>
                    <TouchableOpacity onPress={() => {
                        if (petVisivel === 'cachorro') {
                            setPetVisivel(null);
                            onSelect(null);
                        } else {
                            setPetVisivel('cachorro');
                            onSelect('cachorro');
                        }
                    }}>
                        <Image
                            source={require('../assets/dog.png')}
                            style={styles.optionImage}
                        />
                        <Text style={styles.optionName}>
                            Cachorro
                        </Text>
                    </TouchableOpacity>
                </View>
            )}
            {petVisivel === 'cachorro' ? null : (
                <View>
                    <TouchableOpacity onPress={() => {
                        if (petVisivel === 'gato') {
                            setPetVisivel(null);
                            onSelect(null);
                        } else {
                            setPetVisivel('gato');
                            onSelect('gato');
                        }
                    }}>
                        <Image
                            source={require('../assets/cat.png')}
                            style={styles.optionImage}
                        />
                        <Text style={styles.optionName}>
                            Gato
                        </Text>
                    </TouchableOpacity>
                </View>
            )}
        </View>
    )
}
const styles = StyleSheet.create({
    selecaoEspecie: {
        flexDirection: 'row',
        justifyContent: 'center',
        gap: 30,
    },
    optionImage: {
        width: 150,
        height: 150,
    },
    optionName: {
        marginTop: 15,
        fontSize: 20,
        alignSelf: 'center',
    },
})
