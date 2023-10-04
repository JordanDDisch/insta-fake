import { useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { flikrSearchEndpoint, flikrSearchParams } from '../../../config/endpoints';

type FlickrImage = {
  id: string;
  owner: string;
  secret: string;
  server: string;
  farm: number;
  title: string;
  ispublic: number;
  isfriend: number;
  isfamily: number;
}

interface UseGallery {
  images: FlickrImage[]
  fetchMore: () => void
  searchText: string
  searchByText: (text: string) => void
  isLoading: boolean
}

const useGallery = ():UseGallery => {
  const [currentPage, setCurrentPage] = useState(1) // the api uses 1 as the first page and not 0
  const pageSize = 10 // most screen sizes will hold 8 images per page, but we'll use 10 to keep the loading experience snappy
  const [searchText, setSearchText] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [images, setImages] = useState<FlickrImage[]>([])
  const searchParams = flikrSearchParams(pageSize, searchText, currentPage)
  const api = flikrSearchEndpoint(searchParams)

  useEffect(() => {
    const fetchImages = async () => {
      setIsLoading(true)

      try {
        const response = await fetch(
          api,
        );

        const json = await response.json();

        if(json.stat === "ok") setImages([...images, ...json.photos.photo])
        
        setIsLoading(false)
        return json.photos;
      } catch (error) {
        console.error(error);
      }
    }

    searchText && fetchImages()
  }, [searchText, currentPage])

  const fetchMore = async () => {
    setCurrentPage(currentPage + 1)
  }

  const searchByText = async (text: string) => {
    await saveSearchTerm(text)
    setImages([])
    setSearchText(text)
    setCurrentPage(1)
  }

  const saveSearchTerm = async (text: string) => {
    const searchHistory = await AsyncStorage.getItem('searchTerms')

    if(searchHistory) {
      const searchHistoryArray = JSON.parse(searchHistory)
      await AsyncStorage.setItem('searchTerms', JSON.stringify([text, ...searchHistoryArray])).catch((error) => {
        console.log(error)
      })
    } else {
      await AsyncStorage.setItem('searchTerms', JSON.stringify([text])).catch((error) => {
        console.log(error)
      })
    }
  }

  return { 
    images,
    fetchMore,
    searchText,
    searchByText,
    isLoading
  }
}

export default useGallery