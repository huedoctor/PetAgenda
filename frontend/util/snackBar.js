import { View, Text, StyleSheet, Dimensions } from 'react-native';

function SnackBar(props) {

    return (
        props.visible && <View style={styles.snackBarContainer}>
            <Text>props.textMessage</Text>
        </View>
    );
};

SnackBar.LENGTH_SHORT = 1500;
SnackBar.LENGTH_LONG = 3500;

export default SnackBar;

const snackBarHeight = 40;
const snackBarPadding = 10;
const windowDimensions = Dimensions.get('window');
const styles = StyleSheet.create({
    snackBarContainer: {
        position: 'absolute',
        zIndex: '999',
        minHeight: snackBarHeight,
        bottom: 0,
        padding: snackBarPadding,
        width: windowDimensions.width,
        backgroundColor: '#BBB'
    }
});
