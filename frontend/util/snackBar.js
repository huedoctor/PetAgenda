import { View, Text, StyleSheet, Dimensions } from 'react-native';

function SnackBar(props) {

    return (
        props.visible && <View style={styles.snackBarContainer}>
            <Text style={styles.snackBarText}>{props.textMessage}</Text>
        </View>
    );
};

SnackBar.LENGTH_SHORT = 1500;
SnackBar.LENGTH_LONG = 3500;

export default SnackBar;

const snackBarHeight = 40;
const snackBarPadding = 10;
const snackBarMargin = 12;
const windowDimensions = Dimensions.get('window');
const styles = StyleSheet.create({
    snackBarContainer: {
        position: 'absolute',
        zIndex: 999,
        minHeight: snackBarHeight,
        left: 0,
        top: windowDimensions.height - 104 - (snackBarMargin*2),
        padding: snackBarPadding,
        width: windowDimensions.width - (snackBarMargin*2),
        margin: snackBarMargin,
        backgroundColor: '#BBB'
    },
    snackBarText: {
        fontWeight: '500'
    }
});
