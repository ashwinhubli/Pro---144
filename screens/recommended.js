import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableOpacity,Image } from 'react-native'
import { Header, AirbnbRating, Icon } from "react-native-elements";
import { RFValue } from "react-native-responsive-fontsize";
import axios from "axios";
import { FlatList } from 'react-native';

export default class RecommendationScreen extends Component{
    constructor(props){
      super(props)
      this.state={
        data:[]  
      }  
    }
    getData=()=>{
      const url = "http://localhost:5000/recommended-articles"
      axios
      .get(url)
      .then(async response=>{
          this.setState({data:response.data.data})
      })
      .catch(error=>{
          console.log(error.message)
      })  
    }
    
    componentDidMount(){
      this.getData()
    }

    timeConvert(num){
      var hours = Math.floor(num/60)
      var minutes = num%60
      return  `${hours} hrs ${minutes} mins`
    }

    keyExtractor=(item,index)=>index.toString()
    
    renderItem=({item,index}) =>{
      return(
        <Card 
         key={`card-${index}`}
         image={{uri:item.poster_link}}
         imageProps = {{resizeMode: "cover"}}
         featuredTitle={item.title}
         containerStyle={styles.cardContainer}
         featuredTitleStyle={styles.title}
         featuredSubtitle={`${ item.release_date.split("-")[0] } | ${this.timeConvert(item.duration)}`}
         featuredSubtitleStyle={styles.subtitle}
         >
          
        </Card>
      )
    }

    render(){
      const {data} = this.state;
      return(
       <View style={styles.container}>
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
  container: { flex: 1, backgroundColor: "#fff" }, 
  title: { color: "#fff", alignSelf: "flex-start", paddingLeft: RFValue(15), fontSize: RFValue(25), marginTop: RFValue(65) },
  subtitle: { fontWeight: "bold", alignSelf: "flex-start", paddingLeft: RFValue(15), fontSize: RFValue(15) }, 
  cardContainer: { flex: 1, borderRadius: RFValue(10), justifyContent: "center", height: RFValue(110), marginBottom: RFValue(20) } 
});