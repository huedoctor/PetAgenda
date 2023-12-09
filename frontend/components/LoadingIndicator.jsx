import {ActivityIndicator, StyleSheet} from 'react-native';

export default function LoadingIndicator() {
    
    return (
        <ActivityIndicator style={styles.LoadingIndicator}/>
    );
}

const styles = StyleSheet.create({
    LoadingIndicator: {
        justifyContent: 'center',
        alignSelf: 'center',
    },
});