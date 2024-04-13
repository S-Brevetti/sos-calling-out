import React, { ReactElement, useEffect, useState } from "react";
import {
  View,
  Button,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Text,
} from "react-native";
import GenericModal from "../modal/GenericModal";
import * as SMS from "expo-sms";

type Person = {
  id: string;
  name: string;
  phoneNumber: string;
};

const initialState: State = {
  contacts: [],
  modalVisible: false,
};

interface State {
  contacts: Array<Person>;
  modalVisible: boolean;
}

export default function ContactsSection(
  { navigation, route }: any,
  props: any
): ReactElement {
  const [state, setState] = useState(initialState);

  useEffect(() => {
    if (!!route.params) {
      let newPerson: Person = route.params?.item;
      console.log("route.params.item", route.params.item);
      let newArr: State = state;
      if (state.contacts.length < 5) {
        newArr.contacts.push(newPerson);
      }
      console.log("newArr", newArr);
      setState(newArr);
    }
    console.log(state);
  }, [route.params]);

  function setModal() {
    let switchModal: boolean = state.modalVisible;
    setState({ ...state, modalVisible: !switchModal });
  }

  function goToContacts() {
    if (state.contacts.length < 5) {
      navigation.navigate("ContactList");
    } else {
      setModal();
    }
  }

  function listElement(person: any): ReactElement {
    return (
      <TouchableOpacity>
        <Text style={styles.text}>{person.item?.name}</Text>
      </TouchableOpacity>
    );
  }

  async function sendSMS() {
    let SMSArr: Array<string> = [];
    state.contacts.forEach((elem) => {
      SMSArr.push(elem.phoneNumber);
    });
    await SMS.sendSMSAsync(SMSArr, `Help! I'm in ${props?.address[0]?.city}`);
  }

  return (
    <View style={styles.viewArea}>
      <Button onPress={goToContacts} title="+ Add" />
      {state.contacts.length > 0 && (
        <FlatList
          style={styles.flatList}
          data={state.contacts}
          renderItem={listElement}
        />
      )}
      <GenericModal
        modalVisible={state.modalVisible}
        text="Massimo cinque contatti"
        buttonText="Chiudi"
        callback={setModal}
      />
      <Button title="SOS" onPress={sendSMS} />
    </View>
  );
}

const styles = StyleSheet.create({
  viewArea: {
    flex: 1,
  },
  text: {
    marginBottom: 3,
    marginTop: 2,
    marginLeft: 5,
    marginRight: 5,
    padding: 5,
    backgroundColor: "#fafafa",
  },
  flatList: {
    backgroundColor: "white",
  },
});
