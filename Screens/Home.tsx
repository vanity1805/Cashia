import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';

const Home = ({ navigation }: any) => {
  return (
    <ScrollView style={styles.container}>

      {/* Title and description at the top of home screen */}
      <View style={styles.header}>
        <Text style={styles.title}>Cashia</Text>
        <Text style={styles.subtitle}>Smart Budget Management</Text>
        <Text style={styles.description}>
          Optimize your food purchases with intelligent budget allocation
        </Text>
      </View>

      {/* Welcome Card */}
      <View style={styles.welcomeSection}>
        <View style={styles.welcomeCard}>
          <Text style={styles.welcomeTitle}>Welcome Back!</Text>
          <Text style={styles.welcomeText}>
            Ready to make the most of your budget? Let's help you find the perfect 
            combination of food items that maximize value while staying within your limits.
          </Text>
        </View>
      </View>

      {/* Features Overview */}
      <View style={styles.featuresSection}>
        <Text style={styles.sectionTitle}>What You Can Do</Text>
        
        <View style={styles.featureCard}>
          <View style={styles.featureHeader}>
            <Text style={styles.featureIcon}>🍽️</Text>
            <Text style={styles.featureTitle}>Smart Food Selection</Text>
          </View>
          <Text style={styles.featureDescription}>
            Add food items with ratings and prices to build your personalized menu
          </Text>
        </View>

        <View style={styles.featureCard}>
          <View style={styles.featureHeader}>
            <Text style={styles.featureIcon}>💸</Text>
            <Text style={styles.featureTitle}>Budget Optimization</Text>
          </View>
          <Text style={styles.featureDescription}>
            Our algorithm finds the best combination to maximize satisfaction within budget
          </Text>
        </View>

        <View style={styles.featureCard}>
          <View style={styles.featureHeader}>
            <Text style={styles.featureIcon}>🚌</Text>
            <Text style={styles.featureTitle}>Transport Planning</Text>
          </View>
          <Text style={styles.featureDescription}>
            Factor in transportation costs for accurate budget calculations
          </Text>
        </View>
      </View>

      {/* Navigation Button */}
      <View style={styles.navigationSection}>

        {/* Sends you to the form screen */}
        <TouchableOpacity 
          style={styles.primaryButton} 
          onPress={() => navigation.navigate('Form')}
        >
          <Text style={styles.primaryButtonText}>Start Planning</Text>
        </TouchableOpacity>

      </View>

      {/* Quick Tips Thing */}
      <View style={styles.statsSection}>
        <View style={styles.statsCard}>
          <Text style={styles.statsTitle}>Quick Tips</Text>
          <View style={styles.tipItem}>
            <Text style={styles.tipBullet}>•</Text>
            <Text style={styles.tipText}>Higher rated items provide better satisfaction</Text>
          </View>
          <View style={styles.tipItem}>
            <Text style={styles.tipBullet}>•</Text>
            <Text style={styles.tipText}>Include transport costs for accurate planning</Text>
          </View>
          <View style={styles.tipItem}>
            <Text style={styles.tipBullet}>•</Text>
            <Text style={styles.tipText}>Our algorithm maximizes value automatically</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  header: {
    paddingTop: 50,
    paddingHorizontal: 20,
    paddingBottom: 30,
    alignItems: 'center',
  },
  title: {
    fontFamily: 'Cocogoose-Pro-Bold-trial', // Custom font
    fontSize: 30,
    color: '#216C53',
    textAlign: 'center',
    marginBottom: 1,
  },
  subtitle: {
    fontSize: 18,
    color: '#fff',
    textAlign: 'center',
    marginBottom: 12,
  },
  description: {
    fontSize: 14,
    color: '#ccc',
    textAlign: 'center',
    paddingHorizontal: 10,
    lineHeight: 20,
  },
  welcomeSection: {
    paddingHorizontal: 20,
    marginBottom: 25,
  },
  welcomeCard: {
    backgroundColor: '#216C53',
    borderRadius: 25,
    padding: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
  },
  welcomeTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 12,
    textAlign: 'center',
  },
  welcomeText: {
    fontSize: 16,
    color: '#fff',
    textAlign: 'center',
    lineHeight: 22,
  },
  featuresSection: {
    paddingHorizontal: 20,
    marginBottom: 25,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 15,
  },
  featureCard: {
    backgroundColor: '#33866A',
    borderRadius: 20,
    padding: 20,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
  },
  featureHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  featureIcon: {
    fontSize: 24,
    marginRight: 12,
  },
  featureTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
  featureDescription: {
    fontSize: 14,
    color: '#ccc',
    lineHeight: 18,
    marginLeft: 36,
  },
  navigationSection: {
    paddingHorizontal: 20,
    marginBottom: 25,
  },
  primaryButton: {
    backgroundColor: '#216C53',
    borderRadius: 25,
    paddingVertical: 16,
    paddingHorizontal: 24,
    alignItems: 'center',
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
  },
  primaryButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  secondaryButton: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: '#33866A',
    borderRadius: 25,
    paddingVertical: 14,
    paddingHorizontal: 24,
    alignItems: 'center',
  },
  secondaryButtonText: {
    color: '#33866A',
    fontSize: 16,
    fontWeight: '600',
  },
  statsSection: {
    paddingHorizontal: 20,
    paddingBottom: 30,
  },
  statsCard: {
    backgroundColor: '#33866A',
    borderRadius: 25,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
  },
  statsTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 15,
    textAlign: 'center',
  },
  tipItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  tipBullet: {
    fontSize: 16,
    color: '#FFD700',
    marginRight: 8,
    marginTop: 2,
  },
  tipText: {
    fontSize: 14,
    color: '#fff',
    flex: 1,
    lineHeight: 18,
  },
});

export default Home;