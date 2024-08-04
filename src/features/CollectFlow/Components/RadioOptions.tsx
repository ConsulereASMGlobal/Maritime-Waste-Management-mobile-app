import { Spacer } from '@src/components/common/Spacer';
import { TextField } from '@src/components/TextField/TextField';
import { colors } from '@src/globals/colors';
import { DynamicIcon } from '@src/utils/Dynamic/DynamicIcon';
import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';

const RadioButtonOtpions = ({
  title,
  options,
  selectedItem,
  onSelect
}: any) => {
  return (
    <>
      {title && <TextField style={styles.label}>{title} :</TextField>}
      <Spacer spacing={2} />
      <View style={styles.container}>
        {options.map((option: any) => (
          <TouchableOpacity
            key={option.id}
            style={[
              styles.optionButton,
              selectedItem?.id === option?.id && styles.selectedOption
            ]}
            onPress={() => onSelect(option)}>
            {selectedItem?.id === option?.id && (
              <DynamicIcon
                iconSize={16}
                iconColor={colors.white}
                iconName="checkmark-sharp"
              />
            )}
            <TextField
              style={[
                styles.optionText,
                {
                  color:
                    selectedItem?.id === option?.id ? colors.white : colors.dark
                }
              ]}>
              {option?.label}
            </TextField>
          </TouchableOpacity>
        ))}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    flexGrow: 1,
    flexShrink: 1,
    flexWrap: 'wrap'
  },
  optionButton: {
    borderWidth: 1,
    borderColor: colors.shaded,
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 10,
    height: 40,
    flexDirection: 'row',
    gap: 5
  },
  selectedOption: {
    backgroundColor: colors.primaryLight2
  },
  optionText: { textAlign: 'center' },
  label: {
    color: colors.dark,
    paddingBottom: 5,
    fontSize: 14
  }
});

export default RadioButtonOtpions;
