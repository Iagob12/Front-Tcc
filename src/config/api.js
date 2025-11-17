/**
 * Configuração centralizada da API
 * 
 * Uso:
 * - Desenvolvimento: npm run dev (usa .env.development)
 * - Produção: npm run build (usa .env.production)
 */

// URL base da API (vem do arquivo .env)
export const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080';

// Ambiente atual
export const ENV = import.meta.env.VITE_ENV || 'development';

// Função helper para criar URLs completas
export const createApiUrl = (endpoint) => {
    // Remove barra inicial se existir
    const cleanEndpoint = endpoint.startsWith('/') ? endpoint.slice(1) : endpoint;
    return `${API_URL}/${cleanEndpoint}`;
};

// Configuração padrão para fetch
export const fetchConfig = {
    credentials: 'include', // Sempre enviar cookies
    headers: {
        'Content-Type': 'application/json'
    }
};

// Helper para fazer requisições GET
export const apiGet = async (endpoint) => {
    const response = await fetch(createApiUrl(endpoint), {
        method: 'GET',
        ...fetchConfig
    });
    return response;
};

// Helper para fazer requisições POST
export const apiPost = async (endpoint, data) => {
    const response = await fetch(createApiUrl(endpoint), {
        method: 'POST',
        ...fetchConfig,
        body: JSON.stringify(data)
    });
    return response;
};

// Helper para fazer requisições PUT
export const apiPut = async (endpoint, data) => {
    const response = await fetch(createApiUrl(endpoint), {
        method: 'PUT',
        ...fetchConfig,
        body: JSON.stringify(data)
    });
    return response;
};

// Helper para fazer requisições DELETE
export const apiDelete = async (endpoint) => {
    const response = await fetch(createApiUrl(endpoint), {
        method: 'DELETE',
        ...fetchConfig
    });
    return response;
};

// Helper para fazer upload de arquivos
export const apiUploadFile = async (file) => {
    const formData = new FormData();
    formData.append('file', file);
    
    // Não definir Content-Type, deixar o browser definir com boundary
    // Os cookies (jwt) serão enviados automaticamente com credentials: 'include'
    const response = await fetch(createApiUrl('api/files/upload'), {
        method: 'POST',
        credentials: 'include', // Envia cookies automaticamente
        body: formData
        // Não definir headers para permitir que o browser defina Content-Type com boundary
    });
    
    return response;
};

// Helper para construir URL completa de imagem
export const getImageUrl = (imagePath) => {
    if (!imagePath) return null;
    
    // Se já for uma URL completa (http/https) ou base64, retornar como está
    if (imagePath.startsWith('http://') || imagePath.startsWith('https://') || imagePath.startsWith('data:')) {
        return imagePath;
    }
    
    // Se for uma URL relativa da API, construir URL completa
    if (imagePath.startsWith('/api/files/')) {
        return createApiUrl(imagePath.substring(1)); // Remove a barra inicial
    }
    
    // Se for apenas o nome do arquivo, assumir que está em /api/files/
    return createApiUrl(`api/files/${imagePath}`);
};

// Log da configuração (apenas em desenvolvimento)
if (ENV === 'development') {
    console.log('🔧 API Configuration:');
    console.log('  - API URL:', API_URL);
    console.log('  - Environment:', ENV);
}

export default {
    API_URL,
    ENV,
    createApiUrl,
    fetchConfig,
    apiGet,
    apiPost,
    apiPut,
    apiDelete
};
