import {
  Image,
  Stack,
  Spinner,
  YStack
} from '@my/ui'
import { FlatList, Dimensions, RefreshControl, SafeAreaView } from "react-native"
import React from 'react'
import Search from 'app/components/search'
import useGallery from './hooks'

export const Gallery = () => {
  const { images, fetchMore, searchByText, isLoading } = useGallery()
  const sideSpace = 16
  const columms = 2

  return (
    <SafeAreaView 
      // ignoring this as the type definition doesnt support flex, but we can still use flex as it's a valid prop
      // @ts-ignore
      flex={1}
    >
      <YStack testID="gallery" f={1} jc="center" ai="center" p="$4" space>
        <Search searchByText={searchByText} />
        {images.length === 0 && isLoading && 
          <Stack flex={1} padding="$4">
            <Spinner />
          </Stack>}
        <Stack flex={1}>
          {images.length > 0 && <FlatList
            testID="gallery-list"
            data={images}
            numColumns={2}
            initialNumToRender={8} // just render what the user will see for performance
            maxToRenderPerBatch={10}
            renderItem={({ item, index }) => <Image 
              key={item.id + index}
              accessibilityRole='image'
              source={{
                uri: `http://farm${item.farm}.static.flickr.com/${item.server}/${item.id}_${item.secret}.jpg`,
                width: Dimensions.get('window').width / columms - sideSpace,
                height: Dimensions.get('window').width / columms - sideSpace,
            }} />}
            refreshing={isLoading}
            onEndReachedThreshold={0.5}
            refreshControl={
              <RefreshControl refreshing={isLoading} onRefresh={() => {
                fetchMore()
              }} />
            }
            onEndReached={() => fetchMore()}
          />}
        </Stack>
      </YStack>
    </SafeAreaView>
  )
}
