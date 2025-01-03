import axiosInstance from '../axiosInstance';

export const socialLoginAPI = {
  getRedirectToSocialLogin: async (provider: string) => {
    const response = await axiosInstance.get(`/auth/login/${provider}`);
    return response.data;
  },

  postSocialLoginCallBack: async (params: {
    provider: string;
    code: string;
  }) => {
    const { provider, code } = params;
    const response = await axiosInstance.post(
      `/auth/login/callback/${provider}`,
      {
        code,
      }
    );
    return response.data;
  },
};
