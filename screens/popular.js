import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableOpacity,Image } from 'react-native'
import { Header, AirbnbRating, Icon } from "react-native-elements";
import { RFValue } from "react-native-responsive-fontsize";
import axios from "axios";
import { FlatList } from 'react-native';

export default class PopularScreen extends Component{
    constructor(props){
      super(props)
      this.state={
        data:[]  
      }  
    }
    componentDidMount(){
      this.getData()  
    }
    getData=()=>{
      const url = "http://localhost:5000/popular-articles"
      axios
      .get(url)
      .then(async response=>{
          this.setState({data:response.data.data})
      })
      .catch(error=>{
          console.log(error.message)
      })  
    }

    keyExtractor=(item,index)=>index.tostring()

    renderItem=({item,index})=>{
       return(
         <Card>
           key = {`card-${index}`}
           image={{uri: item.poster_link}}
           imageProps={{resizeMode:"cover"}}
           featuredTitle = {item.title}
           containerStyle={styles.cardContainer} 
           featuredTitleStyle={styles.title}
           featuredSubtitle={`${ item.release_date.split("-")[0] } | ${this.timeConvert(item.duration)}`}
           featuredSubtitleStyle={styles.subtitle}         
         </Card>  
       ) 
    }
    render(){
     const {data} = this.state
     return(
      <View>
        <FlatList
          data={data}
          keyExtractor={this.keyExtractor}
          renderItem={this.renderItem}
        />  
      </View>   
     )   
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1
    },
    headerContainer: {
      flex: 0.1
    },
    headerTitle: {
      color: "#fff",
      fontWeight: "bold",
      fontSize: RFValue(18)
    },
    subContainer: {
      flex: 0.9
    },
    subTopContainer: {
      flex: 0.4,
      justifyContent: "center",
      alignItems: "center"
    },
    posterImage: {
      width: "60%",
      height: "90%",
      resizeMode: "stretch",
      borderRadius: RFValue(30),
      marginHorizontal: RFValue(10)
    },
    subBottomContainer: {
      flex: 0.6
    },
    upperBottomContainer: {
      flex: 0.2,
      alignItems: "center"
    },
    title: {
      fontSize: RFValue(20),
      fontWeight: "bold",
      textAlign: "center"
    },
    subtitle: {
      fontSize: RFValue(14),
    },
    middleBottomContainer: {
      flex: 0.35
    },
    overview: {
      fontSize: RFValue(13),
      textAlign: "center",
      color: "gray"
    },
    lowerBottomContainer: {
      flex: 0.45
    },
    iconButtonContainer: {
      flexDirection: "row",
      justifyContent: "space-evenly",
      alignItems: "center",
      padding:50
    },
    buttonContainer: {
      justifyContent: "center",
      alignItems: "center"
    },
    button: {
      width: RFValue(160),
      height: RFValue(50),
      borderRadius: RFValue(20),
      borderColor:'green',
      justifyContent: "center",
      alignItems: "center",
      borderWidth: 5,
      marginTop: RFValue(15)
    },
    buttonText: {
      fontSize: RFValue(15),
      fontWeight: "bold",
      color:'green'
    }
  });