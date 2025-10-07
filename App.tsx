import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import formStatuses from './FormStatuses.json';

const App = () => {
  const [data, setData] = useState(formStatuses);

  const getCircleColor = (formTypes: any[], formName: string) => {
    const formType = formTypes.find(form => form.formName === formName);
    return formType?.formUserStatus === 'READY' ? 'green' : 'red';
  };

  const toggleStatus = (sectionIndex: number, userIndex: number, formName: string) => {
    setData(prevData => {
      const newData = [...prevData];
      const formType = newData[sectionIndex].content[userIndex].formTypes.find(form => form.formName === formName);
      if (formType) {
        formType.formUserStatus = formType.formUserStatus === 'READY' ? 'NOT_READY' : 'READY';
      }
      return newData;
    });
  };

  return (
    <View style={{flex: 1}}>
      <View style={{flex: 0.25, backgroundColor: '#333'}} />
      <View style={{flexDirection: 'row', paddingTop: 25}}>
        <View style={{flex: 1, backgroundColor: '#666', paddingLeft: 10}}>
          <Text style={{fontSize: 12, color: '#fff', fontWeight: 'bold', marginBottom: 10}}>Users</Text>
        </View>
        <View style={{flex: 1, backgroundColor: '#999', paddingHorizontal: 10}}>
          <View style={{flexDirection: 'row', justifyContent: 'space-around', marginBottom: 10}}>
            <Text style={{fontSize: 8, color: '#fff', textAlign: 'center', flex: 1}}>Matching Page</Text>
            <Text style={{fontSize: 8, color: '#fff', textAlign: 'center', flex: 1}}>Profile Created by Registration</Text>
            <Text style={{fontSize: 8, color: '#fff', textAlign: 'center', flex: 1}}>Profile Created by Coordinator</Text>
          </View>
        </View>
      </View>
      <ScrollView style={{flex: 3}}>
        <View style={{flexDirection: 'row'}}>
          <View style={{flex: 1, backgroundColor: '#666', paddingLeft: 10}}>
            {data.map((section, sectionIndex) => (
              <View key={sectionIndex} style={{marginBottom: 20}}>
                <Text style={{fontSize: 12, color: '#fff', fontWeight: 'bold', height: 20, lineHeight: 20}}>{section.title}</Text>
                {section.content.map((item, userIndex) => (
                  <Text key={userIndex} style={{fontSize: 14, color: '#fff', marginTop: 5, marginLeft: 10, height: 30, lineHeight: 30}}>
                    {item.user.firstName} {item.user.lastName}
                  </Text>
                ))}
              </View>
            ))}
          </View>
          <View style={{flex: 1, backgroundColor: '#999', paddingHorizontal: 10}}>
            {data.map((section, sectionIndex) => (
              <View key={sectionIndex} style={{marginBottom: 20}}>
                <View style={{height: 20}} />
                {section.content.map((item, userIndex) => (
                  <View key={userIndex} style={{flexDirection: 'row', justifyContent: 'space-around', height: 30, alignItems: 'center', marginTop: 5}}>
                    <TouchableOpacity onPress={() => toggleStatus(sectionIndex, userIndex, 'Matching Page')}>
                      <View style={{width: 20, height: 20, borderRadius: 10, backgroundColor: getCircleColor(item.formTypes, 'Matching Page')}} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => toggleStatus(sectionIndex, userIndex, 'Profile Created by Registration')}>
                      <View style={{width: 20, height: 20, borderRadius: 10, backgroundColor: getCircleColor(item.formTypes, 'Profile Created by Registration')}} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => toggleStatus(sectionIndex, userIndex, 'Profile Created by Coordinator')}>
                      <View style={{width: 20, height: 20, borderRadius: 10, backgroundColor: getCircleColor(item.formTypes, 'Profile Created by Coordinator')}} />
                    </TouchableOpacity>
                  </View>
                ))}
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
      <View style={{flex: 0.25, backgroundColor: '#ccc'}} />
    </View>
  );
};

export default App;