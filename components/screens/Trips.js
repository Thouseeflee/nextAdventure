import { Alert, FlatList, KeyboardAvoidingView, Platform, Pressable, ScrollView, StyleSheet, Text, TouchableHighlight, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import PageTitle from '../PageTitle'
import { Ionicons } from '@expo/vector-icons'
import Color from '../../constants/color'
import TripTemplate from '../TripsTemplate'
import { TripsContext } from '../../context/tripContext'
import Fonts from '../../constants/font'

const Trips = ({ navigation }) => {
  const { state, } = useContext(TripsContext)
  const [tripDatas, setTripDatas] = useState(state)
  useEffect(() => {
    setTripDatas(state)
  }, [state, tripDatas])

  console.log(!tripDatas.lenght, "tttt");

  // if (!tripDatas.length) {

   
  // }

  return (
    <View style={{ flex: 1 }}>

      <KeyboardAvoidingView style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={0}
      >
        <View style={{ paddingHorizontal: 16 }}>
          <PageTitle
            onBackPress={() => navigation.navigate('Login')}
          >Trips</PageTitle>
        </View>

        {(tripDatas.trips == 0 && <View style={{ flex: 1, justifyContent: "center", alignItems: "center", }}>
      <Text style={{ fontSize: Fonts.fontSize18 }}>
        Trips not yet added
      </Text>
    </View>)}

        <View style={{ margin: 16, marginTop: 16 }}>
          <FlatList
            data={tripDatas.trips}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => {
              return <Pressable onPress={() => navigation.navigate("TripDetails", { data: item })}>
                <TripTemplate items={item} />
              </Pressable>
            }}
          />
        </View>

        <View style={{ position: "absolute", right: 18, bottom: 24 }}>
          <TouchableOpacity style={{
            flexDirection: "row", alignItems: "center", paddingHorizontal: 12,
            paddingVertical: 4, borderRadius: 16,
            backgroundColor: Color.primary
          }}
            onPress={() => navigation.navigate("CreateEditTrip")}
          >
            <Ionicons name='add-circle-outline' size={24} color="white" />
            <Text style={{ marginLeft: 4, color: "white", fontWeight: "500" }}>New Trip</Text>
          </TouchableOpacity>
        </View>

      </KeyboardAvoidingView>
    </View>
  )
}

export default Trips

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 48,

  },
})