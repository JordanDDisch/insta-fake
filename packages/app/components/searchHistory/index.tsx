import React, { useState, useEffect } from 'react'
import {
  Sheet,
  Text,
  Stack
} from '@my/ui'
import { SafeAreaView, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface searchHistory {
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
  searchByText: (text: string) => void
}

const searchHistory = ({ open, setOpen, searchByText }:searchHistory) => {
  const [searchTermHistory, setSearchTermHistory] = useState<string[] | null>(null)

  useEffect(() => {
    (async () => {
      const searchHistory = await AsyncStorage.getItem('searchTerms')

      if(searchHistory) {
        console.log(searchHistory)
        setSearchTermHistory(JSON.parse(searchHistory))
      }
    })()
  }, [open])

  return <Sheet
    forceRemoveScrollEnabled={open}
    modal={true}
    open={open}
    onOpenChange={setOpen}
    dismissOnSnapToBottom
    position={0}
    zIndex={100_000}
  >
    <Sheet.Overlay
      animation="lazy"
      enterStyle={{ opacity: 0 }}
      exitStyle={{ opacity: 0 }}
    />
    <Sheet.Handle />
    <Sheet.Frame padding="$4">    
      <SafeAreaView>
        <ScrollView>
          <Text fontSize={"$6"} pb="$4">Search History</Text>
          <Stack space="$5" overflow='scroll'>
            {searchTermHistory && searchTermHistory.map((searchTerm, index) => <Text
              key={searchTerm + index}
              onPress={() => {
                searchByText(searchTerm)
                setOpen(false)
              }}
            >
              {searchTerm}
            </Text>)}
          </Stack>
        </ScrollView>
      </SafeAreaView>
    </Sheet.Frame>
  </Sheet>
}

export default searchHistory