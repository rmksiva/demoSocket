import React, { Component } from 'react';
import { Observable } from 'rxjs';
import { SafeAreaView, View, FlatList, StyleSheet, Text, StatusBar } from 'react-native';
import { DataStore, DataStoreType, User, Query } from 'kinvey-react-native-sdk';

const Item = ({ title }) => (
  <View style={styles.item}>
    <Text style={styles.title}>{title}</Text>
  </View>
);

class ProductListAsync extends Component {
  state = { items: [] };
  constructor() {
    super();

    //Dummy observable for Test
    const testObs = new Observable(subscriber => {
      subscriber.next(1);
      subscriber.next(2);
      subscriber.next(3);
      let i = 4;
      setInterval(() => {
        subscriber.next(i);
        i++;
        if (i > 15) subscriber.complete();
      }, 3000);
    });

    User.login('siva', '1234').then(res => {
      console.log("Login Suceess", res);
      const activeUser = User.getActiveUser();
      activeUser.unregisterFromLiveService().then(() => console.log("UnRegister")).catch(err => console.log("unregister error", err));
      const collection = DataStore.collection('Products', DataStoreType.Network);
      var finalRes = activeUser.registerForLiveService()
        .then(async (res) => {
          console.log("Live service is activated");
          this.getCollectionData();
          var a1 = collection.subscribe({
            onMessage: (m) => {
              console.log("on Message", m);
              this.getCollectionData();

            },
            onStatus: (s) => {
              console.log("on status", s);
            },
            onError: (e) => {
              console.log("on error", e);
            }
          })
        })
        .catch(err => {
          console.log("Live service error", err);
        });

      console.log(finalRes);

    }
      , err => console.log("err", err));

  }

  getCollectionData = () => {
    const collection = DataStore.collection('Products', DataStoreType.Network);
    const stream = collection.find();
    var data = stream
      .subscribe({

        error: err => console.log(`Oops... ${err}`),
        complete: () => {
          debugger
          console.log(`data Complete!`);
        },
        next: (event) => {
          debugger
          console.log('data', event);
          this.setState({ items: event })
          //return event;
        }
      });
  }
  render() {
    const renderItem = ({ item }) => (
      <Item key={item.id} title={item.name} />
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
  getData(state) {
    var inventory_ds = DataStore.collection('userData'),
      query = new Query(),
      stream;


    stream = inventory_ds.find(query);
    return stream.subscribe(
      function onMessage(data) {
        console.log("data retrieved 2");
        state.setState({ items: data });
      },
      function onError(error) {
        console.log(error);
      },
      function onComplete(data) {
        console.log("Data watch Completed", data);
      }
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 5,
    marginVertical: 5,
    marginHorizontal: 5,
  },
  title: {
    fontSize: 20,
  },
});

export default ProductListAsync
