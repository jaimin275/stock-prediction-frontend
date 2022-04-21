export const URLs = {
    deployment: 'http://localhost:8000',
    staging: 'http://localhost:8000',
    development: 'http://localhost:8000' 
}

// export const BASE_URL = process.env.REACT_APP_NGROK || URLs.staging
export const BASE_URL = URLs.development

export const API = {
    TEST: '/tests',
    PREDICT_STOCK: '/predict'
}

// export const 