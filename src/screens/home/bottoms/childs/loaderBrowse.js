import React from 'react';
import { View, Dimensions, I18nManager } from 'react-native';
import ContentLoader, { Rect } from 'react-content-loader/native'
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import { moderateScale } from 'react-native-size-matters';
import { theme } from '../../../../core/theme';


const LoaderBrowse = ({ isLoading }) => {

    if (isLoading) {
        return (

            <View style={{ flex: 1, zIndex: 1, marginTop: getStatusBarHeight() + moderateScale(0), marginTop: getStatusBarHeight() + moderateScale(0), paddingTop: moderateScale(75), flexDirection: 'column' }}>
                <View style={{ flex: 1, zIndex: 1, flexDirection: 'row' }}>

                    <View style={{ flex: 1, zIndex: 1, paddingStart: moderateScale(10) }}>
                        <ContentLoader height={moderateScale(15)} width={moderateScale(100)} speed={1}
                            style={{ ...I18nManager.isRTL ? { marginStart: moderateScale(10) } : {} }} backgroundColor={theme.colors.gray05}
                            foregroundColor={theme.colors.secondary}
                            foregroundOpacity={0.001} interval={0.1}>
                            <Rect x="10" y="0" rx="0" ry="0" width="90%" height="15" />
                        </ContentLoader>
                        <View style={{ marginTop: moderateScale(5), ...I18nManager.isRTL ? { marginEnd: moderateScale(10) } : { marginStart: moderateScale(10), } }}>
                            <View style={{ flexDirection: 'row', width: '95%', alignSelf: 'flex-start', justifyContent: 'center', alignContent: 'center', alignItems: "center", ...I18nManager.isRTL ? { marginStart: moderateScale(10) } : {} }}>
                                <View style={{ height: moderateScale(3), flex: 1, backgroundColor: theme.colors.secondary, }} />
                                <View style={{
                                    width: moderateScale(10),
                                    height: moderateScale(10),
                                    marginHorizontal: moderateScale(10),
                                    backgroundColor: theme.colors.secondary,
                                    transform: [
                                        { rotate: '45deg' }
                                    ]
                                }} />
                            </View>
                        </View>

                        <ContentLoader height={'32%'} width={Dimensions.get('window').width} speed={1} style={{ marginTop: moderateScale(10), ...I18nManager.isRTL ? { marginStart: moderateScale(10) } : {} }}
                            backgroundColor={theme.colors.gray05}
                            foregroundColor={theme.colors.secondary}
                            foregroundOpacity={0.001} interval={0.1}>

                            {I18nManager.isRTL &&
                                <Rect x="12%" y="0" rx="0" ry="0" width="100%" height="100%" />
                            }
                            {!I18nManager.isRTL &&
                                <Rect x="2%" y="0" rx="0" ry="0" width="90%" height="100%" />
                            }



                        </ContentLoader>

                    </View>


                </View>


            </View>

        );
    } else {
        return null;
    }

};
export default LoaderBrowse;
