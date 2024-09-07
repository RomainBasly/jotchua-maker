'use client'
import React, { useEffect } from 'react'

export default function MouseMoveComponent() {
  useEffect(() => {
    // Add event listeners to track mouse movement
    document.addEventListener('mousemove', onMouseMove)
    document.body.style.cursor = 'none'

    // Clean up event listeners on component unmount
    return () => {
      document.removeEventListener('mousemove', onMouseMove)
      document.body.style.cursor = 'auto'
    }
  }, [])

  // Function to handle mouse movement and update custom cursor position
  const onMouseMove = (e: MouseEvent) => {
    const cursor = document.querySelector('.custom-cursor') as HTMLElement
    if (cursor) {
      cursor.style.left = e.pageX + 'px'
      cursor.style.top = e.pageY + 'px'
    }
  }
  return <div className="custom-cursor"></div>
}
