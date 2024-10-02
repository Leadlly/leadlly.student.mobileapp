import React from 'react';
import { View, Text, ScrollView, ActivityIndicator, Image } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import ChapterDetails from '../../../../components/ErrorBookComponents/ChapterDetails';
import ErroredQuestions from '../../../../components/ErrorBookComponents/ErroredQuestions';
import { useGetChapterErrorBook } from '../../../../services/queries/errorBookQuery';

const ChapterErroredQuestions: React.FC = () => {
  const { chapterName } = useLocalSearchParams<{ chapterName: string }>();

  const { data, isLoading, isError } = useGetChapterErrorBook(chapterName || '');

  if (isLoading) {
    return (
      <View className="min-h-screen flex items-center justify-center bg-white">
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  const chapterErrorBook = data?.chapterErrorBook || [];

  if (isError || chapterErrorBook.length === 0) {
    return (
      <View className="flex-1 justify-center items-center bg-white">
        <Image 
          source={require('../../../../assets/images/error.png')} 
          className="h-[50vh] w-full"
        />
        <Text className="mt-4 text-lg font-mada-medium text-gray-600">
          {isError ? "An error occurred" : "No questions available"}
        </Text>
        <Text className="mt-2 text-sm font-mada-medium text-gray-500">
          {isError ? "Please try again later" : "Check back soon for new questions"}
        </Text>
      </View>
    );
  }

  return (
    <ScrollView className="flex-1 bg-white">
      <View className="p-4">
        <View className="bg-[#9654F42E] rounded-lg p-5 mb-6">
          <ChapterDetails
            totalQuestions={chapterErrorBook.length}
            chapterName={chapterName || ''}
          />
        </View>
      </View>
      <ErroredQuestions chapterErrorBook={chapterErrorBook} />
    </ScrollView>
  );
};

export default ChapterErroredQuestions;
