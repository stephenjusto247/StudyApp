import React, { useState, useEffect, useRef } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';
import Dialog from 'react-native-dialog';
import colors from '../config/colors.js';

export default function CoursePlannerScreen( props ){
    const [dialogVisibility, setDialogVisibility] = useState(false);
    const [dialogPrompt, setDialogPrompt_] = useState('');
    const [semesterToDelete, setSemesterToDelete] = useState('');
    const [indexToDelete, setIndexToDelete] = useState(0);
    const [courseEntries, setCourseEntries_] = useState([]);
    const courseEntriesRef = useRef(courseEntries);
    const setCourseEntries = (data) => {
        courseEntriesRef.current = data;
        setCourseEntries_(data);
    };

    useEffect(()=>{
        readData();
    }, []);

    useEffect(()=>{
        if (props.route.params){
            if (props.route.params.index === undefined){
                if (courseEntries.length > 0){
                    let courseEntries_ = [...courseEntries];
                    let newEntry = true;
                    const courseEntry = {
                        semester: props.route.params.semester,
                        entries: props.route.params.entries
                    };
                    for (let i = 0; i < courseEntries_.length; i++){
                        if (courseEntries_[i].semester === courseEntry.semester){
                            courseEntries_[i].entries.push({
                                name: courseEntry.entries[0].name,
                                number: courseEntry.entries[0].number,
                                units: courseEntry.entries[0].units
                            });
                            newEntry = false;
                            break;
                        }
                    }
                    if (newEntry){
                        courseEntries_.push(courseEntry);
                        courseEntries_ = sortCourseEntries(courseEntries_);
                    }
                    setCourseEntries([...courseEntries_]);
                    storeData(courseEntriesRef.current);
                }
                else {
                    const courseEntry = {
                        semester: props.route.params.semester,
                        entries: props.route.params.entries
                    }
                    setCourseEntries([courseEntry]);
                    storeData(courseEntry);
                }
            }
            else{
                let courseEntries_ = [...courseEntries];
                const courseEntry = {
                    semester: props.route.params.semester,
                    entries: props.route.params.entries
                }
                for (let i = 0; i < courseEntries_.length; i++){
                    if (courseEntries_[i].semester === props.route.params.formerSemester){
                        courseEntries_[i].entries.splice(props.route.params.index, 1);
                        if (courseEntries_[i].entries.length <= 0) courseEntries_.splice(i, 1);
                        break;
                    }
                }
                if (courseEntries_.length > 0){
                    let notPushed = true;
                    for (let i = 0; i < courseEntries_.length; i++){
                        if (courseEntries_[i].semester === props.route.params.semester){
                            courseEntries_[i].entries.push({
                                name: courseEntry.entries[0].name,
                                number: courseEntry.entries[0].number,
                                units: courseEntry.entries[0].units
                            })
                            notPushed = false;
                            break;
                        }
                    }
                    if (notPushed){
                        courseEntries_.push(courseEntry);
                    }
                }
                else courseEntries_.push(courseEntry);
                storeData(courseEntries_);
                setCourseEntries(courseEntries_);
            }
        }
    }, [props.route.params]);

    function sortCourseEntries(courseEntries_){
        let sortedEntries = [];
        for (let i = 0; i < courseEntries_.length; i++){
            let minimumIndex = i;
            let minimum = courseEntries_[i];
            let semester = courseEntries_[i].semester.split(' ');
            let season = semester[0];
            let year = semester[1];
            for (let j = i; j < courseEntries_.length; j++){
                const semester_ = courseEntries_[j].semester.split(' ');
                const season_ = semester_[0];
                const year_ = semester_[1];
                if (year_ < year && j !== minimumIndex){
                    minimumIndex = j;
                    minimum = courseEntries_[j];
                    semester = semester_;
                    season = season_;
                    year = year_;
                }
                else if (year_ === year && j !== minimumIndex){
                    // Note: season_ is never ever equal to season if year_ === year!
                    if (season_ === 'Spring'){
                        minimumIndex = j;
                        minimum = courseEntries_[j];
                        semester = semester_;
                        season = season_;
                        year = year_;
                    }
                    else if (season_ === 'Summer' && season !== 'Spring'){
                        minimumIndex = j;
                        minimum = courseEntries_[j];
                        semester = semester_;
                        season = season_;
                        year = year_;
                    }
                }
            }
            sortedEntries.push(minimum);
            courseEntries_.splice(minimumIndex, 1);
            i = -1;
        }
        return sortedEntries;
    }

    function setDialogPrompt(name, semester){
        setDialogPrompt_('Are you sure you want to delete "' + name + '" from ' + semester + '?');
    }

    function handleDelete(){
        let courseEntries_ = [...courseEntries];
        for (let i = 0; i < courseEntries_.length; i++){
            if (courseEntries_[i].semester === semesterToDelete){
                courseEntries_[i].entries.splice(indexToDelete, 1);
                if (courseEntries_[i].entries.length <= 0) courseEntries_.splice(i, 1);
                break;
            }
        }
        setCourseEntries(courseEntries_);
        storeData(courseEntries_);
        setDialogVisibility(false);
    }

    function hideDialog(){
        setDialogVisibility(false);
    }

    async function storeData(value){
        try{
            const serializedValue = JSON.stringify(value);
            await AsyncStorage.setItem('coursePlanner', serializedValue);
        } catch(e){
            console.log(e);
        }
    }

    async function readData(){
        let data;
        try{
            data = await AsyncStorage.getItem('coursePlanner');
        } catch(e){
            console.log(e);
        }
        if (data !== null){
            try{
                data = JSON.parse(data);
                if (Array.isArray(data)) setCourseEntries([...data]);
                else setCourseEntries([data]);
            } catch(e){
                console.log(e);
            }
        }
    }

    return(
        <View style={styles.container}>
            <View style={styles.headerSection}>
                <Text style={styles.header}>Course Planner</Text>
            </View>
            <ScrollView>
                {courseEntries.map((courseEntry, index) => (
                    <View style={styles.semester} key={index}>
                        <Text style={styles.titleText}>
                            {courseEntry.semester}
                        </Text>
                        {courseEntry.entries.map((entry, index_) => {
                            return(
                            <View style={styles.courseEntry} key={index_}>
                                <View style={styles.courseEntryNumber}>
                                    <Text style={styles.text}>
                                        {entry.number}
                                    </Text>
                                </View>
                                <View style={styles.courseEntryName}>
                                    <Text style={styles.text}>
                                        {entry.name}
                                    </Text>
                                </View>
                                <View style={styles.courseEntryUnits}>
                                    <Text style={styles.text}>
                                        {entry.units}
                                    </Text>
                                </View>
                                <View style={styles.courseEntryEdit}>
                                    <TouchableOpacity onPress={()=>{
                                        const semester = courseEntry.semester.split(' ');
                                        const entryToEdit = {
                                            season: semester[0],
                                            year: semester[1],
                                            name: entry.name,
                                            number: entry.number,
                                            units: entry.units,
                                            index: index_
                                        };  
                                        props.navigation.navigate('CoursePlannerAdd', entryToEdit);
                                    }}>
                                        <Text style={styles.editText}>
                                            Edit
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                                <View style={styles.courseEntryDelete}>
                                    <TouchableOpacity onPress={() => {
                                        setDialogPrompt(entry.name, courseEntry.semester);
                                        setSemesterToDelete(courseEntry.semester);
                                        setIndexToDelete(index_);
                                        setDialogVisibility(true);
                                    }}>
                                        <Text style={styles.deleteText}>
                                            Delete
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                            )
                        })}
                    </View>
                ))}
            </ScrollView>
            <View style={styles.bottomSection}>
                <TouchableOpacity onPress={() => {
                            props.navigation.navigate('CoursePlannerAdd')
                        }}
                    >
                    <Text style={styles.addSemester} >Add</Text>
                </TouchableOpacity>
            </View>
            <Dialog.Container visible={dialogVisibility}>
                <Dialog.Title>Delete Entry</Dialog.Title>
                <Dialog.Description>{dialogPrompt}</Dialog.Description>
                <Dialog.Button label='Cancel' onPress={hideDialog}/>
                <Dialog.Button label='Delete' onPress={handleDelete}/>
            </Dialog.Container>
        </View>
    )
}

