import instance from './api';

export type UF = {
    id: number;
    sigla: string;
    nome: string;
};

async function getUFs(): Promise<UF[]> {
    const promise = await instance.get('/ibge/uf');
    return promise.data;
}

export type County = {
    nome: string;
    id: number;
};

async function getCounties(ufId: string | number): Promise<County[]> {
    const promise = await instance.get(`/ibge/counties/${ufId}`);
    return promise.data;
}

const ibgeService = {
    getUFs,
    getCounties,
};

export default ibgeService;
