# API Usage Guide

## ⚠️ IMPORTANT: Never Use Hardcoded URLs

**❌ NEVER DO THIS:**
```javascript
axios.get("http://localhost:7000/api/...")
```

**✅ ALWAYS DO THIS:**
```javascript
import { apiService } from '../services/apiService';
// OR
import { API_ENDPOINTS } from '../config/api';
```

## How to Use API Services

### Method 1: Using API Service (Recommended)
```javascript
import { apiService } from '../services/apiService';

// Login
const response = await apiService.login({ email, password });

// Get materials
const materials = await apiService.getAllMaterials();

// Save note
await apiService.saveNote(noteData);
```

### Method 2: Using API Endpoints
```javascript
import axios from 'axios';
import { API_ENDPOINTS } from '../config/api';

const response = await axios.post(API_ENDPOINTS.LOGIN, data, {
  withCredentials: true
});
```

## Available Services

### Auth Services
- `apiService.signup(data)`
- `apiService.login(data)`
- `apiService.logout()`

### Seller Services
- `apiService.getSellerNotes(email)`
- `apiService.getSellerPayments(email)`
- `apiService.updateSellerCategories(data)`

### Buyer Services
- `apiService.saveNote(data)`
- `apiService.getBuyerPurchased(email)`
- `apiService.getBuyerPayments(email)`

### Materials Services
- `apiService.getAllMaterials()`
- `apiService.previewPdf(materialId, userEmail)`

## Environment Variables

Make sure these are set in Vercel:
- `VITE_API_URL=https://your-backend-url.onrender.com`

## For Local Development

The API config automatically falls back to `http://localhost:7000` for local development.

## Adding New Endpoints

1. Add to `src/config/api.js`:
```javascript
NEW_ENDPOINT: `${API_BASE_URL}/api/new-endpoint`
```

2. Add to `src/services/apiService.js`:
```javascript
newService: (data) => apiClient.post(API_ENDPOINTS.NEW_ENDPOINT, data)
```

This prevents localhost hardcoding issues in production!