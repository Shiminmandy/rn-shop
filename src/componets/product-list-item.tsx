import { View, Text, StyleSheet, Image, Pressable } from 'react-native'
import { Product } from '../../assets/types/product'
import { Link } from 'expo-router'

// The 'product' in the parentheses is the product object passed into this component as a prop.
// The ': {product: Product}' part tells TypeScript that the 'product' prop must be an object of type 'Product'.
// This ensures type safety and provides better code completion and error checking during development.
export const ProductListItem = ({ product }: { product: Product }) => {
    return (
        <Link href={`/product/${product.slug}`} asChild>
            <Pressable style={styles.item}>
                <View style={styles.itemImageContainer}>
                    <Image source={product.heroImage} style={styles.itemImage} />
                </View>
                <View style={styles.itemTextContainer}>
                    <Text style={styles.itemTitle}>{product.title}</Text>
                    <Text style={styles.itemPrice}>${product.price.toFixed(2)}</Text>
                </View>
            </Pressable>
        </Link>
    )
}

const styles = StyleSheet.create({
    item: {
        width: '48%',
        backgroundColor: 'white',
        marginVertical: 8,
        borderRadius: 10,
        overflow: 'hidden',

    },
    itemImageContainer: {
        borderRadius: 10,
        width: '100%',
        height: 150,
        borderWidth: 1,
        borderColor: 'red',
    },
    itemImage: {
        width: '100%',
        height: '100%',
    },
    itemTextContainer: {
        padding: 8,
        alignItems: 'flex-start',
        gap: 4,
        borderWidth: 1,
        borderColor: 'blue',
    },
    itemTitle: {
        fontSize: 16,
        color: '#888',
    },
    itemPrice: {
        fontSize: 14,
        fontWeight: 'bold',
    },
})