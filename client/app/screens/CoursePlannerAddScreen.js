import React from 'react';
import { StyleSheet, Keyboard, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import colors from '../config/colors.js';

export default function CoursePlannerAddScreen(props){
    // 0 = adding new entry, 1 = editing existing entry
    const [mode, setMode] = React.useState(0);
    const [courseSeason, setCourseSeason] = React.useState('Fall');
    const [courseYear, setCourseYear] = React.useState('2021');
    const [courseNumberInput, setCourseNumberInput] = React.useState('');
    const [courseNameInput, setCourseNameInput] = React.useState('');
    const [courseUnitsInput, setCourseUnitsInput] = React.useState('');
    const [formerSemester, setFormerSemester] = React.useState('');
    const [index, setIndex] = React.useState(0);

    React.useEffect(() => {
        if (props.route.params){
            setMode(1);
            setCourseSeason(props.route.params.season);
            setCourseYear(props.route.params.year);
            setCourseNumberInput(props.route.params.number);
            setCourseNameInput(props.route.params.name);
            setCourseUnitsInput(props.route.params.units);
            setFormerSemester(props.route.params.season + ' ' + props.route.params.year);
            setIndex(props.route.params.index);
        }
        else{
            setMode(0);
            setCourseSeason('Fall');
            setCourseYear('2021');
            setCourseNumberInput('');
            setCourseNameInput('');
            setCourseUnitsInput('');
        }
    }, [props.route.params])

    function handleAdd(){
        if (courseNumberInput !== '' && courseNameInput !== '' && courseUnitsInput !== ''){
            const courseEntry = {
                semester: courseSeason + ' ' + courseYear,
                entries: [{
                    name: courseNameInput,
                    number: courseNumberInput,
                    units: courseUnitsInput
                }]
            }
            props.navigation.navigate('CoursePlanner', courseEntry);
        }
    }

    function handleEdit(){
        if (courseNumberInput !== '' && courseNameInput !== '' && courseUnitsInput !== ''){
            const courseEntry = {
                semester: courseSeason + ' ' + courseYear,
                entries: [{
                    name: courseNameInput,
                    number: courseNumberInput,
                    units: courseUnitsInput
                }],
                index: index,
                formerSemester: formerSemester
            }
            props.navigation.navigate('CoursePlanner', courseEntry);
        }
    }

    return(
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <View style={styles.container}>
                <View style={styles.headerSection}>
                    <Text style={styles.header}>Course Planner</Text>
                </View>
                <View style={styles.mainSection}>
                    <TextInput 
                        style={styles.textInput}
                        onChangeText={text => setCourseNameInput(text)}
                        value={courseNameInput}
                        autoCorrect={false}
                        keyboardAppearance='dark'
                        placeholder='Course name'
                    />
                    <TextInput 
                        style={styles.textInput}
                        onChangeText={text => setCourseNumberInput(text)}
                        value={courseNumberInput}
                        autoCorrect={false}
                        keyboardAppearance='dark'
                        placeholder='Course number'
                    />
                    <TextInput 
                        style={styles.textInput}
                        onChangeText={text => setCourseUnitsInput(text)}
                        value={courseUnitsInput}
                        autoCorrect={false}
                        keyboardAppearance='dark'
                        keyboardType='numeric'
                        placeholder='Units'
                    />
                    <View style={styles.dropdowns}>
                        <DropDownPicker 
                            items={[
                                {label: 'Fall', value: 'Fall'}, 
                                {label: 'Spring', value: 'Spring'},
                                {label: 'Summer', value: 'Summer'}]
                            }
                            defaultValue='Fall'
                            containerStyle={styles.dropdown}
                            style={{backgroundColor: 'fafafa'}}
                            onChangeItem={item => setCourseSeason(item.value)}
                        />
                        <DropDownPicker 
                            items={[
                                {label: '2014', value: '2014'},
                                {label: '2015', value: '2015'},
                                {label: '2016', value: '2016'},
                                {label: '2017', value: '2017'},
                                {label: '2018', value: '2018'},
                                {label: '2019', value: '2019'},
                                {label: '2020', value: '2020'},
                                {label: '2021', value: '2021'},
                                {label: '2022', value: '2022'},
                                {label: '2023', value: '2023'},
                                {label: '2024', value: '2024'},
                                {label: '2025', value: '2025'},
                                {label: '2026', value: '2026'},
                                {label: '2027', value: '2027'},
                                {label: '2028', value: '2028'},
                                {label: '2029', value: '2029'},
                                {label: '2030', value: '2030'}
                            ]}
                            defaultValue='2021'
                            containerStyle={styles.dropdown}
                            style={{backgroundColor: 'fafafa'}}
                            onChangeItem={item => setCourseYear(item.value)}
                        />
                    </View>
                </View>
                <View style={styles.buttons}>
                    <TouchableOpacity>
                        <Text style={styles.button} onPress={()=>{props.navigation.navigate('CoursePlanner')}}>Cancel</Text>
                    </TouchableOpacity>
                    {mode === 0 ? 
                    <TouchableOpacity>
                        <Text style={styles.button} onPress={handleAdd}>Add</Text>
                    </TouchableOpacity>
                    :
                    <TouchableOpacity>
                        <Text style={styles.button} onPress={handleEdit}>Edit</Text>
                    </TouchableOpacity>
                    }
                </View>
            </View>
        </TouchableWithoutFeedback>
    )
}

const styles = StyleSheet.create({
    button: {
        fontWeight: 'bold',
        fontSize: 16
    },  
    buttons: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        justifyContent: 'space-evenly',
        paddingBottom: 50
    },
    container: {
      flex: 1,
      backgroundColor: colors.white,
      paddingTop: '15%'
    },
    dropdown: {
        height: 45,
        width: 150
    },
    dropdowns: {
        flexDirection: 'row'
    }, 
    header: {
        fontWeight: 'bold',
        fontSize: 30
    },
    headerSection: {
        flex: .3333,
        justifyContent: 'center',
        alignItems: 'center'
    },
    textInput: {
        height: 45,
        width: 300,
        borderColor: colors.dimGray,
        borderWidth: 1,
        borderRadius: 10,
        paddingHorizontal: 10
    },
    mainSection: {
        flex: .6666,
        alignItems: 'center'
    }
});