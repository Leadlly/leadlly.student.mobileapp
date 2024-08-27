import { View } from "react-native";
import React, { Dispatch, SetStateAction } from "react";
import DropDownPicker from "react-native-dropdown-picker";
import { colors } from "../../constants/constants";

const Select = ({
  items,
  onOpen,
  open,
  setOpen,
  setValue,
  value,
  fetching,
  loading,
}: {
  items: { label: string; value: string }[];
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  onOpen: () => void;
  value: null;
  setValue: Dispatch<SetStateAction<null>>;
  loading?: boolean;
  fetching?: boolean;
}) => {
  return (
    <View className="mb-4">
      <DropDownPicker
        open={open}
        setOpen={setOpen}
        onOpen={onOpen}
        value={value}
        setValue={setValue}
        placeholder="Select a chapter"
        placeholderStyle={{
          color: colors.tabItemGray,
          fontFamily: "Mada-Medium",
          fontSize: 16,
        }}
        items={items}
        listMode="SCROLLVIEW"
        closeAfterSelecting={true}
        loading={loading || fetching}
        style={{ borderColor: colors.inputBorder }}
        scrollViewProps={{
          nestedScrollEnabled: true,
          showsVerticalScrollIndicator: false,
        }}
        // zIndex={2000}
        // zIndexInverse={3000}
        maxHeight={200}
        dropDownContainerStyle={{ borderColor: colors.inputBorder }}
        listItemLabelStyle={{ fontFamily: "Mada-Regular", fontSize: 15 }}
        labelStyle={{ fontFamily: "Mada-Regular", fontSize: 15 }}
        searchable={true}
        searchPlaceholder="Search a chapter..."
        searchContainerStyle={{ borderColor: colors.inputBorder }}
        searchTextInputProps={{ cursorColor: colors.primary }}
        searchTextInputStyle={{
          borderColor: colors.inputBorder,
          height: 30,
          fontSize: 14,
          borderRadius: 7,
        }}
      />
    </View>
  );
};

export default Select;
