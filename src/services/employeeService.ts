import api from './api';

export interface Funcionario {
  id: number;
  username: string;
  email: string;
  is_staff: boolean;
  is_superuser: boolean;
}

export const fetchFuncionarios = async (): Promise<Funcionario[]> => {
  try {
    const response = await api.get('/accounts/list_users/'); 
    return response.data;
  } catch (error) {
    console.error("Falha ao buscar funcionários:", error);
    throw error;
  }
};

export interface CreateFuncionarioData {
  username: string;
  email?: string;
  password: string;
  confirm_password: string;
  is_staff?: boolean;
}

export const createFuncionario = async (data: CreateFuncionarioData): Promise<{ user: Funcionario }> => {
  try {
    const response = await api.post('/accounts/create_user/', data);
    return response.data; 
  } catch (error) {
    console.error("Falha ao criar funcionário:", error);
    throw error;
  }
};