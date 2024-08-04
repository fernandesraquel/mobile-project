import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialCommunityIcons as MCIcons } from '@expo/vector-icons';

const CustomerTabBar = ({ state, descriptors, navigation }) => {

  return (
    <View style={styles.tabBar}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        const iconName = {
          Feed: isFocused ? 'home' : 'home-outline',
          Clocks: isFocused ? 'clock' : 'clock-outline',
          Notifications: isFocused ? 'bell' : 'bell-outline',
          Chats: isFocused ? 'message' : 'message-outline',
        }[route.name];

        return (
          <TouchableOpacity
            key={route.key}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={styles.tabButton}
          >
            <View style={[
              styles.bgIcon, 
              { backgroundColor: isFocused ? '#DFDEF1' : 'transparent' }
            ]}>
              <MCIcons name={iconName} size={25} color={isFocused ? '#3c40c6' : '#222'} /> 
            </View>
            <Text style={{ 
              color: isFocused ? '#3c40c6' : '#000',
              fontSize: 14,
              fontWeight: isFocused ? 'bold' : 'normal',
              marginTop: 4,
              textAlign: 'center',
            }}>
              {label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    flexDirection: 'row',
    backgroundColor: '#fafafa',
    height: 85,
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
  tabButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
  },
  bgIcon: {
    paddingHorizontal: 22,
    borderRadius: 22,
    paddingVertical: 4,
  }
});

export default CustomerTabBar;
