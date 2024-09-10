'use client'
import React, { useState, useRef, useEffect, Suspense } from 'react'
import { fabric } from 'fabric'
import classes from './classes.module.scss'
import SectionTitle from '../Title'
import classNames from 'classnames'
import { defineMaxScreenHeight, defineMaxScreenWidth } from '@/src/helpers'
import {
  ArrowDownTrayIcon,
  ArrowPathIcon,
  PlusIcon,
  SparklesIcon,
} from '@heroicons/react/24/solid'
import OptionSection from './OptionSection/index'
import { ImageConfigItem, ImagesConfig } from '@/app/page'

type MemeGeneratorProps = {
  combinedConfig: ImagesConfig | null
}

const MAX_WIDTH = defineMaxScreenWidth()
const MAX_HEIGHT = defineMaxScreenHeight()

export default function MemeGeneratorUsingFabric(
  props: Readonly<MemeGeneratorProps>,
) {
  const [selectedBackground, setSelectedBackground] = useState<string>(
    '/public/images/memeGenerator/backgrounds/0.png',
  )

  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const fabricCanvas = useRef<fabric.Canvas | null>(null)
  const fileInputRef = useRef<HTMLInputElement | null>(null)
  const deleteIconRef = useRef<HTMLDivElement | null>(null)
  const rotateIconRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (canvasRef.current) {
      fabricCanvas.current = new fabric.Canvas(canvasRef.current)
      const initialImageUrl =
        props.combinedConfig?.background[0]?.url ||
        '/images/memeGenerator/backgrounds/0.png'

      fabric.Image.fromURL(initialImageUrl, (img) => {
        if (
          fabricCanvas.current &&
          fabricCanvas.current.width &&
          fabricCanvas.current.height &&
          img.width &&
          img.height
        ) {
          const scaleToFit = Math.min(
            MAX_WIDTH / img.width!,
            MAX_HEIGHT / img.height!,
            1,
          )
          const scaledWidth = img.width! * scaleToFit
          const scaledHeight = img.height! * scaleToFit

          fabricCanvas.current.setDimensions({
            width: scaledWidth,
            height: scaledHeight,
          })
          fabricCanvas.current.setBackgroundImage(
            img,
            () => {
              fabricCanvas.current?.renderAll()
            },
            {
              scaleY: scaleToFit,
              scaleX: scaleToFit,
              originX: 'left',
              originY: 'top',
            },
          )
        }
      })

      fabricCanvas.current.on('selection:updated', updateDeleteIconPosition)
      fabricCanvas.current.on('selection:created', updateDeleteIconPosition)
      fabricCanvas.current.on('object:moving', updateDeleteIconPosition)
      fabricCanvas.current.on('object:modified', updateDeleteIconPosition)
      fabricCanvas.current.on('selection:cleared', () => {
        if (deleteIconRef.current) {
          deleteIconRef.current.style.display = 'none'
        }
      })
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Delete' || event.key === 'Backspace') {
        deleteSelectedObject()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('resize', updateCanvasSize)
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('resize', updateCanvasSize)
      fabricCanvas.current?.off('selection:updated', updateDeleteIconPosition)
      fabricCanvas.current?.off('selection:created', updateDeleteIconPosition)
      fabricCanvas.current?.off('object:moving', updateDeleteIconPosition)
      fabricCanvas.current?.off('object:modified', updateDeleteIconPosition)
      fabricCanvas.current?.off('selection:cleared')
      fabricCanvas.current?.dispose()
    }
  }, [])

  const updateCanvasSize = () => {
    if (canvasRef.current && fabricCanvas.current) {
      const containerWidth = defineMaxScreenWidth()
      const containerHeight = defineMaxScreenHeight()

      if (containerWidth) {
        const scaleWidth = containerWidth / fabricCanvas.current.getWidth()
        const scaleHeight = containerHeight / fabricCanvas.current.getHeight()
        const scale = Math.min(scaleWidth, scaleHeight, 1) // Prevent scaling up larger than original

        const newWidth = fabricCanvas.current.getWidth() * scale
        const newHeight = fabricCanvas.current.getHeight() * scale
        fabricCanvas.current.setDimensions({
          width: Math.min(newWidth, MAX_WIDTH),
          height: Math.min(newHeight, MAX_HEIGHT),
        })
        canvasRef.current.width = Math.min(newWidth, MAX_WIDTH)
        canvasRef.current.height = Math.min(newHeight, MAX_HEIGHT)

        fabricCanvas.current.getObjects().forEach((obj) => {
          if (obj.scaleX && obj.scaleY && obj.left && obj.top) {
            obj.set({
              scaleX: obj.scaleX * scale,
              scaleY: obj.scaleY * scale,
              left: obj.left * scale,
              top: obj.top * scale,
            })
            obj.setCoords()
          }
        })
      }
      fabricCanvas.current.renderAll()
    }
  }

  const addObject = (imageUrl: string | undefined) => {
    if (props.combinedConfig && imageUrl) {
      const objectMatchedWithURLAndConfig = Object.values(props.combinedConfig)
        .flatMap((element) => element)
        .find((item: ImageConfigItem) => item.url === imageUrl)

      fabric.Image.fromURL(imageUrl, function (img) {
        let top = objectMatchedWithURLAndConfig?.initialTop

        img.set({
          left: objectMatchedWithURLAndConfig?.initialLeft,
          top: top,
          scaleX: objectMatchedWithURLAndConfig?.initialScaleX,
          scaleY: objectMatchedWithURLAndConfig?.initialScaleY,
          selectable: true,
          hasControls: true,
          hasBorders: true,
          hasRotatingPoint: true, // Ensures that the rotation control is visible
          lockScalingFlip: true, // Prevents flipping the object via scaling
          rotatingPointOffset: 20,
          borderColor: '#e9c46a', // Sets the color of the border around the selected object
          cornerColor: '#264653',
          cornerSize: 10,
          cornerStyle: 'circle',
          transparentCorners: false,
        })
        fabricCanvas.current?.add(img)
        fabricCanvas.current?.bringToFront(img)
        fabricCanvas.current?.requestRenderAll()
      })
    }
  }

  const deleteSelectedObject = (): boolean => {
    const activeObject = fabricCanvas.current?.getActiveObject()
    if (activeObject) {
      fabricCanvas.current?.remove(activeObject)
      fabricCanvas.current?.discardActiveObject()
      fabricCanvas.current?.renderAll()
      if (deleteIconRef.current) {
        deleteIconRef.current.style.display = 'none'
      }

      if (rotateIconRef.current) {
        rotateIconRef.current.style.display = 'none'
      }
    }
    return true
  }
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0]
      const reader = new FileReader()
      reader.onload = (f) => {
        const data = f.target?.result
        if (typeof data === 'string') {
          fabric.Image.fromURL(data, (img) => {
            if (fabricCanvas.current) {
              const scaleToFit = Math.min(
                MAX_WIDTH / img.width!,
                MAX_HEIGHT / img.height!,
                1,
              )
              const scaledWidth = img.width! * scaleToFit
              const scaledHeight = img.height! * scaleToFit

              fabricCanvas.current.setDimensions({
                width: scaledWidth,
                height: scaledHeight,
              })
              fabricCanvas.current.setBackgroundImage(
                img,
                () => {
                  fabricCanvas.current?.renderAll()
                },
                {
                  scaleY: scaleToFit,
                  scaleX: scaleToFit,
                  originX: 'left',
                  originY: 'top',
                },
              )
            }
          })
        }
      }
      setSelectedBackground('')
      reader.readAsDataURL(file)
    }
  }

  const handleButtonClick = () => {
    fileInputRef.current?.click()
  }

  const handleBackgroundImageChange = (imageUrl: string) => {
    setSelectedBackground(imageUrl)
    if (fabricCanvas.current) {
      fabric.Image.fromURL(imageUrl, (img) => {
        if (img.width && img.height) {
          const scaleToFit = Math.min(
            MAX_WIDTH / img.width,
            MAX_HEIGHT / img.height,
            1,
          )
          const scaledWidth = img.width * scaleToFit
          const scaledHeight = img.height * scaleToFit

          fabricCanvas.current?.setDimensions({
            width: scaledWidth,
            height: scaledHeight,
          })
          fabricCanvas.current?.setBackgroundImage(
            img,
            fabricCanvas.current.renderAll.bind(fabricCanvas.current),
            {
              scaleX: scaleToFit,
              scaleY: scaleToFit,
              originX: 'left',
              originY: 'top',
            },
          )
        }
      })
    }
  }

  const downloadMeme = () => {
    if (fabricCanvas.current) {
      const multiplier = 3
      const dataUrl = fabricCanvas.current.toDataURL({
        format: 'png',
        quality: 1,
        multiplier: multiplier,
      })

      const link = document.createElement('a')
      link.href = dataUrl
      link.download = 'meme.png'
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    }
  }

  const updateDeleteIconPosition = (event: fabric.IEvent) => {
    const selectedObject = fabricCanvas.current?.getActiveObject()
    if (selectedObject && deleteIconRef.current) {
      deleteIconRef.current.style.display = 'block'
    } else if (deleteIconRef.current) {
      deleteIconRef.current.style.display = 'none'
    }
  }

  useEffect(() => {
    if (fabricCanvas.current) {
      // Ensure that object control points are recalculated after object transformation
      fabricCanvas.current.on('object:modified', (e) => {
        e.target?.setCoords()
      })
    }
  }, [fabricCanvas.current])

  const resetCanvas = () => {
    if (fabricCanvas.current) {
      fabricCanvas.current.clear()
      setSelectedBackground('/images/memeGenerator/backgrounds/0.png')
      handleBackgroundImageChange('/images/memeGenerator/backgrounds/0.png')
    }
  }

  const getRandomImage = (
    category: ImageConfigItem[] | undefined,
  ): string | undefined => {
    if (category) {
      const randomIndex = Math.floor(Math.random() * category.length)
      return category[randomIndex].url
    }
  }

  const randomizeForEachCategory = () => {
    const categories = [
      'hat',
      'glasses',
      'tatoos',
      'shoes',
      'trousers',
      'other',
    ]

    categories.map((category) => {
      const items = props.combinedConfig?.[category]
      addObject(getRandomImage(items))
    })
  }

  return (
    <div className={classes['root']}>
      <div className={classes['top']}>
        <SectionTitle title={'meme generator'} />
      </div>
      <div className={classes['main-container']}>
        <div className={classes['left-part']}>
          <div className={classes['canvas-wrapper']}>
            <canvas ref={canvasRef} className={classNames(classes['canvas'])} />
            <div
              ref={deleteIconRef}
              className={classes['delete-icon']}
              onClick={deleteSelectedObject}
            >
              <img src="/images/picto/icon-trash.svg" alt="Delete" />
            </div>
          </div>
          <div className={classes['buttons-container']}>
            <div className={classes['button']} onClick={resetCanvas}>
              {' '}
              <ArrowPathIcon className={classes['icon']} />
              Reset the meme
            </div>
            <div
              className={classes['button']}
              onClick={randomizeForEachCategory}
            >
              <SparklesIcon className={classes['icon']} />
              Randomize objects
            </div>
            <div
              onClick={downloadMeme}
              className={classNames(classes['button'], classes['download'])}
            >
              <ArrowDownTrayIcon className={classes['icon']} />
              Download
            </div>
          </div>
        </div>

        <div className={classes['options']}>
          <Suspense fallback={'...Loading'}>
            <div className={classes['options-container']}>
              <div className={classes['subtitle']}>Choose your options</div>
              <div className={classes['section']}>
                <div className={classes['options-background']}>
                  {props.combinedConfig?.background && (
                    <OptionSection
                      images={props.combinedConfig.background}
                      onImageChange={handleBackgroundImageChange}
                      selectedImage={selectedBackground}
                      title={'background'}
                      className={classes['background']}
                    />
                  )}
                  <div className={classes['separator']}></div>
                  <input
                    type="file"
                    onChange={handleFileChange}
                    accept="image/*"
                    className={classes['upload']}
                    ref={fileInputRef}
                  />
                  <div className={classes['or-upload']}>
                    <button
                      onClick={handleButtonClick}
                      className={classes['file-upload-button']}
                    >
                      <PlusIcon className={classes['icon']} />
                      Upload Image
                    </button>
                  </div>
                </div>
                <h2 className={classes['section-title']}>
                  Select the objects and move them on the canvas
                </h2>
                {props.combinedConfig &&
                  Object.entries(props.combinedConfig).map(
                    ([key, value]) =>
                      key !== 'background' && (
                        <OptionSection
                          images={value}
                          onImageChange={addObject}
                          title={key}
                          className={classes[key]}
                        />
                      ),
                  )}
              </div>
            </div>
          </Suspense>
        </div>
      </div>
    </div>
  )
}
