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

  useImperativeHandle(ref, () => ({
    getContext,
  }))

  useEffect(() => {
    const ctx = getContext()

    if (ctx) {
      ctx.canvas.width = width
      ctx.canvas.height = height
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
