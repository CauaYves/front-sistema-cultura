export interface CulturalizeApiError {
  response: {
    status: number;
    data: {
      message: string;
      details: string[];
    };
  };
}
