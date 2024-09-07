import React from 'react'
import classes from './classes.module.scss'
import Image from 'next/image'
import Title from '../Title'

export default function MemesPart() {
  const Images = [
    {
      id: 11,
      src: '/images/memes/11.jpg',
      alt: 'Jotch 1',
      width: 200, // specify width
      height: 175, // specify height
    },
    {
      id: 2,
      src: '/images/memes/2.webp',
      alt: 'Jotch 2',
      width: 200, // specify width
      height: 175, // specify height
    },
    {
      id: 3,
      src: '/images/memes/3.webp',
      alt: 'Jotch 3',
      width: 200, // specify width
      height: 175, // specify height
    },
    {
      id: 4,
      src: '/images/memes/4.webp',
      alt: 'Jotch 4',
      width: 200, // specify width
      height: 175, // specify height
    },
    {
      id: 6,
      src: '/images/memes/6.webp',
      alt: 'Jotch 6',
      width: 200, // specify width
      height: 175, // specify height
    },
    {
      id: 7,
      src: '/images/memes/7.png',
      alt: 'Jotch 7',
      width: 200, // specify width
      height: 175, // specify height
    },
    {
      id: 8,
      src: '/images/memes/8.png',
      alt: 'Jotch 8',
      width: 200, // specify width
      height: 175, // specify height
    },
    {
      id: 9,
      src: '/images/memes/9.png',
      alt: 'Jotch 9',
      width: 200, // specify width
      height: 175, // specify height
    },
    {
      id: 10,
      src: '/images/memes/10.jpg',
      alt: 'Jotch 10',
      width: 200, // specify width
      height: 175, // specify height
    },
  ]

  return (
    <div className={classes['root']}>
      <Title title={'memes'} />
      {
        <div className={classes['images-container']}>
          {Images.map((image) => {
            return (
              <div className={classes['image-unit']} key={image.id}>
                <Image
                  src={image.src}
                  alt={image.alt}
                  width={image.width}
                  height={image.height}
                ></Image>
              </div>
            )
          })}
        </div>
      }
    </div>
  )
}
