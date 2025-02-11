// client/src/services/apiService.ts
import axios from "axios";

const API_URL = "http://localhost:5000/api";  // Backend API URL'si

// Kullanıcı Kaydı Yapma
export const registerUser = async (userData: any) => {
  try {
    const response = await axios.post('/api/register', userData);
    return response.data;  // Başarıyla gelen veriyi döndürün
  } catch (error) {
    throw error;  // Hata mesajını fırlatın
  }
};

// Kullanıcıyı ID'ye göre getirme
export const getUserById = async (id: number) => {
  const response = await axios.get(`${API_URL}/users/${id}`);
  return response.data;
};
