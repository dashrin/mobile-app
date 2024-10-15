import React, { useCallback, useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import NavigationBar from '../Navigation/NavigationBar';
import { getData } from '../../storageUtility';
import axios from 'axios';
import { ip } from '../../../ContentExport';
import { useFocusEffect } from '@react-navigation/native';
import styles from './UpcomingCSS';
import { getSpecialtyDisplayName } from '../../../utils/specialtyMap';
import { Header2 } from '../../Headers/Headers';
import { SceneMap, TabBar, TabView } from 'react-native-tab-view';
import AppointmentDetails from '../AppointmentDetails/AppointmentDetails';
import CancelAppointmentModal from '../AppointmentDetails/CancelAppointmentModal';
import Modal from 'react-native-modal';  // Use react-native-modal
import { StyleSheet } from 'react-native';

const filterAppointments = (appointments, status) => {
    
    if (!Array.isArray(appointments)) return [];
    return appointments.filter(appointment => appointment?.status === status);
};

const AppointmentList = ({ appointments, status, setSelectedAppointment }) => {
    const filteredAppointments = filterAppointments(appointments, status);

    return (
        <ScrollView style={styles.scrollContainer}>
            <View style={styles.cont}>
                {filteredAppointments.length > 0 ? (
                    filteredAppointments.map((appointment) => (
                        <TouchableOpacity 
                            style={styles.cardcont}
                            key={appointment._id}
                            onPress={() => setSelectedAppointment(appointment)}  // Open modal instead of navigating
                        >
                            <View style={styles.container1}>
                                <View style={styles.datecontainer}>
                                    <Text style={styles.monthText}>{new Date(appointment.date).toLocaleString('en-US', { month: 'short' })}</Text>
                                    <Text style={styles.dateText}>{new Date(appointment.date).toLocaleString('en-US', { day: '2-digit' })}</Text>
                                </View>
                                <View style={{ borderRightColor: 'black', borderRightWidth: StyleSheet.hairlineWidth, height: '100%', marginHorizontal: 10 }}></View>
                                <View style={styles.infoCont}>
                                    <Text style={styles.doctorName}>
                                        Dr. {appointment.doctor.dr_firstName} {appointment.doctor.dr_lastName}
                                    </Text>
                                    <Text style={styles.dateTime}>
                                        {new Date(appointment.date).toLocaleDateString('en-US')} | {appointment.time}
                                    </Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                    ))
                ) : (
                    <Text style={styles.noAppointments}>No appointments available.</Text>
                )}
            </View>
        </ScrollView>
    );
};

const Upcoming = () => {
    const [allAppointments, setAllAppointments] = useState([]);
    const [userId, setUserId] = useState("");
    const [index, setIndex] = useState(0);
    const [selectedAppointment, setSelectedAppointment] = useState(null);  // To store selected appointment for modal
    const [modalVisible, setModalVisible] = useState(false);  // Control modal visibility

    const fetchAppointments = useCallback(async () => {
        try {
            const id = await getData('userId');
            if (id) {
                setUserId(id);
                const response = await axios.get(`${ip.address}/api/patient/api/onepatient/${id}`);
                console.log(response.data.thePatient.patient_appointments)
                setAllAppointments(response.data.thePatient.patient_appointments);
            } else {
                console.log('User not found');
            }
        } catch (err) {
            console.log(err);
        }
    }, []);

    useFocusEffect(
        useCallback(() => {
            fetchAppointments();
        }, [fetchAppointments])
    );

    useEffect(() => {
        if (selectedAppointment) {
            setModalVisible(true);  // Open modal when an appointment is selected
        }
    }, [selectedAppointment]);

    const handleModalClose = () => {
        setModalVisible(false);
        fetchAppointments();  // Refresh appointments when modal closes
    };

    const renderScene = SceneMap({
        first: () => <AppointmentList appointments={allAppointments} status="Pending" setSelectedAppointment={setSelectedAppointment} />,
        second: () => <AppointmentList appointments={allAppointments} status="Scheduled" setSelectedAppointment={setSelectedAppointment} />,
        third: () => <AppointmentList appointments={allAppointments} status="Cancelled" setSelectedAppointment={setSelectedAppointment} />,
        fourth: () => <AppointmentList appointments={allAppointments} status="Completed" setSelectedAppointment={setSelectedAppointment} />,
    });

    return (
        <>
            <View style={styles.mainContainer}>
                {/* <Header2 title={"Your Appointments"} /> */}
                <TabView
                    navigationState={{ index, routes: [
                        { key: 'first', title: 'Pending' },
                        { key: 'second', title: 'Scheduled' },
                        { key: 'third', title: 'Cancelled' },
                        { key: 'fourth', title: 'Completed' }
                    ] }}
                    renderScene={renderScene}
                    onIndexChange={setIndex}
                    initialLayout={{ width: Dimensions.get('window').width }}
                    renderTabBar={props => (
                        <TabBar
                            {...props}
                            indicatorStyle={styles.indicator}
                            style={styles.tabBar}
                            labelStyle={styles.tabLabel}
                            scrollEnabled={true}
                        />
                    )}
                />
                <AppointmentDetails
                    isVisible={modalVisible}
                    appointmentData={selectedAppointment}
                    closeModal={handleModalClose}
                />
            </View>
        </>
    );
};

export default Upcoming;
