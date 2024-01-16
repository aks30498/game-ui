import { PersonalDetails } from 'models/player';
import axios from '../axiosInstance';

export interface SignupRequest {
  username: string;
  password: string;
  personalDetails: {
    firstName: string;
    lastName: string;
    dob: Date;
    email: string;
    phoneNumber: string;
    address: {
      street?: string;
      city: string;
      state: string;
      zipCode: string;
    };
  };
}

export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  username: string;
  personalDetails: PersonalDetails;
}

export const signup = async (data: SignupRequest): Promise<LoginResponse> => {
  try {
    const response = await axios.post('/auth/signup', data);
    return response.data;
  } catch (error: any) {
    console.error(
      'Signup failed:',
      error.response?.data?.message || 'Internal Server Error',
    );
    throw error;
  }
};

export const login = async (data: LoginRequest): Promise<LoginResponse> => {
  try {
    const response = await axios.post<LoginResponse>('/auth/login', data);
    return response.data;
  } catch (error: any) {
    console.error(
      'Login failed:',
      error.response?.data?.message || 'Internal Server Error',
    );
    throw error;
  }
};
