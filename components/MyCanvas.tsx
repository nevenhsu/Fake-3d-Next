'use client'

import { forwardRef, useEffect, useRef, useImperativeHandle } from 'react'
import { useResizeObserver } from 'usehooks-ts'
import type { ComponentProps } from 'react'

type CanvasProps = ComponentProps<'canvas'>

export type MyCanvasRef = { getContext: () => CanvasRenderingContext2D | null }

export default forwardRef<MyCanvasRef, CanvasProps>(function MyCanvas(props, ref) {
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

    draw()
  }, [width, height])

  function draw() {
    const ctx = getContext()

    if (ctx) {
      const canvas = ctx.canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      ctx.fillStyle = 'salmon'
      ctx.fillRect(0, 0, canvas.width, canvas.height)
      ctx.fillStyle = 'white'
      ctx.font = '50px sans-serif'
      ctx.fillText('Resize Me!', canvas.width / 2 - 100, canvas.height / 2, 200)
    }
  }

  return (
    <div
      ref={rootRef}
      style={{
        width: '100%',
        height: '100%',
      }}
    >
      <canvas ref={canvasRef} {...props} />
    </div>
  )
})
