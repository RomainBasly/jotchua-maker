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

const initialConfig: ImagesConfig = {
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
}

const MemeGenerator = dynamic(
  () => import('../src/components/materials/MemeGenerator'),
  { ssr: false },
)

export default function Page() {
  const [combinedConfig, setCombinedConfig] = useState<ImagesConfig>(
    initialConfig,
  )

  useEffect(() => {
    const fetchImages = async (imgPath: string) => {
      const response = await fetch(
        `api/images?path=${encodeURIComponent(imgPath)}`,
      )
      const data = await response.json()
      return data
    }

    const combinedConfig = async () => {
      const categories = [
        { path: 'backgrounds', name: 'background' },
        { path: 'characters/body', name: 'body' },
        { path: 'characters/head', name: 'head' },
        {
          path: 'characters/accessories/glasses',
          name: 'glasses',
        },
        { path: 'characters/accessories/hat', name: 'hat' },
        { path: 'characters/accessories/shoes', name: 'shoes' },
        { path: 'characters/accessories/tatoos', name: 'tatoos' },
        { path: 'characters/accessories/trousers', name: 'trousers' },
        { path: 'characters/accessories/other', name: 'other' },
        { path: 'characters/frenz', name: 'frenz' },
      ]

      const combined: ImagesConfig = { ...initialConfig }

      for (const category of categories) {
        const imageUrls = await fetchImages(category.path)

        combined[category.name] = imageUrls.map((imageUrl: string) => {
          const configItem = imagesConfigTyped[category.name]?.find(
            (item: { url: string }) => item.url === imageUrl,
          )

          return {
            url: imageUrl,
            initialLeft: configItem?.initialLeft || 0,
            initialTop: configItem?.initialTop || 0,
            initialScaleX: configItem?.initialScaleX || 0.5,
            initialScaleY: configItem?.initialScaleY || 0.5,
          }
        })
      }
      setCombinedConfig(combined)
    }

    combinedConfig()
  }, [])

  return (
    <div className={classes['root']}>
      <Header />
      <MemeGenerator combinedConfig={combinedConfig} />
    </div>
  )
}
