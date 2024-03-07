'use client'

import { forwardRef, useRef, useEffect, useImperativeHandle } from 'react'
import { useResizeObserver } from '@reactuses/core'
import type { ComponentProps } from 'react'

type Size = { width?: number; height?: number }

type MyCanvasProps = {
  uid: string
  canvasProps?: ComponentProps<'canvas'>
  onResize?: (size: Size) => void
}

export type MyCanvasRef = {
  getContext: () => WebGLRenderingContext | null
  getSize: () => Size
}

export default forwardRef<MyCanvasRef, MyCanvasProps>(function MyCanvas(props, ref) {
  const { uid, canvasProps = {}, onResize } = props

  const rootRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const stop = useResizeObserver(rootRef, entries => {
    const [entry] = entries
    const { width, height } = entry.contentRect
    const gl = getContext()

    if (!gl) {
      throw new Error('Unable to get WebGL context')
    }

    const ratio = window.devicePixelRatio
    const canvas = canvasRef.current

    if (!canvas) {
      throw new Error('Unable to get canvas')
    }

    canvas.width = width * ratio
    canvas.height = height * ratio
    canvas.style.width = width + 'px'
    canvas.style.height = height + 'px'

    gl.viewport(0, 0, width * ratio, height * ratio)

    if (onResize) {
      onResize({ width, height })
    }
  })

  const getContext = () => (canvasRef.current ? canvasRef.current.getContext('webgl') : null)

  useImperativeHandle(ref, () => ({
    getContext,
    getSize: () => canvasRef.current?.getBoundingClientRect() || {},
  }))

  return (
    <div
      id={`myCanvas-${uid}`}
      ref={rootRef}
      style={{
        width: '100%',
        height: '100%',
      }}
    >
      <canvas {...canvasProps} ref={canvasRef} id={`canvas-${uid}`} />
    </div>
  )
})
