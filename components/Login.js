
import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { Input, Button } from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome';
class Login extends Component {
    constructor(props) {
        super(props);
    }
    state = {}
    onSubmit = () => {
        const user = { ...this.state };
        this.props.onLogin(user);
        console.log(user);
    }

    render() {
        return (<View>
            <Input placeholder='User name' onChangeText={value => this.setState({ username: value })}
                leftIcon={<Icon name='user' size={24} color='black' />} />
            <Input secureTextEntry={true} placeholder='Password' onChangeText={value => this.setState({ password: value })}
                leftIcon={<Icon name='lock' size={24} color='black' />} />
            <Button title="Login" onPress={this.onSubmit} />
        </View>);
    }
}

export default Login;