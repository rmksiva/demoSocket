import React , {Component} from "react";
import { Header } from "react-native-elements";
import { StyleSheet, View, Text } from 'react-native'
class AppHeader extends Component {
    state = {  }
    render() { 
        return ( <Header
            placement="left"
            leftComponent={{ icon: 'menu', color: '#fff' }}
            centerComponent={<TitleComponent/>}
            rightComponent={{ icon: 'home', color: '#fff' }}
          /> );
    }
}

const TitleComponent = (props)=>{
  return (<Text style={styles.title}>United Mobile App</Text>)
} 

const styles = StyleSheet.create({
    title: {
        color: '#fff',
       fontSize : 18
    }
});
 
export default AppHeader;