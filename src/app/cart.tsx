import { View, Text, StyleSheet, Alert, StatusBar, TouchableOpacity, FlatList, Image } from "react-native";
import { useCartStore } from "../store/cart-store";
import { Platform } from "react-native";

export default function Cart() {
  type CartItemType = {
    id: number;
    title: string;
    heroImage: string;
    price: number;
    quantity: number;
    maxQuantity: number;
  }

  type CartItemProps = {
    item: CartItemType;
    onRemove: (id: number) => void;
    onIncrement: (id: number) => void;
    onDecrement: (id: number) => void;
  }

  const CartItem = ({
    item,
    onRemove,
    onIncrement,
    onDecrement
  }: CartItemProps) => {
    return (
      <View style={styles.cartItem}>
        <Image source={{uri: item.heroImage}} style={styles.itemImage} />
        <View style={styles.itemDetails}>
          <Text style={styles.itemTitle}>{item.title}</Text>
          <Text style={styles.itemPrice}>${item.price}</Text>
          <View style={styles.quantityContainer}>
            <TouchableOpacity 
            onPress={() => onDecrement(item.id)}
            style={styles.quantityButton}
            >
              <Text style={styles.quantityButtonText}>-</Text>
            </TouchableOpacity> 

            <Text style={styles.itemQuantity}>{item.quantity}</Text>

            <TouchableOpacity 
            onPress={() => onIncrement(item.id)}
            style={styles.quantityButton}
            >
              <Text style={styles.quantityButtonText}>+</Text>
            </TouchableOpacity> 

          </View>
        </View>

        <TouchableOpacity
            onPress={() => onRemove(item.id)}
            style={styles.removeButton}
            >
              <Text style={styles.removeButtonText}>Remove</Text>
            </TouchableOpacity>
      </View>
    );
  }

  const { items, removeItem, incrementItem, decrementItem, getTotalPrice } = useCartStore();

  const handleCheckout = () => {
    Alert.alert('Proceeding to Checkout', `Total amount: $${getTotalPrice()}`);
  };



  return (
    <View style={styles.container}>

      <StatusBar barStyle={Platform.OS === 'ios' ? 'light-content' : 'dark-content'} />

      {/* Flat List*/}
      <FlatList
        data={items}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <CartItem
            item={item}
            onRemove={removeItem}
            onIncrement={incrementItem}
            onDecrement={decrementItem}
          />
        )}
      />


      <View style={styles.footer}>
        <Text style={styles.totalText}>Total: ${getTotalPrice()}</Text>
        <TouchableOpacity
          style={styles.checkoutButton}
          onPress={handleCheckout}>
          <Text style={styles.checkoutButtonText}>Checkout</Text>
        </TouchableOpacity>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'yellow',
    paddingHorizontal: 16,
  },
  cartList: {
    paddingVertical: 16,
  },
  cartItem: {
    flexDirection: 'row',
    marginTop: 16,
    alignItems: 'center',
    padding: 16,
    borderRadius: 8,
    backgroundColor: '#f9f9f9',
  },
  itemImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
  },
  itemDetails: {
    flex: 1,
    marginLeft: 16,
  },
  itemTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  itemPrice: {
    fontSize: 16,
    color: '#888',
    marginBottom: 4,
  },
  itemQuantity: {
    fontSize: 16,
    color: '#666',
    fontWeight: 'bold',
  },
  removeButton: {
    padding: 8,
    borderRadius: 8,
    backgroundColor: '#ff5252',
  },
  removeButtonText: {
    color: '#fff',
    fontSize: 14,
  },
  footer: {
    borderTopWidth: 1,
    borderColor: '#ddd',
    paddingVertical: 16,
    paddingHorizontal: 16,
    alignItems: 'center',
  },
  totalText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  checkoutButton: {
    backgroundColor: '#28a745',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  checkoutButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantityButton: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#ddd',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 5,
    
  },
  quantityButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
  }
});