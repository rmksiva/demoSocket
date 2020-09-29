import { StyleSheet, View, Text, Image,Alert } from 'react-native'
import { Card, ListItem, Button, Icon, Divider } from 'react-native-elements'
import React, { useState } from "react";
import * as Location from 'expo-location';
import axios from 'axios';
import LocationAccess from './LocationAccess';
import ProductItem from './ProductItem';
import Login from './Login';
import base64 from 'react-native-base64'



// const products = [
//     {
//         "name": "Banana Chips",
//         "City": "Trivandrum",
//         "distance": 65,
//         "price": 160,
//         "lat": 8.5241,
//         "lng": 76.9366
//     },
//     {
//         "name": "Hyderabad  Biriyani",
//         "city": "Hyderabad",
//         "distance": 1350,
//         "price": 450,
//         "lat": 17.3850,
//         "lng": 78.4867
//     },
//     {
//         "name": "Ambur Biriyani",
//         "city": "Vellore",
//         "distance": 750,
//         "price": 350,
//         "lat": 12.7802,
//         "lng": 78.7177
//     },
//     {
//         "name": "Tirunelveli Halwa",
//         "city": "Tirunelveli",
//         "distance": 76,
//         "price": 190,
//         "lat": 8.7139,
//         "lng": 77.7567
//     }
// ]



const ProductList = () => {
    const [location, setLocation] = useState({ lat: 8.1833, lng: 77.4119 });
    const [user, setUser] = useState({ username: '', password: '', isSuccess: false });
    const [products, setProduct] = useState({ products: [] });

    const onLogin = (data) => {
        let text = `${data.username}:${data.password}`;
        console.log(text);
        let encoded = base64.encode(text);
        const auth = `Basic ${encoded}`;
        console.log(auth);
        let api_url = "https://baas.kinvey.com/appdata/kid_SyPhe6OBP/Products";
        axios.get(api_url, { headers: { 'Authorization': auth,    "Access-Control-Allow-Origin": "*" } }).then(res => {
            console.log(res.data);

            setUser({ username: data.username, password: data.password, isSuccess: true });
            setProduct({ products: res.data });
        }, err => 
        {
          console.log('error Data', err);
          Alert.alert('Login Failed');
        });

    }
    const onLocationUpdate = (data) => {
        if (data.errMessage.length == 0) {
            setLocation({
                lat: data.latitude,
                lng: data.longitude
            })
        }
    }

    const listView = <Card containerStyle={{ padding: 0 }} >
        <LocationAccess onLocationUpdate={onLocationUpdate}></LocationAccess>
        <Card.Divider />
        {
            products.products.map((u, i) => {
                return (
                    <ProductItem key={i} item={u} index={i} isLast={products.length > i + 1} currentLocation={location}></ProductItem>
                );
            })
        }
    </Card >

    if (user.isSuccess)
        return listView;
    return <Login onLogin={onLogin}></Login>
}


export default ProductList;  
