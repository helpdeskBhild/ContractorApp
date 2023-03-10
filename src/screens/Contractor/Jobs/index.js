// import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  Button,
  TouchableOpacity,
  Pressable,
  useColorScheme,
  ScrollView,
  FlatList,
  SectionList
} from "react-native";
import SegmentedControl from '@react-native-segmented-control/segmented-control';
// import { MaterialCommunityIcons } from '@expo/vector-icons';
import Icon from "react-native-vector-icons/dist/FontAwesome5"
import AsyncStorage from '@react-native-async-storage/async-storage'
import { SafeAreaView } from "react-native-safe-area-context";
import Modal from "react-native-modal";
import CheckBox from '@react-native-community/checkbox'
import axios from 'axios';

import ListCard from "../../../components/Contractor/ListCard";
import BidCard from "../../../components/Contractor/BidCard";
import { API_URL } from "../../../constants.js";

const JobsScreen = ({navigation}) => {

  const getJobs = async(status) => {
    axios({
      method: 'post',
      url: `${API_URL}/getjobs`,
      data: {
        "status": status,
      },
      headers: {'Authorization': await AsyncStorage.getItem('token')},
      timeout: 4000,
    })
    .then( res => {
      // console.log(res.data);
      if (res.status == 200) {
        setDataSource(res.data.jobs)
      }
      else
        alert(res.data.message);
    })
    .catch(error => {
      console.log(error);
      alert(error);            
    })    
  }
  const [flatListRef, setFlatListRef] = useState("");
  const colorScheme = useColorScheme();
  const [textColor, setTextColor] = useState('#000');
  const [value, setValue] = useState('Open');
  const [selectedIndex, setSelectedIndex] = useState(0);
  // useEffect(() => {
  //   setTextColor(colorScheme === 'dark' ? '#FFF' : '#000');
  // }, [colorScheme]);

  const [isModalVisible, setIsModalVisible] = React.useState(false);

  const [isSelectedJob1, setSelectionJob1] = useState(false)
  const [isSelectedJob2, setSelectionJob2] = useState(false)
  const [isSelectedJob3, setSelectionJob3] = useState(false)
  const [isSelectedJob4, setSelectionJob4] = useState(false)
  const [isSelectedJob5, setSelectionJob5] = useState(false)
  const [isSelectedJob6, setSelectionJob6] = useState(false) 

  const [isSelectedLoc1, setSelectionLoc1] = useState(false)
  const [isSelectedLoc2, setSelectionLoc2] = useState(false)
  const [isSelectedLoc3, setSelectionLoc3] = useState(false)
  const [isSelectedLoc4, setSelectionLoc4] = useState(false)
  const [isSelectedLoc5, setSelectionLoc5] = useState(false)
  const [isSelectedLoc6, setSelectionLoc6] = useState(false) 

  const [dataSource, setDataSource] = useState("");
  useEffect (() => {
    
    getJobs(value)
      
  },[value])

  const handleModal = () => setIsModalVisible(() => !isModalVisible);  

  const ItemSeparator = () => <View style={{
    height: 2,
    backgroundColor: "rgba(0,0,0,0.5)",
    marginLeft: 10,
    marginRight: 10,
  }}
  />
  const _onChange = (event) => {
    setSelectedIndex(event.nativeEvent.selectedSegmentIndex);
  };

  const _onValueChange = (val) => {
    setValue(val);
    // getJobs(val)
    flatListRef.scrollToOffset({ animated: true, offset: 0 });
    // setRefreshing(false)
  };

  const onPressFunction = () => {
    flatListRef.scrollToOffset({ animated: true, offset: 0 });
  };

  const viewItem = item => {
    if (value == "Open"){
      navigation.navigate('JobDetails', {
        item,
      });
    }
    else if (value == "Assigned" || value == "Active" || value == "Completed") {
      navigation.navigate('AssignedDetails', {
        item,
      });      
    }
  };


  const renderJob = ({item}) => {
    switch(value) {
      case "Open":
        return <ListCard item={item} viewItem={viewItem}/>;
      case "Bids":
        return <BidCard item={item} viewItem={viewItem}/>;
      case "Assigned":
        return <ListCard item={item} viewItem={viewItem}/>;
      case "Active":         
        return <ListCard item={item} viewItem={viewItem}/>;
      case "Completed":
        return <ListCard item={item} viewItem={viewItem}/>;        
    }
  };

  return (
    <SafeAreaView>
      <View style={styles.container}>
          <View style={styles.header}>
            <TouchableOpacity>
                <Text style = {styles.leftHeaderButton}>Settings</Text>
            </TouchableOpacity>
            <Text style = {styles.centerHeaderText}>Jobs</Text>
            <TouchableOpacity>
                <Text style = {styles.rightHeaderButton} onPress={handleModal}>Filter</Text>
            </TouchableOpacity>
          </View>

          <Modal isVisible={isModalVisible}>
            <View style={styles.filterPopup}>       
              <View style={styles.category}>
                <TouchableOpacity onPress={handleModal}>
                  <Icon name={"times"} color={"#334A65"} size={20} style={{margin: 10, marginTop: 15, marginRight: "90%",}} />
                </TouchableOpacity>              
                <Text style={styles.title}>Job Type</Text>
                  <View style={styles.row}>
                    <View style={styles.termsView}>
                        <CheckBox
                            style={styles.termsBox}                                
                            value={isSelectedJob1}
                            onChange={() => {setSelectionJob1(!isSelectedJob1)}}
                        />
                        <Text style={styles.termsText}>Item</Text>
                    </View>
                    <View style={styles.termsView}>
                        <CheckBox
                            style={styles.termsBox}                                
                            value={isSelectedJob2}
                            onChange={() => {setSelectionJob2(!isSelectedJob2)}}
                        />
                        <Text style={styles.termsText}>Item</Text>    
                    </View>
                    <View style={styles.termsView}>
                        <CheckBox
                            style={styles.termsBox}                                
                            value={isSelectedJob3}
                            onChange={() => {setSelectionJob3(!isSelectedJob3)}}
                        />
                        <Text style={styles.termsText}>Item</Text>
                    </View>                                            
                  </View>
                  <View style={styles.row}>
                    <View style={styles.termsView}>
                        <CheckBox
                            style={styles.termsBox}                                
                            value={isSelectedJob4}
                            onChange={() => {setSelectionJob4(!isSelectedJob4)}}
                        />
                        <Text style={styles.termsText}>Item</Text>
                    </View>
                    <View style={styles.termsView}>
                        <CheckBox
                            style={styles.termsBox}                                
                            value={isSelectedJob5}
                            onChange={() => {setSelectionJob5(!isSelectedJob5)}}
                        />
                        <Text style={styles.termsText}>Item</Text>    
                    </View>
                    <View style={styles.termsView}>
                        <CheckBox
                            style={styles.termsBox}                                
                            value={isSelectedJob6}
                            onChange={() => {setSelectionJob6(!isSelectedJob6)}}
                        />
                        <Text style={styles.termsText}>Item</Text>
                    </View>                                            
                  </View>                
                </View>
                  <View style={styles.bidView}>
                    <TouchableOpacity style={styles.loginBtn} onPress={() => applyFilter} >
                        <Text style={styles.loginText}>Apply Filter</Text>
                    </TouchableOpacity>
                  </View>
            </View>      
          </Modal>

          <View style={styles.segmentContainer}>
            <SegmentedControl
              style= {{height: 50}}
              values={['Open', 'Bids', 'Assigned', 'Active', 'Completed']}
              selectedIndex={selectedIndex}
              onChange={_onChange}
              onValueChange={_onValueChange}
            />
        </View>
        {/* <View style={{flex: 1}}> */}
          <FlatList
              ref={(ref) => { setFlatListRef(ref); }}
              data={dataSource}
              renderItem={renderJob}
              // contentContainerStyle={{flex: 1}}
              keyExtractor={item => item._id.toString()}
              ItemSeparatorComponent={ItemSeparator}
              
              ListFooterComponent={
                <>
                  <View style={{
                      height: 2,
                      backgroundColor: "rgba(0,0,0,0.2)",
                      marginLeft: 10,
                      marginRight: 10,
                    }}
                    />                
                  <View style={{height: 360}}>
                    <Text style={styles.subtitle}>That's it for now!</Text>
                  </View>
                </>
              }
              removeClippedSubviews={true}
              initialNumToRender={5}
              // refreshing={refreshing}
              // onRefresh={useRefresh}       
            />

        <Pressable style={styles.button} onPress={onPressFunction}>
          <Text style={styles.arrow}>^</Text>
        </Pressable>            
      </View>
    </SafeAreaView>
  );
}
 
