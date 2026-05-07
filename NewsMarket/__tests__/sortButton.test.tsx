import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { SortButton } from '../components/sortButton';

describe('SortButton', () => {
    it('renders Latest when sortBy is publishedAt', () => {
        const { getByText } = render(
            <SortButton sortBy="publishedAt" setSortBy={() => {}} />
        );
        expect(getByText('Sort: Latest ⇅')).toBeTruthy();
    });

    it('renders Popular when sortBy is popularity', () => {
        const { getByText } = render(
            <SortButton sortBy="popularity" setSortBy={() => {}} />
        );
        expect(getByText('Sort: Popular ⇅')).toBeTruthy();
    });

    it('calls setSortBy with popularity when pressed', () => {
        const setSortByMock = jest.fn();
        const { getByRole } = render(
            <SortButton sortBy="publishedAt" setSortBy={setSortByMock} />
        );
        fireEvent.press(getByRole('button'));
        expect(setSortByMock).toHaveBeenCalledWith('popularity');
    });

    it('calls setSortBy with publishedAt when pressed', () => {
        const setSortByMock = jest.fn();
        const { getByRole } = render(
            <SortButton sortBy="popularity" setSortBy={setSortByMock} />
        );
        fireEvent.press(getByRole('button'));
        expect(setSortByMock).toHaveBeenCalledWith('publishedAt');
    });
});