import React, { ReactElement } from "react";
import { Modal, Text, TouchableOpacity } from "react-native";

type Props = {
  modalVisible: boolean;
  text: string;
  buttonText: string;
  callback?: any;
};

const defaultProps = {
  modalVisible: false,
  text: "generic Modal text",
  buttonText: "button",
};

export default function showModal(props: Props): ReactElement {

  let visibility = props.modalVisible;

  return (
    <Modal animationType="slide" visible={visibility}>
      <Text>{props.text}</Text>
      <TouchableOpacity onPress={props.callback}>
        <Text>{props.buttonText}</Text>
      </TouchableOpacity>
    </Modal>
  );
}
showModal.defaultProps = defaultProps;
