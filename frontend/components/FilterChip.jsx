import { useState } from "react";
import { Text, StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

export default function FilterChip(props) {

    const [active, setActive] = useState(props.active ?? 'false');

    const getColor = () => props.color ?? '#000';

    const toggleActive = () => {
        const newValue = !active;

        setActive(newValue);
        return newValue;
    };

    const styles = StyleSheet.create({
        chip: {
            paddingVertical: 6,
            paddingHorizontal: 10,
            borderRadius: 10,
            borderWidth: 2,
            borderColor: getColor(),
            backgroundColor: active ? getColor() : 'transparent',
        }
    });

    return (
        <TouchableOpacity
            style={styles.chip}
            onPress={() => {
                const newValue = toggleActive();
                props.onChange(newValue);
            }}>
            <Text>{props.label}</Text>
        </TouchableOpacity>
    );
};