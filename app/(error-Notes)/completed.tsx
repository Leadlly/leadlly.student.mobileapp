import React from "react";
import { View, Text, ScrollView, ActivityIndicator, Image } from "react-native";
import { useGetErrorBook } from "../../services/queries/errorBookQuery";
import { colors } from "../../constants/constants";
import ErrorCard from "../../components/ErrorBookComponents/ErrorCard";
import { ErrorNoteProps } from "../../types/types";

const CompletedErrors: React.FC = () => {
  const { data: errorBookData, isLoading } = useGetErrorBook();

  const displayNotes:ErrorNoteProps[] = errorBookData?.errorNotes || [];

  return (
    <View className="p-5 bg-primary/10 min-h-screen">
      <ScrollView>
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
  );
};

export default CompletedErrors;
