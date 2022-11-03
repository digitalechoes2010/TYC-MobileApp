import React, {useState} from 'react';
import {
  Alert,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {ActivityIndicator, Button, Dialog, TextInput} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import theme from '../config/themeConfig';
import metrics from '../utils/metrics';

const MediaUploadModal = (props: any) => {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View style={styles.ModalBtn}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal Closed.');
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View style={styles.mediaPicker}>
              {props.isUploading ? (
                <TouchableOpacity
                  onPress={() => {}}
                  disabled={true}
                  style={[styles.addMediaBtn, {backgroundColor: 'gray'}]}>
                  <ActivityIndicator
                    size={'small'}
                    color={theme.colors.accent}
                  />
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  onPress={props.selectDoc}
                  style={styles.addMediaBtn}>
                  <Text style={styles.t1}>PICK MEDIA</Text>
                </TouchableOpacity>
              )}
              <Text style={styles.t1Black}>
                {props.File ? props.File.name : 'No file selected'}
              </Text>
            </View>

            <TextInput
              label={'Enter custom media name'}
              mode="outlined"
              style={styles.input}
              onChangeText={props.setFileName}
            />

            <TouchableOpacity
              style={styles.UploadBtn}
              onPress={props.uploadFile}>
              <Icon
                name="plus"
                size={20}
                color="white"
                style={{marginRight: 5}}
              />
              <Text style={styles.t1}>ADD</Text>
            </TouchableOpacity>
            <Dialog.Actions style={styles.dgAc}>
              <Button
                onPress={() => setModalVisible(false)}
                icon={() => <Icon name={'close-circle-outline'} size={40} />}
              />
            </Dialog.Actions>
          </View>
        </View>
      </Modal>
      <Pressable
        style={[styles.button, styles.ModalBtn]}
        onPress={() => setModalVisible(true)}>
        <Text style={styles.textStyle}>ADD MEDIA</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    position: 'relative',
    width: 350,
    paddingTop: 60,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  addMediaBtn: {
    alignSelf: 'flex-end',
    justifyContent: 'center',
    borderRadius: 100,
    backgroundColor: theme.colors.primary,
    width: metrics.moderateScale(100),
    height: metrics.moderateScale(35),
    marginVertical: 10,
  },
  mediaPicker: {
    width: '100%',
  },
  ModalBtn: {
    justifyContent: 'center',
    borderRadius: 100,
    alignItems: 'center',
    textAlignVertical: 'center',
    backgroundColor: theme.colors.primary,
    width: metrics.moderateScale(100),
    height: metrics.moderateScale(40),
  },
  UploadBtn: {
    justifyContent: 'center',
    borderRadius: 100,
    alignItems: 'center',
    textAlignVertical: 'center',
    backgroundColor: theme.colors.secondary,
    width: metrics.moderateScale(120),
    height: metrics.moderateScale(40),
    flexDirection: 'row',
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  t1: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: metrics.moderateScale(14),
  },
  t1Black: {
    color: 'black',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: metrics.moderateScale(14),
    marginVertical: 10,
  },

  dgAc: {
    paddingHorizontal: 0,
    position: 'absolute',
    right: 0,
  },
  addButton: {marginTop: 20},
  input: {width: '100%', paddingTop: 0, marginBottom: 30, marginTop: 10},
});

export default MediaUploadModal;
