import React from 'react'
import classes from './classes.module.scss'
import classnames from 'classnames'
import { XMarkIcon } from '@heroicons/react/24/outline'

type IProps = {
  isOpen: boolean
  className: string
  onClose: () => void
}

export default function SlidingMenu(props: Readonly<IProps>) {
  return (
    <div
      className={classnames(
        classes['root'],
        {
          [classes['open']]: props.isOpen,
        },
        props.className,
      )}
    >
      <XMarkIcon className={classes['icon']} onClick={props.onClose} />
      <div className={classes['nav-links-container']}>
        <div className={classes['nav-link']}>Meme generator</div>
      </div>
    </div>
  )
}
