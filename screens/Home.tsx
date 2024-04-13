import { ReactElement } from "react";
import { View, Text, StyleSheet } from "react-native";
import ContactsSection from "../ui/components/contactsSection/ContactsSection";
import Map from "../ui/components/map/Map";

type Props = {
  navigation: {};
  route: {};
};

export default function Home(props: Props): ReactElement {
  let address: Array<object> = []

  function passAddress(propAddress: Array<object>): void {
    address = propAddress;
  }

  return (
    <View style={styles.container}>
      <View style={styles.mapArea}>
        <Map callback={passAddress} />
      </View>
      <View style={styles.contactsArea}>
        <ContactsSection navigation={props.navigation} route={props.route} address={address} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mapArea: {
    flex: 3,
  },
  contactsArea: {
    flex: 3,
  },
  SOSArea: {
    flex: 1,
  },
});
