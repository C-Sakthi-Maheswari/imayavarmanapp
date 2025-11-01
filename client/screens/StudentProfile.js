import React, { useState, useEffect, useContext } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  RefreshControl,
  Alert,
  Linking
} from 'react-native';
import { AuthContext } from '../contexts/AuthContext';
import api from '../services/api';

export default function StudentProfile({ navigation }) {
  const { user } = useContext(AuthContext);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const response = await api.get('/students/profile');
      setProfile(response.data);
    } catch (err) {
      console.error('Error fetching profile:', err);
      Alert.alert('Error', 'Failed to load profile');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const onRefresh = () => {
    setRefreshing(true);
    fetchProfile();
  };

  const openSocialMedia = (platform, username) => {
    if (!username) return;
    
    let url = '';
    if (platform === 'facebook') {
      url = `https://facebook.com/${username}`;
    } else if (platform === 'instagram') {
      url = `https://instagram.com/${username}`;
    }
    
    Linking.openURL(url).catch(() => {
      Alert.alert('Error', 'Unable to open link');
    });
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0073e6" />
      </View>
    );
  }

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      {/* Profile Header */}
      <View style={styles.header}>
        <View style={styles.imageContainer}>
          {profile?.faceImage ? (
            <Image
              source={{ uri: profile.faceImage }}
              style={styles.profileImage}
            />
          ) : (
            <View style={styles.placeholderImage}>
              <Text style={styles.placeholderText}>
                {profile?.name?.charAt(0).toUpperCase() || 'S'}
              </Text>
            </View>
          )}
        </View>
        <Text style={styles.name}>{profile?.name || 'Student Name'}</Text>
        <Text style={styles.studentId}>ID: {profile?.studentId || 'N/A'}</Text>
      </View>

      {/* Information Card */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Personal Information</Text>
        
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Full Name</Text>
          <Text style={styles.infoValue}>{profile?.name || 'N/A'}</Text>
        </View>

        <View style={styles.divider} />

        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Student ID</Text>
          <Text style={styles.infoValue}>{profile?.studentId || 'N/A'}</Text>
        </View>

        <View style={styles.divider} />

        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Class</Text>
          <Text style={styles.infoValue}>{profile?.class || 'N/A'}</Text>
        </View>

        <View style={styles.divider} />

        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Email</Text>
          <Text style={styles.infoValue}>{profile?.email || 'N/A'}</Text>
        </View>
      </View>

      {/* Social Media Card */}
      {(profile?.facebook || profile?.instagram) && (
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Social Media</Text>

          {profile?.facebook && (
            <TouchableOpacity
              style={styles.socialButton}
              onPress={() => openSocialMedia('facebook', profile.facebook)}
            >
              <Text style={styles.socialIcon}>📘</Text>
              <View style={styles.socialTextContainer}>
                <Text style={styles.socialLabel}>Facebook</Text>
                <Text style={styles.socialUsername}>@{profile.facebook}</Text>
              </View>
              <Text style={styles.socialArrow}>›</Text>
            </TouchableOpacity>
          )}

          {profile?.instagram && (
            <TouchableOpacity
              style={styles.socialButton}
              onPress={() => openSocialMedia('instagram', profile.instagram)}
            >
              <Text style={styles.socialIcon}>📷</Text>
              <View style={styles.socialTextContainer}>
                <Text style={styles.socialLabel}>Instagram</Text>
                <Text style={styles.socialUsername}>@{profile.instagram}</Text>
              </View>
              <Text style={styles.socialArrow}>›</Text>
            </TouchableOpacity>
          )}
        </View>
      )}

      {/* Edit Button */}
      <TouchableOpacity
        style={styles.editButton}
        onPress={() => navigation.navigate('StudentForm', { student: profile })}
      >
        <Text style={styles.editButtonText}>✏️ Edit Profile</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f8fa',
  },
  contentContainer: {
    padding: 20,
    paddingBottom: 40,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f8fa',
  },
  header: {
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 30,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  imageContainer: {
    marginBottom: 15,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 4,
    borderColor: '#0073e6',
  },
  placeholderImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#0073e6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderText: {
    fontSize: 48,
    fontWeight: '700',
    color: '#fff',
  },
  name: {
    fontSize: 26,
    fontWeight: '700',
    color: '#333',
    marginBottom: 5,
  },
  studentId: {
    fontSize: 16,
    color: '#666',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 20,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#333',
    marginBottom: 15,
  },
  infoRow: {
    paddingVertical: 12,
  },
  infoLabel: {
    fontSize: 14,
    color: '#999',
    marginBottom: 5,
  },
  infoValue: {
    fontSize: 16,
    color: '#333',
    fontWeight: '600',
  },
  divider: {
    height: 1,
    backgroundColor: '#f0f0f0',
  },
  socialButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  socialIcon: {
    fontSize: 32,
    marginRight: 15,
  },
  socialTextContainer: {
    flex: 1,
  },
  socialLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  socialUsername: {
    fontSize: 14,
    color: '#0073e6',
    marginTop: 2,
  },
  socialArrow: {
    fontSize: 24,
    color: '#ccc',
  },
  editButton: {
    backgroundColor: '#0073e6',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 10,
    shadowColor: '#0073e6',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  editButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
});