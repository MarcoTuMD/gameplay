import React, { useState } from "react";
import { View, FlatList, Text } from "react-native";
import { ButtonAdd } from "../../components/ButtonAdd";
import { Profile } from "../../components/Profile";
import { CategorySlect } from "../../components/CategorySelect";
import { Appointment } from "../../components/Appointment";
import { ListDivider } from "../../components/ListDivider";


import { styles } from "./style";
import { ListHeader } from "../../components/ListHeader";


export function Home() {
    const [category, setCategory] = useState('');

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


    return (
        <View>
            <View style={styles.header}>
                <Profile />
                <ButtonAdd />
            </View>
            <View>
                <CategorySlect categorySelected={category} setCategory={handleCategorySelect} />
                <View style={styles.content}>
                    <ListHeader title={'Partidas agendadas'} subtitle={'Total 6'} />
                    <FlatList data={appointments} keyExtractor={item => item.id} renderItem={({ item }) => (<Appointment data={item} />)} style={styles.matches} showsVerticalScrollIndicator={false} ItemSeparatorComponent={() => <ListDivider />} />
                </View>
            </View>
        </View>
    )
}