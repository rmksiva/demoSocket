import React, {Component} from 'react';
import { SafeAreaView, View, FlatList, StyleSheet, Text, StatusBar } from 'react-native';
import { DataStore, DataStoreType, User } from 'kinvey-react-native-sdk';

const DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'First Item',
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'Second Item',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'Third Item',
  },
];

const Item = ({ title }) => (
  <View style={styles.item}>
    <Text style={styles.title}>{title}</Text>
  </View>
);

class ProductListAsync extends Component  
{
    state = { items: [] };
    render()
    {
        const renderItem = ({ item }) => (
            <Item title={item.name} />
          );
        
          return (
            <SafeAreaView style={styles.container}>
              <FlatList
                data={this.state.items}
                renderItem={renderItem}
                keyExtractor={item => item.id}
              />
            </SafeAreaView>
          );
    } 

   async componentDidMount()
    {
    await User.login('siva', '1234').then(res=> console.log("Login Suceess",res), err => console.log("err",err) );
    const collection = DataStore.collection('Inventory', DataStoreType.Network);
    const items = await collection.find().toPromise();
    console.log("Items",items);
    this.setState({ items });
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      marginTop: StatusBar.currentHeight || 0,
    },
    item: {
      backgroundColor: '#f9c2ff',
      padding: 20,
      marginVertical: 8,
      marginHorizontal: 16,
    },
    title: {
      fontSize: 32,
    },
  });

  export default ProductListAsync