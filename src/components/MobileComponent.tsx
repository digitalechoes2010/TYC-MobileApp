import React, {createRef, FC, useState} from 'react';
import {TouchableOpacity, View} from 'react-native';
import {TextInput} from 'react-native-paper';
import styles from '../containers/AuthContainer/SignIn/LoginStyle';
import countryDialList from '../lib/countryDial';
import {Picker} from '@react-native-picker/picker';
import theme from '../config/themeConfig';

interface IProps {
  mobile: string;
  setChange: (text: string) => void;
  style: any;
}
const MobileComponent: FC<IProps> = ({style, form, field, ...props}) => {
  const [selectedCountry, setSelectedCountry] = useState();
  const pickerRef = createRef();
  function openPicker() {
    pickerRef.current.focus();
  }
  return (
    <View style={style}>
      <TouchableOpacity onPress={openPicker} style={{flex: 0.4}}>
        <TextInput
          style={[styles.textInput, {marginBottom: 0, paddingRight: 0}]}
          mode={'outlined'}
          editable={false}
          outlineColor={theme.colors.background}
          placeholder={'choose'}>
          {selectedCountry
            ? selectedCountry?.flag + ' ' + selectedCountry?.dial_code
            : ''}
        </TextInput>
      </TouchableOpacity>
      <Picker
        ref={pickerRef}
        style={{flex: 0.02, alignSelf: 'center'}}
        onValueChange={itemValue => {
          setSelectedCountry(itemValue);
        }}
        selectedValue={selectedCountry}>
        {countryDialList.map((country, i) => (
          <Picker.Item
            key={country.code}
            label={country.flag + '-' + country.name + '-' + country.dial_code}
            value={country}
          />
        ))}
      </Picker>
      <TextInput
        name={'mobile'}
        keyboardType={'phone-pad'}
        onChangeText={text => {
          if (selectedCountry) {
            form.handleChange('mobile', text);
          }
        }}
        outlineColor={theme.colors.background}
        mode={'outlined'}
        style={[
          styles.textInput,
          {
            flex: 0.8,
            marginBottom: 0,
          },
        ]}
        label={'mobile'}
      />
    </View>
  );
};

export default MobileComponent;
