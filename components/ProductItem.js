import React from "react";
import { StyleSheet, View, Text } from 'react-native'
import { Divider } from 'react-native-elements'
import common from "../common";
const ProductItem = (props) => {
    const [lat1, lng1, lat2, lng2] = [props.item.lat, props.item.lng, props.currentLocation.lat, props.currentLocation.lng];

    return (<View style={styles.user}>

        <TxtItem style={styles.name}>{props.item.name}</TxtItem>
        <TxtItem style={styles.tagline}>{`City : ${props.item.name}`}</TxtItem>
        <TxtItem style={styles.tagline}>{`Price : \$ ${props.item.price} / kg`}</TxtItem>
        <TxtItem style={styles.taglineRight}>{common.getDistance(lat1, lng1, lat2, lng2)} Kms away</TxtItem>
        < Divider style={{ backgroundColor: '#c0c0c0' }} />
      
    </View>);
}

const TxtItem = (props) => {
    return <Text styles={{ padding: 15 }} {...props}>{props.children}</Text>
}
const styles = StyleSheet.create({
    user: {
        backgroundColor: '#fff',
        margin: 5
    },
    image: {
        backgroundColor: '#fff'
    },
    name: {
        fontSize: 18
    },
    tagline: {
        fontSize: 14
    },
    taglineRight: {
        position: "absolute",
        right: 5,
        top: 5,
        fontSize: 10
    },
    Text: {
        margin: 10
    }
});

export default ProductItem;