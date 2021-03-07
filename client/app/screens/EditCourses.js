import React from 'react';
import { StyleSheet, Text, View, TextInput, Switch, Button } from 'react-native';
import SelectMultiple from 'react-native-select-multiple'
import DateTimePickerModal from "react-native-modal-datetime-picker";
import colors from '../config/colors.js';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default function EditCourses( {navigation} ){
    const[className, setClassName] = React.useState('');
    const onChangeText = text => setClassName(text);

    const [isTimePickerVisible, setTimePickerVisibility] = React.useState(false);
    const showTimePicker = () => {
        setTimePickerVisibility(true);
    };
    const hideTimePicker = () => {
        setTimePickerVisibility(false);
    };
    const handleConfirm = (date) => {
        var hours = date.getHours();
        var min = date.getMinutes();
        console.log(hours);
        console.log(min);
        hideTimePicker();
    };

    const[reminderEnabled, setReminderEnabled] = React.useState(false);
    const toggleSwitch = () => setReminderEnabled(previousState => !previousState);

    const days =[
        'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'
    ]
    const[selectedDays, setState] = React.useState([]);
    const onSelectionsChange = (selectedDays) => setState({selectedDays});

    return(
        <View style={styles.container}>
            <View>
                <TextInput 
                    styles={styles.textInput}
                    onChangeText={onChangeText}
                    value={className}
                    keyboardAppearance='dark'
                    placeholder='Class Name'
                    required
                />
            </View>
            <View>
                <Button title='Select Time' onPress={showTimePicker} />
                <DateTimePickerModal
                    isVisible={isTimePickerVisible}
                    mode='time'
                    onConfirm={handleConfirm}
                    onCancel={hideTimePicker}
                />
            </View>

            <View>
                <Text>Add Reminder</Text>
                <Switch
                    onValueChange={toggleSwitch}
                    value={reminderEnabled}
                />
            </View>

            <View>
                <SelectMultiple
                    items={days}
                    selectedItems={selectedDays}
                    onSelectionsChange={setState}
                    value={selectedDays}
                />
            </View>

            <View>
                <TouchableOpacity
                    styles={styles.submitButton}
                    onPress={() => {
                        navigation.navigate('CoursesScreen')
                    }}
                >
                    <Text>Submit</Text>
                </TouchableOpacity>
            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.white,
        flex: 1
    },
    textInput: {
        height: 100,
        width: 300,
        borderColor: 'red',
        borderWidth: 100,
        borderRadius: 10,
        paddingHorizontal: 10
    },
});