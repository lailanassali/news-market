import { Article } from "../types/type";
import { NEWS_API_KEY } from '@env';

export const fetchNewsArticles = async (domains: string[]): Promise<Article[]> => {
    try {
        const response = await fetch(`https://newsapi.org/v2/everything?domains=${domains.join(',')}&apiKey=${NEWS_API_KEY}&language=en`);
        const data = await response.json();
        return data.articles || [];
    } catch (error) {
        console.error('Error fetching news articles:', error);
        return [];
    }
};      