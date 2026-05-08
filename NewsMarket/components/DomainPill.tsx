import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";


type DomainPillProps = {
    domain: string;
    isSelected: boolean;
    onPress: () => void;
};

export const DomainPill: React.FC<DomainPillProps> = ({ domain, isSelected, onPress }) => {
    return (
        <TouchableOpacity
            style={[styles.pill, isSelected ? styles.selectedPill : null]}
            onPress={onPress}
            accessibilityRole="button"
            accessibilityLabel={domain}
            accessibilityState={{ selected: isSelected }}

        >
            <Text style={[styles.pillText, isSelected ? styles.selectedPillText : null]}>{domain}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    pill: {
        height: 30,
        paddingHorizontal: 16,
        borderRadius: 20,
        backgroundColor: '#eee',
        marginRight: 8,
        justifyContent: "center",
    },
    selectedPill: {
        backgroundColor: '#95adc7',
    },
    pillText: {
        color: '#333',
    },
    selectedPillText: {
        color: '#fff',
    },
});     