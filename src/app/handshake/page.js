'use client'

import {useRef, useEffect} from 'react'
import {useScroll, useTransform, motion} from 'framer-motion'
import styles from './page.module.css'

export default function App() {
  const videoRef = useRef(null)
  const {scrollYProgress} = useScroll()

  const leftHandX = useTransform(scrollYProgress, [0, 1], ['-50vw', '0vw'])
  const rightHandX = useTransform(scrollYProgress, [0, 1], ['100vw', '50vw'])

  useEffect(() => {
    if (typeof window !== 'undefined' && videoRef.current) {
      const videoElement = videoRef.current
      return scrollYProgress.onChange((latest) => {
        if (videoElement) {
          const duration = videoElement.duration || 1
          videoElement.currentTime = latest * duration
        }
      })
    }
  }, [scrollYProgress])

  return (
    <div>
      <div className={styles.box}>
        <video
          ref={videoRef}
          src="./planet-1.mp4"
          className={styles.video}
          muted
          playsInline
        />
      </div>
      <div className={styles.box}>
        <div className={styles.imgBox}>
          <motion.img
            src='./left-hand.png'
            className={styles.leftHand}
            style={{x: leftHandX}}
          />
          <motion.img
            src='./right-hand.png'
            className={styles.rightHand}
            style={{x: rightHandX}}
          />
        </div>
      </div>
    </div>
  )
}
