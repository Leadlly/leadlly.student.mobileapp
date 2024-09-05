import { View, Text, Pressable } from "react-native";
import ModalComponent from "../shared/ModalComponent";
import { UseFormReturn } from "react-hook-form";
import * as z from "zod";
import { AccountPersonalInfoSchema } from "../../schemas/accountPersonalInfoSchema";
import { capitalizeFirstLetter } from "../../helpers/utils";

const PersonalInfoFormDropdown = ({
  items,
  form,
  setShowDropdown,
  showDropdown,
  fieldName,
}: {
  items: string[];
  showDropdown: boolean;
  setShowDropdown: (showDropdown: boolean) => void;
  form: UseFormReturn<z.infer<typeof AccountPersonalInfoSchema>>;
  fieldName: keyof z.infer<typeof AccountPersonalInfoSchema>;
}) => {
  return (
    <ModalComponent
      modalVisible={showDropdown}
      setModalVisible={setShowDropdown}
    >
      <View className="items-center justify-center py-3">
        <Text className="text-xl font-mada-semibold leading-none">
          Select your {fieldName === "studentSchedule" ? "schedule" : fieldName}
        </Text>
      </View>
      <View className="items-center border border-input-border rounded-lg">
        {items.map((item) => (
          <Pressable
            key={item}
            className="w-full h-10 items-center justify-center border-b border-input-border"
            onPress={() => {
              form.setValue(fieldName, item);
              setShowDropdown(false);
            }}
          >
            <Text className="text-base font-mada-medium leading-none">{`${capitalizeFirstLetter(item)}${item === "11" || item === "12" ? "th" : ""}`}</Text>
          </Pressable>
        ))}
      </View>
    </ModalComponent>
  );
};

export default PersonalInfoFormDropdown;
