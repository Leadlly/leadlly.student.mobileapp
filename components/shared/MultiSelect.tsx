import DropDownPicker from "react-native-dropdown-picker";
import { colors } from "../../constants/constants";
import { Dispatch, SetStateAction } from "react";
import { View } from "react-native";

const MultiSelect = ({
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
  value: never[];
  setValue: Dispatch<SetStateAction<never[]>>;
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
        multiple={true}
        placeholder="Select topics"
        placeholderStyle={{
          color: colors.tabItemGray,
          fontFamily: "Mada-Medium",
          fontSize: 16,
        }}
        min={1}
        max={items.length}
        items={items}
        listMode="SCROLLVIEW"
        loading={loading || fetching}
        activityIndicatorColor={colors.primary}
        activityIndicatorSize={15}
        closeOnBackPressed={true}
        style={{ borderColor: colors.inputBorder }}
        scrollViewProps={{
          nestedScrollEnabled: true,
          showsVerticalScrollIndicator: false,
        }}
        zIndex={1000}
        maxHeight={200}
        dropDownContainerStyle={{ borderColor: colors.inputBorder }}
        mode="BADGE"
        badgeColors={[colors.primary]}
        badgeDotColors={["white"]}
        badgeDotStyle={{ width: 5, height: 5 }}
        badgeStyle={{ borderRadius: 999 }}
        badgeTextStyle={{
          fontFamily: "Mada-Regular",
          fontSize: 12,
          color: "#fff",
        }}
        listMessageTextStyle={{
          color: colors.tabItemGray,
          fontFamily: "Mada-Medium",
          fontSize: 14,
        }}
        listItemLabelStyle={{ fontFamily: "Mada-Regular", fontSize: 15 }}
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

export default MultiSelect;
