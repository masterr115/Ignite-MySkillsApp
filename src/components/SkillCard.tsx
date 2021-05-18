import React from 'react';
import {
  TouchableOpacity,
  TouchableOpacityProps,
  Text,
  StyleSheet,
  Platform
} from 'react-native'

interface SkillCardProps extends TouchableOpacityProps {
  skill: string;
}

export function SkillCard({ skill, ...rest } : SkillCardProps) {
  
  return (

    <TouchableOpacity 
      style={styles.buttonSkill} 
      {...rest}
    >
      <Text style={styles.textSkill}>
        {skill}
      </Text>
    </TouchableOpacity>
    
  )

}

const styles = StyleSheet.create({

  buttonSkill: {
    backgroundColor: '#1F1E25',
    padding: Platform.OS == 'ios' ? 15 : 10,
    borderRadius: 50,
    alignItems: 'center',
    marginVertical: 10
  },

  textSkill: {
    color: '#FFFF',
    fontSize: 22,
    fontWeight: 'bold',
  }

})