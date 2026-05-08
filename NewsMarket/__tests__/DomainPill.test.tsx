import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { DomainPill } from '../components/DomainPill';

describe('DomainPill', () => {
    it('renders the domain name correctly', () => {
        const { getByText } = render(<DomainPill domain="example.com" isSelected={false} onPress={() => {}} />);
        expect(getByText('example.com')).toBeTruthy();
    });
    it('calls onPress when the pill is pressed', () => {
        const onPressMock = jest.fn();
        const { getByText } = render(<DomainPill domain="example.com" isSelected={false} onPress={onPressMock} />);
        fireEvent.press(getByText('example.com'));
        expect(onPressMock).toHaveBeenCalledTimes(1);
    });
    it('applies selected styles when isSelected is true', () => {
        const { getByRole } = render(<DomainPill domain="example.com" isSelected={true} onPress={() => {}} />);
        const pill = getByRole('button');
        expect(pill.props.style).toMatchObject(expect.objectContaining({ backgroundColor: '#95adc7' }));
    });
    it('applies unselected styles when isSelected is false', () => {
        const { getByRole } = render(<DomainPill domain="example.com" isSelected={false} onPress={() => {}} />);
        const pill = getByRole('button');
        expect(pill.props.style).toMatchObject(expect.objectContaining({ backgroundColor: '#eee' }));
    });
});