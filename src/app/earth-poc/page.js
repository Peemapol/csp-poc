'use client'

import React, {
  useState, useEffect, useRef, useMemo,
  useCallback,
} from 'react'
import Image from 'next/image'
import {
  motion, useScroll, useTransform, useMotionValueEvent,
} from 'framer-motion'
import ariseLogo from '../../../public/assets/img/research/arise-logo-pixel-small.png'

export default function Research() {
  const targetRef = useRef(null)
  const logoRef = useRef(null)
  const textBoxRef = useRef(null)
  const vdoSectionRef = useRef(null)
  const vdoCanvasRef = useRef(null)
  const { scrollYProgress: scrollYProgressPage } = useScroll()
  const { scrollYProgress } = useScroll({
    target: targetRef,
  })
  const { scrollYProgress: scrollYProgressVDO } = useScroll({
    target: vdoSectionRef,
    // offset: ['start start', 'end end'],
  })

  const images = useMemo(() => {
    if (typeof window === 'undefined') {
      return []
    }
    const loadedImages = []
    for (let i = 1; i <= 450; i += 1) {
      const img = new window.Image()
      img.src = `/assets/vdo/earth/${i}.webp`
      img.onload = () => {
        console.log(`Image ${i} loaded`);
      };
      img.onerror = () => {
        console.error(`Failed to load image ${i}`);
      };
      // img.src = `/assets/vdo/earth/${i}.webp`
      loadedImages.push(img)
    }

    return loadedImages
  }, [])

  // const translateYAmount = window.innerHeight * 0.4
  const [translateYAmount, setTranslateYAmount] = useState(0)

  const scale = useTransform(scrollYProgress, [0, 1], [1, 8])
  const translateY = useTransform(scrollYProgress, [0, 1], [0, translateYAmount])
  const currentImage = useTransform(scrollYProgressVDO, [0, 1], [1, 450])

  const [isBottom, setIsBottom] = useState(false)
  const [isStickyText, setIsStickyText] = useState(false)
  const [motionDivStyles, setMotionDivStyles] = useState({
    marginTop: '10vh',
    position: 'relative',
    top: 'auto',
    left: 'auto',
    x: 0,
    y: 0,
    // y: translateY,
    scale,
    width: 'fit-content',
    height: 'fit-content',
  })
  const textBoxStickyStyle = {
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
  }

  const calculateMargins = () => {
    if (textBoxRef.current) {
      const windowHeight = window.innerHeight
      const textHeight = textBoxRef.current.offsetHeight
      const calculatedMargin = (windowHeight - textHeight) / 2

      return {
        marginTop: `${calculatedMargin}px`,
        marginBottom: `${calculatedMargin}px`,
      }
    }
    return { marginTop: '0', marginBottom: '0' }
  }

  const checkIfCentered = () => {
    if (logoRef.current) {
      const { top: topContainer, bottom: bottomContainer } = targetRef.current.getBoundingClientRect()
      const windowHeight = window.innerHeight

      if (topContainer < 0) {
        setMotionDivStyles({
          marginTop: 0,
          position: 'fixed',
          top: '10%',
          left: '50%',
          x: '-50%',
          // y: '-50%',
          y: translateY,
          scale,
        })
        setIsStickyText(true)
        setIsBottom(false)
      } else {
        setMotionDivStyles({
          // marginTop: '20vh',
          marginTop: '10vh',
          position: 'relative',
          top: 'auto',
          left: 'auto',
          x: 0,
          y: 0,
          scale,
        })
        setIsStickyText(false)
        setIsBottom(false)
      }
      if (bottomContainer - windowHeight < 0) {
        setMotionDivStyles({
          marginBottom: '70vh',
          position: 'relative',
          top: 'auto',
          left: 'auto',
          x: 0,
          // y: 0,
          y: translateY,
          scale,
        })
        setIsStickyText(false)
        setIsBottom(true)
      }
    }
  }

  const render = useCallback((index) => {
    const canvas = vdoCanvasRef.current
    const ctx = canvas?.getContext('2d', { alpha: true })

    if (ctx && images[index - 1]) {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      ctx.drawImage(images[index - 1], 0, 0)
    }
    // vdoCanvasRef.current?.getContext('2d', { alpha: true })?.drawImage(images[index - 1], 0, 0)
  }, [images])

  useMotionValueEvent(scrollYProgressPage, 'change', () => {
    checkIfCentered()
  })

  useMotionValueEvent(currentImage, 'change', (latest) => {
    render(Number(latest.toFixed()))
  })

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setTranslateYAmount(window.innerHeight * 0.4)
    }
  }, [])

  useEffect(() => {
    checkIfCentered()
  }, [logoRef])

  return (
    <>
      <div
        ref={targetRef}
        className={`h-[500vh] w-full bg-black relative flex ${isBottom ? 'items-end' : 'items-center'} justify-center overflow-hidden`}
      >
        <motion.div
          ref={logoRef}
          style={motionDivStyles}
        >
          <Image
            src={ariseLogo}
            alt="arise-logo"
          />
        </motion.div>
        <div
          ref={textBoxRef}
          className={`w-full text-center text-white ${isStickyText ? 'fixed' : 'absolute'}`}
          style={{
            marginTop: !isStickyText && !isBottom ? calculateMargins().marginTop : undefined,
            marginBottom: !isStickyText && isBottom ? calculateMargins().marginBottom : undefined,
            ...(isStickyText ? textBoxStickyStyle : {}),
          }}
        >
          <h2 className="text-6xl md:text-8xl font-bold leading-[7rem] mb-5">
            Making Digital Life
            <br />
            Possible for All
          </h2>
          <p className="text-sm md:text-lg">
            Collaborating with a Thai financial technology company, we are a joint venture between
            <br />
            INFINITAS by Krungthai and Accenture, the leading global professional services provider.
          </p>
        </div>
        <div
          className="absolute w-[2000px] h-[300px] bg-black"
          style={{
            bottom: '-150px',
            borderRadius: '50% 50% 0 0',
            boxShadow: 'rgba(237, 237, 255, 0.20) 0 0 200px 100px',
          }}
        />
      </div>
      <div
        ref={vdoSectionRef}
        className="h-[200vh] bg-black flex items-center justify-center"
      >
        <canvas
          ref={vdoCanvasRef}
          width={1000}
          height={1000}
        />
      </div>
    </>
  )
}
