import { StyleSheet, Text, View, Image, Pressable, TouchableOpacity } from 'react-native'
import React from 'react'
import { Link } from 'expo-router'
import { FontAwesome } from '@expo/vector-icons'
import { CATEGORIES } from '../../assets/mock/categories'
import { FlatList } from 'react-native'

export const ListHeader = () => {
    return (
        <View style={styles.headerContainer}>
            <View style={styles.headerTop}>
                <View style={styles.headerLeft}>
                    <View style={styles.avatarContainer}>
                        <Image
                            source={{ uri: 'https://randomuser.me/api/portraits/men/32.jpg' }}
                            style={styles.avatarImage} />
                        <Text style={styles.avatarText}>User Name</Text>
                    </View>
                </View>

                {/* shopping cart and sign out button */}
                <View style={styles.headerRight}>
                    <Link style={styles.cartContainer} href={'/cart'} asChild>
                        <Pressable>
                            {({ pressed }) => (
                                <View>
                                    <FontAwesome
                                        name='shopping-cart'
                                        size={25}
                                        color='gray'
                                        style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                                    />

                                    <View style={styles.badgeContainer}>
                                        <Text style={styles.badgeText}>1</Text>
                                    </View>
                                </View>
                            )}
                        </Pressable>
                    </Link>
                    <TouchableOpacity style={styles.signOutButton} >
                        <FontAwesome name='sign-out' size={25} color='red' />
                    </TouchableOpacity>
                </View>
            </View>

            {/* hero image */}
            <View style={styles.heroContainer}>
                <Image
                    source={require('../../assets/images/hero.png')}
                    style={styles.heroImage}
                />
            </View>

            {/* categories */}
            <View style={styles.categoryContainer}>
                <Text style={styles.sectionTitle}>Categories</Text>
                {/* categories list */}
                <FlatList
                data={CATEGORIES}
                renderItem={({item}) => (
                    <Link href={`/categories/${item.slug}`} asChild>
                        <Pressable style={styles.category}>
                            <Image
                                source={{uri: item.imageUrl}}
                                style={styles.categoryImage}
                            />
                            <Text style={styles.categoryText}>{item.name}</Text>
                        </Pressable>
                    </Link>
                )}
                keyExtractor={item => item.name}
                horizontal
                showsHorizontalScrollIndicator={false}
                />
            </View>
        </View>

    )
}



const styles = StyleSheet.create({
    headerContainer: {
        gap: 10,
        borderWidth: 1,
        borderColor: 'red',
    },
    headerTop: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        //backgroundColor: 'blue',
    },
    headerLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        //backgroundColor: 'yellow',
    },
    headerRight: {
        flexDirection: 'row',
        alignItems: 'center',
        //backgroundColor: 'yellow',
    },
    avatarContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    avatarImage: {
        width: 40,
        height: 40,
        borderRadius: 20,
        marginRight: 10,
    },
    avatarText: {
        fontSize: 16,
    },
    cartContainer: {
        padding: 10,
    },
    signOutButton: {
        padding: 10,
    },
    heroContainer: {
        width: '100%',
        height: 200,
    },
    heroImage: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
        borderRadius: 20,
    },
    categoryContainer: {},
    sectionTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    category: {
        width: 100,
        alignItems: 'center',
        marginBottom: 10,
        backgroundColor: 'yellow',
    },
    categoryImage: {
        width: 60,
        height: 60,
        borderRadius: 30,
        marginBottom: 8,
    },
    categoryText: {},
    badgeContainer: {
        position: 'absolute',
        top: -5,
        right: 10,
        backgroundColor: '#1BC464',
        borderRadius: 10, //rounded-full
        width: 20,
        height: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    badgeText: {
        color: 'white',
        fontSize: 12,
        fontWeight: 'bold',
    },
});