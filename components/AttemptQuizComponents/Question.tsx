import { TQuizQuestionProps } from "../../types/types";
import React from "react";
import { View, Image, useWindowDimensions } from "react-native";
import RenderHtml from "react-native-render-html";

const Question = ({ question }: { question: TQuizQuestionProps }) => {
  const { width } = useWindowDimensions();

  return (
    <View className="mb-4">
      <View className="mb-2">
        <RenderHtml
          contentWidth={width - 100}
          source={{
            html: question.question,
          }}
        />
      </View>
      {question.images && question.images.length > 0 && question.images[0]?.url && (
        <Image
          source={{
            uri: question.images[0].url,
          }}
          className="w-full h-[300px]"
          resizeMode="contain"
        />
      )}
    </View>
  );
};

export default Question;
