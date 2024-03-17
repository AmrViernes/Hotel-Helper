import React, { useEffect, useRef } from 'react';
import { View, Animated, StyleSheet } from 'react-native';

interface SkeletonPlaceholderProps {
  duration?: number;
}

const SkeletonPlaceholder: React.FC<SkeletonPlaceholderProps> = ({
  duration = 1000,
}) => {
  const shimmerAnimation = new Animated.Value(0);

  useEffect(() => {
    const startAnimation = () => {
      Animated.loop(
        Animated.timing(shimmerAnimation, {
          toValue: 1,
          duration,
          useNativeDriver: false,
        })
      ).start();
    };

    startAnimation();
  }, [shimmerAnimation, duration]);

  const translateX = shimmerAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [-300, 300],
  });

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.shimmer,
          {
            transform: [{ translateX }],
          },
        ]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
    overflow: 'hidden',
    borderRadius: 10,
  },
  shimmer: {
    backgroundColor: '#cccc',
    height: '100%',
    width: '100%',
  },
});

export default SkeletonPlaceholder;
