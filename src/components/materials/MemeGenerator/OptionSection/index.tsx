'use client'
import React, { useEffect, useRef, useState } from 'react'
import classes from './classes.module.scss'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid'
import classnames from 'classnames'
import Image from 'next/image'

type ImageType = {
  url: string
  initialLeft: number
  initialTop: number
  initialScaleX: number
  initialScaleY: number
}

type IProps = {
  images: ImageType[]
  onImageChange: (image: string) => void
  selectedImage?: string
  title?: string
  className?: string
  onImagesLoad: () => void
}

export default function OptionSection(props: IProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const [imagesLoadedCount, setImagesLoadedCount] = useState<number>(0)
  const totalImages = props.images.length

  const handleImageLoad = () => {
    setImagesLoadedCount(function (prev) {
      return prev + 1
    })
    console.log(`total counted for ${props.title} is: `, imagesLoadedCount)
    props.onImagesLoad() // This triggers the parent to know the image has loaded
  }

  const scrollImages = (direction: string) => {
    const scrollAmount = direction === 'left' ? -150 : 150
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: scrollAmount,
        behavior: 'smooth',
      })
    }
  }

  return (
    <div className={classes['root']}>
      <div className={classes['top']}>
        <div className={classes['section-title']}>{props.title}</div>
      </div>

      <div className={classes['content']}>
        <div className={classes['icon']} onClick={() => scrollImages('left')}>
          <ChevronLeftIcon />
        </div>

        <div className={classes['propositions']} ref={scrollContainerRef}>
          {props.images.map((image, index) => {
            return (
              <div
                key={index}
                className={classnames(classes['unit'], {
                  [classes['selected']]: image.url === props.selectedImage,
                })}
                onClick={() => props.onImageChange(image.url)}
              >
                <Image
                  src={image.url}
                  alt={'option to choose'}
                  layout="responsive"
                  width={60}
                  height={88}
                  placeholder="blur"
                  blurDataURL="data:image/png;base64,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"
                  onLoad={handleImageLoad}
                  className={classes['image']}
                ></Image>
              </div>
            )
          })}
        </div>

        <div className={classes['icon']} onClick={() => scrollImages('right')}>
          <ChevronRightIcon />
        </div>
      </div>
    </div>
  )
}
