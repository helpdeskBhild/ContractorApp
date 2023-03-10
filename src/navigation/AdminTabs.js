import 'react-native-gesture-handler';
import React from "react";
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import BidScreen from '../screens/Manager/Bid';
import BidList from '../screens/Manager/BidList';
import AddJobScreen from '../screens/Manager/AddJob';
import UsersScreen from '../screens/Admin/Users';
import AddUserScreen from '../screens/Admin/AddUser';

const Stack = createNativeStackNavigator();

const BidStack = () => {
  return(
    <Stack.Navigator>
        <Stack.Screen
          name="BidJobs"
          component={BidScreen}
          options={{
            headerShown: false, cardStyle: { backgroundColor: '#ffffff' }
          }}
        />
        <Stack.Screen
          name="BidList"
          component={BidList}
          options={{
            headerShown: false, cardStyle: { backgroundColor: '#ffffff' }
          }}
        />  
    </Stack.Navigator>


  )  
}



// const JobStack = () => {
//     return(
//       <Stack.Navigator>
//           <Stack.Screen
//             name="Jobs"
//             component={JobsScreen}
//             options={{
//               headerShown: false, cardStyle: { backgroundColor: '#ffffff' }
//             }}
//           />
//           <Stack.Screen
//             name="JobDetails"
//             component={JobDetails}
//             options={{
//               headerShown: false, cardStyle: { backgroundColor: '#ffffff' }
//             }}
//           />
//           <Stack.Screen
//             name="AssignedDetails"
//             component={AssignedDetails}
//             options={{
//               headerShown: false, cardStyle: { backgroundColor: '#ffffff' }
//             }}
//           />          
//       </Stack.Navigator>
  
  
//     )  
//   }

const Tab = createMaterialBottomTabNavigator();

function AdminTabs() {
  return (
    <Tab.Navigator   
    activeColor="#f0edf6"
    inactiveColor="#000000"
    barStyle={{ 
      backgroundColor: '#334A65', 
      // height: 60
    }}
    >
      <Tab.Screen 
        name="AddJobTab" 
        component={AddJobScreen} 
        options={{
          tabBarLabel: 'AddJob',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="briefcase" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen 
        name="BidTab" 
        component={BidStack} 
        options={{
          tabBarLabel: 'Bids',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="currency-usd" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen 
        name="AddUserTab" 
        component={AddUserScreen} 
        options={{
          tabBarLabel: 'AddUser',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="account" color={color} size={26} />
          ),
        }}
      />      
      <Tab.Screen 
        name="UsersTab" 
        component={UsersScreen} 
        options={{
          tabBarLabel: 'Users',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="account-multiple" color={color} size={26} />
          ),
        }}
      />                      
    </Tab.Navigator>
  );
}

export default AdminTabs;