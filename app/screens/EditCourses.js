import React from 'react';
import { StyleSheet, Text, View, TextInput, Switch, Button, TouchableOpacity } from 'react-native';
import SelectMultiple from 'react-native-select-multiple'
import DateTimePickerModal from "react-native-modal-datetime-picker";
import colors from '../config/colors.js';

export default function EditCourses( props ){
    const [mode, setMode] = React.useState(0);
    const [className, setClassName] = React.useState('');
    const [hour, setHour] = React.useState(-1);
    const [min, setMin] = React.useState(-1);
    const[reminderEnabled, setReminderEnabled] = React.useState(false);
    const[selectedDays, setSelections] = React.useState([]);
    const[index, setIndex] = React.useState(0);

    const [timeTitle, setTimeTitle] = React.useState('Select Time');
    const [isTimePickerVisible, setTimePickerVisibility] = React.useState(false);

    React.useEffect(()=>{
        if (props.route.params){
            setMode(1);
            setClassName(props.route.params.name);
            setReminderEnabled(props.route.params.reminder);
            setSelections(props.route.params.days);
            setHour(props.route.params.hour);
            setMin(props.route.params.min);
            setIndex(props.route.params.index);
        }
        else{
            setMode(0);
            setClassName('');
            setReminderEnabled(false);
            setSelections([]);
            setHour(-1);
            setMin(-1);
        }
    }, [props.route.params]);

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

    function handleAdd(){
        if(className !== '' && hour !== -1 && selectedDays !== [undefined]){
            const course = {
                name: className,
                reminder: reminderEnabled,
                days: selectedDays.map(({value}) => value),
                hour: hour,
                min: min,
            }
            props.navigation.navigate('CoursesScreen', course);
        }
    }

    function handleEdit(){
        if(className !== '' && hour !== 0 && selectedDays !== [undefined]){
            const course = {
                name: className,
                reminder: reminderEnabled,
                days: selectedDays.map(({value}) => value),
                hour: hour,
                min: min,
                index: index
            }
            props.navigation.navigate('CoursesScreen', course);
        }
    }

    const days =[
        'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'
    ]

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

                <Button 
                    title={timeTitle} 
                    
                    onPress={showTimePicker} 
                />
                <DateTimePickerModal
                    isVisible={isTimePickerVisible}
                    mode='time'
                    onConfirm={handleTime}
                    onCancel={hideTimePicker}
                />
            </View>

            <View style={styles.middleSection}>
                <Text style={styles.reminderText}>Add Reminder</Text>
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
            </View>
            <View style={styles.buttons}>
                {mode === 0 ? 
                    <TouchableOpacity>
                        <Text style={styles.button} onPress={handleAdd}>Add</Text>
                    </TouchableOpacity>
                    :
                    <TouchableOpacity>
                        <Text style={styles.button} onPress={handleEdit}>Edit</Text>
                    </TouchableOpacity>
                }
                <TouchableOpacity
                    onPress={() => {props.navigation.navigate('CoursesScreen')}}
                >
                    <Text style={styles.button}>Back</Text>
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
        paddingBottom: 10
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
        marginBottom: 5,
    },
    reminderText: {
        fontSize: 20,
        paddingRight: 10,
    },
    button:{
        fontWeight: 'bold',
        fontSize: 20,
        padding: 10
    },
    firstSection: {
        alignSelf: 'center',
        flex: .2
    },
    middleSection: {
        flexDirection: 'row',
        alignSelf: 'center',
        flex: .1

    },
    bottomSection: {
        flex: .8
    },
    buttons: {
        flex: .25,
        alignItems: 'center'
    }

});