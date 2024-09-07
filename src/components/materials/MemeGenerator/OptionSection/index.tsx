'use client'
import React, { useRef } from 'react'
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
}

export default function OptionSection(props: IProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null)

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
                  width={60}
                  height={88}
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
