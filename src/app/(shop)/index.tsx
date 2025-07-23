import { FlatList, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { PRODUCTS } from '../../../assets/mock/products'
import { ProductListItem } from '../../componets/product-list-item'
import { ListHeader } from '../../componets/list-header'
import Auth from '../auth'

const Home = () => {
  return (
    <Auth />
    // <View>
    //   {/* products list of all categories */}
    //   <FlatList
    //     data={PRODUCTS}
    //     // deconstruct the item and pass it to the ProductListItem component
    //     renderItem={({ item }) =>
    //       <ProductListItem product={item} />
    //     }
    //     keyExtractor={item => item.id.toString()} // unique key for each item
    //     numColumns={2} // number of columns in the grid
    //     ListHeaderComponent={ListHeader} // header component
    //     contentContainerStyle={styles.flatListContent}
    //     columnWrapperStyle={styles.flatListColumn}
    //     style={{ paddingHorizontal: 10, paddingVertical: 5, borderWidth: 5, borderColor: 'red' }} // padding for the flat list, this is inline style
    //   />
    // </View>
  )
}

export default Home

const styles = StyleSheet.create({
  flatListContent: {
    paddingBottom: 10,
  },
  flatListColumn: {
    justifyContent: 'space-between',
  },
})