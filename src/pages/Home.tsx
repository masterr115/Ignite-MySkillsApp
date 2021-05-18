import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TextInput, 
  Platform,
  FlatList,
  Alert
} from 'react-native';
import { Button } from '../components/Button';
import { SkillCard } from '../components/SkillCard';

interface SkillData {
  id: string;
  name: string;
}

export function Home() {

  const [newSkill, setNewSkill] = useState('');
  const [mySkills, setMySkills] = useState<SkillData[]>([]);
  const [gretting, setGretting] = useState('');

  function handleAddNewSkill() {
    
    if (newSkill != '') {

      const filterSkill = mySkills.filter(x => x.name == newSkill)

      if (filterSkill.length == 0) {

        const newData = {
          id: String(new Date().getTime()),
          name: newSkill,
        }
      
        setMySkills(oldState => [...oldState, newData]);

      } else {

        Alert.alert("That skill is already in the list.")

      }

    } else {

      Alert.alert("Empty Skill", "Please type some skill to add to the list.")

    }
  
  }

  function handleRemoveSkill(id: string) {
    setMySkills(oldState => oldState.filter(
      skill => skill.id != id
    ));
  }

  useEffect(() => {

    const currentHour = new Date().getHours();
    
    if (currentHour < 12) {
      setGretting('Good morning');
    } else if (currentHour >= 12 && currentHour < 18) {      
      setGretting('Good afternoon');
    } else {
      setGretting('Good night');
    }

  }, [])

  return (

    <View style={styles.container}>
      

      <Text style={styles.title}>Welcome, Andre</Text>

      <Text style={styles.greetings}>
        {gretting}
      </Text>

      <TextInput 
        style={styles.input}
        placeholder="New skill"
        placeholderTextColor="#555"
        onChangeText={setNewSkill}
      />

      <Button
        title="Add"
        onPress={handleAddNewSkill}
      />

      <Text style={[styles.title, { marginVertical: Platform.OS == 'ios' ? 50 : 35 }]}>
        My Skills
      </Text>
      

      <FlatList
        data={mySkills}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <SkillCard 
          skill={item.name}
          onPress={() => handleRemoveSkill(item.id)}
          />
        )}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <Text style={{color: '#FFFF', textAlign: 'center', fontSize: 15, marginTop: 15}}>Empty Skills</Text>
        }
      />

    </View>

  )

}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#121015',
    paddingVertical: Platform.OS == 'ios' ? 70 : 40,
    paddingHorizontal: 30
  },

  title: {
    color: '#FFFF',
    fontSize: 24,
    fontWeight: 'bold',
  },

  input: {
    backgroundColor: '#1F1E25',
    color: '#FFFF',
    fontSize: 18,
    padding: Platform.OS == 'ios' ? 15 : 10,
    marginTop: 30,
    borderRadius: 7
  },

  greetings: {
    color: '#FFFF',
  }

});