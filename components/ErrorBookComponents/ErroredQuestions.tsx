import React from 'react';
import { View, Text, ScrollView, Image } from 'react-native';
import { ErrorBookQuestion } from '../../types/types';
import RenderHtml from 'react-native-render-html';
import { useWindowDimensions } from 'react-native';

const ErroredQuestions: React.FC<{ chapterErrorBook: ErrorBookQuestion[] }> = ({
  chapterErrorBook,
}) => {
  const { width } = useWindowDimensions();

  const renderQuestion = (item: ErrorBookQuestion, index: number) => (
    <View key={index} className="mb-5">
      <Text className="font-mada-bold text-[#7C7C7C] text-lg mb-2.5">
        {`Question ${index + 1}`}
      </Text>

      <RenderHtml
        contentWidth={width}
        source={{ html: item.question.question }}
        tagsStyles={{
          body: { fontSize: 18, fontFamily: 'Mada-Bold', marginBottom: 10 },
        }}
      />

      {item.question.images?.map((image, imgIndex) => (
        <Image
          key={imgIndex}
          source={{ uri: image.url }}
          className="w-[300px] h-[200px] mb-2.5"
        />
      ))}

      {item.question.options?.map((option, optIndex) => (
        <View key={optIndex} className="ml-5 mb-2.5">
          <Text className="font-mada-bold">
            {`${String.fromCharCode(65 + optIndex)}. `}
          </Text>
          <RenderHtml
            contentWidth={width}
            source={{ html: option.name }}
            tagsStyles={{
              body: { fontFamily: 'Mada-Bold' },
            }}
          />
          {option.images?.map((image, imgIndex) => (
            <Image
              key={imgIndex}
              source={{ uri: image.url }}
              className="w-[300px] h-[200px] mt-1.5"
            />
          ))}
        </View>
      ))}
    </View>
  );

  return (
    <ScrollView className="p-5">
      <Text className="font-mada-bold text-2xl mb-5 text-black">
        Errored Questions
      </Text>
      {chapterErrorBook.map((item, index) => renderQuestion(item, index))}
    </ScrollView>
  );
};

export default ErroredQuestions;
