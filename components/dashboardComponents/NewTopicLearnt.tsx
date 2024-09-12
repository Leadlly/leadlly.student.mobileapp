import { View, Text, Pressable } from "react-native";
import React, { useState } from "react";
import { useAppSelector } from "../../services/redux/hooks";
import NewTopicLearntForm from "./NewTopicLearntForm";

const NewTopicLearnt = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [activeSubject, setActiveSubject] = useState<string | null>(null);

  const userAcademic = useAppSelector((state) => state.user.user?.academic);

  return (
    <View className="relative z-[999] my-1.5 border border-input-border rounded-xl py-4 px-6 space-y-4">
      <Text className="text-primary text-xl leading-tight font-mada-Bold">
        What did you Learnt New Today?
      </Text>

      <Text className="text-sm leading-tight font-mada-regular">
        Choose the chapters and topics you have finished in your class.
      </Text>

      <View className="flex-row items-center justify-between">
        {userAcademic?.subjects?.map((subject) => (
          <Pressable
            key={subject.name}
            onPress={() => {
              setActiveSubject(subject.name);
              setModalVisible(!modalVisible);
            }}
            className="w-20 h-8 items-center justify-center rounded-lg border border-input-border"
          >
            <Text className="capitalize text-sm font-mada-medium leading-tight text-tab-item-gray">
              {subject.name}
            </Text>
          </Pressable>
        ))}
      </View>

      {activeSubject && modalVisible && (
        <NewTopicLearntForm
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          activeSubject={activeSubject}
          setActiveSubject={setActiveSubject}
          userStandard={userAcademic?.standard!}
          userSubjects={userAcademic?.subjects!}
        />
      )}
    </View>
  );
};

export default NewTopicLearnt;
