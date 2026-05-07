import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { HomeScreen } from '../screens/HomeScreen';
import { ArticleProvider } from '../context/ArticleContext';

describe('HomeScreen', () => {
    beforeEach(() => {
        global.fetch = jest.fn();
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    const renderHomeScreen = () => render(
        <ArticleProvider>
            <HomeScreen />
        </ArticleProvider>
    );

     const mockArticles = 
     [{ 
        source: { id: 'bbc-news', name: 'BBC News' },
        title: 'Test Article',
        description: 'Test description',
        publishedAt: '2024-01-01T00:00:00Z',
        content: 'Test content',
        url: 'http://example.com',

     }];

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

    it('shows loading when domain is selected', async () => {
        (fetch as jest.Mock).mockResolvedValueOnce({
            ok: true,
            json: async () => ({ articles: mockArticles }),
        });

        const { getByText, getByTestId } = renderHomeScreen();
        fireEvent.press(getByText('youtube.com'));
        expect(getByTestId('loading-indicator')).toBeTruthy();
    });
   
});