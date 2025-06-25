import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { useAppContext } from '../AppContext';

const Items = () => {
  
  //The shared states
    const {
      foodDataList,
      setFoodDataList,
      transportList,
      setTransportList,
      budgetList,
      setBudgetList,
    } = useAppContext();

  // Calculate budget values
  const budget = budgetList[0]?.budget || 0;
  const transportCost = transportList[0]?.transportCost || 0;
  const availableBudget = budget - transportCost;
  
  // Calculate totals for food items
  const totalFoodCost = foodDataList.reduce((sum, item) => sum + item.price, 0);
  const totalRating = foodDataList.reduce((sum, item) => sum + item.rating, 0);
  const averageRating = foodDataList.length > 0 ? (totalRating / foodDataList.length).toFixed(1) : 0;

  const renderStars = (rating: number) => {
    const maxStars = 10;
    const fullStars = Math.floor(rating);
    const stars = [];
    
    for (let i = 0; i < fullStars; i++) {
      stars.push('★');
    }
    for (let i = fullStars; i < maxStars; i++) {
      stars.push('☆');
    }
    
    return stars.join('');
  };

  const renderFoodItem = (item: { food: string; rating: number; price: number }, index: number) => (
    <View key={index} style={styles.foodItem}>
      <View style={styles.foodInfo}>
        <Text style={styles.foodName}>{item.food}</Text>
        <View style={styles.ratingContainer}>
          <Text style={styles.stars}>{renderStars(item.rating)}</Text>
          <Text style={styles.ratingText}>({item.rating}/10)</Text>
        </View>
      </View>
      <Text style={styles.foodPrice}>₱{item.price}</Text>
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Cashia</Text>
        <Text style={styles.subtitle}>Budget Overview</Text>
      </View>

      {/* Budget Overview */}
      <View style={styles.budgetSection}>
        <View style={styles.budgetCard}>
          <View style={styles.budgetRow}>
            <Text style={styles.budgetLabel}>Budget:</Text>
            <Text style={styles.budgetAmount}>₱{budget.toFixed(2)}</Text>
          </View>
          <View style={styles.budgetRow}>
            <Text style={styles.budgetLabel}>Transport Cost:</Text>
            <Text style={styles.expenseAmount}>₱{transportCost.toFixed(2)}</Text>
          </View>
          <View style={styles.budgetRow}>
            <Text style={styles.budgetLabel}>Budget Available for Food:</Text>
            <Text style={styles.availableAmount}>₱{availableBudget.toFixed(2)}</Text>
          </View>
          <View style={[styles.budgetRow, styles.totalRow]}>
            <Text style={styles.totalLabel}>Total Food Cost:</Text>
            <Text style={[
              styles.totalAmount, 
              totalFoodCost > availableBudget ? styles.overBudget : styles.underBudget
            ]}>
              ₱{totalFoodCost.toFixed(2)}
            </Text>
          </View>
        </View>
      </View>

      {/* Food Items List */}
      <View style={styles.foodSection}>
        <Text style={styles.sectionTitle}>Food Items ({foodDataList.length})</Text>
        <View style={styles.foodList}>
          {foodDataList.map(renderFoodItem)}
        </View>
      </View>

      {/* Summary Statistics */}
      <View style={styles.summarySection}>
        <Text style={styles.sectionTitle}>Summary</Text>
        <View style={styles.summaryCard}>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Total Items:</Text>
            <Text style={styles.summaryValue}>{foodDataList.length}</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Average Rating:</Text>
            <Text style={styles.summaryValue}>{averageRating}/10</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Total Rating Points:</Text>
            <Text style={styles.summaryValue}>{totalRating}</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Budget Status:</Text>
            <Text style={[
              styles.summaryValue,
              totalFoodCost <= availableBudget ? styles.statusGood : styles.statusBad
            ]}>
              {totalFoodCost <= availableBudget ? 'Within Budget' : 'Over Budget'}
            </Text>
          </View>
        </View>
      </View>

      {/* Budget Breakdown
      <View style={styles.breakdownSection}>
        <Text style={styles.sectionTitle}>Budget Breakdown</Text>
        <View style={styles.breakdownCard}>
          <View style={styles.breakdownItem}>
            <View style={styles.breakdownBar}>
              <View style={[
                styles.breakdownFill,
                { 
                  width: `${(transportCost / budget) * 100}%`,
                  backgroundColor: '#ff6b6b'
                }
              ]} />
            </View>
            <Text style={styles.breakdownLabel}>Transport: ₱{transportCost}</Text>
          </View>
          
          <View style={styles.breakdownItem}>
            <View style={styles.breakdownBar}>
              <View style={[
                styles.breakdownFill,
                { 
                  width: `${Math.min((totalFoodCost / budget) * 100, 100)}%`,
                  backgroundColor: totalFoodCost <= availableBudget ? '#4CAF50' : '#ff4444'
                }
              ]} />
            </View>
            <Text style={styles.breakdownLabel}>Food: ₱{totalFoodCost}</Text>
          </View>
          
          {budget - transportCost - totalFoodCost > 0 && (
            <View style={styles.breakdownItem}>
              <View style={styles.breakdownBar}>
                <View style={[
                  styles.breakdownFill,
                  { 
                    width: `${((budget - transportCost - totalFoodCost) / budget) * 100}%`,
                    backgroundColor: '#666'
                  }
                ]} />
              </View>
              <Text style={styles.breakdownLabel}>Remaining: ₱{(budget - transportCost - totalFoodCost).toFixed(2)}</Text>
            </View>
          )}
        </View>
      </View> */}
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
    paddingBottom: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#216C53',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 18,
    color: '#fff',
    textAlign: 'center',
  },
  budgetSection: {
    paddingHorizontal: 20,
    marginBottom: 25,
  },
  budgetCard: {
    backgroundColor: '#216C53',
    borderRadius: 25,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
  },
  budgetRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  totalRow: {
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#33866A',
    marginTop: 8,
    marginBottom: 0,
  },
  budgetLabel: {
    fontSize: 16,
    color: '#fff',
  },
  budgetAmount: {
    fontSize: 16,
    fontWeight: '600',
    color: '#4CAF50',
  },
  expenseAmount: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ff6b6b',
  },
  availableAmount: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFD700',
  },
  totalLabel: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
  },
  totalAmount: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  underBudget: {
    color: '#4CAF50',
  },
  overBudget: {
    color: '#ff4444',
  },
  foodSection: {
    paddingHorizontal: 20,
    marginBottom: 25,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 15,
  },
  foodList: {
    backgroundColor: '#33866A',
    borderRadius: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
  },
  foodItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#216C53',
  },
  foodInfo: {
    flex: 1,
  },
  foodName: {
    fontSize: 16,
    fontWeight: '500',
    color: '#fff',
    marginBottom: 4,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  stars: {
    fontSize: 12,
    color: '#FFD700',
    marginRight: 6,
    letterSpacing: 1,
  },
  ratingText: {
    fontSize: 12,
    color: '#ccc',
  },
  foodPrice: {
    fontSize: 16,
    fontWeight: '600',
    color: '#4CAF50',
  },
  summarySection: {
    paddingHorizontal: 20,
    marginBottom: 25,
  },
  summaryCard: {
    backgroundColor: '#33866A',
    borderRadius: 25,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  summaryLabel: {
    fontSize: 16,
    color: '#fff',
  },
  summaryValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
  statusGood: {
    color: '#4CAF50',
  },
  statusBad: {
    color: '#ff4444',
  },
  breakdownSection: {
    paddingHorizontal: 20,
    paddingBottom: 30,
  },
  breakdownCard: {
    backgroundColor: '#216C53',
    borderRadius: 25,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
  },
  breakdownItem: {
    marginBottom: 15,
  },
  breakdownBar: {
    height: 8,
    backgroundColor: '#343434',
    borderRadius: 4,
    marginBottom: 5,
  },
  breakdownFill: {
    height: '100%',
    borderRadius: 4,
  },
  breakdownLabel: {
    fontSize: 14,
    color: '#fff',
  },
});

export default Items;