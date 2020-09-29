import React, { Component } from 'react';
import { Card } from 'react-native-elements'
import * as Location from 'expo-location';
import axios from 'axios';

class LocationAccess extends Component {
    state = {}

    async componentDidMount() {
        let { status } = await Location.requestPermissionsAsync();
        if (status !== 'granted') {
            this.setState({ errMessage: 'Nagercoil (Default)' })
        }
        else {
            let location = await Location.getCurrentPositionAsync({});
            let loc_str = [location.coords.latitude, location.coords.longitude].join("+");
            let api_key = "e72cbe87307e4a5887155e8b544e4ea8";
            let api_url = `https://api.opencagedata.com/geocode/v1/json?q=${loc_str}&key=${api_key}`;

            let res = await axios.get(api_url).then(res => {
                let resData = res.data.results[0];
                let location_updated = {
                    latitude: resData.geometry.lat,
                    longitude: resData.geometry.lng,
                    displayName: [resData.components.city, resData.components.country].join(","),
                    ...resData.components

                };
                this.setState({ ...location_updated })
            });
        }

    }
    render() {

        return (<Card.Title>{
            this.state.errMessage?.length > 0 ? this.state.errMessage : this.state.displayName} </Card.Title>);

    }
}

export default LocationAccess;