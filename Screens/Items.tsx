import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Alert, Modal } from 'react-native';
import { useAppContext } from '../AppContext';

const Items = () => {

  const [totalPrice, setTotalPrice] = React.useState(0);
  const [totalRating, setTotalRating] = React.useState(0);
  const [showOutput, setShowOutput] = React.useState(false);
  const [recommendedItems, setRecommendedItems] = React.useState<
    { food: string; rating: number; price: number }[]>([]);
  
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

  //Render the items in items section
  const renderFoodItem = (item: { food: string; rating: number; price: number }, index: number) => (
    <View key={index} style={styles.foodItem}>

      <View style={styles.foodInfo}>
        <Text style={styles.foodName}>{item.food}</Text>
        <View style={styles.ratingContainer}>
          <Text style={styles.stars}>{renderStars(item.rating)}</Text>
          <Text style={styles.ratingText}>({item.rating}/10)</Text>
        </View>
      </View>

      <View style={styles.foodActions}>
        <Text style={styles.foodPrice}>₱{item.price}</Text>
        <TouchableOpacity 
          style={styles.removeButton}
          onPress={() => handleRemoveItem(index)}
        >
          <Text style={styles.removeButtonText}>×</Text>
        </TouchableOpacity>
      </View>

    </View>
  );

  // Handle remove item
  const handleRemoveItem = (index: number) => {
    Alert.alert(
      'Remove Item',
      'Are you sure you want to remove this item?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Remove',
          style: 'destructive',
          onPress: () => {
            const updatedFoodList = foodDataList.filter((_, i) => i !== index);
            setFoodDataList(updatedFoodList);
          },
        },
      ]
    );
  };

  // Handle output button press
    const handleOutputPress = () => {
      if (foodDataList.length === 0 && transportList.length === 0 && budgetList.length === 0) {
        Alert.alert('No Data', 'Please enter food, transport, and budget data before viewing output!');
        return;
      }
  
      const budgetValue = budgetList[0].budget;
      const transportValue = transportList[0].transportCost;
      const availableBudget = budgetValue - transportValue;
  
      if(availableBudget <= 0){
        Alert.alert('Insufficient Budget', 'Transport cost is equal or exceeds the budget');
        return;
      }
  
      const result = knapsack(foodDataList, availableBudget);
      setRecommendedItems(result);
  
      //compute for the totals
      const totalPrice = result.reduce((sum, item) => sum + item.price, 0);
      const totalRating = result.reduce((sum, item) => sum + item.rating, 0);
      setTotalPrice(totalPrice);
      setTotalRating(totalRating);
  
      setShowOutput(true);
    };
  
    //Knapsack 0/1 Algorithm Dynamic Programming Approach
    const knapsack = (items: { food: string; rating: number; price: number }[], capacity: number) => {
      const n = items.length;
      const dp = Array.from({ length: n + 1 }, () => Array(capacity + 1).fill(0));
      
      // Build DP table
      for (let i = 1; i <= n; i++) {
        const { rating, price } = items[i - 1];
        for (let w = 0; w <= capacity; w++) {
          if (price <= w) {
            dp[i][w] = Math.max(rating + dp[i - 1][w - price], dp[i - 1][w]);
          } else {
            dp[i][w] = dp[i - 1][w];
          }
        }
      }
  
      // Backtrack to find selected items
      let w = capacity;
      const selected: typeof items = [];
      for (let i = n; i > 0; i--) {
        if (dp[i][w] !== dp[i - 1][w]) {
          selected.push(items[i - 1]);
          w -= items[i - 1].price;
        }
      }
  
      return selected.reverse(); // Return in input order
    };

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
        </View>
      </View>

      {/* Food Items List */}
      <View style={styles.foodSection}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Food Items ({foodDataList.length})</Text>
          {foodDataList.length > 0 && (
            <TouchableOpacity 
              style={styles.clearAllButton}
              onPress={() => {
                Alert.alert(
                  'Clear All Items',
                  'Are you sure you want to remove all food items?',
                  [
                    {
                      text: 'Cancel',
                      style: 'cancel',
                    },
                    {
                      text: 'Clear All',
                      style: 'destructive',
                      onPress: () => {
                        setFoodDataList([]);
                      },
                    },
                  ]
                );
              }}
            >
              <Text style={styles.clearAllText}>Clear All</Text>
            </TouchableOpacity>
          )}
        </View>
        
        {foodDataList.length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyStateText}>No food items added yet</Text>
          </View>
        ) : (
          <View style={styles.foodList}>
            {foodDataList.map(renderFoodItem)}
          </View>
        )}
      </View>

      {/* Output button */}
      <TouchableOpacity style={styles.outputButton} onPress={handleOutputPress}> 
        <Text style={styles.buttonText}>OUTPUT</Text>
      </TouchableOpacity>

      {/* Modal for the Output */}
      <Modal
        animationType='slide'
        transparent={true}
        visible={showOutput}
        onRequestClose={() => setShowOutput(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>

            <ScrollView style={styles.modalContent}>
              <Text style={styles.modalTitle}>Recommended Purchases:</Text>

              {recommendedItems.length === 0 ? (
                <Text style={{ color: '#fff', textAlign: 'center' }}>No combination found.</Text>
              ) : (
                <>
                  {recommendedItems.map((item, index) => (
                    <Text key={index} style={{ color: '#fff', marginBottom: 10 }}>
                      {item.food} - Rating: {item.rating}, Price: {item.price}
                    </Text>
                  ))}
                  <View style={{ marginTop: 20 }}>
                    <Text style={{ color: '#fff', fontWeight: 'bold', textAlign: 'center' }}>
                      Total Price: {totalPrice}
                    </Text>
                    <Text style={{ color: '#fff', fontWeight: 'bold', textAlign: 'center' }}>
                      Total Rating: {totalRating}
                    </Text>
                  </View>
                </>
              )}
            </ScrollView>

            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setShowOutput(false)}
            >
              <Text style={styles.buttonText}>Close</Text>
            </TouchableOpacity>

          </View>
        </View>
      </Modal>
      
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
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  outputButton: {
    backgroundColor: '#33866A',
    borderWidth: 0,
    borderColor: '#33866A',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 25,
    alignSelf: 'center',
    width: '50%',
    alignItems: 'center',
    marginTop: 12,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 4,
  },
  //Modal Styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    backgroundColor: '#216C53',
    borderRadius: 25,
    margin: 20,
    maxHeight: '80%',
    width: '90%',
  },
  modalContent: {
    padding: 20,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 20,
  },
  closeButton: {
    backgroundColor: '#33866A',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 25,
    alignSelf: 'center',
    width: '50%',
    alignItems: 'center',
    margin: 20,
  },

  //For the delete of food items
  foodActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  removeButton: {
    backgroundColor: '#ff4444',
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  removeButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    lineHeight: 20,
  },
   sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  clearAllButton: {
    backgroundColor: '#ff4444',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 15,
  },
  clearAllText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  emptyState: {
    backgroundColor: '#33866A',
    borderRadius: 25,
    padding: 40,
    alignItems: 'center',
  },
  emptyStateText: {
    color: '#ccc',
    fontSize: 16,
    textAlign: 'center',
  },
});

export default Items;