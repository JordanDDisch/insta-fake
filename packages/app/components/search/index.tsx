import {
  Input, 
  Stack,
  Button
} from '@my/ui'
import { History } from '@tamagui/lucide-icons'
import { useState } from 'react'

import SearchHistory from '../searchHistory'

interface SearchProps {
  searchByText: (text: string) => void
}

const search = ({ searchByText }:SearchProps) => {
  const [text, setText] = useState("")
  const [open, setOpen] = useState(false)

  return <Stack width={"100%"} space="$4">
    <Stack position='relative'>
      <Input placeholder="Search" value={text} onChangeText={(value) => setText(value)} />
      <Stack onPress={() => setOpen(true)} position='absolute' bottom={10} right={10}>
        <History size={24} />
      </Stack>
    </Stack>
    <Button backgroundColor="$color.gray2Dark" color="white" onPress={() => searchByText(text)}>Search</Button>
    <SearchHistory open={open} setOpen={setOpen} searchByText={searchByText} />
  </Stack>
}

export default search
