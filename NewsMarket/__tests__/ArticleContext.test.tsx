import React, { useContext } from 'react';
import { render, act, fireEvent } from '@testing-library/react-native';
import { Text } from 'react-native';
import { ArticleProvider, ArticleContext } from '../context/ArticleContext';

jest.mock('../services/newsService', () => ({
    fetchNewsArticles: jest.fn().mockResolvedValue([{
        source: { id: 'bbc-news', name: 'BBC News' },
        title: 'Test Article',
        description: 'Test description',
        publishedAt: '2024-01-01T00:00:00Z',
        content: 'Test content',
        url: 'http://example.com',
    }]),
}));

const ArticleContextComponent = () => {
    const { articles, selectedDomains, toggleDomain, loading, error } = useContext(ArticleContext);
    return (
        <>
            <Text testID="articles">{articles.length}</Text>
            <Text testID="domains">{selectedDomains.length}</Text>
            <Text testID="loading">{loading ? 'true' : 'false'}</Text>
            <Text testID="error">{error ?? 'none'}</Text>
            <Text testID="toggle" onPress={() => toggleDomain('bbc.com')}>Toggle</Text>
        </>
    );
};

describe('ArticleContext', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it('provides correct initial state', () => {
        const { getByTestId } = render(
            <ArticleProvider>
                <ArticleContextComponent />
            </ArticleProvider>
        );
        expect(getByTestId('articles').props.children).toBe(0);
        expect(getByTestId('domains').props.children).toBe(0);
        expect(getByTestId('loading').props.children).toBe('false');
        expect(getByTestId('error').props.children).toBe('none');
    });

    it('adds domain when toggleDomain is called', async () => {
        const { getByTestId } = render(
            <ArticleProvider>
                <ArticleContextComponent />
            </ArticleProvider>
        );
        await act(async () => {
            fireEvent.press(getByTestId('toggle'));
        });
        expect(getByTestId('domains').props.children).toBe(1);
        expect(getByTestId('articles').props.children).toBe(1);
        expect(getByTestId('loading').props.children).toBe('false');
    });

    it('removes domain when toggleDomain called twice', async () => {
        const { getByTestId } = render(
            <ArticleProvider>
                <ArticleContextComponent />
            </ArticleProvider>
        );
        await act(async () => {
            fireEvent.press(getByTestId('toggle'));
        });
        await act(async () => {
            fireEvent.press(getByTestId('toggle'));
        });
        expect(getByTestId('domains').props.children).toBe(0);
        expect(getByTestId('articles').props.children).toBe(0);
    });
});