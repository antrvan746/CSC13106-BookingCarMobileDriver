import React, { useRef } from 'react';
import { Animated, PanResponder, Platform, StyleProp, StyleSheet, View } from 'react-native';

interface BottomBoxProps {
  content: JSX.Element,
  box_max_h: number,
  box_min_h: number,
  max_down_translateY?: number,
  drag_threshold?: number
}

function BottomBox(props: BottomBoxProps): JSX.Element {
  const MAX_UPWARD_TRANSLATE_Y = props.box_min_h - props.box_max_h; // negative number;
  const MAX_DOWNWARD_TRANSLATE_Y = props.max_down_translateY || 0;
  const DRAG_THRESHOLD = props.drag_threshold || 50;

  const animatedValue = useRef(new Animated.Value(0)).current;
  const lastGestureDy = useRef(0);
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderGrant: (e) => {
        animatedValue.setOffset(lastGestureDy.current);
      },
      onPanResponderMove: (e, gesture) => {
        animatedValue.setValue(gesture.dy);
      },
      onPanResponderRelease: (e, gesture) => {
        animatedValue.flattenOffset();
        lastGestureDy.current += gesture.dy;

        if (gesture.dy > 0) {
          // dragging down
          if (gesture.dy <= DRAG_THRESHOLD) {
            springAnimation('up');
          } else {
            springAnimation('down');
          }
        } else {
          // dragging up
          if (gesture.dy >= (-1 * DRAG_THRESHOLD)) {
            springAnimation('down');
          } else {
            springAnimation('up');
          }
        }
      },
    }),
  ).current;

  const springAnimation = (direction: 'up' | 'down') => {
    // console.log('direction', direction);
    lastGestureDy.current =
      direction === 'down' ? MAX_DOWNWARD_TRANSLATE_Y : MAX_UPWARD_TRANSLATE_Y;
    Animated.spring(animatedValue, {
      toValue: lastGestureDy.current,
      useNativeDriver: true,
    }).start();
  };



  const bottomSheetStyle: StyleProp<any> = {
    position: 'absolute',
    width: '100%',
    height: props.box_max_h,
    bottom: props.box_min_h - props.box_max_h,
    ...Platform.select({
      android: { elevation: 8 },
      ios: {
        shadowColor: '#a8bed2',
        shadowOpacity: 1,
        shadowRadius: 6,
        shadowOffset: { width: 2, height: 2, },
      },
    }),
    backgroundColor: 'white',
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
  }

  const bottomSheetAnimation = {
    transform: [
      {
        translateY: animatedValue.interpolate({
          inputRange: [MAX_UPWARD_TRANSLATE_Y, MAX_DOWNWARD_TRANSLATE_Y],
          outputRange: [MAX_UPWARD_TRANSLATE_Y, MAX_DOWNWARD_TRANSLATE_Y],
          extrapolate: 'clamp',
        }),
      },
    ],
  };

  return (<View style={styles.container} {...panResponder.panHandlers}>
    <Animated.View style={[bottomSheetStyle, bottomSheetAnimation]}>
      <View style={styles.draggableArea} >
        <View style={styles.dragHandle} />
      </View>
      {props.content}
    </Animated.View>
  </View>)
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  draggableArea: {
    width: 132,
    height: 32,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dragHandle: {
    width: 100,
    height: 6,
    backgroundColor: '#d3d3d3',
    borderRadius: 10,
  },
});

export default BottomBox;