import React, { useState, useEffect } from 'react';
import { View, Image, TouchableOpacity, Text, Linking } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import * as MailComposer from 'expo-mail-composer';

// Is not necessary choose logo size in the file name
import logoImg from '../../assets/logo.png'

import styles from './styles';

export default function Detail() {
  const navigation = useNavigation();
  const route = useRoute();

  const incident = route.params.incident;
  incident.formattedValue =
    Intl.NumberFormat('us', {
      style: 'currency',
      currency: 'USD'
    }).format(incident.value);

  const message =
    `Hello ${incident.name}, I\'m contacting you to help with the case` +
    ` "${incident.title}" donating ${incident.formattedValue}.`;

  function navigateToIncidents() {
    navigation.goBack();
  }

  function sendMail() {
    MailComposer.composeAsync({
      subject: `Title of the incident: ${incident.title}`,
      recipients: [incident.email],
      body: message,
    })
  }

  function sendWhatsapp() {
    Linking.openURL(`whatsapp://send?phone=${incident.whatsapp}&text=${message}`);
  }

  return (
    <View style={styles.container}>

      <View style={styles.header}>
        <Image source={logoImg} />
        <TouchableOpacity onPress={navigateToIncidents}>
          <Feather name="arrow-left" size={28} color='#e02041' />
        </TouchableOpacity>
      </View>

      <View style={styles.incident}>
        <Text style={[styles.incidentProperty, { marginTop: 0 }]}>NGO:</Text>
        <Text style={styles.incidentValue}>
          {incident.name} from {incident.city}/{incident.state}
        </Text>

        <Text style={styles.incidentProperty}>TITLE:</Text>
        <Text style={styles.incidentValue}>{incident.title}</Text>

        <Text style={styles.incidentProperty}>VALUE:</Text>
        <Text style={styles.incidentValue}>{incident.formattedValue}</Text>
      </View>

      <View style={styles.contactBox}>
        <Text style={styles.heroTitle}>
          Save the day!
        </Text>
        <Text style={styles.heroTitle}>
          Be the Hero of this incident!
        </Text>

        <Text style={styles.heroDescription}>
          Contact:
        </Text>

        <View style={styles.actions}>
          <TouchableOpacity style={styles.action} onPress={sendWhatsapp}>
            <Text style={styles.actionText}>Whatsapp</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.action} onPress={sendMail}>
            <Text style={styles.actionText}>E-mail</Text>
          </TouchableOpacity>
        </View>
      </View>

    </View>
  );
}
