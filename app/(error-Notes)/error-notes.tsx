import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  Image,
} from "react-native";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";
import Toast from "react-native-toast-message";
import {
  useGetErrorBook,
  useCreateErrorNote,
} from "../../services/queries/errorBookQuery";
import { colors } from "../../constants/constants";
import ErrorCard from "../../components/ErrorBookComponents/ErrorCard";
import { SafeAreaView } from "react-native-safe-area-context";

interface ErrorNoteProps {
  _id: string;
  note: string;
  isCompleted: boolean;
}

const formSchema = z.object({
  errorNote: z
    .string()
    .min(20, "Error note must be at least 20 characters long"),
});

const ErrorNotes: React.FC = () => {
  const { data: errorBookData, isLoading } = useGetErrorBook();
  const createErrorNote = useCreateErrorNote();
  const [optimisticNotes, setOptimisticNotes] = useState<ErrorNoteProps[]>([]);
  const [activeTab, setActiveTab] = useState<"errors-now" | "completed">(
    "errors-now"
  );

  useEffect(() => {
    if (errorBookData?.errorNotes) {
      setOptimisticNotes(errorBookData.errorNotes);
    }
  }, [errorBookData]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      errorNote: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const newNote: ErrorNoteProps = {
        _id: Date.now().toString(),
        note: values.errorNote,
        isCompleted: false,
      };
      setOptimisticNotes((prev) => [newNote, ...prev]);
      await createErrorNote.mutateAsync(values.errorNote);
      form.reset();
      Toast.show({
        type: "success",
        text1: "Error note added successfully",
      });
    } catch (error) {
      console.error("Failed to add error note:", error);
      Toast.show({
        type: "error",
        text1: "Failed to add error note",
      });
    }
  };

  const displayNotes = optimisticNotes;

  const ErrorsNowTab = () => (
    <View className="p-5 bg-primary/10 flex items-center min-h-full">
      <View className="w-full p-5 border bg-white border-gray-300 flex flex-col max-h-[30vh] rounded-xl shadow-lg shadow-gray-400">
        <Controller
          control={form.control}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              className="text-lg font-mada-regular max-h-[20vh]"
              onBlur={onBlur}
              textAlignVertical="top"
              onChangeText={onChange}
              value={value}
              placeholder="Write an error note here..."
              multiline
              numberOfLines={6}
            />
          )}
          name="errorNote"
        />
        {form.formState.errors.errorNote && (
          <Text className="text-red-500 text-sm mt-1 font-mada-regular">
            {form.formState.errors.errorNote.message}
          </Text>
        )}
        <View className="items-center flex justify-center mt-3">
          <TouchableOpacity
            className="bg-purple-500 py-1 px-6 rounded"
            onPress={form.handleSubmit(onSubmit)}
            disabled={form.formState.isSubmitting}
          >
            <Text className="text-white font-mada-semibold">
              {form.formState.isSubmitting ? (
                <ActivityIndicator size="small" color="white" />
              ) : (
                "Add"
              )}
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <View className="mt-8 w-full">
        <Text className="font-mada-medium text-xl md:text-2xl text-stone-600 text-center mb-2">
          Your Errors
        </Text>
        <ScrollView className="">
          {isLoading ? (
            <View className="min-h-[40vh] justify-center items-center">
              <ActivityIndicator size="large" color={colors.primary} />
            </View>
          ) : displayNotes.filter((note) => !note.isCompleted).length <= 0 ? (
            <View className="items-center justify-center">
              <Image
                source={require("../../assets/images/no-notes.png")}
                className="w-[25vh] h-[20vh]"
                resizeMode="contain"
              />
              <Text className="text-xl text-center py-3 text-primary font-mada-semibold">
                Great job!
              </Text>
              <Text className="text-base text-center px-3 text-gray-600 font-mada-regular">
                You've cleared all your error notes.
              </Text>
              <Text className="text-sm text-center px-3 pt-2 text-gray-500 font-mada-regular">
                Keep up the good work!
              </Text>
            </View>
          ) : (
            displayNotes
              .filter((note) => !note.isCompleted)
              .map((note) => (
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

  const CompletedTab = () => (
    <View className="p-5 bg-primary/10 min-h-screen">
      <View className="mt-4 ">
        <ScrollView className="">
          {isLoading ? (
            <View className="min-h-[80vh] justify-center items-center">
              <ActivityIndicator size="large" color={colors.primary} />
            </View>
          ) : displayNotes.filter((note) => note.isCompleted).length <= 0 ? (
            <View className="items-center justify-center">
              <Image
                source={require("../../assets/images/no-notes.png")}
                className="w-[50vh] h-[50vh]"
                resizeMode="contain"
              />
              <Text className="text-lg text-center py-4 text-slate-500 font-mada-regular">
                No errors made - great job!
              </Text>
              <Text className="text-base text-center pb-4 text-slate-400 font-mada-regular">
                Keep challenging yourself!
              </Text>
            </View>
          ) : (
            displayNotes
              .filter((note) => note.isCompleted)
              .map((note) => (
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

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-row">
        <TouchableOpacity
          onPress={() => setActiveTab("errors-now")}
          className={`flex-1 py-2 ${activeTab === "errors-now" ? "border-b-2 border-purple-500" : ""}`}
        >
          <Text
            className={`text-center font-mada-medium ${activeTab === "errors-now" ? "text-purple-500" : "text-gray-500"}`}
          >
            Errors Now
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setActiveTab("completed")}
          className={`flex-1 py-2 ${activeTab === "completed" ? "border-b-2 border-purple-500" : ""}`}
        >
          <Text
            className={`text-center font-mada-medium ${activeTab === "completed" ? "text-purple-500" : "text-gray-500"}`}
          >
            Completed
          </Text>
        </TouchableOpacity>
      </View>

      {activeTab === "errors-now" ? <ErrorsNowTab /> : <CompletedTab />}
    </SafeAreaView>
  );
};

export default ErrorNotes;
