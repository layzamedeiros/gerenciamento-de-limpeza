import api from './api';

interface ChangePasswordData {
  old_password: string;
  new_password: string;
  confirm_new_password: string;
}

export const changePassword = async (data: ChangePasswordData) => {
  try {
    const response = await api.post('/accounts/change_password/', data);
    return response.data;
  } catch (error) {
    console.error("Falha ao alterar a senha:", error);
    throw error;
  }
};