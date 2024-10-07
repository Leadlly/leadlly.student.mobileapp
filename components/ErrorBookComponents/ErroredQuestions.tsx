import React from "react";
import { View, Text, ScrollView, Image } from "react-native";
import { ErrorBookQuestion } from "../../types/types";
import RenderHtml from "react-native-render-html";
import { useWindowDimensions } from "react-native";

const ErroredQuestions: React.FC<{ chapterErrorBook: ErrorBookQuestion[] }> = ({
  chapterErrorBook,
}) => {
  const { width } = useWindowDimensions();

  const renderQuestion = (item: ErrorBookQuestion, index: number) => (
    <View
      key={index}
      className="mb-3 border border-input-border rounded-xl p-4"
    >
      <Text className="font-mada-bold text-secondary-text text-base mb-2">
        {`Question ${index + 1}:`}
      </Text>

      <RenderHtml
        contentWidth={width}
        source={{ html: item.question.question }}
        tagsStyles={{
          body: { fontSize: 16, fontFamily: "Mada-Bold", marginBottom: 10 },
        }}
      />

      {item.question.images?.map((image, imgIndex) => (
        <Image
          key={imgIndex}
          source={{ uri: image.url }}
          width={width - 72}
          className="h-[200px] mb-2.5"
          resizeMode="contain"
        />
      ))}

      {item.question.options?.map((option, optIndex) => (
        <View key={optIndex} className="mb-2">
          <View className="flex-row items-center">
            <Text className="font-mada-bold mr-3">
              {`${String.fromCharCode(65 + optIndex)}. `}
            </Text>
            <RenderHtml
              contentWidth={width}
              source={{ html: option.name }}
              tagsStyles={{
                body: { fontFamily: "Mada-Bold" },
              }}
            />
          </View>
          {option.images?.map((image, imgIndex) => (
            <Image
              key={imgIndex}
              source={{ uri: image.url }}
              width={width - 84}
              className="h-[200px] mt-1.5"
              resizeMode="contain"
            />
          ))}
        </View>
      ))}
    </View>
  );

  return (
    <ScrollView showsVerticalScrollIndicator={false} className="p-5">
      <Text className="font-mada-bold text-2xl mb-5 text-black">
        Errored Questions
      </Text>
      {chapterErrorBook.map((item, index) => renderQuestion(item, index))}
    </ScrollView>
  );
};

export default ErroredQuestions;
