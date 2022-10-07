/* eslint-disable handle-callback-err */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/self-closing-comp */
/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {Alert, Image, Linking, Platform, View} from 'react-native';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import {ActivityIndicator, Text} from 'react-native-paper';
import theme from '../../../config/themeConfig';
import metrics from '../../../utils/metrics';
import styles from '../../AuthContainer/SignIn/LoginStyle';
import * as Icons from '../../../assets/images/icons/icon';
import MIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import IIcon from 'react-native-vector-icons/Ionicons';
import FIcon from 'react-native-vector-icons/Fontisto';
import {Button, Card, Dialog, FAB, Portal, TextInput} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Formik} from 'formik';
import * as yup from 'yup';
import apiClient from '../../../config/clients';
import ApiConfig from '../../../config/apiConfig';
import {useDispatch} from 'react-redux';
import {setUserdata} from '../../../store/Actions/UserActions';
import {getMediaType, makeLink, showTost} from '../../../utils/helper';
import DocumentPicker from 'react-native-document-picker';
import BusinessCardDetails from './BusinessCardDetails';
import VideoPlayer from 'react-native-video-controls';
import {deleteMedia} from '../../../services/user.service';
import MediaUploadModal from '../../../components/MediaUploadModal';

const BusinessComponent = (props: any) => {
  const [showItem, setShowItem] = useState(false);
  const [inputData, setInputData] = useState({
    phone: '',
    email: '',
    skills: '',
    job: '',
    industry: '',
    education: '',
    interests: '',
    address: '',
  });
  const [isUploading, setisUploading] = useState(false);
  const [file, setFile] = useState();
  const [fileName, setFileName] = useState();
  const [dgType, setDgType] = useState('BCARD'); //BCARD / BIMAGE / BVIDEO / BDOC
  const [cuItem, setCuItem] = useState({});

  const dispatch = useDispatch();

  useEffect(() => {
    loadData();
  }, [props.profileData.buisnessCard]);

  const loadData = () => {
    console.log('props.profileData', props.profileData);

    if (
      props.profileData.buisnessCard &&
      props.profileData.buisnessCard.length > 0
    ) {
      props.profileData.buisnessCard.map((e: any) => {
        inputData[e.name] = e.uri;
      });
    }
    setInputData(Object.assign({}, inputData));
  };

  const hideDialog = () => {
    setShowItem(false);
  };

  const showDialog = (param: any) => {
    setDgType(param);
    setShowItem(true);
  };

  const handleUpdate = (params: any) => {
    let payload: {uri: any; name: string}[] = [];
    Object.keys(params).map(function (key, index) {
      payload.push({
        uri: params[key],
        name: key,
      });
    });
    apiClient
      .patch(ApiConfig.buisnessCard, {
        buisnessCard: payload,
      })
      .then((data: any) => {
        dispatch(setUserdata(data.data));
      })
      .catch((error: any) => {
        Alert.alert('error', 'Something went wrong');
      })
      .finally(() => {
        setShowItem(false);
      });
  };

  /**
   * upload media
   */
  const selectDoc = async () => {
    try {
      const res: any = await DocumentPicker.pickSingle({
        type: [DocumentPicker.types.allFiles],
      });
      console.log('res', res);
      await setFile(res);
      // await uploadFile(res);
    } catch (err) {
      // console.log(DocumentPicker.isCancel(err), err);
    }
  };

  const uploadFile = async (doc: any, name?: any) => {
    try {
      setisUploading(true);
      const docName = name ? name : doc.name;
      const files: any = {
        uri: doc.uri,
        type: doc.type,
        name: docName,
      };
      let formData = new FormData();
      formData.append('file', files);

      apiClient
        .post(
          ApiConfig.uploadMedia +
            encodeURIComponent(files.type) +
            '/' +
            files.name,
          formData,
        )
        .then(data => {
          console.log('upload res', data);
          let mediaData =
            props.profileData.medias && props.profileData.medias.length > 0
              ? props.profileData.medias
              : [];
          dispatch(setUserdata({medias: mediaData.concat(data.data)}));
          setisUploading(true);
        })
        .catch((err: any) => {
          setisUploading(false);
        });
    } catch (error) {
      showTost('Unable to upload the image');
    }
  };

  const showMedia = (e: any, typeArr: any) => {
    console.log('e', e, typeArr);

    if (typeArr.type == 'image') {
      setCuItem(e);
      showDialog('BIMAGE');
    } else if (typeArr.type == 'video') {
      setCuItem(e);
      showDialog('BVIDEO');
    } else {
      setCuItem(e);
      showDialog('BDOC');
    }
  };

  const deleteMediaById = async (e: any) => {
    const data = await deleteMedia(e.id);
    console.log('data', data);
    if (data.data?.ack == 1) {
      let mediaData =
        props.profileData.medias && props.profileData.medias.length > 0
          ? props.profileData.medias
          : [];
      dispatch(
        setUserdata({medias: mediaData.filter((item: any) => item.id != e.id)}),
      );
    } else {
      Alert.alert('error', 'something went wrong');
    }
    hideDialog();
  };

  return (
    <>
      <View style={{padding: 10, backgroundColor: 'black'}}>
        <View>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <MIcon
              name={'link-variant'}
              color={'white'}
              size={metrics.moderateScale(22)}
            />
           <Text style={{color: 'white', marginLeft: 10}}>
              Connections{' ' + (props.profileData?.connectionCount ?? 0)}
            </Text>
          </View>
          <View style={{flexDirection: 'row', alignItems: 'center', marginTop: 10}}>
            <MIcon
              name={'briefcase-variant'}
              color={'white'}
              size={metrics.moderateScale(22)}
            />
            <Text style={{color: 'white', marginLeft: 10}}>{inputData.education}</Text>
          </View>
          <View style={{flexDirection: 'row', alignItems: 'center', marginTop: 10}}>
            <IIcon
              name={'call'}
              color={'white'}
              size={metrics.moderateScale(20)}
            />
          <Text style={{color: 'white', marginLeft: 10}}>{inputData.phone}</Text>
          </View>
          <View style={{flexDirection: 'row', alignItems: 'center', marginTop: 10}}>
            <FIcon
              name={'email'}
              color={'white'}
              size={metrics.moderateScale(20)}
            />
            <Text style={{color: 'white', marginLeft: 10}}>{inputData.email}</Text>
          </View>
          <View style={{flexDirection: 'row', alignItems: 'center', marginTop: 10}}>
            <IIcon
              name={'globe-outline'}
              color={'white'}
              size={metrics.moderateScale(22)}
            />
            <Text style={{color: 'white', marginLeft: 10}}>{makeLink(props.profileData)}</Text>
          </View>
          </View>
          
          <View style={{flexDirection: 'row', alignItems: 'center', marginTop: 10}}>
            <IIcon
              name={'location'}
              color={'white'}
              size={metrics.moderateScale(22)}
            />
            <Text style={{color: 'white', marginLeft: 10}}>{inputData.address}</Text>
          </View>
            <TouchableOpacity
              onPress={() => showDialog('BCARD')}
              style={{marginTop: 5, padding: 2.5, borderRadius:100, backgroundColor: theme.colors.secondary, alignSelf: 'flex-end'}}>
                <MIcon
                  name={'square-edit-outline'}
                  color={'white'}
                  size={metrics.moderateScale(22)}
                />
            </TouchableOpacity>
        </View>
        <View style={{paddingHorizontal: 10}}>

       

        <View style={styles.mdCOntainer}>
          <Text style={{color: 'black', fontSize: 20, fontWeight: 'bold', marginVertical: 10}}>Media</Text>
          {props.type != 'ctUserData' &&
            (isUploading ? (
              <TouchableOpacity
                onPress={() => {}}
                disabled={true}
                style={[styles.addMediaBtn, {backgroundColor: 'gray'}]}>
                <ActivityIndicator size={'small'} color={theme.colors.accent} />
              </TouchableOpacity>
            ) : (
              <MediaUploadModal
                selectDoc={selectDoc}
                uploadFile={() => uploadFile(file, fileName && fileName)}
                File={file}
                setFileName={setFileName}
                isUploading={isUploading}
              />
            ))}
        </View>
        <View style={styles.mediaContainer}>
          {props.profileData.medias &&
            props.profileData.medias.length > 0 &&
            props.profileData.medias.map((e: any, i: any) => {
              let typeArr = getMediaType(e.type);
              return (
                <TouchableOpacity
                  onPress={() => {
                    showMedia(e, typeArr);
                  }}
                  style={[
                    styles.mdbox,
                    typeArr.type != 'image' && {
                      backgroundColor: '#d9d9d9',
                    },
                  ]}
                  key={Math.random()}>
                  {typeArr.type == 'image' ? (
                    <Image
                      source={{uri: e.thumbnailUrl}}
                      style={styles.imgBOX}
                    />
                  ) : (
                    <typeArr.icon />
                  )}
                </TouchableOpacity>
              );
            })}
        </View>
        <Text style={{color: 'black', fontSize: 20, fontWeight: 'bold', marginVertical: 10}}>Links</Text>
        </View>
   
      <Portal>
        <Dialog
          visible={showItem}
          onDismiss={hideDialog}
          style={styles.dialogBoxBuss}>
          <Dialog.Actions style={styles.dgAc}>
            <Button
              onPress={hideDialog}
              icon={() => <Icon name={'close-circle-outline'} size={40} />}
            />
          </Dialog.Actions>

          <Dialog.Title style={styles.dgTitle}>{cuItem.name}</Dialog.Title>
          <Dialog.Content>
            {dgType == 'BCARD' && (
              <BusinessCardDetails
                inputData={inputData}
                handleUpdate={handleUpdate}
                isOwn={props.type}
              />
            )}
            {dgType == 'BIMAGE' && (
              <View>
                <Image
                  source={{uri: cuItem.thumbnailUrl}}
                  style={[
                    styles.imgBOX,
                    {
                      height: metrics.moderateScale(300),
                      width: metrics.moderateScale(300),
                    },
                  ]}
                />
                {props.type != 'ctUserData' && (
                  <Button
                    onPress={() => deleteMediaById(cuItem)}
                    mode={'contained'}
                    style={[
                      styles.addMediaBtn2,
                      {
                        backgroundColor: theme.colors.pinterest,
                        alignSelf: 'center',
                      },
                    ]}>
                    <Text style={styles.t1}>Delete</Text>
                  </Button>
                )}
              </View>
            )}
            {dgType == 'BVIDEO' && (
              <View
                style={{
                  height: metrics.moderateScale(300),
                  width: metrics.moderateScale(300),
                }}>
                <VideoPlayer source={{uri: cuItem.url}} disableBack />
                {props.type != 'ctUserData' && (
                  <Button
                    onPress={() => deleteMediaById(cuItem)}
                    mode={'contained'}
                    style={[
                      styles.addMediaBtn2,
                      {
                        backgroundColor: theme.colors.pinterest,
                        alignSelf: 'center',
                      },
                    ]}>
                    <Text style={styles.t1}>Delete</Text>
                  </Button>
                )}
              </View>
            )}
            {dgType == 'BDOC' && (
              <View
                style={{
                  height: metrics.moderateScale(150),
                  alignItems: 'center',
                }}>
                <Button
                  onPress={() => Linking.openURL(cuItem.url)}
                  mode={'contained'}
                  style={styles.addMediaBtn2}>
                  <Text style={styles.t1}>Download</Text>
                </Button>
                {props.type != 'ctUserData' && (
                  <Button
                    onPress={() => deleteMediaById(cuItem)}
                    mode={'contained'}
                    style={[
                      styles.addMediaBtn2,
                      {backgroundColor: theme.colors.pinterest},
                    ]}>
                    <Text style={styles.t1}>Delete</Text>
                  </Button>
                )}
              </View>
            )}
          </Dialog.Content>
        </Dialog>
      </Portal>
    </>
  );
};
export default BusinessComponent;
