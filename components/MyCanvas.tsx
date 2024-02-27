'use client'

import { forwardRef, useEffect, useRef, useImperativeHandle } from 'react'
import { useResizeObserver } from 'usehooks-ts'
import type { ComponentProps } from 'react'

type MyCanvasProps = {
  canvasProps?: ComponentProps<'canvas'>
  onResize?: (ctx: CanvasRenderingContext2D, width: number, height: number) => void
}

export type MyCanvasRef = { getContext: () => CanvasRenderingContext2D | null }

export default forwardRef<MyCanvasRef, MyCanvasProps>(function MyCanvas(props, ref) {
  const { canvasProps = {}, onResize } = props
  const rootRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const { width = 0, height = 0 } = useResizeObserver({
    ref: rootRef,
    box: 'border-box',
  })

  const getContext = () => (canvasRef.current ? canvasRef.current.getContext('2d') : null)
  const getGLContext = () => (canvasRef.current ? canvasRef.current.getContext('webgl') : null)

  useImperativeHandle(ref, () => ({
    getContext,
    getGLContext,
  }))

  useEffect(() => {
    const ctx = getContext()
    const gl = getGLContext()
    const ratio = window.devicePixelRatio

    if (ctx) {
      ctx.canvas.width = width * ratio
      ctx.canvas.height = height * ratio
    }

    if (gl) {
      gl.viewport(0, 0, width * ratio, height * ratio)
    }

    if (ctx && onResize) {
      onResize(ctx, width, height)
    }
  }, [width, height])

  return (
    <div
      ref={rootRef}
      style={{
        width: '100%',
        height: '100%',
      }}
    >
      <canvas ref={canvasRef} {...canvasProps} />
    </div>
  )
})
