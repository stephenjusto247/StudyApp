import React from 'react';
import { Alert, StyleSheet, Text, View, Button, ScrollView, TouchableOpacity } from 'react-native';
import colors from '../config/colors.js';

export default function CoursePlannerScreen( props ){
    const [courseEntries, setCourseEntries] = React.useState([]);

    React.useEffect(()=>{
        if (props.route.params){
            let courseEntries_ = [...courseEntries];
            const newEntry = {
                name: props.route.params.name,
                number: props.route.params.number,
                units: props.route.params.units
            };
            courseEntries_.push(newEntry);
            setCourseEntries([...courseEntries_]);
        }
    }, [props.route.params]);

    return(
        <ScrollView style={styles.container}>
            <View style={styles.semester}>
                <Text style={styles.titleText}>
                    Fall 2021
                </Text>
                {courseEntries.map((entry, index) => (
                    <TouchableOpacity style={styles.courseEntry} key={index}>
                        <View style={styles.courseEntryNumber}>
                            <Text style={styles.text}>
                                {entry.name}
                            </Text>
                        </View>
                        <View style={styles.courseEntryName}>
                            <Text style={styles.text}>
                                {entry.number}
                            </Text>
                        </View>
                        <View style={styles.courseEntryUnits}>
                            <Text style={styles.text}>
                                {entry.units}
                            </Text>
                        </View>
                    </TouchableOpacity>
                ))}
                <TouchableOpacity onPress={() => {
                        props.navigation.navigate('CoursePlannerAdd')
                    }}
                >
                    <Text style={styles.add}>Add</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    add: {
        fontSize: 18,
        fontWeight: 'bold',
        alignSelf: 'flex-end',
        paddingRight: 10
    },
    container: {
        flex: 1,
        backgroundColor: colors.paleSilver,
        paddingTop: '15%'
    },
    courseEntry: {
        flexDirection: 'row',
        paddingTop: 5,
        paddingBottom: 5
    }, 
    courseEntryName: {
        flex: .5,
        justifyContent: 'center'
    },
    courseEntryNumber: {
        flex: .25,
        justifyContent: 'center'
    },
    courseEntryUnits: {
        flex: .25,
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
    titleText: {
        color: 'black',
        fontWeight: 'bold',
        fontSize: 18,
        paddingBottom: 5
    }
});