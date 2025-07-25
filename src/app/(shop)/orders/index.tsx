import { View, Text, StyleSheet, FlatList, ListRenderItem, Pressable } from "react-native";
import React from "react";
import { ORDERS } from "../../../../assets/mock/orders";
import { Order, OrderStatus } from "../../../../assets/types/order";
import { Link, Stack } from "expo-router";

const statusDisplayText: Record<OrderStatus, string> = {
  InTransit: 'In Transit',
  Pending: 'Pending',
  Completed: 'Completed',
  Shipped: 'Shipped',

  
};

const renderItem: ListRenderItem<Order> = ({ item }) => (
  <Link href={`/orders/${item.slug}`} asChild>
    <Pressable style={styles.orderContainer}>
      <View style={styles.orderContent}>
        <View style={styles.orderDetailsContainer}>
          <Text style={styles.orderItem}>{item.item}</Text>
          <Text style={styles.orderDetails}>{item.details}</Text>
          <Text style={styles.orderDate}>{item.date}</Text>
        </View>
        <View style={[styles.statusBadge, styles[`statusBadge_${item.status}`]]}>
          <Text style={styles.statusText}>
            {statusDisplayText[item.status]}
          </Text>
        </View>
      </View>
    </Pressable>
  </Link>
);


const Orders = () => {


  return (
    <View style={styles.container}>
      <Stack.Screen options={{title:'Orders Details'}}/>
      <FlatList
        data={ORDERS}
        keyExtractor={item => item.id.toString()}
        renderItem={renderItem}
      />
    </View>
  );
};

export default Orders;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: 'yellow',
  },
  orderContainer: {
    backgroundColor: '#f8f8f8',
    padding: 16,
    marginVertical: 8,
    borderRadius: 8,
  },
  orderContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  orderDetailsContainer: {
    flex: 1,
  },
  orderItem: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  orderDetails: {
    fontSize: 14,
    color: '#555',
  },
  orderDate: {
    fontSize: 12,
    color: '#888',
    marginTop: 4,
  },
  statusBadge: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 4,
    alignSelf: 'flex-start',
  },
  statusText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#fff',
  },
  statusBadge_Pending: {
    backgroundColor: '#ffcc00'
  },
  statusBadge_Completed: {
    backgroundColor: '#4caf50',
  },
  statusBadge_Shipped: {
    backgroundColor: '#2196f3',
  },
  statusBadge_InTransit: {
    backgroundColor: '#ff9800',
  },
});