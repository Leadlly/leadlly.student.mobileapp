import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";
import Toast from "react-native-toast-message";
import { useGetErrorBook, useCreateErrorNote } from "../../services/queries/errorBookQuery";
import { colors } from "../../constants/constants";
import ErrorCard from "../../components/ErrorBookComponents/ErrorCard";

interface ErrorNoteProps {
  _id: string;
  note: string;
  createdAt: Date;
  isCompleted: boolean;
}

const formSchema = z.object({
  errorNote: z.string().min(20, {
    message: "Error note must be at least 20 characters.",
  }),
});

const ErrorNotes: React.FC = () => {
  const { data: errorBookData, isLoading, isError } = useGetErrorBook();
  const createErrorNote = useCreateErrorNote();
  const [optimisticNotes, setOptimisticNotes] = useState<ErrorNoteProps[]>([]);

  const {
    control,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      errorNote: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const newNote: ErrorNoteProps = {
        note: values.errorNote,
        _id: Date.now().toString(),
        createdAt: new Date(),
        isCompleted: false,
      };
      setOptimisticNotes([...optimisticNotes, newNote]);
      await createErrorNote.mutateAsync(values.errorNote);
      reset();
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Failed to create error note",
        text2: "Please try again",
      });
    }
  };

  const errorNotes = errorBookData?.errorNotes || [];
  const displayNotes = [...optimisticNotes, ...errorNotes];

  return (
    <View className="bg-purple-100 p-4 rounded-xl min-w-[310px] h-[calc(100vh-120px)] border border-[#9654F426] pt-10 shadow-md ml-10">
      <Text className="text-2xl font-medium mb-4 px-2">Error Notes</Text>

      <View className="w-full p-3 border bg-white border-gray-300 flex flex-col gap-2 max-h-60 rounded-xl shadow-lg">
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              className="bg-transparent outline-none w-full h-24"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              placeholder="Write an error note here..."
              multiline
              numberOfLines={5}
            />
          )}
          name="errorNote"
        />
        <View className="items-center flex justify-center">
          <TouchableOpacity
            className="bg-purple-500 py-1 px-5 rounded"
            onPress={handleSubmit(onSubmit)}
            disabled={isSubmitting}
          >
            <Text className="text-white">
              {isSubmitting ? "Adding..." : "Add"}
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <View className="mt-4">
        <Text className="font-medium text-lg text-center mb-2">
          Your Errors
        </Text>
        <ScrollView className="overflow-y-hidden">
          {isLoading ? (
            <ActivityIndicator size="large" color={colors.primary} />
          ) : isError ? (
            <Text className="text-xl text-center py-5 text-red-400">Error loading notes</Text>
          ) : displayNotes.length <= 0 ? (
            <Text className="text-xl text-center py-5 text-red-400 font-semibold">
              No Error Notes
            </Text>
          ) : (
            displayNotes.map((note) => (
              <ErrorCard  
                key={note._id}
                id={String(note._id)}
                isCompleted={note.isCompleted}
                note={note.note}
              />
            ))
          )}
        </ScrollView>
      </View>
    </View>
  );
};

export default ErrorNotes;
