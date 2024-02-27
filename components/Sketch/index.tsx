'use client'

import { useRef } from 'react'
import MyCanvas, { type MyCanvasRef } from '@/components/MyCanvas'
import { fragmentShader, vertexShader } from './shades'
import { loadImages, clamp } from '@/lib/helper'

type Point = {
  x: number
  y: number
}

type SketchProps = {
  imageUrl: string
  depthUrl: string
  horizontalThreshold?: number
  verticalThreshold?: number
}

export default function Sketch(props: SketchProps) {
  const { imageUrl, depthUrl, horizontalThreshold = 35, verticalThreshold = 15 } = props

  const canvasRef = useRef<MyCanvasRef>(null)
  const pointRef = useRef<Point>({ x: 0, y: 0 })
  const pointTargetRef = useRef<Point>({ x: 0, y: 0 })
  const texturesRef = useRef<WebGLTexture[]>([])

  return (
    <>
      <MyCanvas ref={canvasRef} />
    </>
  )
}
