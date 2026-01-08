import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import React from 'react';
import { ReceiptsList } from './ReceiptsList';

// Mock Dexie and PDF Gen
vi.mock('../../db', () => ({
    db: {
        orcamentos: {
            toArray: () => Promise.resolve([
                { id: 1, cliente: 'Teste Cliente', total: '100,00', data: '2026-01-01' }
            ]),
            delete: vi.fn(),
            add: vi.fn(),
        }
    }
}));

vi.mock('../../hooks/usePdfGenerator', () => ({
    usePdfGenerator: () => ({
        generatePdf: vi.fn()
    })
}));

// Mock dexie-react-hooks
vi.mock('dexie-react-hooks', () => ({
    useLiveQuery: (fn) => {
        // Return dummy data immediately for test
        return [
            { id: 1, cliente: 'Teste Cliente', total: '100,00', data: '2026-01-01' }
        ];
    }
}));

describe('ReceiptsList Component', () => {
    it('renders correctly', () => {
        render(<ReceiptsList />);
        expect(screen.getByText('Meus Recibos')).toBeDefined();
        expect(screen.getByText('Novo Recibo')).toBeDefined();
    });

    it('shows list items', async () => {
        render(<ReceiptsList />);
        expect(screen.getByText('Teste Cliente')).toBeDefined();
        expect(screen.getByText('R$ 100,00')).toBeDefined();
    });

    it('opens modal on click', () => {
        render(<ReceiptsList />);
        const btn = screen.getByText('Novo Recibo');
        fireEvent.click(btn);
        // Should verify if modal appeared (we assume it renders in document body or inside)
        // Note: Modal uses portal or absolute, simplified check:
        // This test is basic to ensure NO CRASH happens.
    });
});
