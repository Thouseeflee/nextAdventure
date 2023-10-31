import { ActivityIndicator, Alert, Button, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import PrimaryButton from '../PrimaryButton';
import Color from '../../constants/color'
import Fonts from '../../constants/font'
import PageTitle from '../PageTitle'
import { SelectList } from 'react-native-dropdown-select-list';
// import DatePicker from '../DatePicker'
import DatePicker from "@react-native-community/datetimepicker";
import { Ionicons } from '@expo/vector-icons';
import { TripsContext } from '../../context/tripContext';




const CreateEditTrip = ({ navigation, route }) => {
    const { addTrip, updateTrip } = useContext(TripsContext);
    const [EditDetails, setEditDetails] = useState()
    const [isLoading, setIsLoading] = useState(false);
    const [title, setTitle] = useState();
    const [date, setDate] = useState(new Date());
    const [imgUri, setImgUri] = useState("");

    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [showStartDatePicker, setShowStartDatePicker] = useState(false);
    const [showEndDatePicker, setShowEndDatePicker] = useState(false);


    useEffect(() => {
        const editData = route?.params?.item;
        editData && setEditDetails(editData)
        if (editData) {
            setTitle(editData.title)
            // setStartDate(editData.startDate)
            // setEndDate(editData.endDate)
            setImgUri(editData.imgUri)
        }
    }, [EditDetails, route?.params])

    const handleStartDateChange = (event, selectedDate) => {
        if (event.type === 'set') {
            setStartDate(selectedDate);
            setShowStartDatePicker(false);
        } else {
            setShowStartDatePicker(false);
        }
    };

    const handleEndDateChange = (event, selectedDate) => {
        if (event.type === 'set') {
            setEndDate(selectedDate);
            setShowEndDatePicker(false);
        } else {
            setShowEndDatePicker(false);
        }
    };

    const onSave = async () => {
        if(!title || !imgUri || !startDate || !endDate){
            return Alert.alert("INPUT ERROR", "Please fill all the inputs to proceed.")
        }
        
        if (EditDetails) {
            const editedTrip = {
                title: title,
                imgUri: imgUri,
                startDate: startDate.toDateString(),
                endDate: endDate.toDateString(),
            }
            const updatedTrip = await updateTrip(EditDetails.id, editedTrip)
            return navigation.navigate("Trips")
        }

        const randomId = Math.floor(Math.random() * 1000000);
        const newTrip = {
            id: randomId,
            title: title,
            imgUri: imgUri,
            startDate: startDate.toDateString(),
            endDate: endDate.toDateString(),
        };

        const res = await addTrip(newTrip)


        navigation.navigate("CreateEditDestination", { id: randomId })
    }

    // console.log(user, "user");
    const datas = [
        { key: '1', value: 'employee' },
    ]

    return (
        <View style={styles.container}>


            <PageTitle
                onBackPress={() => navigation.goBack()}
                backBtn={true}
            >{EditDetails ? "Edit Trip" : "Create Trip"}</PageTitle>
            <View style={styles.formContainer}>
                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.input}
                        placeholder="Title"
                        autoCapitalize="none"
                        onChangeText={(val) => setTitle(val)}
                        value={title}
                    // keyboardType="phone-pad"
                    />
                </View>

                <TouchableOpacity onPress={() => setShowStartDatePicker(true)} style={{ flexDirection: "row", marginTop: 20 }}>
                    <View style={{ flex: 6 }}>
                        <TextInput
                            style={styles.input}
                            // secureTextEntry={true}
                            autoCapitalize="none"
                            placeholder="Start Date"
                            // onChangeText={(val) => setLastName(val)}
                            value={startDate.toDateString()}
                        />
                    </View>
                    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                        <Ionicons name="calendar-outline" size={40} color={Color.primary} />
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setShowEndDatePicker(true)} style={{ flexDirection: "row", marginTop: 20 }}>
                    <View style={{ flex: 6 }}>
                        <TextInput
                            style={styles.input}
                            // secureTextEntry={true}
                            autoCapitalize="none"
                            placeholder="End Date"
                            // onChangeText={(val) => setLastName(val)}
                            value={endDate.toDateString()}
                        />
                    </View>
                    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                        <Ionicons name="calendar-outline" size={40} color={Color.primary} />
                    </View>
                </TouchableOpacity>

                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.input}
                        placeholder='Image Url'
                        value={imgUri}
                        onChangeText={(val) => setImgUri(val)}
                    />
                </View>
            </View>
            {showStartDatePicker && (
                <DatePicker
                    value={startDate}
                    mode="date"
                    display="calendar"
                    onChange={handleStartDateChange}
                />
            )}

            {showEndDatePicker && (
                <DatePicker
                    value={endDate}
                    mode="date"
                    display="calendar"
                    onChange={handleEndDateChange}
                />
            )}
            <View style={{ width: "90%", marginBottom: 24 }}>
                <View style={styles.buttonContainer}>
                    <PrimaryButton
                        onPress={onSave}
                    >
                        {isLoading ?
                            <ActivityIndicator size="small" color={Color.secondary} />
                            : "Continue"
                        }</PrimaryButton>
                </View>
            </View>

        </View>
    )
}

export default CreateEditTrip

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