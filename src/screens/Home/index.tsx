import React, { useState } from "react";
import { View, FlatList, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";


import { ButtonAdd } from "../../components/ButtonAdd";
import { Profile } from "../../components/Profile";
import { CategorySlect } from "../../components/CategorySelect";
import { Appointment } from "../../components/Appointment";
import { ListDivider } from "../../components/ListDivider";
import { Background } from "../../components/Background";
import { ListHeader } from "../../components/ListHeader";

import { styles } from "./style";

export function Home() {
    const [category, setCategory] = useState('');
    const navegation = useNavigation();

    const appointments = [
        {
            id: '1',
            guild: {
                id: '1',
                name: 'Lendários',
                icon: null,
                owner: true,
            },
            category: '1',
            date: '22/06 às 20:40',
            description: 'É hoje que vamos chegar ao chanlleger sem perder uma partida da m10'
        },

        {
            id: '2',
            guild: {
                id: '1',
                name: 'Lendários',
                icon: null,
                owner: true,
            },
            category: '1',
            date: '22/06 às 20:40',
            description: 'É hoje que vamos chegar ao chanlleger sem perder uma partida da m10'
        }
    ]

    function handleCategorySelect(categoryId: string) {
        categoryId === category ? setCategory('') : setCategory(categoryId);
    }

    function handleAppointmentDetails() {
        navegation.navigate('AppointmentDetails');
    }

    function handleAppointmentCreate() {
        navegation.navigate('AppointmentCreate');
    }

    return (
        <Background>
            <View style={styles.header}>
                <Profile />
                <ButtonAdd onPress={handleAppointmentCreate} />
            </View>
            <View>
                <CategorySlect categorySelected={category} setCategory={handleCategorySelect} />
                <View style={styles.content}>
                    <ListHeader title={'Partidas agendadas'} subtitle={'Total 6'} />
                    <FlatList
                        data={appointments}
                        keyExtractor={item => item.id}
                        renderItem={({ item }) => (<Appointment data={item} onPress={handleAppointmentDetails} />)}
                        style={styles.matches}
                        showsVerticalScrollIndicator={false}
                        ItemSeparatorComponent={() => <ListDivider />}
                    />
                </View>
            </View>
        </Background>
    )
}