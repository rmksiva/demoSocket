import React, { Component } from 'react';
import { Observable } from 'rxjs';
import { SafeAreaView, View, FlatList, StyleSheet, Text, StatusBar } from 'react-native';
import { DataStore, DataStoreType, User, Query, DataStoreService } from 'kinvey-react-native-sdk';

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
    const collection = DataStore.collection('Products', DataStoreType.Network);
    const stream = collection.find()
    User.login('siva', '1234').then(res => {
      console.log("Login Suceess", res);
      const activeUser = User.getActiveUser();
      activeUser.unregisterFromLiveService().then(() => console.log("UnRegister")).catch(err => console.log("unregister error", err));
      activeUser.registerForLiveService()
        .then(async (res) => {
          console.log("Live service is activated");

          //stream.unsubscribe(data => console.log("stream unsubscribed", data));
          // var resData = await collection.subscribe({
          //   "onMessage": (data) => {
          //     console.log("data retrieved", data);
          //     this.setState({ items: data });
          //   },
          //   "onStatus": (data) => {
          //     console.log("On Status ", data)
          //   },
          //   "onError": (error) => {
          //     console.log("On Error ", error);
          //   }
          // });
          // console.log("await data", resData);
          // return resData;
          // stream.subscribe(
          //   (data) => console.log("collection sub", data)
          // )
          console.log(stream);

          //Dummy observable for Test
          var dummydata = testObs.subscribe({
            next: event => {
              console.log('data', event);
              return event;
            },
            error: err => console.log(`Oops... ${err}`),
            complete: () => console.log('Test Complete!')
          });
          console.log(dummydata);

          var data = stream
            .subscribe({
              next: event => {
                console.log('data', event);
                this.setState({ items: event })
                return event;
              },
              error: err => console.log(`Oops... ${err}`),
              complete: () => console.log(`data Complete!`)
            });
          //data.next(data => console.log("on Event", data));
          console.log(data);
          //return data;



          //.catch(err => console.log("subscribe error ", err));
          //return this.getData(this);
        })
        .catch(err => {
          console.log("Live service error", err);
        });

    }
      , err => console.log("err", err));

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

  async componentDidMount() {



    //console.log(resFinal);
    //this.getData(this);

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
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
});

export default ProductListAsync
