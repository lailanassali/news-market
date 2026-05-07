import React from 'react';
import { render, fireEvent, act } from '@testing-library/react-native';
import { HomeScreen } from '../screens/HomeScreen';
import { ArticleProvider } from '../context/ArticleContext';

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

describe('HomeScreen', () => {
    const renderHomeScreen = () => render(
        <ArticleProvider>
            <HomeScreen />
        </ArticleProvider>
    );

    it('renders all domain pills', () => {
        const { getByText } = renderHomeScreen();
        expect(getByText('bbc.com')).toBeTruthy();
        expect(getByText('youtube.com')).toBeTruthy();
        expect(getByText('apple.com')).toBeTruthy();
    });

    it('shows empty state when no domains selected', () => {
        const { getAllByText } = renderHomeScreen();
        expect(getAllByText('Select a domain to read articles')).toBeTruthy(); 
    });
    it('shows articles when domain is selected', async () => {
    const { getByText } = renderHomeScreen();
    
    await act(async () => {
        fireEvent.press(getByText('youtube.com'));
    });
    
    expect(getByText('Test Article')).toBeTruthy();
});
});