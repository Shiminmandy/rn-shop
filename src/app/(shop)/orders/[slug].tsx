import { FlatList, Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { ORDERS } from '../../../../assets/mock/orders';
import { Redirect, Stack, useLocalSearchParams } from 'expo-router';


const OrderDetails = () => {

    const { slug } = useLocalSearchParams();

    const order = ORDERS.find(order => order.slug === slug);
    if (!order) {
        return <Redirect href="/404" />;
    }

    return (
        <View style={styles.container}>
            <Stack.Screen options={{ title: `${order.item}` }} />

            <Text style={styles.item}>{order.item}</Text>
            <Text style={styles.details}>{order.details}</Text>
            <View style={[styles.statusBadge, styles[`statusBadge_${order.status}`]]}>
                <Text style={styles.statusText}>{order.status}</Text>
            </View>
            <Text style={styles.date}>{order.date}</Text>
            <Text style={styles.itemsTitle}>Items Ordered:</Text>

            <FlatList
                data={order.items}
                keyExtractor={item => item.id.toString()}
                renderItem={({ item }) => (
                    <View style={styles.orderItem}>
                        <Image source={item.heroImage} style={styles.heroImage} />
                        <View style={styles.itemInfo}>
                            <Text style={styles.itemName}>{item.title}</Text>
                            <Text style={styles.itemPrice}>Price: ${item.price}</Text>
                        </View>
                    </View>
                )}
            />


        </View>
    );
};

export default OrderDetails

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: "yellow",
    },
    item: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 8,
        backgroundColor: "pink",
    },
    details: {
        fontSize: 16,
        marginBottom: 4,
    },
    statusBadge: {
        padding: 8,
        borderRadius: 4,
        alignSelf: "flex-start",
    },
    statusBadge_Pending: {
        backgroundColor: 'orange',
    },
    statusBadge_Completed: {
        backgroundColor: 'green',
    },
    statusBadge_Shipped: {
        backgroundColor: 'blue',
    },
    statusBadge_Text: {
        color: 'white',
        fontWeight: "bold",
    },
    statusBadge_InTransit: {
        backgroundColor: 'purple',
    },
    statusText: {
        color: '#fff',
        fontWeight: "bold",
    },
    date: {
        fontSize: 14,
        color: '#555',
        marginTop: 16,
    },
    itemsTitle: {
        fontSize: 18,
        fontWeight: "bold",
        marginTop: 16,
        marginBottom: 8,
    },
    orderItem: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: 'center',
        marginTop: 8,
        padding: 16,
        backgroundColor: 'pink',
        borderRadius: 8,
    },
    heroImage: {
        width: '50%',
        height: 100,
        borderRadius: 10,
    },
    itemInfo: {
        backgroundColor: 'yellow',
    },
    itemName: {
        fontSize: 16,
        fontWeight: "bold",
    },
    itemPrice: {
        fontSize: 14,
        marginTop: 4,
    },

})