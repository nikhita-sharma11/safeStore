import React from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import {useSelector} from 'react-redux';

const ProductDetailsScreen = () => {
  const selectedProduct = useSelector(state => state.selectedProduct);

  return (
    <View style={styles.container}>
      <Text style={styles.productTitle}>{selectedProduct.title}</Text>
      <Image
        source={{uri: selectedProduct.image}}
        style={styles.productImage}
      />
      <View style={styles.priceContainer}>
        <Text style={styles.productPriceText}>${selectedProduct.price}</Text>
      </View>
      <Text style={styles.productDescription}>
        {selectedProduct.description}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 25,
    backgroundColor: '#EDE7F6',
  },
  productImage: {
    width: '100%',
    height: 300,
    resizeMode: 'cover',
    borderRadius: 10,
    marginBottom: 20,
  },
  productTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 10,
    color: '#512DA8',
    borderRadius: 8,
  },
  priceContainer: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 8,
    marginTop: 10,
    width: 100,
  },
  productPriceText: {
    fontSize: 18,
    color: '#512DA8',
  },
  productDescription: {
    fontSize: 16,
    marginTop: 20,
    backgroundColor: 'white',
    padding: 20,
    color: '#c0afe2',
  },
});

export default ProductDetailsScreen;
