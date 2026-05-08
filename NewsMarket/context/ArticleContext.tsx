import React, { createContext, useEffect, useState } from "react";
import { Article } from "../types/type";
import { fetchNewsArticles } from "../services/newsService";

export const ArticleContext = createContext({
  articles: [] as Article[],
  fetchArticles: async () => {},
  toggleDomain: (_domain: string) => {},
  selectedDomains: [] as string[],
  sortBy: 'publishedAt' as 'publishedAt' | 'popularity',
  setSortBy: (_sort: 'publishedAt' | 'popularity') => {},
  loading: false,
  error: null as string | null,
});

export const ArticleProvider  = ({ children }: { children: React.ReactNode }) => {

    const [articles, setArticles] = useState<Article[]>([]);
    const [selectedDomains, setSelectedDomains] = useState<string[]>([]);
    const [sortBy, setSortBy] = useState<'publishedAt' | 'popularity'>('publishedAt');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (selectedDomains.length === 0) {
            setArticles([]);
            return;
        }
        setLoading(true);
        setError(null);
        fetchNewsArticles(selectedDomains, sortBy).then(fetchedArticles => {
            setArticles(fetchedArticles);
        }).catch(err => {
            setError(err.message);
        }).finally(() => {
            setLoading(false);
        });
    }, [selectedDomains, sortBy]);

    return (
        <ArticleContext.Provider value={
            {
                articles,
                fetchArticles: async () => {
                    if (selectedDomains.length === 0) {
                        setArticles([]);
                        return;
                    }
                    const fetchedArticles = await fetchNewsArticles(selectedDomains);
                    setArticles(fetchedArticles);
                },
                toggleDomain: (domain: string) => {
                    setSelectedDomains(prev => {
                        if (prev.includes(domain)) {
                            return prev.filter(d => d !== domain);
                        } else {
                            return [...prev, domain];
                        }
                    });
                },
                selectedDomains,
                loading,
                error,
                sortBy,
                setSortBy
            }
        }>
            {children}
        </ArticleContext.Provider>
    );
}