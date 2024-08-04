import { FlatList, RefreshControl, StyleSheet, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { colors } from '../../../globals/colors';
import { Spacer } from '../../../components/common/Spacer';
import Button from '../../../components/Button/Button';
import {
  BORDER_RADIUS_SIZE,
  Fonts,
  HALF_MEDIUM_PADDING_SIZE,
  MEDIUM_PADDING_SIZE
} from '../../../globals/themes';
import { styles as GlobalStyles } from '../../SupplyFlow/StockScreen/styles';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { selectReturnList } from '../../../redux/selectors';
import { RootState } from '../../../redux/store';
import { returnActions } from '../../../redux/actions/combineAction';
import { LoadingIndicator } from '../../../components/LoadingIndicator';
import { NoDataView } from '../../../components/NoDataView';
import SupplyCard from '../components/SupplyCard';

export const DeliveryConfirmation = () => {
  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const navigation = useNavigation();

  useEffect(() => {
    dispatch(returnActions.getReturn('ACCEPTED'));
  }, [dispatch, isFocused]);

  const returnOrders = useSelector(selectReturnList);
  const isLoading = useSelector((state: RootState) => state.returnList.loading);
  const [refreshing, setRefreshing] = useState(false);

  const _onRefresh = () => {
    setRefreshing(true);
    dispatch(returnActions.getReturn('ACCEPTED'));
    setRefreshing(false);
  };

  const renderItem = ({ item }: any) => (
    <View style={styles.card}>
      <SupplyCard item={item} detail={true} />

      <View style={[GlobalStyles.flexRow, { justifyContent: 'space-between' }]}>
        <Button
          title="Confirm Delivery"
          style={{ backgroundColor: colors.primary }}
          textStyle={[{ fontFamily: Fonts.PoppinsMedium }]}
          onPress={() =>
            navigation.navigate('deliveryQRScan', {
              orderId: item.id
            })
          }
        />
      </View>
    </View>
  );

  return (
    <View style={styles.mainContainer}>
      {isLoading ? (
        <LoadingIndicator />
      ) : (
        <FlatList
          data={returnOrders}
          renderItem={renderItem}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={_onRefresh}
              tintColor={colors.primary}
            />
          }
          style={{ flex: 1 }}
          keyExtractor={item => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.flatlistContainerStyle}
          ListEmptyComponent={NoDataView}
          ItemSeparatorComponent={() => <Spacer spacing={5} />}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    paddingHorizontal: HALF_MEDIUM_PADDING_SIZE,
    backgroundColor: colors.backgroundColor
  },
  flatlistContainerStyle: {
    paddingVertical: MEDIUM_PADDING_SIZE,
    paddingHorizontal: HALF_MEDIUM_PADDING_SIZE
  },
  card: {
    backgroundColor: colors.white,
    shadowColor: colors.dark,
    shadowOffset: {
      width: 0,
      height: 0
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    borderRadius: BORDER_RADIUS_SIZE,
    elevation: 5,
    padding: MEDIUM_PADDING_SIZE,
    marginBottom: 5
  },
  circleView: {
    width: 36,
    height: 36,
    borderRadius: 92 / 2,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#E8ECF2',
    padding: 16,
    marginRight: 15
  },
  statusView: {
    backgroundColor: colors.primary,
    paddingHorizontal: 12,
    paddingVertical: 3,
    marginBottom: 5,
    borderRadius: 92 / 2
  }
});
