import { Gallery } from 'app/pages/gallery'
import { Stack } from 'expo-router'

export default function Screen() {
  return (
    <>
      <Stack.Screen
        options={{
          title: 'Home',
        }}
      />
      <Gallery />
    </>
  )
}
