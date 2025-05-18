import React from 'react';
import { FlatList, StyleSheet } from 'react-native';
// import { Timer } from "./Timer";
import { Chrono } from './Chrono';

const DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'First Item',
  },
//   {
//     id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
//     title: 'Second Item',
//   },
//   {
//     id: '58694a0f-3da1-471f-bd96-145571e29d72',
//     title: 'Third Item',
//   },
//   {
//     id: '18694a0f-3da1-471f-bd96-145571e29d72',
//     title: 'Third Item',
//   },
//   {
//     id: '78695a0f-3da1-471f-bd96-145571e29d72',
//     title: 'Third Item',
//   },
//   {
//     id: '48692a0f-3da1-471f-bd96-145571e29d72',
//     title: 'Third Item',
//   },
//   {
//     id: '58694a0f-5da1-471f-bd96-145571e29d72',
//     title: 'Third Item',
//   },
];

type ItemProps = {title: string};

export const WatchesList = () => (
        <FlatList
            columnWrapperStyle={{ backgroundColor:"white" }}
          data={DATA}
          numColumns={2}
          renderItem={({item}) => <Chrono />}
          // renderItem={({item}) => <Timer />}
          keyExtractor={item => item.id}
        />
);

const styles = StyleSheet.create({
  item: {
    padding:5,
    width: "50%",
    height: 250,
    display:"flex", justifyContent:"space-between",
  },
  title: {
    fontSize: 20,
  },
});
