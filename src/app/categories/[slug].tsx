import { FlatList, Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Redirect, Stack, useLocalSearchParams } from 'expo-router'
import { CATEGORIES } from '../../../assets/mock/categories'  
import { PRODUCTS } from '../../../assets/mock/products'
import { ProductListItem } from '../../componets/product-list-item'

const Category = () => {

  const {slug} = useLocalSearchParams<{slug: string }>();

  // find() is used to find the first element in the array that matches the condition
  // the condition is that 'category.slug === slug '
  const category = CATEGORIES.find((category: any) => category.slug === slug);

  if (!category) return <Redirect href='/404'/>

  // filter() is used to create a new array with all elements that match the condition
  // the condition is that 'product.category.slug === category.slug'
  const products = PRODUCTS.filter((product: any) => product.category.slug === category.slug);

  return (
    <View style={styles.container}>
      <Stack.Screen options={{title: category.name}} />
      <Image source={{uri: category.imageUrl}} style={styles.categoryImage} />
      {/* products list of the chosen category */}
      <FlatList
        data={products}
        renderItem={({item}) => <ProductListItem product={item} />}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        columnWrapperStyle={styles.productRow}
        contentContainerStyle={styles.productList}
      />
    </View>
  )
}

export default Category

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'yellow',
    padding:16,
  },
  // category 
  categoryImage:{
    width: '100%',
    height: 200,
    resizeMode: 'cover',
    borderRadius: 8,
    marginBottom: 16,
  },
  categroyName:{
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  // product 
  productList:{
    flexGrow: 1,
  },
  productRow:{
    justifyContent: 'space-between',
  },
  productContainer:{
    flex:1,
    margin: 8,
  },
  ProductImage:{
    width: '100%',
    height: 150,
    resizeMode: 'cover',
    borderRadius: 8,
  },
  productTitle:{
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  productPrice:{
    fontSize: 14,
    color: '#888',
    marginTop: 4,
  }


})