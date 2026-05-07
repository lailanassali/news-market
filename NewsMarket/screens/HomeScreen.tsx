import React from "react";
import { ActivityIndicator, FlatList, StyleSheet, Text, View } from "react-native";
import { DOMAINS } from "../constants";
import { useContext } from "react";
import { ArticleContext } from "../context/ArticleContext";
import { DomainPill } from "../components/DomainPill";
import { SafeAreaView } from "react-native-safe-area-context";
import { ArticleCard } from "../components/ArticleCard";
import { SortButton } from "../components/sortButton";

export const HomeScreen = () => {
    const { articles, selectedDomains, toggleDomain, loading, error, sortBy, setSortBy } = useContext(ArticleContext);

    if (loading) {
        return (
            <SafeAreaView style={styles.container}>
                <ActivityIndicator size="large" color="#185FA5" />
            </SafeAreaView>
        );
    }

    if (error) {
        return (
            <SafeAreaView style={styles.container}>
                <Text style={styles.error}>{error}</Text>
            </SafeAreaView>
        );
    }

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
            {articles.length === 0 && selectedDomains.length === 0 ? (
                <View style={styles.noArticlesContainer}>
                    <Text style={styles.noArticlesText}>Select a domain to read articles</Text>
                </View>
            ) : (
            <View style={styles.articlesContainer}>
                <View style={styles.articlesHeader}>
                <Text style={styles.articlesTitle}>Latest articles</Text>
                <SortButton 
                    sortBy={sortBy} 
                    setSortBy={setSortBy}
                />
            </View>
                    <FlatList
                        data={articles} 
                        keyExtractor={(item) => item.url} 
                        renderItem={({ item }) => (
                            <ArticleCard source={item.source} title={item.title} description={item.description} publishedAt={item.publishedAt} content={item.content} />
                        )}
                    />
            </View>
            )}
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
        marginVertical: 24
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
    articlesTitle: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    articlesHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
    },
    noArticlesText: {
        color: '#888',
        fontSize: 16,
        textAlign: 'center',
        marginTop: 24,
    },
    noArticlesContainer: {
        flex: 1,
        justifyContent: 'center',
    },
    error: {
        color: 'red',
        textAlign: 'center',
        marginTop: 20
    }
});