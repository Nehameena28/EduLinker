import axios from 'axios';
import { API_ENDPOINTS } from '../config/api';

// Create axios instance with default config
const apiClient = axios.create({
  withCredentials: true,
  timeout: 10000,
});

// API service functions
export const apiService = {
  // Auth services
  signup: (data) => apiClient.post(API_ENDPOINTS.SIGNUP, data),
  login: (data) => apiClient.post(API_ENDPOINTS.LOGIN, data),
  logout: () => apiClient.get(API_ENDPOINTS.LOGOUT),
  
  // User services
  updateUser: (id, data) => apiClient.put(API_ENDPOINTS.UPDATE_USER(id), data),
  deleteUser: (id) => apiClient.delete(API_ENDPOINTS.DELETE_USER(id)),
  
  // Seller services
  getSellerNotes: (email) => apiClient.get(`${API_ENDPOINTS.SELLER_NOTES}?email=${email}`),
  deleteNote: (id) => apiClient.delete(API_ENDPOINTS.DELETE_NOTE(id)),
  getSellerPayments: (email) => apiClient.get(`${API_ENDPOINTS.SELLER_PAYMENTS}?email=${email}`),
  getSellerCategories: (email) => apiClient.get(`${API_ENDPOINTS.SELLER_CATEGORIES}?email=${email}`),
  updateSellerCategories: (data) => apiClient.post(API_ENDPOINTS.SELLER_CATEGORIES, data),
  getMaterialsCount: (email) => apiClient.get(`${API_ENDPOINTS.MATERIALS_COUNT}?email=${email}`),
  
  // Buyer services
  saveNote: (data) => apiClient.post(API_ENDPOINTS.SAVE_NOTE, data),
  getSavedNotes: (userId) => apiClient.get(API_ENDPOINTS.SAVED_NOTES(userId)),
  deleteSavedNote: (id) => apiClient.delete(API_ENDPOINTS.DELETE_SAVED_NOTE(id)),
  getBuyerPurchased: (email) => apiClient.get(`${API_ENDPOINTS.BUYER_PURCHASED}?email=${email}`),
  getBuyerPayments: (email) => apiClient.get(`${API_ENDPOINTS.BUYER_PAYMENTS}?email=${email}`),
  
  // Materials services
  getAllMaterials: () => apiClient.get(API_ENDPOINTS.ALL_MATERIALS),
  previewPdf: (materialId, userEmail) => apiClient.get(`${API_ENDPOINTS.PREVIEW_PDF(materialId)}?userEmail=${userEmail}`),
  checkPurchase: (materialId, userEmail) => apiClient.get(`${API_ENDPOINTS.CHECK_PURCHASE(materialId)}?userEmail=${userEmail}`),
  getRestrictedPdf: (materialId, userEmail) => apiClient.get(`${API_ENDPOINTS.RESTRICTED_PDF(materialId)}?userEmail=${userEmail}`),
  
  // Payment services
  createPayment: (data) => apiClient.post(API_ENDPOINTS.PAYMENT_CHECKOUT, data),
  verifyPayment: (data) => apiClient.post(API_ENDPOINTS.PAYMENT_VERIFY, data),
  
  // Contact service
  sendContact: (data) => apiClient.post(API_ENDPOINTS.CONTACT, data),
};

export default apiService;