import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios, { AxiosResponse } from 'axios';
import axiosClient from '../axios/axios';

export const useGetErrorBook = () => {
  return useQuery({
    queryKey: ['errorBookData'],
    queryFn: async () => {
      try {
        const res: AxiosResponse = await axiosClient.get('/api/errorBook/get');
        return res.data;
      } catch (error) {
        if (axios.isAxiosError(error)) {
          throw new Error(`Error fetching Error Book: ${error.response?.data.message}`);
        } else {
          throw new Error('An unknown error occurred while fetching Error Book!');
        }
      }
    },
  });
};

export const useGetChapterErrorBook = (chapter: string) => {
  return useQuery({
    queryKey: ['chapterErrorBookData', chapter],
    queryFn: async () => {
      try {
        const res: AxiosResponse = await axiosClient.get(`/api/errorBook/chapter/${chapter}`);
        return res.data;
      } catch (error) {
        if (axios.isAxiosError(error)) {
          throw new Error(`Error fetching Error Book: ${error.response?.data.message}`);
        } else {
          throw new Error('An unknown error occurred while fetching Error Book!');
        }
      }
    },
  });
};

export const useCreateErrorNote = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (errorNote: string) => {
      const res: AxiosResponse = await axiosClient.post('/api/errorBook/errorNote', { note: errorNote });
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['errorBookData'] });
    },
    onError: (error: unknown) => {
      if (error instanceof Error) {
        throw new Error(`Error creating errorNote: ${error.message}`);
      } else {
        throw new Error('An unknown error occurred while creating errorNote!');
      }
    },
  });
};

export const useToggleErrorNote = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (errorNoteId: string) => {
      const res: AxiosResponse = await axiosClient.put(`/api/errorBook/errorNote/toggle/${errorNoteId}`);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['errorBookData'] });
    },
    onError: (error: unknown) => {
      if (error instanceof Error) {
        throw new Error(`Error toggling errorNote: ${error.message}`);
      } else {
        throw new Error('An unknown error occurred while toggling errorNote!');
      }
    },
  });
};

export const useUpdateErrorNote = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (questionIds: string[]) => {
      const res: AxiosResponse = await axiosClient.put('/api/errorBook/update', { solvedQuestions: questionIds });
      console.log(res.data,questionIds)
      return res.data;

    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['errorBookData'] });
    },
    onError: (error: unknown) => {
      if (error instanceof Error) {
        throw new Error(`Error updating error note: ${error.message}`);
      } else {
        throw new Error('An unknown error occurred while updating error note!');
      }
    },
  });
};
