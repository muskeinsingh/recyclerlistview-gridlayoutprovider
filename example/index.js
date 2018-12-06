import React, {Component} from "react";
import {RecyclerListView, DataProvider} from "recyclerlistview";
import LayoutProvider from './LayoutProvider';
import {View, Text, StyleSheet} from "react-native";
import Data from "./Data";
export default class App extends Component {
  
  constructor(args) {
        super(args);
        this.state = {
            dataProvider: new DataProvider((r1, r2) => {
                return r1 !== r2
            }).cloneWithRows(Data)
        };
        this._layoutProvider = new LayoutProvider(this.state.dataProvider);
        this._renderRow = this._renderRow.bind(this);
    }
    
    _renderRow(type, data) {
        switch (type) {
            case "ITEM_SPAN_1":
                return <View style={styles.singleSpanStyle}>
                    <Text>My Span is 1</Text>
                </View>;
            case "ITEM_SPAN_4":
                return <View style={styles.doubleSpanStyle}>
                    <Text>My Span is 4</Text>
                </View>;
            case "ITEM_SPAN_2":
                return <View style={styles.fourSpanStyle}>
                    <Text>My Span is 2</Text>
                </View>;
            default:
                return null;

        }

    }
  
  render() {
    return <View style={styles.container}>
            <RecyclerListView rowRenderer={this._renderRow} dataProvider={this.state.dataProvider}
                              layoutProvider={this._layoutProvider}/>
        </View>
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  singleSpanStyle:{
    flex:1, 
    height:110, 
    backgroundColor : 'red', 
    justifyContent: 'center', 
    alignItems: 'center'
  },
  doubleSpanStyle:{
    flex:1, 
    height:150,
    backgroundColor : 'yellow', 
    justifyContent: 'center', 
    alignItems: 'center'
  },
  fourSpanStyle:{
    flex:1, 
    height:140,
      backgroundColor: 'green', 
    justifyContent: 'center', 
    alignItems: 'center'
  }
});
