import React from 'react';
import { Alert, StyleSheet, Text, View, ScrollView, TouchableOpacity, Switch } from 'react-native';
import colors from '../config/colors';
import Icon from 'react-native-vector-icons/FontAwesome'

export default function CoursesScreen( props ){
    const [courses, setCourses] = React.useState([]);
    const[reminderEnabled, setReminder] = React.useState(false);

    React.useEffect(()=>{
        console.log(props.route.params);
        if (props.route.params){
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
    }, [props.route.params]);

    function alarm(){
        if(reminderEnabled === true){

        }
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
                {courses.map((entry, index) =>(
                    <View style={styles.courses} key={index}>
                        <View style={styles.courseReminder}>
                            <Switch 
                                onValueChange={() => setReminder(entry.reminder)}
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
                                {entry.days}
                            </Text>
                        </View>
                        <View style={styles.courseTime}>
                            <Text>
                                {entry.hour}:{entry.min}
                            </Text>   
                        </View>
                        <View>
                        <TouchableOpacity>
                            <Icon
                            name='remove' 
                            onPress={deleteCourseWarning}
                            size={20} 
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
    },
    courseName: {
        flex: .75,
        justifyContent: 'center',
    },
    courseDays: {
        flex: .25,
        flexWrap:'wrap',
        justifyContent: 'center',  
        alignItems: 'flex-start'

    },
    courseTime: {
        flex: .25,
        flexWrap:'wrap',

        justifyContent: 'center',
        alignItems: 'flex-start'
    },
});