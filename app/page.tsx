'use client'
import React, { useEffect, useState } from 'react'
import classes from './classes.module.scss'
import dynamic from 'next/dynamic'
import Header from '@/src/components/materials/Header'
import imagesConfig from '../imagesConfigRevised.json'

export type ImageConfigItem = {
  url: string
  initialLeft: number
  initialTop: number
  initialScaleX: number
  initialScaleY: number
}

export type ImagesConfig = {
  [key: string]: ImageConfigItem[]
}

const imagesConfigTyped: ImagesConfig = imagesConfig

const MemeGenerator = dynamic(
  () => import('../src/components/materials/MemeGenerator'),
  {
    ssr: false,
  },
)

// Utility function to preload an image
const preloadImage = (src: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.src = src
    img.onload = () => resolve()
    img.onerror = () => reject(new Error(`Failed to load image: ${src}`))
  })
}

export default function Page() {
  const [isLoaded, setIsLoaded] = useState<boolean>(false)
  const [combinedConfig, setCombinedConfig] = useState<ImagesConfig>({
    background: [],
    body: [],
    head: [],
    hat: [],
    glasses: [],
    shoes: [],
    tatoos: [],
    trousers: [],
    frenz: [],
    other: [],
  })

  useEffect(() => {
    const preloadAndCombineConfig = async () => {
      try {
        // Extract all URLs from the config
        const allImageUrls = Object.values(imagesConfigTyped)
          .flat()
          .map((item) => item.url)

        // Wait for all images to be preloaded
        await Promise.all(allImageUrls.map(preloadImage))

        // Now that the images are preloaded, combine the configuration
        const combined: ImagesConfig = { ...combinedConfig }

        Object.keys(imagesConfigTyped).forEach((key) => {
          combined[key] = imagesConfigTyped[key].map((item) => ({
            url: item.url,
            initialLeft: item.initialLeft || 0,
            initialTop: item.initialTop || 0,
            initialScaleX: item.initialScaleX || 0.5,
            initialScaleY: item.initialScaleY || 0.5,
          }))
        })

        setCombinedConfig(combined)
        setIsLoaded(true)
      } catch (error) {
        console.error('Error loading images:', error)
      }
    }

    preloadAndCombineConfig()
  }, [])

  return (
    <div className={classes['root']}>
      <Header />
      {/* Only render MemeGenerator once all images are preloaded and combinedConfig is set */}
      {isLoaded ? (
        <MemeGenerator combinedConfig={combinedConfig} />
      ) : (
        <div className={classes['fallback']}>Loading images...</div>
      )}
    </div>
  )
}
