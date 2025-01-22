import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axiosClient from "../axios/axios";
import axios, { AxiosResponse } from "axios";
import {
  StudentPersonalInfoProps,
  TCustomNotificationsType,
} from "../../types/types";

export const useGoogleSignIn = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: { access_token: string }) => {
      try {
        const res = await axiosClient.post("/api/google/auth", data);
        return res;
      } catch (error) {
        if (axios.isAxiosError(error)) {
          throw new Error(`${error.response?.data.message}`);
        } else {
          throw new Error("An unknown error while google signing in!!");
        }
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["user"],
      });
    },
  });
};

export const useSignUpUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: {
      name: string;
      email: string;
      password: string;
    }) => {
      try {
        const res: AxiosResponse = await axiosClient.post(
          `/api/auth/register`,
          data
        );

        return res.data;
      } catch (error) {
        if (axios.isAxiosError(error)) {
          throw new Error(`${error.response?.data.message}`);
        } else {
          throw new Error("An unknown error while signing up");
        }
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["user"],
      });
    },
  });
};

export const useLoginUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: { email: string; password: string }) => {
      try {
        const res: AxiosResponse = await axiosClient.post(
          `/api/auth/login`,
          data
        );

        return res.data;
      } catch (error) {
        if (axios.isAxiosError(error)) {
          throw new Error(`${error.response?.data.message}`);
        } else {
          throw new Error("An unknown error while logging in");
        }
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["user"],
      });
    },
  });
};

export const useLogoutUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      try {
        const res = await axiosClient.get("/api/auth/logout");

        return res.data;
      } catch (error) {
        if (axios.isAxiosError(error)) {
          throw new Error(`${error.response?.data.message}`);
        } else {
          throw new Error("An unknown error while logging out!!");
        }
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["user"],
      });
    },
  });
};

export const useForgotPassword = () => {
  return useMutation({
    mutationFn: async (data: { email: string }) => {
      try {
        const res = await axiosClient.post("/api/auth/forgetpassword", data);
        return res.data;
      } catch (error) {
        if (axios.isAxiosError(error)) {
          throw new Error(`${error.response?.data.message}`);
        } else {
          throw new Error(
            "An unknown error occurred while sending reset password link!!"
          );
        }
      }
    },
  });
};

export const useResetPassword = (token: string) => {
  return useMutation({
    mutationFn: async (data: { password: string }) => {
      try {
        const res = await axiosClient.post(
          `/api/auth/resetpassword/${token}`,
          data
        );
        return res.data;
      } catch (error) {
        if (axios.isAxiosError(error)) {
          throw new Error(`${error.response?.data.message}`);
        } else {
          throw new Error(
            "An unknown error occurred while resetting password!!"
          );
        }
      }
    },
  });
};

export const useGetUser = () => {
  return useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      try {
        const res = await axiosClient.get("/api/auth/user");
        return res.data;
      } catch (error) {
        if (axios.isAxiosError(error)) {
          throw new Error(`${error.response?.data.message}`);
        } else {
          throw new Error("An unknown error while fetching current user!!");
        }
      }
    },
  });
};

export const useGetMentorInfo = () => {
  return useQuery({
    queryKey: ["mentor"],
    queryFn: async () => {
      try {
        const res = await axiosClient.get("/api/user/mentor/info");
        return res.data;
      } catch (error) {
        if (axios.isAxiosError(error)) {
          throw new Error(`${error.response?.data.message}`);
        } else {
          throw new Error("An unknown error while fetching mentor info!!");
        }
      }
    },
  });
};

export const useSaveTodaysVibe = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: { todaysVibe: string }) => {
      try {
        const res = await axiosClient.post("/api/user/todaysVibe/save", data);

        return res.data;
      } catch (error) {
        if (axios.isAxiosError(error)) {
          throw new Error(`${error.response?.data.message}`);
        } else {
          throw new Error(
            "An unknown error while saving user's today's vibe!!"
          );
        }
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["user"],
      });
    },
  });
};
export const useVerifyUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: { otp: string; email: string }) => {
      try {
        const res: AxiosResponse = await axiosClient.post(
          `/api/auth/verify`,
          data
        );

        return res.data;
      } catch (error) {
        if (axios.isAxiosError(error)) {
          throw new Error(`${error.response?.data.message}`);
        } else {
          throw new Error("An unknown error while verifying email");
        }
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["user"],
      });
    },
  });
};

export const useStudentPersonalInfo = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: StudentPersonalInfoProps) => {
      try {
        const res = await axiosClient.post("/api/user/profile/save", data);

        return res.data;
      } catch (error) {
        if (axios.isAxiosError(error)) {
          throw new Error(`${error.response?.data.message}`);
        } else {
          throw new Error(
            "An unknown error while saving user's initial data!!"
          );
        }
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["user"],
      });
    },
  });
};

export const useCheckForCustomNotifications = (isRead: string) => {
  return useQuery({
    queryKey: ["customNotifications"],
    queryFn: async () => {
      try {
        const res: AxiosResponse<{
          notifications: TCustomNotificationsType[];
          success: boolean;
        }> = await axiosClient.get(
          `/api/user/notification/check?isRead=${isRead}`
        );
        return res.data;
      } catch (error) {
        if (axios.isAxiosError(error)) {
          throw new Error(`${error.response?.data.message}`);
        } else {
          throw new Error(
            "An unknown error while fetching custom notifications!!"
          );
        }
      }
    },
  });
};

export const useUpdateCustomNotification = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: { id: string; status: string }) => {
      try {
        const res: AxiosResponse<{ success: boolean; message: string }> =
          await axiosClient.put(
            `/api/user/notification/update/${data.id}?status=${data.status}`
          );

        return res.data;
      } catch (error) {
        if (axios.isAxiosError(error)) {
          throw new Error(`${error.response?.data.message}`);
        } else {
          throw new Error(
            "An unknown error while updating the notification status!"
          );
        }
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["customNotifications"],
      });
    },
  });
};
