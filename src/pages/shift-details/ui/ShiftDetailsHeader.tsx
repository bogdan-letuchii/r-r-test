import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import Animated, {
  Extrapolation,
  interpolate,
  SharedValue,
  useAnimatedStyle,
} from 'react-native-reanimated';

interface ShiftDetailsHeaderProps {
  logo: string;
  companyName: string;
  customerRating: number | null;
  scrollY: SharedValue<number>;
  headerMaxHeight: number;
  headerMinHeight: number;
}

export const ShiftDetailsHeader: React.FC<ShiftDetailsHeaderProps> = React.memo(
  ({
    logo,
    companyName,
    customerRating,
    scrollY,
    headerMaxHeight,
    headerMinHeight,
  }) => {
    const headerScrollDistance = headerMaxHeight - headerMinHeight;

    const headerAnimatedStyle = useAnimatedStyle(() => {
      const height = interpolate(
        scrollY.value,
        [0, headerScrollDistance],
        [headerMaxHeight, headerMinHeight],
        Extrapolation.CLAMP,
      );

      return { height };
    });

    const imageOpacityStyle = useAnimatedStyle(() => {
      const opacity = interpolate(
        scrollY.value,
        [0, headerScrollDistance / 2],
        [1, 0],
        Extrapolation.CLAMP,
      );

      return { opacity };
    });

    const imageScaleStyle = useAnimatedStyle(() => {
      const scale = interpolate(
        scrollY.value,
        [-100, 0, headerScrollDistance],
        [1.5, 1, 0.8],
        Extrapolation.CLAMP,
      );

      return { transform: [{ scale }] };
    });

    const titleOpacityStyle = useAnimatedStyle(() => {
      const opacity = interpolate(
        scrollY.value,
        [headerScrollDistance - 50, headerScrollDistance],
        [0, 1],
        Extrapolation.CLAMP,
      );

      return { opacity };
    });

    return (
      <Animated.View style={[styles.animatedHeader, headerAnimatedStyle]}>
        <Animated.View
          style={[styles.headerBackground, imageOpacityStyle, imageScaleStyle]}
        >
          {logo ? (
            <Image
              source={{ uri: logo }}
              style={styles.headerBackgroundImage}
              blurRadius={20}
            />
          ) : (
            <View style={styles.headerBackgroundPlaceholder} />
          )}
          <View style={styles.headerOverlay} />
        </Animated.View>

        <Animated.View style={[styles.headerContent, imageOpacityStyle]}>
          <View style={styles.headerLogoContainer}>
            {logo ? (
              <Image source={{ uri: logo }} style={styles.headerLogo} />
            ) : (
              <View style={[styles.headerLogo, styles.logoPlaceholder]}>
                <Text style={styles.headerLogoText}>
                  {companyName.charAt(0)}
                </Text>
              </View>
            )}
          </View>
          <Text style={styles.headerCompanyName} numberOfLines={2}>
            {companyName}
          </Text>
          <View style={styles.headerRating}>
            <Text style={styles.headerStar}>⭐</Text>
            <Text style={styles.headerRatingText}>
              {customerRating ? customerRating.toFixed(1) : '0.0'}
            </Text>
          </View>
        </Animated.View>

        <Animated.View style={[styles.compactHeader, titleOpacityStyle]}>
          <Text style={styles.compactTitle} numberOfLines={1}>
            {companyName}
          </Text>
        </Animated.View>
      </Animated.View>
    );
  },
);

const styles = StyleSheet.create({
  animatedHeader: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
    overflow: 'hidden',
    backgroundColor: '#FFFFFF',
  },
  headerBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  headerBackgroundImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  headerBackgroundPlaceholder: {
    width: '100%',
    height: '100%',
    backgroundColor: '#6C63FF',
  },
  headerOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
  headerContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 60,
  },
  headerLogoContainer: {
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  headerLogo: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 4,
    borderColor: '#FFFFFF',
  },
  headerLogoText: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#6B7280',
  },
  logoPlaceholder: {
    backgroundColor: '#E5E7EB',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerCompanyName: {
    fontSize: 26,
    fontWeight: '800',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 8,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  headerRating: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  headerStar: {
    fontSize: 18,
    marginRight: 4,
  },
  headerRatingText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  compactHeader: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 50,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  compactTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1F2937',
  },
});
