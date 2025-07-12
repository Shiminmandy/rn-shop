import { View, Text, StyleSheet, Image, TouchableOpacity, FlatList } from 'react-native'; 
import { PRODUCTS } from '../../../assets/mock/products'
import { Redirect, Stack, useLocalSearchParams } from 'expo-router';
import { useToast } from 'react-native-toast-notifications';
import { useCartStore } from '../../store/cart-store';
import { useState } from 'react';



const ProductDetails = () => {

    const { slug } = useLocalSearchParams<{slug: string}>();
    const toast = useToast();

    //slug：usually comes from the url, the unique identifier for the product (such as "iphone-14")
    const product = PRODUCTS.find((product) => product.slug === slug);

    if (!product) {
        return <Redirect href="/404" />;
    }

    //items: the list of items in the cart
    // addItem: add an item to the cart
    // incrementItem: increment the quantity of an item
    // decrementItem: decrement the quantity of an item
    const {items, addItem, incrementItem, decrementItem} = useCartStore();
    
    const cartItem = items.find(item => item.id === product.id);

    // if the product is already in the cart, set the quantity to the initial quantity
    // if the product is not in the cart, set the quantity to 1
    const initialQuantity = cartItem ? cartItem.quantity : 1;


    const [quantity, setQuantity] = useState(initialQuantity);

    const increaseQuantity = () => {}

    const decreaseQuantity = () => {}

    const addToCart = () => {}

    //set the total price of the product
    const totalPrice = (product.price * quantity).toFixed(2);

  return (
    <View style={styles.container}>
      <Stack.Screen options={{title: product.title}} />
      <Image source={product.heroImage} style={styles.heroImage} />

      <View style={{padding: 16, flex: 1}}>
        <Text style={styles.title}>Title: {product.title}</Text>
        <Text style={styles.slug}>Slug: {product.slug}</Text>
        <View style={styles.priceContainer}>
            <Text style={styles.price}> Unit Price: ${product.price.toFixed(2)}</Text>
          <Text style={styles.price}>Total Price: ${totalPrice}</Text>
        </View>

        <FlatList
        data={product.imagesUrl}
        keyExtractor={(item,index) => index.toString()}
        renderItem={({ item }) => (
            <Image source={{ uri: item }} style={styles.image} />
        )}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.imagesContainer}
        />

        <View style={styles.buttonContainer}>
            {/* decrease quantity button */}
            <TouchableOpacity style={styles.quantityButton} 
            onPress={decreaseQuantity}
            disabled={quantity <= 1}
            >
                <Text style={styles.quantityButtonText}>-</Text>
            </TouchableOpacity>

            {/* quantity text */}
            <Text style={styles.quantity}>{quantity}</Text>

            {/* increase quantity button */}
            <TouchableOpacity style={styles.quantityButton} 
            onPress={increaseQuantity}
            disabled={quantity >= 10}
            >
                <Text style={styles.quantityButtonText}>+</Text>
            </TouchableOpacity>
        </View>
        
      </View>
    </View>
  );
};

export default ProductDetails;

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: '#fff',
    },
    heroImage:{
        width: '100%',
        height: 250,
        resizeMode: 'cover',
    },
    title:{
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    slug:{
        fontSize: 18,
        color: '#555',
        marginBottom: 16,
    },
    priceContainer:{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 16,
    },
    price:{
        fontWeight: 'bold',
        color: '#000',
    },
    imagesContainer:{
        marginBottom: 16,
    },
    image:{
        width: 100,
        height: 100,
        marginRight: 8,
        borderRadius: 8,
    },
    buttonContainer:{
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
        paddingHorizontal: 16,
    },
    quantityButton:{
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#007bff',
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 8,
    },
    quantityButtonText:{
        color: '#fff',
        fontSize: 24,
    },
    quantity:{
        fontSize: 18,
        fontWeight: 'bold',
        marginHorizontal:16,
    },
    addToCartButton:{
        flex: 1,
        backgroundColor: '#28a745',
        padding: 12,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 8,
    },
    addToCartText:{
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 18,
    },
    errorMessage:{
        fontSize: 18,
        color: '#f00',
        textAlign: 'center',
        marginTop: 20,
    },

});
