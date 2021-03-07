import React from 'react';
import { Alert, StyleSheet, Text, View, ScrollView, TouchableOpacity, Switch } from 'react-native';
import colors from '../config/colors';
import Icon from 'react-native-vector-icons/FontAwesome'

export default function CoursesScreen( props ){
    const [courses, setCourses] = React.useState([]);
    const[reminderEnabled, setReminder] = React.useState(false);
    const [indexToDelete, setIndexToDelete] = React.useState(0);
    const [indexToChangeRemind, setIndexToChangeRemind] = React.useState(false);

    React.useEffect(()=>{
        if (props.route.params){
            if(props.route.params.index === undefined){
                let courses_ = [...courses];
                const newEntry = {
                    name: props.route.params.name,
                    reminder: props.route.params.reminder,
                    days: props.route.params.days,
                    hour: props.route.params.hour,
                    min: props.route.params.min,
                };
                courses_.push(newEntry);
                setCourses([...courses_]);
            }
            else{
                let courses_ = [...courses];
                const newEntry = {
                    name: props.route.params.name,
                    reminder: props.route.params.reminder,
                    days: props.route.params.days,
                    hour: props.route.params.hour,
                    min: props.route.params.min,
                };
                courses_.splice(props.route.index, 1, newEntry);
                setCourses([...courses_]);
            }
        }
    }, [props.route.params]);

    function alarm(){
        if(reminderEnabled === true){

        }
    }

    function changeRemind(){
        let courses_ = [...courses];
        let courseCopy = courses_[indexToChangeRemind];
        let prevState = courseCopy.reminder;
        courseCopy.reminder = !prevState;
        console.log(courseCopy);
        courses_.splice(indexToChangeRemind, 1, courseCopy);
        setCourses(courses_);
    }

    function deleteCourseWarning(){
        Alert.alert(
            "Are you sure you want to delete?",
            "",
            [
                {
                    text: "Cancel",
                    onPress: () => console.log("Cancel"),
                    style: 'cancel'
                },
                {
                    text: "Yes",
                    onPress: () => deleteCourse(),
                }
            ],
            { cancelable: true }
        )
    }

    function deleteCourse(){
        let courses_ = [...courses];
        courses_.splice(indexToDelete, 1);
        setCourses(courses_);
    }

    return(
        <ScrollView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>
                    Class Schedule
                </Text>
                <TouchableOpacity onPress={() => {
                    props.navigation.navigate('EditCourses')
                    }}
                >
                    <Text style={styles.add}>Add Class</Text>
                </TouchableOpacity>   
            </View>
            <View style={styles.courseList}>
                {courses.map((entry, index_) =>(
                    <View style={styles.courses} key={index_}>
                        <View style={styles.courseReminder}>
                            <Switch 
                                onValueChange={() => {
                                    setIndexToChangeRemind(index_);
                                    changeRemind();
                                }}
                                value={entry.reminder} 
                            />
                        </View>
                        <View style={styles.courseName}>
                            <Text>
                                {entry.name}
                            </Text>
                        </View>
                        <View style={styles.courseDays}>
                            <Text>
                                {entry.days.map((entry, index)=>(
                                    <View style={styles.days} key={index}>
                                        <Text>
                                            {entry}
                                        </Text>
                                    </View>
                                ))}
                            </Text>
                        </View>
                        <View style={styles.courseTime}>
                            <Text>
                                {entry.hour}:{entry.min}
                            </Text>   
                        </View>
                        <View style={styles.buttons}>
                            <TouchableOpacity onPress={()=>{
                                const entryToEdit = {
                                    name: entry.name,
                                    reminder: entry.reminder,
                                    days: entry.days,
                                    hour: entry.hour,
                                    min: entry.min,
                                    index: index_
                                };  
                                    props.navigation.navigate('EditCourses', entryToEdit);
                                }}>
                                <Text style={styles.editText}>
                                    Edit
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity>
                            <Icon
                            name='remove' 
                            onPress={() => {
                                setIndexToDelete(index_);
                                deleteCourseWarning();
                            }}
                            size={25} 
                            color='firebrick'
                            />
                            </TouchableOpacity>
                        </View>
                    </View>
                ))}        
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.paleSilver,
        paddingTop: '15%',
    },
    header: {
        flex: .25,
        paddingBottom: 15,
        alignSelf: 'center',
    },
    title: {
        color: 'black',
        fontWeight: 'bold',
        fontSize: 30,
        paddingBottom: 5
    },
    add: {
        fontSize: 18,
        alignSelf: 'center',
    },
    courseList: {
        flex: 1,
        backgroundColor: colors.bone,
    },
    courses: {
        flexDirection: 'row',
        paddingTop: 15,
        paddingBottom: 15,
        borderColor: colors.paleSilver,
        borderWidth: 1
    },
    courseReminder: {
        flex: .25,
        justifyContent: 'center',
        paddingLeft: 5,
    },
    courseName: {
        flex: .25,
        justifyContent: 'center',
    },
    courseDays: {
        flex: .26,
        justifyContent: 'center',  
        alignItems: 'flex-start'
    },
    days: {
        flexDirection: 'row'
    },
    courseTime: {
        flex: .25,
        justifyContent: 'center',
    },
    buttons: {
        paddingRight: 25
    },
    editText: {
        fontWeight: 'bold'
    },
});