const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: 'rgba(99, 193, 39, 0.1)',
    alignItems: "center",
    justifyContent: "center",
  },

  header:{
    flexDirection: "row",
    // backgroundColor: "#63C127",
    backgroundColor: "#334A65",
    // top:'-5%',
    width: '100%',
    height: 100
  },

  leftHeaderButton: {
    top: "60%",
    color: "#ffffff",
    fontFamily: 'Inter',
    fontStyle: 'normal',
    fontWeight: "600",
    fontSize: 20,
    lineHeight: 36,
    // textAlign: "left",      
    marginLeft: 10,
  },

  centerHeaderText: {
    top: "10%",
    color: "#ffffff",
    fontFamily: 'Inter',
    fontStyle: 'normal',
    fontWeight: "bold",
    fontSize: 30,
    lineHeight: 36,
    // textAlign: "center",
    marginLeft: '20%',
  },

  rightHeaderButton: {
    top: "60%",
    color: "#ffffff",
    fontFamily: 'Inter',
    fontStyle: 'normal',
    fontWeight: "600",
    fontSize: 20,
    lineHeight: 36,
    // textAlign: "left",      
    marginLeft: '45%',
  },

  img: {
    width: 193,
    height: 110,
  },

  inputView: {
    flexDirection: 'row',
    backgroundColor: "#F6F6F6",
    borderRadius: 10,
    width: "90%",
    height: 45,
    marginBottom: 20,
    borderRadius: 6,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "#E8E8E8"
 
    // alignItems: "left",
  },
 
  TextInput: {
    height: 50,
    flex: 1,
    padding: 10,
    marginLeft: 10,
    fontFamily: 'Inter',
    fontStyle: 'normal',
    fontWeight: "500",
    fontSize: 16,
    lineHeight: 19,
  },
 
  showButton: {
    marginTop: 3,
    height: 50,
    flex: 1,
    padding: 10,
    color: "#63C127",
    fontFamily: 'Inter',
    fontStyle: 'normal',
    fontWeight: "bold",
    fontSize: 16,
    lineHeight: 19,
  },

  forgot_button: {
    marginTop: 15,
    height: 30,
    // marginBottom: 20,
    color: "#63C127",
    fontFamily: 'Inter',
    fontStyle: 'normal',
    fontWeight: "bold",
    fontSize: 16,
    lineHeight: 22,    
  },
 
  loginBtn: {
    width: "90%",
    borderRadius: 25,
    height: 50,
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 25,
    backgroundColor: "#63C127",
    // top: "0%",
    marginBottom: 20,
  },

  loginText: {
    color: "#FFFFFF",
    fontFamily: 'Inter',
    fontStyle: 'normal',
    fontWeight: "bold",
    fontSize: 16,
    lineHeight: 19,
    textAlign: "center",      
  },

  text: {
    fontSize: 14,
    textAlign: 'center',
    fontWeight: '500',
    margin: 10,
  },
  segmentContainer: {
    // top: "-10%",
    // margin: 10,
    marginTop: 10,
    marginBottom: 5,
  },
  segmentSection: {

  },
  container: {

  },

  category: {
    alignItems: "center",
  },


  termsView: {
    marginLeft: 10,
    flexDirection: "row",
  },

  termsBox: {
    alignSelf: "center"
  },

  termsText: {
    margin: 5,
    fontWeight: "500",
    color: "black",
    fontFamily: 'Inter',
    fontStyle: 'normal',
    fontSize: 20,
    lineHeight: 25,    
  },

  title: {
    margin: 10,
    fontWeight: "bold",
    color: "black",
    fontFamily: 'Inter',
    fontStyle: 'normal',
    fontSize: 20,
    lineHeight: 25,
    color: "#334A65"
  },

  subtitle: {
    // fontWeight: "bold",
    // color: "black",
    color: "rgba(0,0,0,0.3)",
    marginTop: 5,
    fontFamily: 'Inter',
    fontStyle: 'normal',
    fontSize: 20,
    lineHeight: 25,
    alignSelf: "center",
  },

  filterPopup: {
    height: "auto",
    backgroundColor: "whitesmoke",
    borderRadius: 25,
  }, 

  row: {
    flexDirection: "row",
    marginBottom: 20,
    // alignItems: "center",
    alignSelf: "center",
  },

  button: {
    position: 'absolute',
    width: 60,
    height: 60,
    borderRadius: 60 / 2,
    backgroundColor: "#63C127",
    alignItems: 'center',
    justifyContent: 'center',
    // right: 30,
    // bottom: 0,
    top: 600,
    left: "80%"
    // right: 10,
    // marginLeft: "80%"
  },
  arrow: {
    color: "#ffffff",
    fontSize: 48,
    top: 3
    // bottom: 0,
    // textAlign: "center"
  },

});

export default JobsScreen;