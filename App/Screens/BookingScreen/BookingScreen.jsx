import { View, Text, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import PageHeading from '../../Components/PageHeading'
import GlobalApi from '../../Utils/GlobalApi'
import { useUser } from '@clerk/clerk-react'
import BusinessListItem from '../BusinessListByCategoryScreen/BusinessListItem'

export default function BookingScreen() {
  const { user } = useUser();
  const [bookingsList, setBookingsList] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    user && getUserBookings();
  },[user])

  const getUserBookings = () => {
    setLoading(true);
    GlobalApi.getUserBookings(user.primaryEmailAddress.emailAddress).then(resp => {
      setBookingsList(resp.bookings);
      setLoading(false)
    })
  }
  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontFamily: 'outfit-medium', fontSize: 26 }}>My Bookings</Text>

      <View>
        <FlatList 
          data={bookingsList}
          onRefresh={() => getUserBookings()}
          refreshing={loading}
          renderItem={({item,index}) => (
            <BusinessListItem 
              business={item?.businessList}
              booking={item}
              />
          )}/>
      </View>
    </View>
  )
}