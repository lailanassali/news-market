import { FlatList, StyleSheet, Text, View } from "react-native";
import { DOMAINS } from "../constants";
import { useContext } from "react";
import { ArticleContext } from "../context/ArticleContext";
import { DomainPill } from "../components/DomainPill";
import { SafeAreaView } from "react-native-safe-area-context";

export const HomeScreen = () => {

    const { articles, selectedDomains, toggleDomain } = useContext(ArticleContext);

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.headingText}>NewsMarket</Text>
            <Text>Select a domain to read articles</Text>
            <View>
                <FlatList 
                    horizontal
                    data={DOMAINS} 
                    keyExtractor={(item) => item}
                    renderItem={({ item }) => (
                        <DomainPill isSelected={selectedDomains.includes(item)} domain={item} onPress={() => toggleDomain(item)} /> 
                    )}
                    showsHorizontalScrollIndicator={false}
                    style={styles.flatList}
                />
            </View>
            <View style={styles.articlesContainer}>
                <Text style={styles.subheadingText}>Latest articles</Text>
                <FlatList
                    data={articles} 
                    keyExtractor={(item) => item.source.id || item.title} 
                    renderItem={({ item }) => (
                        <></> // article card component
                    )}
                    />
            </View>
        </SafeAreaView>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    articlesContainer: {
        flex: 1,    
    },
    headingText: {
        fontSize: 24,
        fontWeight: 'bold',
        paddingBottom: 6,
    },
    flatList: {
        marginTop: 16,
        textAlign: "center"
    },
    subheadingText: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 8,
        marginTop: 24,
    },
});