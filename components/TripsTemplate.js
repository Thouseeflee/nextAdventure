import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons'

const TripTemplate = ({ items }) => {
  console.log(items, "items");
  return (
    <View style={styles.card}>

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
  )
}

export default TripTemplate

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    marginTop: 18,
    
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderRadius: 10,
    elevation: 2.5, // Adjust the elevation value for the shadow effect
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 5,
    shadowOffset: {
      width: 0,
      height: 3,
    },
  },
  image: {
    width: "auto", // Set the width of the image
    height: 150, // Set the height of the image
  },
})

