import React, { createContext, useState } from "react";
import { Article } from "../types/type";
import { fetchNewsArticles } from "../services/newsService";

export const ArticleContext = createContext({
  articles: [] as Article[],
  fetchArticles: async () => {},
  toggleDomain: (domain: string) => {},
  selectedDomains: [] as string[],
});

export const ArticleProvider  = ({ children }: { children: React.ReactNode }) => {

    const [articles, setArticles] = useState<Article[]>([]);
    const [selectedDomains, setSelectedDomains] = useState<string[]>([]);

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
            }
        }>
            {children}
        </ArticleContext.Provider>
    );
}