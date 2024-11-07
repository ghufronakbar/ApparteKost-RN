import { TouchableOpacity } from "react-native";
import { ThemedText } from "../ThemedText";
import { router } from "expo-router";

interface Props {
  name: string;
}

const ListDistrict = ({ name }: Props) => {
  return (
    <TouchableOpacity
      style={{
        overflow: "visible",
        shadowColor: "gray",
        borderRadius: 12,
        shadowOpacity: 0.5,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 10,
        elevation: 3,
        backgroundColor: "white",
        paddingHorizontal: 16,
        paddingVertical: 8,
        justifyContent: "space-between",
        marginVertical: 8,
      }}
      onPress={() =>
        router.push({ pathname: "/list-cost", params: { search: name } })
      }
    >
      <ThemedText
        className="text-custom-1"
        type="defaultSemiBold"
        numberOfLines={1}
      >
        {name}
      </ThemedText>
    </TouchableOpacity>
  );
};

export default ListDistrict;
