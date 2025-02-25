import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { MapRef } from 'react-map-gl'
import slugify from 'slugify'

import { CemeteryEntityFragment, ManagedObjectEntityFragment } from '@/graphql'
import { isDefined } from '@/utils/isDefined'

const slugifyText = (text: string) => {
  return slugify(text, { replacement: ' ', lower: true })
}

const getBoundsForLandmarks = (
  landmarks: (ManagedObjectEntityFragment | CemeteryEntityFragment)[],
) => {
  const longitudes =
    landmarks.map((landmark) => landmark.attributes?.longitude).filter(isDefined) ?? []
  const latitudes =
    landmarks.map((landmark) => landmark.attributes?.latitude).filter(isDefined) ?? []

  return [
    [Math.min(...longitudes), Math.min(...latitudes)],
    [Math.max(...longitudes), Math.max(...latitudes)],
  ] as [[number, number], [number, number]]
}

export const useMapWithFilteringAndSearch = (
  landmarks: (ManagedObjectEntityFragment | CemeteryEntityFragment)[] | undefined,
  defaultFilters: Record<string, boolean>,
) => {
  const [searchQuery, setSearchQuery] = useState('')

  const slugifiedSearchQuery = useMemo(() => {
    return slugifyText(searchQuery)
  }, [searchQuery])

  const [selectedTypes, setSelectedTypes] = useState<Record<string, boolean>>(defaultFilters)

  const [hoveredLandmarkSlug, setHoveredLandmarkSlug] = useState<string | null>(null)

  const [isMapOrFiltersDisplayed, setMapOrFiltersDisplayed] = useState(false)

  const toggleSelectedTypes = useCallback((selectedType: string) => {
    setSelectedTypes((prevState) => {
      return {
        ...prevState,
        [selectedType]: !prevState[selectedType],
      }
    })
  }, [])

  const validLandmarks = useMemo(() => {
    return (
      landmarks
        ?.map((landmark) => {
          const { address, title, slug, latitude, longitude } = landmark.attributes ?? {}
          if (address && title && slug && latitude && longitude) {
            return landmark
          }

          return null
        })
        .filter(isDefined) ?? []
    )
  }, [landmarks])

  const filteredLandmarks = useMemo(() => {
    // First apply search filter to all objects regardless of type selection
    const searchFilteredLandmarks = validLandmarks.filter((landmark) => {
      const matchesSearchQuery =
        slugifyText(landmark.attributes?.address ?? '').includes(slugifiedSearchQuery) ||
        slugifyText(landmark.attributes?.title ?? '').includes(slugifiedSearchQuery)

      // If there's no search query, keep all objects
      // Otherwise, only keep objects that match the search
      return !slugifiedSearchQuery || matchesSearchQuery
    })

    const isAnyFilterSelected = Object.values(selectedTypes).some(Boolean)

    // If no type filter is selected, return search-filtered objects
    if (!isAnyFilterSelected) {
      return searchFilteredLandmarks
    }

    // Otherwise, apply both search and type filters
    return searchFilteredLandmarks.filter((landmark) =>
      Object.entries(selectedTypes).some(
        ([type, isSelected]) => landmark.attributes?.type === type && isSelected,
      ),
    )
  }, [validLandmarks, selectedTypes, slugifiedSearchQuery])

  const mapRef = useRef<MapRef | null>(null)
  const initialBounds = useRef(filteredLandmarks && getBoundsForLandmarks(filteredLandmarks))

  const fitLandmarks = useCallback(
    (duration = 0) => {
      try {
        // This code fails when there is no cemeteries in the database.
        // For that reason there is a try-catch block. It's not clean but it's enough.
        mapRef.current?.fitBounds(getBoundsForLandmarks(filteredLandmarks), {
          padding: 100,
          offset: [0, 10],
          duration,
        })
      } catch {
        // When it fails, no one cares because there is no cemeteries :)
      }
    },
    [filteredLandmarks],
  )

  useEffect(() => {
    fitLandmarks(500)
  }, [fitLandmarks, filteredLandmarks])

  return {
    mapRef,
    initialBounds,
    searchQuery,
    setSearchQuery,
    selectedTypes,
    toggleSelectedTypes,
    hoveredLandmarkSlug,
    setHoveredLandmarkSlug,
    isMapOrFiltersDisplayed,
    setMapOrFiltersDisplayed,
    filteredLandmarks,
  }
}
