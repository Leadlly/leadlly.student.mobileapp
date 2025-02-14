import { colors } from "../../constants/constants";
import React, { useState } from "react";
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
import AccordionItem from "./AccordionItem";
import Input from "./Input";

const MultiSelect = ({
  items,
  defaultValue = [],
  onValueChange,
  inputStyle,
  label,
  labelStyle,
  placeholder = "Select options",
  fetching,
  loading,
  maxCount = 4,
  selectedValues,
  setSelectedValues,
}: {
  items: {
    _id: string;
    name: string;
    subItems: Array<{ _id: string; name: string }>;
  }[];
  defaultValue: Array<{
    _id: string;
    name: string;
    subItems?: Array<{ _id: string; name: string }>;
  }>;
  onValueChange: (
    value: Array<{
      _id: string;
      name: string;
      subItems?: Array<{ _id: string; name: string }>;
    }>
  ) => void;
  selectedValues: {
    _id: string;
    name: string;
    subItems?: Array<{
      _id: string;
      name: string;
    }>;
  }[];
  setSelectedValues: React.Dispatch<
    React.SetStateAction<
      {
        _id: string;
        name: string;
        subItems?: Array<{
          _id: string;
          name: string;
        }>;
      }[]
    >
  >;
  inputStyle?: string;
  placeholder?: string;
  loading?: boolean;
  fetching?: boolean;
  label?: string;
  labelStyle?: string;
  maxCount?: number;
}) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [expanded, setExpanded] = useState<number | null>(null);

  const filterItemsBasedOnSearch = items.filter((item) =>
    item.name.toString().toLowerCase().includes(searchValue.toLowerCase())
  );

  const toggleAccordion = (index: number) => {
    setExpanded((prevIndex) => (prevIndex === index ? null : index));
  };

  // useEffect(() => {
  //   setSelectedValues(defaultValue);
  // }, [defaultValue]);

  function checkAndRemoveSubItems(
    item: {
      _id: string;
      name: string;
      subItems: { _id: string; name: string }[];
    },
    newSelectedValue: {
      _id: string;
      name: string;
      subItems?: Array<{
        _id: string;
        name: string;
      }>;
    }[]
  ): {
    _id: string;
    name: string;
    subItems?: Array<{
      _id: string;
      name: string;
    }>;
  }[] {
    return newSelectedValue.map((newValue) => {
      if (newValue.subItems) {
        const matchedItems = newValue.subItems.filter((subItem) => {
          return item.subItems.some(
            (itemSubItem) => itemSubItem._id === subItem._id
          );
        });

        if (
          matchedItems.length === item.subItems.length &&
          matchedItems.length === newValue.subItems.length
        ) {
          return { ...newValue, subItems: [] };
        }
      }
      return newValue;
    });
  }

  const handleClear = () => {
    setSelectedValues([]);
    onValueChange([]);
  };

  const handleSelectValue = (value: {
    _id: string;
    name: string;
    subItems: Array<{ _id: string; name: string }>;
  }) => {
    setSelectedValues((prevValues) => {
      const valueIndex = prevValues.findIndex((v) => v._id === value._id);
      const newSelectedValues =
        valueIndex >= 0
          ? prevValues.filter((_, index) => index !== valueIndex)
          : [...prevValues, value];

      const updatedValues = checkAndRemoveSubItems(value, newSelectedValues);

      onValueChange(updatedValues);
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
        subItems: item.subItems,
      }));
      setSelectedValues(allValues);

      const updatedValues = items.map((item) => ({
        _id: item._id,
        name: item.name,
        subItems: [],
      }));
      onValueChange(updatedValues);
      setShowDropdown(false);
    }
  };

  const clearExtraOptions = () => {
    const newSelectedValues = selectedValues.slice(0, maxCount);
    setSelectedValues(newSelectedValues);
    onValueChange(newSelectedValues);
  };

  const handleSelectSubTopic = (
    item: {
      _id: string;
      name: string;
      subItems: { _id: string; name: string }[];
    },
    subItem: { _id: string; name: string }
  ) => {
    setSelectedValues((prevValues) => {
      const valueIndex = prevValues.findIndex((v) => v._id === item._id);
      let newSelectedValue: Array<{
        _id: string;
        name: string;
        subItems?: Array<{ _id: string; name: string }>;
      }> = [];

      if (valueIndex !== -1) {
        // Update existing value
        const value = { ...prevValues[valueIndex] };
        const subItemIndex = value.subItems?.findIndex(
          (v) => v._id === subItem._id
        );

        if (subItemIndex !== -1 && value.subItems) {
          // Deselect subItem
          value.subItems = value.subItems.filter(
            (_, index) => index !== subItemIndex
          );

          // If there are no more subItems, deselect the entire item
          if (value.subItems.length === 0) {
            newSelectedValue = [
              ...prevValues.slice(0, valueIndex),
              ...prevValues.slice(valueIndex + 1),
            ];
          } else {
            newSelectedValue = [
              ...prevValues.slice(0, valueIndex),
              value,
              ...prevValues.slice(valueIndex + 1),
            ];
          }
        } else if (value.subItems) {
          // Select subItem
          value.subItems = [...(value.subItems || []), subItem];
          newSelectedValue = [
            ...prevValues.slice(0, valueIndex),
            value,
            ...prevValues.slice(valueIndex + 1),
          ];
        }
      } else {
        // Add new value
        newSelectedValue = [
          ...prevValues,
          {
            _id: item._id,
            name: item.name,
            subItems: [subItem],
          },
        ];
      }

      const updatedValues = checkAndRemoveSubItems(item, newSelectedValue);

      onValueChange(updatedValues);
      return newSelectedValue;
    });
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
        className={clsx(
          "w-full bg-white flex-row items-center justify-between p-3 rounded-lg border border-input-border",
          inputStyle
        )}
        onPress={(e) => {
          e.stopPropagation();
          setShowDropdown(!showDropdown);
        }}
      >
        {selectedValues && selectedValues.length > 0 ? (
          <View className="flex-row flex-1 items-center justify-between">
            <View className="flex-row flex-1 gap-1 flex-wrap">
              {selectedValues.slice(0, maxCount).map((value) => {
                const option = items?.find((o) => o.name === value.name);
                return (
                  <View
                    key={value._id}
                    className="bg-primary text-left rounded-full flex-row justify-between items-center px-2 py-1"
                  >
                    <Text
                      numberOfLines={1}
                      ellipsizeMode="tail"
                      className="max-w-[250px] text-white text-xs font-mada-medium leading-tight"
                    >
                      {capitalizeFirstLetter(option?.name)}
                    </Text>
                    <Pressable
                      className="ml-2"
                      onPress={(e) => {
                        e.stopPropagation();
                        handleSelectValue({
                          _id: value._id,
                          name: value.name,
                          subItems: value.subItems!,
                        });
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
                style={{ marginHorizontal: 5 }}
              >
                <AntDesign name="close" size={18} color="black" />
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
            ) : filterItemsBasedOnSearch &&
              filterItemsBasedOnSearch.length > 0 ? (
              <>
                {searchValue.length <= 0 && (
                  <Pressable
                    onPress={() => handleSelectAll()}
                    className="flex-row items-center justify-between px-4 py-3 border-b border-input-border"
                  >
                    <Text className="text-base font-mada-medium leading-tight">
                      Select All
                    </Text>
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
                  </Pressable>
                )}
                {filterItemsBasedOnSearch.map((item, index) => (
                  <AccordionItem
                    key={item._id}
                    item={item}
                    isExpanded={expanded === index}
                    selectedValues={selectedValues}
                    onToggle={() => toggleAccordion(index)}
                    onSelectValue={() =>
                      handleSelectValue({
                        _id: item._id,
                        name: item.name,
                        subItems: item.subItems,
                      })
                    }
                    content={
                      <ScrollView
                        nestedScrollEnabled={true}
                        className="bg-primary/10 border-b border-input-border"
                      >
                        {item.subItems && item.subItems.length > 0 ? (
                          item.subItems.map((subItem, i) => (
                            <Pressable
                              key={subItem._id}
                              onPress={() =>
                                handleSelectSubTopic(item, subItem)
                              }
                              className={clsx(
                                "px-6 py-3 border-b border-input-border flex-row items-center justify-between",
                                item.subItems.length - 1 === i && "border-b-0"
                              )}
                            >
                              <Text className="text-sm font-mada-medium flex-1">
                                {capitalizeFirstLetter(subItem.name)}
                              </Text>
                              <View
                                className={clsx(
                                  "w-3.5 h-3.5 rounded border items-center justify-center",
                                  selectedValues
                                    ?.find((val) => val?.name === item.name)
                                    ?.subItems?.some(
                                      (v) => v._id === subItem._id
                                    ) && "bg-primary border-primary"
                                )}
                              >
                                {selectedValues
                                  .find((val) => val.name === item.name)
                                  ?.subItems?.some(
                                    (v) => v._id === subItem._id
                                  ) && (
                                  <Feather
                                    name="check"
                                    size={12}
                                    color="white"
                                  />
                                )}
                              </View>
                            </Pressable>
                          ))
                        ) : (
                          <View className="flex-1 items-center justify-center px-3 my-6">
                            <Text className="text-xs text-secondary-text font-mada-medium text-center">
                              No subtopic available!
                            </Text>
                          </View>
                        )}
                      </ScrollView>
                    }
                  />
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

export default MultiSelect;
