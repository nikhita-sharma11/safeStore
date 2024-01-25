import React, {useState, useLayoutEffect} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  ImageBackground,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {addToCart} from '../redux/reducer/cartAction';

const ProductDetailsScreen = ({navigation}) => {
  const selectedProduct = useSelector(state => state.selectedProduct);
  const dispatch = useDispatch();
  const [showDetails, setShowDetails] = useState(false);

  const handleAddToCart = () => {
    dispatch(addToCart(selectedProduct));
    navigation.navigate('MyCart');
  };

  const toggleDetails = () => {
    setShowDetails(!showDetails);
  };

  const renderRatingStars = () => {
    const {rate, count} = selectedProduct.rating;
    const roundedRate = Math.round(rate);

    const stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(
        <Image
          key={i}
          source={
            i < roundedRate
              ? require('../assets/filledstar.png')
              : require('../assets/outline.png')
          }
          style={styles.starIcon}
        />,
      );
    }

    return (
      <View style={styles.ratingContainer}>
        <Text style={styles.ratingText}>{rate.toFixed(1)}</Text>
        {stars}
        <Text style={styles.ratingCount}>({count} reviews)</Text>
      </View>
    );
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);

  return (
    <ImageBackground
      source={require('../assets/backg.png')}
      style={styles.background}>
      <ScrollView style={styles.container}>
        <TouchableOpacity
          style={styles.backIcon}
          onPress={() => navigation.goBack()}>
          <Image
            source={require('../assets/5690080.png')}
            style={{width: 30, height: 30}}
          />
        </TouchableOpacity>

        <Image
          source={{uri: selectedProduct.image}}
          style={styles.productImage}
        />

        <Text style={styles.productTitle}>{selectedProduct.title}</Text>
        {renderRatingStars()}
        <View style={styles.priceContainer}>
          <Text style={styles.productPriceText}>
            ${selectedProduct.price.toFixed(2)}
          </Text>
        </View>
        <TouchableOpacity style={styles.viewSimilarButton} onPress={() => {}}>
          <Text style={styles.viewSimilarButtonText}>View Similar</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.showDetailsButton}
          onPress={toggleDetails}>
          <Text style={styles.showDetailsButtonText}>
            {showDetails ? 'Hide Details' : 'Show Details'}
          </Text>
        </TouchableOpacity>

        {showDetails && (
          <View style={styles.detailsContainer}>
            <Text style={styles.productDescription}>
              {selectedProduct.description}
            </Text>
          </View>
        )}
        <TouchableOpacity
          style={styles.addToCartButton}
          onPress={handleAddToCart}>
          <Text style={styles.addToCartButtonText}>Add to Cart</Text>
        </TouchableOpacity>
      </ScrollView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'fill',
  },
  container: {
    flex: 1,
    padding: 25,
  },
  backIcon: {
    marginBottom: 20,
  },
  productImage: {
    width: '100%',
    height: 350,
    resizeMode: 'stretch',
    borderRadius: 2,
  },
  productTitle: {
    fontSize: 24,
    marginTop: 10,
    marginBottom: 10,
    color: '#fff',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    color: 'gold',
    fontSize: 18,
    marginRight: 5,
  },
  starIcon: {
    width: 20,
    height: 20,
    tintColor: 'gold',
  },
  ratingCount: {
    color: '#fff',
    fontSize: 14,
  },
  priceContainer: {},
  productPriceText: {
    fontSize: 20,
    color: 'white',
  },
  showDetailsButton: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  showDetailsButtonText: {
    color: '#007BFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  detailsContainer: {
    backgroundColor: '#fff',
    padding: 20,
    marginTop: 10,
    borderRadius: 8,
  },
  productDescription: {
    fontSize: 16,
    color: '#007BFF',
  },
  addToCartButton: {
    backgroundColor: '#007BFF',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 50,
  },
  addToCartButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  viewSimilarButton: {
    backgroundColor: '#fff',
    padding: 10,
    alignItems: 'center',
    height: 40,
    width: 90,
    marginTop: 10,
    marginLeft: 250,
    marginTop: -30,
    borderRadius: 8,
  },
  viewSimilarButtonText: {
    color: '#007BFF',
    fontSize: 12,
    fontWeight: 'bold',
  },
});

export default ProductDetailsScreen;
