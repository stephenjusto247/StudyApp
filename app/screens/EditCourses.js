import React from 'react';
import { StyleSheet, Text, View, TextInput, Switch, Button, TouchableOpacity } from 'react-native';
import SelectMultiple from 'react-native-select-multiple'
import DateTimePickerModal from "react-native-modal-datetime-picker";
import colors from '../config/colors.js';

export default function EditCourses( props ){
    const [className, setClassName] = React.useState('');
    const [hour, setHour] = React.useState();
    const [min, setMin] = React.useState();
    const[reminderEnabled, setReminderEnabled] = React.useState(false);
    const[selectedDays, setSelections] = React.useState([]);
    const [timeTitle, setTimeTitle] = React.useState('Select Time');

    const [isTimePickerVisible, setTimePickerVisibility] = React.useState(false);
    const showTimePicker = () => {
        setTimePickerVisibility(true);
    };
    const hideTimePicker = () => {
        setTimePickerVisibility(false);
    };
    const handleTime = (date) => {
        let hour = date.getHours();
        let min = date.getMinutes();
        setHour(hour);
        setMin(min);
        setTimeTitle(date.getHours().toString() + ':' + date.getMinutes().toString());
        hideTimePicker();
    };

    const days =[
        'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'
    ]

    function handleSubmit(){
        const course ={
            name: className,
            reminder: reminderEnabled,
            days: selectedDays.map(({value}) => value),
            hour: hour,
            min: min,
        }
        props.navigation.navigate('CoursesScreen', course);
    }

    return(
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>
                    Class Schedule
                </Text>
            </View>
            <View style={styles.firstSection}>
                <TextInput 
                    style={styles.textInput}
                    onChangeText={text => setClassName(text)}
                    value={className}
                    keyboardAppearance='dark'
                    placeholder='Class Name'
                    required
                />

                <Button title={timeTitle} onPress={showTimePicker} />
                <DateTimePickerModal
                    isVisible={isTimePickerVisible}
                    mode='time'
                    onConfirm={handleTime}
                    onCancel={hideTimePicker}
                />
            </View>

            <View style={styles.middleSection}>
                <Text>Add Reminder</Text>
                <Switch
                    onValueChange={() => setReminderEnabled(previousState => !previousState)}
                    value={reminderEnabled}
                />
            </View>

            <View style={styles.bottomSection}>
                <SelectMultiple
                    items={days}
                    selectedItems={selectedDays}
                    onSelectionsChange={selectedItems => setSelections(selectedItems)}
                />
                <TouchableOpacity
                    onPress={() => {props.navigation.navigate('CoursesScreen')}}
                >
                    <Text>Back</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={handleSubmit}
                >
                    <Text>Submit</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.paleSilver,
        paddingTop: '15%'
    },
    header: {
        alignSelf: 'center',
    },
    title: {
        color: 'black',
        fontWeight: 'bold',
        fontSize: 30,
        paddingBottom: 5
    },
    textInput: {
        height: 45,
        width: 300,
        borderColor: colors.dimGray,
        borderWidth: 1,
        borderRadius: 10,
        paddingHorizontal: 10,
    },
    firstSection: {
        justifyContent: 'center',
    },
    middleSection: {
    },
    bottomSection: {
    }

});