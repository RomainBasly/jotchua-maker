'use client'
import React, { useState, useEffect, useRef } from 'react'
import classes from './classes.module.scss'
import classnames from 'classnames'

type IProps = {
  title: string
}

export default function SectionTitle(props: IProps) {
  const titleRef = useRef<HTMLDivElement>(null)
  const [animated, setAnimated] = useState<boolean>(false)
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setAnimated(true)
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.1 },
    )

    if (titleRef.current) {
      observer.observe(titleRef.current)
    }

    return () => {
      if (titleRef.current) {
        observer.disconnect()
      }
    }
  }, [])
  return (
    <div
      ref={titleRef}
      className={classnames(classes['root'], {
        [classes['animate-title']]: animated,
      })}
    >
      {props.title}
    </div>
  )
}
