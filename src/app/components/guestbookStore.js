import { useEffect, useState } from "react";
import axios from "axios";

const api = axios.create({
    baseURL: 'http://13.209.52.128:8000/',
})

export const HOUSES = [
    { name: 'Gryffindor', label: '그리핀도르', color: '#7f1d1d', accent: '#fbbf24' },
    { name: 'Slytherin', label: '슬리데린', color: '#064e3b', accent: '#a7f3d0' },
    { name: 'Ravenclaw', label: '래번클로', color: '#1e3a8a', accent: '#bfdbfe' },
    { name: 'Hufflepuff', label: '후플푸프', color: '#78350f', accent: '#fde68a' },
];

let globalEntries = [];
const listeners = new Set();

const emit = () => listeners.forEach((l) => l());

const fetchEntries = async () => {
    try {
        const response = await api.get('/guestbooks/');
        globalEntries = response.data; 
        emit(); 
    } catch (error) {
        console.error("데이터 불러오기 실패:", error);
    }
};

fetchEntries();
    export function useGuestbook() {
    const [, setTick] = useState(0);
    useEffect(() => {
        const listener = () => setTick((t) => t + 1);
        listeners.add(listener);
        return () => listeners.delete(listener);
    }, []);
    return {
        entries: globalEntries, 
        
        async addEntry(entry) {
        try {
            await api.post('/guestbooks/', entry); 
            await fetchEntries(); 
            return true;
        } catch (error) {
            return false;
        }
        },
        async deleteEntry(id, password) {
        try {
            await api.delete(`/guestbooks/${id}/`, { data: { password: password } });
            await fetchEntries();
            return true;
        } catch (error) {
            return false;
        }
        },

        async updateEntry(id, password, updates) {
        try {
            await api.patch(`/guestbooks/${id}/`, {
            password: password, 
            ...updates          
            });
            await fetchEntries();
            return true;
        } catch (error) {
            console.error("수정 실패:", error);
            return false;
        }
        }
    };
}