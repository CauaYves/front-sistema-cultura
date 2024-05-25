export interface CulturalizeApiError {
    response: {
        status: number;
        data: {
            message: string;
            details: string[];
        };
    };
}

export interface ApiResponse<T> {
    config: {};
    data: T;
    headers: {};
    status: number;
    statusText: string;
}
