import api from './api';

export interface Group {
  id: number;
  name: string;
}

export interface User {
  id: number;
  username: string;
  email: string;
  is_superuser: boolean;
  name: string; 
  groups: number[];
  profile: {
    profile_picture: string | null;
  }
}

export interface CreateUserData {
  username: string;
  email?: string;
  password: string;
  confirm_password: string;
  name?: string;
  groups?: number[];
  is_superuser?: boolean;
}

export const fetchUsers = async (key: string, value: string): Promise<User[]> => {
  try {
    let response: any;

    if (key && value) {
      response = await api.get(`/accounts/list_users/?${key}=${value}`);
    } else {
      response = await api.get('/accounts/list_users/');
    }

    return response.data;
  } catch (error) {
    console.error("Failed to fetch users:", error); 
    throw error;
  }
};

export const createUser = async (data: CreateUserData): Promise<{ user: User }> => {
  try {
    const response = await api.post('/accounts/create_user/', data);
    return response.data;
  } catch (error) {
    console.error("Failed to create user:", error); 
    throw error;
  }
};

export const fetchGroups = async (): Promise<Group[]> => {
  try {
    const response = await api.get('/accounts/list_groups/');
    return response.data;
  } catch (error) {
    console.error("Failed to fetch groups:", error);
    throw error;
  }
};