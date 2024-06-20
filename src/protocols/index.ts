export type DataFields = {
    message: string;
    details: string[];
};

export interface CulturalizeApiError<T> {
    response: {
        status: number;
        data: T;
    };
}

export interface ApiResponse<T> {
    config: {};
    data: T;
    headers: {};
    status: number;
    statusText: string;
}
