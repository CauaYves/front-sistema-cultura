'use client';

function create(key: string, value: string) {
    if (typeof window !== 'undefined') {
        const data = { [key]: value };

        const jsonData = JSON.stringify(data);

        localStorage.setItem(key, jsonData);
    }
}

function get(key: string) {
    if (typeof window !== 'undefined') {
        const storedData = localStorage.getItem(key);
        if (storedData) {
            return JSON.parse(storedData);
        } else {
            return null;
        }
    }
}
function remove(key: string) {
    if (typeof window !== 'undefined') {
        localStorage.removeItem(key);
    }
}

const appLocalStore = {
    create,
    get,
    remove,
};

export { appLocalStore };
