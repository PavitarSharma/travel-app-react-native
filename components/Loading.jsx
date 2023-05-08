import { View, Text, ActivityIndicator } from 'react-native'
import React from 'react'

const Loading = () => {
  return (
    <View className="items-center justify-center">
      <ActivityIndicator size={'large'} color="blue" />
    </View>
  )
}

export default Loading