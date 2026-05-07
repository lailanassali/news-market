import React from 'react';
import { render } from '@testing-library/react-native';
import { ArticleCard } from '../components/ArticleCard';

describe('ArticleCard', () => {
    it("renders article title", () => {
       const { getByText } = render(
            <ArticleCard 
                source={{ id: 'bbc', name: 'BBC' }}
                title="Test Article"
                description="This is a test article."
                publishedAt="2024-06-01T12:00:00Z"
                content="Test content."
            />
        );
        expect(getByText('Test Article')).toBeTruthy();
     }
    );
    it("renders article description", () => {
        const { getByText } = render(
            <ArticleCard 
                source={{ id: 'bbc', name: 'BBC' }}
                title="Test Article"
                description="This is a test article."
                publishedAt="2024-06-01T12:00:00Z"
                content="Test content."
            />
        );
        expect(getByText('This is a test article.')).toBeTruthy();
     }
    );
    it("renders article source name", () => {
        const { getByText } = render(
            <ArticleCard 
                source={{ id: 'bbc', name: 'BBC' }}
                title="Test Article"
                description="This is a test article."
                publishedAt="2024-06-01T12:00:00Z"
                content="Test content."
            />
        );
        expect(getByText('BBC')).toBeTruthy();
     }
    );
    it("renders formatted publication date correctly", () => {
        const { getByText } = render(
            <ArticleCard 
                source={{ id: 'bbc', name: 'BBC' }}
                title="Test Article"
                description="This is a test article."
                publishedAt="2024-06-01T12:00:00Z"
                content="Test content."
            />
        );
        expect(getByText('1 June 2024')).toBeTruthy();
     }
    );
    it("renders time ago correctly", () => {
        const recentDate = new Date(Date.now() - 3600000).toISOString(); 
        const { getByText } = render(
            <ArticleCard 
                source={{ id: 'bbc', name: 'BBC' }}
                title="Test Article"
                description="Test description"
                publishedAt={recentDate}
                content="Test content."
            />
        );
        expect(getByText('Updated 1 hour ago')).toBeTruthy();
    });
    it("shows no description available when not provided", () => {
        const { getByText } = render(
            <ArticleCard 
                source={{ id: 'bbc', name: 'BBC' }}
                title="Test Article"
                description={null}
                publishedAt="2024-06-01T12:00:00Z"
                content="Test content."
            />
        );
        expect(getByText('No description available')).toBeTruthy();
     }
    );
});