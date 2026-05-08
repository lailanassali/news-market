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

const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    const timeAgo = () => {
        if (seconds < 60) return 'Updated just now';
        if (seconds < 3600) {
            const minutes = Math.floor(seconds / 60);
            return `Updated ${minutes} ${minutes === 1 ? 'minute' : 'minutes'} ago`;
        }
        if (seconds < 86400) {
            const hours = Math.floor(seconds / 3600);
            return `Updated ${hours} ${hours === 1 ? 'hour' : 'hours'} ago`;
        }
        const days = Math.floor(seconds / 86400);
        return `Updated ${days} ${days === 1 ? 'day' : 'days'} ago`;
    };

    const formattedDate = date.toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
    });

    return { date: formattedDate, timeAgo: timeAgo() };
};


export const ArticleCard: React.FC<ArticleCardProps> = ({ source, title, description, publishedAt, content }) => {
    const { date, timeAgo } = formatDate(publishedAt);

    return (
        <View style={styles.container} accessibilityRole="none" accessible={true} accessibilityLabel={`${title} from ${source.name}, published ${date}`}>
            <View style={styles.row}>
                <View style={styles.badge}>
                    <Text style={styles.badgeText}>{source.name}</Text>
                </View>
                <Text style={styles.dateText} accessibilityRole="text">
                    {date}
                </Text>
                <Text style={styles.timeText} accessibilityRole="text">
                    {timeAgo}
                </Text>
            </View>
            <Text style={styles.title} numberOfLines={2} accessibilityLabel={title}>
                {title}
            </Text>
            <Text style={styles.description} numberOfLines={2} accessibilityRole="text">
                {description ?? 'No description available'}
            </Text>
            <Text style={styles.content} numberOfLines={3} accessibilityRole="text">
                {content}
            </Text>
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
        color: '#185FA5',
        fontSize: 11,
        fontWeight: 'bold'
    },
    dateText: {
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