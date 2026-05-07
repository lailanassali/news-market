import { StyleSheet, Text, TouchableOpacity } from "react-native";

type SortButtonProps = {
    sortBy: 'publishedAt' | 'popularity';
    setSortBy: (sort: 'publishedAt' | 'popularity') => void;
};

export const SortButton: React.FC<SortButtonProps> = ({ sortBy, setSortBy }) => {
    return (
        <TouchableOpacity
            style={styles.button}
            onPress={() => setSortBy(sortBy === 'publishedAt' ? 'popularity' : 'publishedAt')}
            accessibilityRole="button"
            accessibilityLabel={`Sort by ${sortBy === 'publishedAt' ? 'popularity' : 'latest'}`}
        >
            <Text style={styles.text}> 
                Sort: {sortBy === 'publishedAt' ? 'Latest' : 'Popular'} ⇅
            </Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        backgroundColor: '#eee',
        borderRadius: 20,
    
        paddingVertical: 6,
        paddingHorizontal: 12,
    },
    text: {
        fontSize: 12,
        color: '#333',
        fontWeight: 'bold',
        fontFamily: 'System',
    },
    icon: {
        fontSize: 10,
        color: '#333',
        fontWeight: 'bold',
    }
});