import { FC } from "react";
import { TouchableOpacity, Text } from "react-native";

interface ButtonProps {
  label: string;
  callback: Function;
  style?: object;
}

const Button: FC<ButtonProps> = (props) => {
  function handlePress(): void {
    props.callback();
  }

  return (
    <TouchableOpacity onPress={handlePress}>
      <Text>{props.label}</Text>
    </TouchableOpacity>
  );
};
