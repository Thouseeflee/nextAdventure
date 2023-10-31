import { Alert, Image, StyleSheet, Text, TextInput, TouchableOpacity, View, } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import PrimaryButton from '../PrimaryButton';
import Color from '../../constants/color';
import PageTitle from '../PageTitle';
import Fonts from '../../constants/font';
import { TripsContext } from '../../context/tripContext';

const CreateEditDestination = ({ navigation, route }) => {
    const {updateTrip} = useContext(TripsContext);
    const [isLoading, setIsLoading] = useState(false);
    const [editDestination, setEditDestination] = useState();
    const [destination, setDestination] = useState();
    const [description, setDescription] = useState();
    const id = route.params.id;

    useEffect(() => {
        const editData = route?.params?.data;
        editData && setEditDestination(editData)
        console.log(editData, "data");
        if (editData) {
            setDestination(editData.destination)
            setDescription(editData.description)
        }
    }, [editDestination, route?.params])



    const onSave = async () => {
        if(!destination){
            return Alert.alert("INPUT ERROR", "Please fill all the inputs to proceed.")
        }
        if (editDestination) {
            const editedDestination = {
                destination: destination,
                description: description
            }
            const updatedTrip = await updateTrip(editDestination.id, editedDestination)
            return navigation.navigate("Trips")
        }

        const updateDestination = {
            destination: destination,
            description: description
        }
        const res = await updateTrip(id, updateDestination)
            navigation.navigate("Trips");
}

// console.log(user, "user");

return (
    <View style={styles.container}>

        <PageTitle
            onBackPress={() => navigation.goBack()}
            backBtn={true}
        >{editDestination ? "Edit Destination" : "Add Destination"}</PageTitle>
        <View style={styles.formContainer}>
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Destinations"
                    autoCapitalize="none"
                    onChangeText={(val) => setDestination(val)}
                    value={destination}
                // keyboardType="phone-pad"
                />
            </View>
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    autoCapitalize="none"
                    placeholder="Description(Optional)"
                    onChangeText={(val) => setDescription(val)}
                    value={description}
                    multiline={true}
                    numberOfLines={8}
                    textAlignVertical='top'
                    maxLength={500}
                />
            </View>
        </View>

        <View style={{ width: "90%", marginBottom: 24 }}>
            <View style={styles.buttonContainer}>
                <PrimaryButton
                    onPress={onSave}
                >
                    {isLoading ?
                        <ActivityIndicator size="small" color={Color.secondary} />
                        : "Save"
                    }</PrimaryButton>
            </View>

        </View>

    </View>
)
}

export default CreateEditDestination

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        marginTop: 48

    },
    imageContainer: {
        width: 250,
        height: 160,
        justifyContent: "flex-end",
        marginTop: 70,
    },
    logo: {
        width: '100%',
        height: '40%'
    },
    formContainer: {
        flex: 1,
        paddingHorizontal: 16,
        width: '100%',
        marginTop: 180,

    },
    inputContainer: {
        marginTop: 20
    },
    input: {
        width: '100%',
        borderColor: Color.gray100,
        borderWidth: 1,
        borderRadius: 8,
        fontSize: Fonts?.fontSize18,
        marginTop: 7,
        marginBottom: 8,
        padding: 10
    },
    buttonContainer: {
        marginTop: 24,
    },
    forgotContainer: {
        marginTop: 8,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },
})