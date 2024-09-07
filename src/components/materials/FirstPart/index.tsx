'use client'
import React, { useEffect, useState } from 'react'
import classes from './classes.module.scss'
import Link from 'next/link'
import Image from 'next/image'
import classNames from 'classnames'
import SectionTitle from '../Title'

export default function FirstPart() {
  const [animateMostMemeable, setAnimateMostMemeable] = useState<boolean>(false)
  const dexScreenerLogoSrc = '/images/logos/dex-screener.png'

  useEffect(() => {
    setAnimateMostMemeable(true)
  }, [])

  return (
    <div className={classes['root']}>
      <div className={classes['title']}>Jotchua</div>
      <div className={classes['image-container']}>
        <Image
          src={'/images/memes/0.avif'}
          alt={'Jotchua as a boss'}
          width={226}
          height={400}
          className={classes['boss-image']}
        ></Image>
      </div>
      <div className={classes['content']}>
        <SectionTitle title="The most memeable cute puppy on solana" />
        <div
          className={classNames(classes['contract-address'], {
            [classes['animate-memeable']]: animateMostMemeable,
          })}
        >
          CA: 6ktDB8pro2WTCW1WkuevBWs4Jm4B9Y11iJL6TLvmEBey
        </div>
        <div className={classes['buttons-container']}>
          <Link
            href={
              'https://raydium.io/swap/?outputCurrency=6ktDB8pro2WTCW1WkuevBWs4Jm4B9Y11iJL6TLvmEBey'
            }
            target="_blank"
          >
            <div className={classes['buy-button']}>Buy me here</div>
          </Link>
          <Link href={'/meme-generator'}>
            <div className={classes['generator-button']}>Meme generator</div>
          </Link>
        </div>

        <div className={classes['social-networks']}>
          <Link
            href={'https://t.me/jotchualol'}
            target="blank"
            className={classes['link-container']}
          >
            <div className={classes['logo']}>
              <Image
                src={
                  'https://upload.wikimedia.org/wikipedia/commons/8/82/Telegram_logo.svg'
                }
                alt={'picto of the Telegram channel'}
                width={20}
                height={20}
              ></Image>
            </div>
            <div className={classes['social-media']}>Telegram</div>
          </Link>
          <Link
            href={'https://twitter.com/JotchOnSol'}
            target="blank"
            className={classes['link-container']}
          >
            <div className={classes['logo']}>
              <Image
                src={
                  'https://upload.wikimedia.org/wikipedia/commons/c/ce/X_logo_2023.svg'
                }
                alt={'picto of the X (Twitter) page'}
                width={20}
                height={20}
              ></Image>
            </div>
            <div className={classes['social-media']}>Twitter</div>
          </Link>
          <Link
            href={
              'https://dexscreener.com/solana/ehbyx2eqya7ar9dnnt8e8fkr2alyvqmzpmaohcwuhnig'
            }
            target="blank"
            className={classes['link-container']}
          >
            <div className={classes['logo']}>
              <Image
                src={dexScreenerLogoSrc}
                alt={'picto of the Dex Screener'}
                width={20}
                height={20}
              ></Image>
            </div>
            <div className={classes['social-media']}>Dex Screener</div>
          </Link>
        </div>
      </div>
    </div>
  )
}
