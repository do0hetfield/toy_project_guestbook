import { useEffect, useState } from "react";

const STORAGE_KEY = 'magical-guestbook-entries'

const seed = [
    {
        id: 'seed-1',
        title: '호그와트에 오신 것을 환영합니다',
        author: '알버스 덤블도어',
        content: '행복은 가장 어두운 시기에도 찾을 수 있단다.',
        password: '0000',
        house: 'Gryffindor',
        createAt: Date.now(),
    }
];

export const HOUSES = [
    { name: 'Gryffindor', label: '그리핀도르', color: '#7f1d1d', accent: '#fbbf24' },
    { name: 'Slytherin', label: '슬리데린', color: '#064e3b', accent: '#a7f3d0' },
    { name: 'Ravenclaw', label: '래번클로', color: '#1e3a8a', accent: '#bfdbfe' },
    { name: 'Hufflepuff', label: '후플푸프', color: '#78350f', accent: '#fde68a' },
];

const listeners = new Set();
let entries = load();

function load() {
    try {
        const raw = window.localStorage.getItem(STORAGE_KEY);
        if (!raw) return seed;
        return JSON.parse(raw);
    } catch {
        return seed;
    }
}

function persist() {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
}

function emit() {
    listeners.forEach((l) => l());
}

export function useGuestbook() {
    const [, setTick] = useState(0);

    useEffect(() => {
        const listener = () => setTick((t) => t + 1);
        listeners.add(listener);
        return () => listeners.delete(listener);
    }, []);

    return {
        entries,
        addEntry(entry) {
            const newEntry = {
                ...entry,
                id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
                createdAt: Date.now(),
            };
            entries = [newEntry, ...entries];
            persist();
            emit();
        }
    }
}