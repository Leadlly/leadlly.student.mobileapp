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
import AccordionItem from "./AccordionItem";
import Input from "./Input";

const MultiSelect = ({
  items,
  subItems,
  defaultValue = [],
  onValueChange,
  inputStyle,
  label,
  labelStyle,
  placeholder = "Select options",
  fetching,
  loading,
  subTopicFetching,
  subTopicLoading,
  maxCount = 4,
  setTopicName,
}: {
  items: { _id: string; label: string; value: string }[];
  subItems: { itemName: string; subItems: { _id: string; name: string }[] };
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
  inputStyle?: string;
  placeholder?: string;
  loading?: boolean;
  fetching?: boolean;
  subTopicLoading: boolean;
  subTopicFetching: boolean;
  label?: string;
  labelStyle?: string;
  maxCount?: number;
  setTopicName: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [expanded, setExpanded] = useState<number | null>(null);

  const filterItemsBasedOnSearch = items.filter((item) =>
    item.value.toString().toLowerCase().includes(searchValue.toLowerCase())
  );

  const toggleAccordion = (value: string, index: number) => {
    setTopicName(value);
    setExpanded((prevIndex) => (prevIndex === index ? null : index));
  };

  const [selectedValues, setSelectedValues] = useState<
    Array<{
      _id: string;
      name: string;
      subItems?: Array<{ _id: string; name: string }>;
    }>
  >(defaultValue);

  useEffect(() => {
    setSelectedValues(defaultValue);
  }, [defaultValue]);

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
        name: item.value,
        subItems: item.value === subItems.itemName ? subItems.subItems : [],
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

  const handleSelectSubTopic = (
    item: {
      _id: string;
      label: string;
      value: string;
    },
    subItem: { _id: string; name: string }
  ) => {
    setSelectedValues((prevValues) => {
      const value = prevValues.find((v) => v._id === item._id);
      let newSelectedValue;
      if (value) {
        const subItemIndex = value?.subItems?.findIndex(
          (v) => v._id === subItem._id
        );
        if (subItemIndex && subItemIndex >= 0) {
          const filteredSubItem = value.subItems?.filter(
            (_, index) => index !== subItemIndex
          );
          value.subItems = filteredSubItem;
        } else {
          value.subItems?.push(subItem);
        }
        newSelectedValue = [...prevValues];
      } else {
        const selectedSubItem = {
          _id: item._id,
          name: item.value,
          subItems: [subItem],
        };
        newSelectedValue = [...prevValues, selectedSubItem];
      }

      onValueChange(newSelectedValue);
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
                const option = items?.find((o) => o.value === value.name);
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
                      {option?.label}
                    </Text>
                    <Pressable
                      className="ml-2"
                      onPress={(e) => {
                        e.stopPropagation();
                        handleSelectValue({
                          ...value,
                          subItems: subItems.subItems,
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
                    onToggle={() => toggleAccordion(item.value, index)}
                    onSelectValue={() =>
                      handleSelectValue({
                        _id: item._id,
                        name: item.value,
                        subItems:
                          subItems.itemName === item.value
                            ? subItems.subItems
                            : [],
                      })
                    }
                    content={
                      <ScrollView
                        nestedScrollEnabled={true}
                        className="bg-primary/10 border-b border-input-border"
                      >
                        {subTopicFetching || subTopicLoading ? (
                          <View className="flex-1 items-center justify-center my-6">
                            <ActivityIndicator
                              size={10}
                              color={colors.primary}
                            />
                          </View>
                        ) : (
                          <>
                            {subItems.subItems &&
                            subItems.subItems.length > 0 ? (
                              subItems.subItems.map((subItem, i) => (
                                <Pressable
                                  key={subItem._id}
                                  onPress={() =>
                                    handleSelectSubTopic(item, subItem)
                                  }
                                  className={clsx(
                                    "px-6 py-3 border-b border-input-border flex-row items-center justify-between",
                                    subItems.subItems.length - 1 === i &&
                                      "border-b-0"
                                  )}
                                >
                                  <Text className="text-sm font-mada-medium flex-1">
                                    {capitalizeFirstLetter(subItem.name)}
                                  </Text>
                                  <View
                                    className={clsx(
                                      "w-3.5 h-3.5 rounded border items-center justify-center",
                                      selectedValues
                                        ?.find(
                                          (val) => val?.name === item.value
                                        )
                                        ?.subItems?.some(
                                          (v) => v._id === subItem._id
                                        ) && "bg-primary border-primary"
                                    )}
                                  >
                                    {selectedValues
                                      .find((val) => val.name === item.value)
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
                          </>
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
