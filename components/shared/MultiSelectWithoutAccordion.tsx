import { colors } from "../../constants/constants";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  Text,
  View,
} from "react-native";
import clsx from "clsx";
import Feather from "@expo/vector-icons/Feather";
import AntDesign from "@expo/vector-icons/AntDesign";
import { capitalizeFirstLetter } from "../../helpers/utils";
import ModalComponent from "./ModalComponent";
import Input from "./Input";

const MultiSelectWithoutAccordion = ({
  items,
  defaultValue = [],
  onValueChange,
  className,
  label,
  labelStyle,
  placeholder = "Select options",
  fetching,
  loading,
  maxCount = 4,
  searchValue,
  setSearchValue,
}: {
  items: { _id: string; name: string | number }[];
  defaultValue: Array<{
    _id: string;
    name: string | number;
  }>;
  onValueChange: (
    value: Array<{
      _id: string;
      name: string | number;
    }>
  ) => void;
  className?: string;
  placeholder?: string;
  loading?: boolean;
  fetching?: boolean;
  label?: string;
  labelStyle?: string;
  maxCount?: number;
  searchValue: string;
  setSearchValue: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const [showDropdown, setShowDropdown] = useState(false);

  const [selectedValues, setSelectedValues] = useState<
    Array<{
      _id: string;
      name: string | number;
    }>
  >(defaultValue);

  useEffect(() => {
    setSelectedValues(defaultValue);
  }, [defaultValue]);

  const handleClear = () => {
    setSelectedValues([]);
    onValueChange([]);
  };

  const handleSelectValue = (value: { _id: string; name: string | number }) => {
    setSelectedValues((prevValues) => {
      const valueIndex = prevValues.findIndex((v) => v._id === value._id);
      const newSelectedValues =
        valueIndex >= 0
          ? prevValues.filter((_, index) => index !== valueIndex)
          : [...prevValues, value];

      onValueChange(newSelectedValues);
      return newSelectedValues;
    });
  };

  const handleSelectAll = () => {
    if (selectedValues.length === items.length) {
      handleClear();
    } else {
      const allValues = items.map((item) => ({
        _id: item._id,
        name: item.name,
      }));
      setSelectedValues(allValues);
      onValueChange(allValues);
      setShowDropdown(false);
    }
  };

  const clearExtraOptions = () => {
    const newSelectedValues = selectedValues.slice(0, maxCount);
    setSelectedValues(newSelectedValues);
    onValueChange(newSelectedValues);
  };

  return (
    <View className="relative z-50 w-full mb-4">
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
        className="w-full bg-white flex-row items-center justify-between p-3 rounded-lg border border-input-border"
        onPress={(e) => {
          e.stopPropagation();
          setShowDropdown(!showDropdown);
        }}
      >
        {selectedValues && selectedValues.length > 0 ? (
          <View className="flex-row flex-1 items-center justify-between">
            <View className="flex-row flex-1 gap-1 flex-wrap">
              {selectedValues.slice(0, maxCount).map((value) => {
                const option = items?.find((o) => o._id === value._id);
                return (
                  <View
                    key={value._id}
                    className="bg-primary text-left rounded-full flex-row justify-between items-center px-2 py-1"
                  >
                    <Text
                      numberOfLines={1}
                      ellipsizeMode="tail"
                      className="text-white text-xs font-mada-medium leading-tight"
                    >
                      {capitalizeFirstLetter(option?.name.toString())}
                    </Text>
                    <Pressable
                      className="ml-2"
                      onPress={(e) => {
                        e.stopPropagation();
                        handleSelectValue(value);
                      }}
                    >
                      <AntDesign name="close" size={12} color="white" />
                    </Pressable>
                  </View>
                );
              })}
              {selectedValues.length > maxCount && (
                <View className="border border-input-border rounded-full flex-row items-center justify-between px-2 py-1 bg-white">
                  <Text className="text-xs font-mada-medium leading-tight">
                    {`+ ${selectedValues.length - maxCount} more`}
                  </Text>
                  <Pressable
                    className="ml-2"
                    onPress={(e) => {
                      e.stopPropagation();
                      clearExtraOptions();
                    }}
                  >
                    <AntDesign name="close" size={12} color="black" />
                  </Pressable>
                </View>
              )}
            </View>
            {selectedValues.length > 0 && (
              <Pressable
                onPress={(e) => {
                  e.stopPropagation();
                  handleClear();
                }}
              >
                <AntDesign
                  name="close"
                  size={18}
                  color="black"
                  style={{ marginHorizontal: 5 }}
                />
              </Pressable>
            )}
            <Feather name="chevron-down" size={20} color="black" />
          </View>
        ) : (
          <View className="flex-row items-center justify-between flex-1">
            <Text className="font-mada-medium text-base leading-tight text-tab-item-gray">
              {placeholder}
            </Text>
            <Feather name="chevron-down" size={20} color="black" />
          </View>
        )}
      </Pressable>

      <ModalComponent
        modalVisible={showDropdown}
        setModalVisible={setShowDropdown}
      >
        <View className="items-center justify-center py-3">
          <Text className="text-xl font-mada-semibold leading-none">
            Select {label}
          </Text>
        </View>
        <View className="bg-white rounded-lg rounded-b-none border border-input-border py-1">
          <View className="p-2 border-b border-input-border">
            <Input
              inputStyle="h-8 text-sm pr-3"
              placeholder="Search a chapter"
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
            showsVerticalScrollIndicator={false}
            nestedScrollEnabled={true}
            className="h-72"
          >
            {loading || fetching ? (
              <View>
                <ActivityIndicator size={"small"} color={colors.primary} />
              </View>
            ) : items && items.length > 0 ? (
              <>
                <Pressable
                  onPress={() => handleSelectAll()}
                  className="flex-row items-center px-4 py-3 border-b border-input-border"
                >
                  <View
                    className={clsx(
                      "w-4 h-4 rounded border items-center justify-center",
                      selectedValues.length === items.length &&
                        "bg-primary border-primary"
                    )}
                  >
                    {selectedValues.length === items.length && (
                      <Feather name="check" size={14} color="white" />
                    )}
                  </View>
                  <Text className="ml-3 text-base font-mada-medium leading-tight">
                    Select All
                  </Text>
                </Pressable>
                {items.map((item) => (
                  <Pressable
                    key={item._id}
                    className="flex-row items-center px-4 py-3 border-b border-input-border"
                    onPress={() =>
                      handleSelectValue({ _id: item._id, name: item.name })
                    }
                  >
                    <View
                      className={clsx(
                        "w-4 h-4 rounded border items-center justify-center",
                        selectedValues.some((val) => val._id === item._id) &&
                          "bg-primary border-primary"
                      )}
                    >
                      {selectedValues.some((val) => val._id === item._id) && (
                        <Feather name="check" size={14} color="white" />
                      )}
                    </View>

                    <Text className="ml-3 text-base font-mada-regular leading-tight">
                      {capitalizeFirstLetter(item.name.toString())}
                    </Text>
                  </Pressable>
                ))}
              </>
            ) : (
              <View className="h-20 items-center justify-center">
                <Text className="text-sm leading-tight font-mada-medium text-tab-item-gray">
                  No items to show!
                </Text>
              </View>
            )}
          </ScrollView>
        </View>
        <View className="fixed bottom-0 inset-x-0 h-10 border border-t-0 border-input-border rounded-b-lg flex-row items-center justify-between bg-white">
          {selectedValues.length > 0 && (
            <Pressable
              className="items-center justify-center flex-1 border-r border-input-border"
              onPress={() => handleClear()}
            >
              <Text className="text-sm font-mada-medium leading-none">
                Clear
              </Text>
            </Pressable>
          )}
          <Pressable
            className="items-center justify-center flex-1"
            onPress={() => setShowDropdown(false)}
          >
            <Text className="text-sm font-mada-medium leading-none">Done</Text>
          </Pressable>
        </View>
      </ModalComponent>
    </View>
  );
};

export default MultiSelectWithoutAccordion;
