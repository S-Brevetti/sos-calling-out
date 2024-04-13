import { useState, useEffect, ReactElement } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import * as Contacts from "expo-contacts";
import { TextInput } from "react-native-gesture-handler";

//Creo l'inteface per lo stato
interface State {
  contacts: Array<Person>;
  filteredContacts: Array<Person>;
}

//dichiaro lo stato iniziale
const initialState: State = {
  contacts: [],
  filteredContacts: [],
};

//creo un nuovo tipo per l'oggetto Person, che andrà ad essere il tipo dichiarato in State per l'array contacts.
//creerò nuovi tipi dovessero servirmi nuovi array di oggetti nello stato
type Person = {
  id: string;
  name: string;
  phoneNumber: string | undefined;
};

type Item = {
  item: Person;
};

type Props = {
  navigation: any;
  route: any;
};

export default function ContactList(props: Props) {
  const [state, setState] = useState<State>(initialState);
  const [input, onChangeInput] = useState<string>("");

  useEffect(() => {
    getContacts();
  }, []);

  async function getContacts(): Promise<any> {
    let tempArray: Array<Person> = [];
    //Controllo del permesso
    const { status } = await Contacts.requestPermissionsAsync();
    if (status === "granted") {
      //Se permesso è "granted", prendi i contatti dalla lista
      let { data } = await Contacts.getContactsAsync({
        fields: [Contacts.Fields.PhoneNumbers],
      });
      if (data.length > 0) {
        data
          .filter((obj) => {
            return (
              !!obj.phoneNumbers && obj.phoneNumbers[0].number?.includes("+39")
            );
          })
          .map((element: any) => {
            let dataId = element.id;
            let dataName = element.name;
            let dataNumber = element.phoneNumbers[0].number;
            let person = {
              id: dataId,
              name: dataName,
              phoneNumber: dataNumber,
            };
            tempArray.push(person);
          });
      }
      setState({ ...state, contacts: tempArray, filteredContacts: tempArray });
    }
  }

  const goToHome = (item: Item) => () => {
    props.navigation.navigate({ name: "Home", params: item, merge: true });
  };

  const singleContact = (item: Item):ReactElement => {
    return (
      <TouchableOpacity
        style={styles.touchableRectangle}
        onPress={goToHome(item)}
      >
        <Text style={styles.name}>{item.item.name}</Text>
        <Text>{item.item.phoneNumber}</Text>
      </TouchableOpacity>
    );
  };

  function search(e: string) {
    console.log("e", e);
    let tempArr = state.contacts.filter((obj) => {
      return obj.name.includes(e);
    });
    setState({ ...state, filteredContacts: tempArr });
  }

  return (
    <View>
      <TextInput
        style={styles.inputBox}
        onChangeText={search}
        autoFocus={true}
      />
      <FlatList
        data={state.filteredContacts}
        renderItem={singleContact}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  touchableRectangle: {
    backgroundColor: "#fafafa",
    padding: 5,
    marginTop: 2,
    marginBottom: 3,
    marginLeft: 5,
    marginRight: 5,
  },
  name: {
    fontSize: 20,
  },
  inputBox: {
    height: 40,
    margin: 5,
    backgroundColor: "white",
    padding: 6,
    fontSize: 20,
  },
});
