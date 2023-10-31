import { Image, KeyboardAvoidingView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useContext, useEffect, useLayoutEffect } from 'react'
import PageTitle from '../PageTitle';
import { Ionicons } from "@expo/vector-icons"
import Fonts from '../../constants/font';
import Color from '../../constants/color';
import { TripsContext } from '../../context/tripContext';

const TripDetails = ({ navigation, route }) => {
const { deleteTrip } = useContext(TripsContext)
  const items = route.params.data;

  useLayoutEffect(() => {
  }, [items, route.params])
  const deleteHandler = () => {
    const deletedTrip = deleteTrip(items.id);
    navigation.navigate("Trips")
  }
  return (

    <View style={styles.container}>
      <PageTitle
        onBackPress={() => navigation.navigate('Trips')}
        backBtn={true}
      >Trip Details</PageTitle>

      <View style={styles.card}>
        <TouchableOpacity onPress={() => navigation.navigate("CreateEditTrip", { item: items })} style={{ position: "absolute", right: 0, bottom: 2, marginRight: 12, marginBottom: 10 }}>
          <Ionicons name='pencil' size={24} color={{ backgroundColor: "red" }} />
        </TouchableOpacity>
        <View style={{ marginBottom: 8 }}>
          <Image
            source={{ uri: items.imgUri }}
            style={styles.image}
          />
        </View>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>


          <View style={{ flexDirection: "row", alignItems: "center", }}>



            <View style={{ marginLeft: 10, }}>
              <View>
                <Text style={{ fontSize: 21, fontWeight: "bold" }}>{items.title}</Text>
              </View>

              <View style={{ marginVertical: 12 }}>
                <Text style={{ fontSize: 16 }}>Trips Start: {items.startDate}</Text>
              </View>

              <View>
                <Text style={{ fontSize: 16 }}>Trips Ends: {items.endDate}</Text>
              </View>
            </View>

          </View>

        </View>
      </View>

      <View style={{ marginVertical: 12, paddingVertical: 12, marginTop: 24, paddingHorizontal: 12, backgroundColor: "#fff" }}>

        <Text style={{ fontSize: Fonts.fontSize20, fontWeight: "500", marginBottom: 12 }}>Destinations</Text>

        <View style={{ backgroundColor: "#fff" }}>
          <View>
            <Text style={{ fontSize: Fonts.fontSize18, marginBottom: 6 }}>
              Places: {items.destination}
            </Text>
            {items?.description && <Text style={{ fontSize: Fonts.fontSize18 }}>
              description: {items.description}
            </Text>}
          </View>
        </View>
        <View style={{ position: "absolute", right: 18, bottom: 24 }}>
          <TouchableOpacity style={{
            flexDirection: "row", alignItems: "center", paddingHorizontal: 12,
            paddingVertical: 4, borderRadius: 16,
            backgroundColor: Color.primary
          }}
            onPress={() => navigation.navigate("CreateEditDestination", { data: items })}
          >
            <Ionicons name='add-circle-outline' size={24} color="white" />
            <Text style={{ marginLeft: 4, color: "white", fontWeight: "500" }}>Edit</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={{ position: "absolute", right: 18, bottom: 24 }}>
        <TouchableOpacity style={{
          flexDirection: "row", alignItems: "center", paddingHorizontal: 12,
          paddingVertical: 4, borderRadius: 16,
          backgroundColor: Color.errorRed
        }}
          onPress={deleteHandler}
        >
          <Ionicons name='add-circle-outline' size={24} color="white" />
          <Text style={{ marginLeft: 4, color: "white", fontWeight: "500" }}>Delete</Text>
        </TouchableOpacity>
      </View>

    </View>
  )
}

export default TripDetails

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 48

  },
  card: {
    backgroundColor: '#fff',
    paddingTop: 18,
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderRadius: 10,
    elevation: 2.5, 
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 5,
    shadowOffset: {
      width: 0,
      height: 3,
    },
  },
  image: {
    width: "auto",
    height: 150, 
  },
})