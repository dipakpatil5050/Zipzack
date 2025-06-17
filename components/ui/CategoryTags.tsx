import React from 'react';
import { View, ScrollView, StyleSheet, Platform } from 'react-native';
import ResponsiveTagButton from './ResponsiveTagButton';
import { getTagButtonMaxWidth, getTagButtonMinWidth, getTagButtonSpacing } from '../../styles/responsive';

interface CategoryTagsProps {
  categories: string[];
  selectedCategory: string;
  onCategorySelect: (category: string) => void;
}

export default function CategoryTags({
  categories,
  selectedCategory,
  onCategorySelect,
}: CategoryTagsProps) {
  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        // Improved scrolling performance
        decelerationRate="fast"
        snapToInterval={getTagButtonMaxWidth() + getTagButtonSpacing()}
        snapToAlignment="start"
      >
        {categories.map((category, index) => (
          <ResponsiveTagButton
            key={category}
            title={category}
            isSelected={selectedCategory === category}
            onPress={() => onCategorySelect(category)}
            maxWidth={getTagButtonMaxWidth()}
            minWidth={getTagButtonMinWidth()}
          />
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 8,
  },
  scrollView: {
    maxHeight: 60,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    alignItems: 'center',
  },
});