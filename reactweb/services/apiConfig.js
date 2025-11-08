// Centraliza a URL base da API para facilitar mudanças entre dev/production
export const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';
