import React, { useEffect, useState } from 'react';
import { View, FlatList, Image, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';

// Is not necessary choose logo size in the file name
import logoImg from '../../assets/logo.png';

import styles from './styles';
import api from '../../services/api';

export default function Incidents() {
  const navigation = useNavigation();

  const [incidents, setIncidents] = useState([]);
  const [totalIncidents, setTotalIncidents] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  function navigateToDetail(incident) {
    navigation.navigate('Detail', { incident });
  }

  async function loadIncidents() {
    if (loading) {
      return;
    }

    // All records was retrieved
    if (totalIncidents > 0 && incidents.length === totalIncidents) {
      return;
    }

    setLoading(true);

    const response = await api.get('incidents', {
      params: { page }
    });

    setTotalIncidents(response.headers['x-total-count']);
    setIncidents([...incidents, ...response.data]);
    setPage(page + 1);

    setLoading(false);
  }

  useEffect(() => {
    loadIncidents();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={logoImg} />
        <Text style={styles.headerText}>
          Total of <Text style={styles.headerTextBold}>{totalIncidents} incidents</Text>
        </Text>
      </View>

      <Text style={styles.title}>
        Welcome!
      </Text>
      <Text style={styles.description}>
        Choose one of the incidents bellow and save the day
      </Text>

      <FlatList
        style={styles.incidentList}
        data={incidents}
        keyExtractor={incident => String(incident.id)}
        showsVerticalScrollIndicator={false}
        onEndReached={loadIncidents}
        onEndReachedThreshold={0.2}
        renderItem={({ item: incident }) => (

          <View style={styles.incident}>
            <Text style={styles.incidentProperty}>NGO:</Text>
            <Text style={styles.incidentValue}>
              {incident.name} from {incident.city}/{incident.state}
            </Text>

            <Text style={styles.incidentProperty}>TITLE:</Text>
            <Text style={styles.incidentValue}>{incident.title}</Text>

            <Text style={styles.incidentProperty}>VALUE:</Text>
            <Text style={styles.incidentValue}>
              {Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'USD'
              }).format(incident.value)}</Text>

            <TouchableOpacity
              style={styles.detailButton}
              onPress={() => { navigateToDetail(incident) }}
            >
              <Text style={styles.detailButtonText}>See more details</Text>
              <Feather name="arrow-right" size={16} color="#e02041" />
            </TouchableOpacity>
          </View>
        )}
      />

    </View>
  );
}

