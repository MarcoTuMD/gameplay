import React, { useState, useCallback } from "react";
import { View, FlatList, Text } from "react-native";
import { useNavigation, useFocusEffect } from "@react-navigation/native";


import { ButtonAdd } from "../../components/ButtonAdd";
import { Profile } from "../../components/Profile";
import { CategorySlect } from "../../components/CategorySelect";
import { Appointment, AppointmentProps } from "../../components/Appointment";
import { ListDivider } from "../../components/ListDivider";
import { Background } from "../../components/Background";
import { ListHeader } from "../../components/ListHeader";
import { Load } from "../../components/Load";

import { styles } from "./style";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { COLLECTION_APPOINTMENTS } from "../../configs/database";

export function Home() {
    const [category, setCategory] = useState('');
    const navegation = useNavigation();
    const [loading, setLoading] = useState(true);
    const [appointments, setAppointments] = useState<AppointmentProps[]>([]);

    function handleCategorySelect(categoryId: string) {
        categoryId === category ? setCategory('') : setCategory(categoryId);
    }

    function handleAppointmentDetails(guildSelected: AppointmentProps) {
        navegation.navigate('AppointmentDetails', { guildSelected });
    }

    function handleAppointmentCreate() {
        navegation.navigate('AppointmentCreate');
    }

    async function loadAppointments() {
        const response = await AsyncStorage.getItem(COLLECTION_APPOINTMENTS);
        const storage: AppointmentProps[] = response ? JSON.parse(response) : [];

        if (category) {
            setAppointments(storage.filter(item => item.category === category))
        } else {
            setAppointments(storage);
        }
        setLoading(false);
    }

    useFocusEffect(useCallback(() => {
        loadAppointments();
    }, [category]))

    return (
        <Background>
            <View style={styles.header}>
                <Profile />
                <ButtonAdd onPress={handleAppointmentCreate} />
            </View>
            <CategorySlect categorySelected={category} setCategory={handleCategorySelect} />
            {
                loading ? <Load /> :
                    <>
                        <ListHeader title={'Partidas agendadas'} subtitle={`Total ${appointments.length}`} />
                        <FlatList
                            data={appointments}
                            keyExtractor={item => item.id}
                            renderItem={({ item }) => (<Appointment data={item} onPress={() => handleAppointmentDetails(item)} />)}
                            contentContainerStyle={{ paddingBottom: 69 }}
                            style={styles.matches}
                            showsVerticalScrollIndicator={false}
                            ItemSeparatorComponent={() => <ListDivider />}
                        />
                    </>
            }
        </Background>
    )
}