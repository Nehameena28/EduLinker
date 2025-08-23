// Centralized API configuration
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:7000';

// API endpoints
export const API_ENDPOINTS = {
  // Auth endpoints
  SIGNUP: `${API_BASE_URL}/api/Signup`,
  LOGIN: `${API_BASE_URL}/api/Login`,
  LOGOUT: `${API_BASE_URL}/api/logout`,
  
  // User endpoints
  UPDATE_USER: (id) => `${API_BASE_URL}/api/user/${id}`,
  DELETE_USER: (id) => `${API_BASE_URL}/api/user/${id}`,
  
  // Seller endpoints
  SELLER_NOTES: `${API_BASE_URL}/seller/notes`,
  DELETE_NOTE: (id) => `${API_BASE_URL}/seller/notes/${id}`,
  SELLER_PAYMENTS: `${API_BASE_URL}/api/seller/payments`,
  SELLER_CATEGORIES: `${API_BASE_URL}/api/seller/categories`,
  MATERIALS_COUNT: `${API_BASE_URL}/api/materials/count`,
  
  // Buyer endpoints
  SAVE_NOTE: `${API_BASE_URL}/api/save-note`,
  SAVED_NOTES: (userId) => `${API_BASE_URL}/api/saved-notes/${userId}`,
  DELETE_SAVED_NOTE: (id) => `${API_BASE_URL}/api/saved-notes/${id}`,
  BUYER_PURCHASED: `${API_BASE_URL}/api/buyer/purchased`,
  BUYER_PAYMENTS: `${API_BASE_URL}/api/buyer/payments`,
  
  // Materials endpoints
  ALL_MATERIALS: `${API_BASE_URL}/api/all-materials`,
  PREVIEW_PDF: (materialId) => `${API_BASE_URL}/api/preview-pdf/${materialId}`,
  CHECK_PURCHASE: (materialId) => `${API_BASE_URL}/api/check-purchase/${materialId}`,
  RESTRICTED_PDF: (materialId) => `${API_BASE_URL}/api/restricted-pdf/${materialId}`,
  DOWNLOAD_PDF: (materialId) => `${API_BASE_URL}/api/download-pdf/${materialId}`,
  
  // Payment endpoints
  PAYMENT_CHECKOUT: `${API_BASE_URL}/api/payment/checkout`,
  PAYMENT_VERIFY: `${API_BASE_URL}/api/payment/verify`,
  PAYMENT: `${API_BASE_URL}/api/payment`,
  
  // Upload endpoints
  UPLOAD: `${API_BASE_URL}/api/upload`,
  CLOUDINARY_UPLOAD: `${API_BASE_URL}/api/cloudinary-upload`,
  DIRECT_UPLOAD: `${API_BASE_URL}/api/direct-upload`,
  
  // Contact endpoint
  CONTACT: `${API_BASE_URL}/api/contact`
};

export default API_BASE_URL;