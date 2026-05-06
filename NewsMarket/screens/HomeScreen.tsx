import { FlatList, StyleSheet, Text, View } from "react-native";
import { DOMAINS } from "../constants";
import { useContext } from "react";
import { ArticleContext } from "../context/ArticleContext";


export const HomeScreen = () => {

    const { articles } = useContext(ArticleContext);

    return (
        <View style={styles.container}>
        <Text>NewsMarket</Text>
        <FlatList 
            horizontal
            data={DOMAINS} // domains from constants
            keyExtractor={(item) => item}
            renderItem={({ item }) => (
                <></> // domain pill component
            )}
            showsHorizontalScrollIndicator={false}
         />
         <FlatList
            data={articles} // articles from context
            keyExtractor={(item) => item.source.id || item.title} 
            renderItem={({ item }) => (
                <></> // article card component
            )}
         />
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
});