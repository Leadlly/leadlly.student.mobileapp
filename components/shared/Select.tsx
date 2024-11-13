import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  Text,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { colors } from "../../constants/constants";
import Feather from "@expo/vector-icons/Feather";
import clsx from "clsx";
import { capitalizeFirstLetter } from "../../helpers/utils";
import ModalComponent from "./ModalComponent";
import Input from "./Input";
import { AntDesign } from "@expo/vector-icons";

const Select = ({
  items,
  defaultValue,
  onValueChange,
  inputStyle,
  inputTextStyle,
  listContainerStyle,
  placeholder = "Select an item",
  label,
  labelStyle,
  fetching,
  loading,
  overallClassName,
  searchValue,
  setSearchValue,
}: {
  items: { _id: string; name: string | number }[];
  defaultValue: { name: string; _id: string } | null;
  onValueChange: (value: { name: string | number; _id: string }) => void;
  inputStyle?: string;
  inputTextStyle?: string;
  listContainerStyle?: string;
  placeholder?: string;
  loading?: boolean;
  fetching?: boolean;
  label?: string;
  labelStyle?: string;
  overallClassName?: string;
  searchValue: string;
  setSearchValue: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedValue, setSelectedValue] = useState<{
    name: string | number;
    _id: string;
  } | null>(defaultValue);

  useEffect(() => {
    setSelectedValue(defaultValue);
  }, [defaultValue]);

  const handleSelectValue = (data: { _id: string; name: string | number }) => {
    setSelectedValue({ name: data.name, _id: data._id });
    onValueChange({ name: data.name, _id: data._id });
    setShowDropdown(false);
  };

  return (
    <View className={clsx("relative mb-4", overallClassName)}>
      {label ? (
        <Text
          className={clsx(
            "text-lg font-mada-medium leading-tight mb-1",
            labelStyle
          )}
        >
          {label}
        </Text>
      ) : null}
      <Pressable
        className={clsx(
          "  bg-white flex-row w-full h-12 items-center justify-between px-3 rounded-lg border border-input-border",
          inputStyle
        )}
        onPress={() => setShowDropdown(!showDropdown)}
      >
        <View className="flex-1">
          <Text
            className={clsx(
              "font-mada-medium text-base  leading-tight",
              inputTextStyle,
              !selectedValue ? "text-tab-item-gray" : "text-black"
            )}
          >
            {selectedValue
              ? capitalizeFirstLetter(String(selectedValue.name))
              : placeholder}
          </Text>
        </View>
        <Feather name="chevron-down" size={20} color="black" />
      </Pressable>

      <ModalComponent
        modalVisible={showDropdown}
        setModalVisible={setShowDropdown}
      >
        <View className="items-center justify-center py-3">
          <Text className="text-xl font-mada-semibold leading-none">
            Select a {label}
          </Text>
        </View>
        <View className="bg-white rounded-lg border border-input-border">
          <View className="p-2 border-b border-input-border">
            <Input
              inputStyle="h-8 text-sm pr-3"
              placeholder={`Search a ${label}`}
              icon={<Feather name="search" size={15} color={colors.iconGray} />}
              icon2={
                searchValue.length > 0 ? (
                  <AntDesign
                    name="closecircleo"
                    size={15}
                    color={colors.iconGray}
                  />
                ) : null
              }
              handlePress={() => setSearchValue("")}
              value={searchValue}
              onChangeText={setSearchValue}
            />
          </View>

          <ScrollView
            className={clsx("h-72", listContainerStyle)}
            showsVerticalScrollIndicator={false}
            nestedScrollEnabled={true}
          >
            {loading || fetching ? (
              <View className="mt-6">
                <ActivityIndicator size={"small"} color={colors.primary} />
              </View>
            ) : items && items.length > 0 ? (
              items.map((item) => (
                <Pressable
                  key={item.name}
                  className={clsx(
                    "flex-row items-center justify-between px-4 py-3 border-b border-input-border",
                    items[items.length - 1].name === item.name && "border-b-0"
                  )}
                  onPress={() => handleSelectValue(item)}
                >
                  <Text className="flex-1 text-base font-mada-regular leading-5">
                    {capitalizeFirstLetter(String(item.name))}
                  </Text>
                  {selectedValue?.name === item.name && (
                    <Feather name="check" size={20} color="black" />
                  )}
                </Pressable>
              ))
            ) : (
              <View className="h-10 items-center justify-center">
                <Text className="text-sm leading-tight font-mada-medium text-tab-item-gray">
                  No items to show!
                </Text>
              </View>
            )}
          </ScrollView>
        </View>
      </ModalComponent>
    </View>
  );
};

export default Select;
