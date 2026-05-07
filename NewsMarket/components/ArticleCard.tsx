import React from "react";
import { StyleSheet, Text, View } from "react-native";

type ArticleCardProps = {
    source: {
        id: string | null;
        name: string;
    }
    title: string;
    description: string | null;
    publishedAt: string;
    content: string;
};

export const ArticleCard: React.FC<ArticleCardProps> = ({ source, title, description, publishedAt, content }) => {
    return (
        <View style={styles.container} accessibilityRole="none" accessible={true} accessibilityLabel={`${title} from ${source.name}, published ${new Date(publishedAt).toLocaleDateString()}`}>
            <View style={styles.row}>
                <View style={styles.badge}>
                    <Text style={styles.badgeText}>{source.name}</Text>
                </View>
                <Text style={styles.timeText}>{new Date(publishedAt).toLocaleDateString()}</Text>
            </View>
            <Text style={styles.title} numberOfLines={2} accessibilityLabel={title}>{title}</Text>
            <Text style={styles.description} numberOfLines={2}>{description ?? 'No description available'}</Text>
            <Text style={styles.content} numberOfLines={3}>{content}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 16,
        marginBottom: 8,
        backgroundColor: '#eeeeee',
        borderRadius: 12,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        marginBottom: 6,
    },
    badge: {
        backgroundColor: '#185FA5',
        borderRadius: 6,
        paddingVertical: 2,
        paddingHorizontal: 8,
    },
    badgeText: {
        color: '#fff',
        fontSize: 11,
        fontWeight: '500',
    },
    timeText: {
        color: '#000',
        fontSize: 11,
    },
    title: {
        color: '#185FA5',
        fontSize: 14,
        fontWeight: '500',
        marginBottom: 4,
    },
    description: {
        color: '#000',
        fontSize: 12,
        lineHeight: 18,
    },
    content: {
        marginTop: 4,
        color: '#000',
        fontSize: 12,
        lineHeight: 18,
    },
});