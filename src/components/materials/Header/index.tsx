'use client'
import React, { useState } from 'react'
import classes from './classes.module.scss'
import Image from 'next/image'
import { Bars3Icon } from '@heroicons/react/24/solid'
import SlidingMenu from '../SlidingMenu'
import { useRouter } from 'next/navigation'

export default function Header() {
  const router = useRouter()
  const [isOpen, setIsOpen] = useState<boolean>(false)

  const toggleUserMenu = () => {
    setIsOpen(!isOpen)
  }

  return (
    <div className={classes['root']}>
      <div className={classes['desktop']}>
        <div className={classes['logo']}>
          <div
            className={classes['image-container']}
            onClick={() => router.push('/')}
          >
            <Image
              src={'/images/memes/jotch.png'}
              alt={'logo'}
              width={'60'}
              height={'60'}
              className={classes['logo']}
            ></Image>
          </div>
        </div>
        <div className={classes['name']}>Jotchua</div>
      </div>
      <div className={classes['mobile']}>
        <div className={classes['logo']}>
          <div className={classes['image-container']}>
            <Image
              src={'/images/memes/jotch.png'}
              alt={'logo'}
              width={'60'}
              height={'60'}
              className={classes['logo']}
            ></Image>
          </div>
        </div>
        <Bars3Icon
          className={classes['burger-icon']}
          onClick={toggleUserMenu}
        />
        <SlidingMenu
          isOpen={isOpen}
          className={classes['sliding-menu']}
          onClose={toggleUserMenu}
        />
      </div>
    </div>
  )
}
