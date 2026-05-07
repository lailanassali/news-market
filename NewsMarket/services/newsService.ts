import { Article } from "../types/type";
import { NEWS_API_KEY } from '../config';

export const fetchNewsArticles = async (domains: string[]): Promise<Article[]> => {
    try {
        if (domains.length === 0) {
            return [];
        }
        const response = await fetch(`https://newsapi.org/v2/everything?domains=${domains.join(',')}&pageSize=10&apiKey=${NEWS_API_KEY}&language=en`);

        if (!response.ok) {
        throw new Error('Failed to fetch articles');
        }

        const data = await response.json();
        return data.articles || [];
    } catch (error) {
        console.error('Error fetching news articles:', error);
        return [];
    }
};      