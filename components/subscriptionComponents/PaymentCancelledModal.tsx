import { View, Text, Pressable } from "react-native";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import ModalComponent from "../shared/ModalComponent";

const PaymentCancelledModal = ({
  setIsTransactionCancelled,
  transactionCancelled,
  label,
}: {
  transactionCancelled: boolean;
  setIsTransactionCancelled: (transactionCancelled: boolean) => void;
  label: string;
}) => {
  return (
    <ModalComponent
      modalVisible={transactionCancelled}
      setModalVisible={setIsTransactionCancelled}
      className="flex-1"
    >
      <View className="h-80 items-center justify-center space-y-5">
        <MaterialCommunityIcons
          name="credit-card-remove-outline"
          size={60}
          color="black"
        />
        <View className="items-center justify-center">
          <Text className="text-2xl font-mada-Bold leading-tight text-center">
            Transaction {label}
          </Text>
          <Text className="text-base font-mada-medium leading-tight text-center">
            No payment was made.
          </Text>
          <Text className="text-base font-mada-medium leading-tight text-center">
            You can retry the transaction or get in touch with our support team
            if you need assistance.
          </Text>
        </View>

        <Pressable onPress={() => setIsTransactionCancelled(false)}>
          <Text className="text-primary text-base font-mada-semibold leading-tight underline">
            Retry Payment
          </Text>
        </Pressable>
      </View>
    </ModalComponent>
  );
};

export default PaymentCancelledModal;