const styles = StyleSheet.create({
    add: {
        fontSize: 18,
        fontWeight: 'bold',
        alignSelf: 'flex-end',
        paddingRight: 10
    },
    addSemester: {
        fontSize: 18,
        fontWeight: 'bold',
        paddingRight: 10
    },
    bottomSection: {
        alignItems: 'flex-end'
    },  
    container: {
        flex: 1,
        backgroundColor: colors.white,
        paddingTop: '15%'
    },
    courseEntry: {
        flexDirection: 'row',
        paddingTop: 5,
        paddingBottom: 5
    }, 
    courseEntryDelete: {
        flex: .1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    courseEntryEdit: {
        flex: .1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    courseEntryName: {
        flex: .45,
        justifyContent: 'center'
    },
    courseEntryNumber: {
        flex: .25,
        justifyContent: 'center'
    },
    courseEntryUnits: {
        flex: .1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    deleteText: {
        fontWeight: 'bold',
        fontSize: 12
    },
    editText: {
        fontWeight: 'bold'
    },
    header: {
        fontWeight: 'bold',
        fontSize: 30
    },
    headerSection: {
        justifyContent: 'center',
        alignItems: 'center'
    },  
    semester: {
        flex: 1,
        backgroundColor: colors.bone
    },
    text: {
        color: 'black',
        fontSize: 16
    },
    textInput: {
        height: 45,
        width: 300,
        borderColor: colors.dimGray,
        borderWidth: 1,
        borderRadius: 10,
        paddingHorizontal: 10
    },
    titleText: {
        color: 'black',
        fontWeight: 'bold',
        fontSize: 18,
        paddingBottom: 5
    }
});