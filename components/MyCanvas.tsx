'use client'

import { forwardRef, useEffect, useLayoutEffect, useRef, useImperativeHandle } from 'react'
import { useResizeObserver } from 'usehooks-ts'
import type { ComponentProps } from 'react'

type MyCanvasProps = {
  canvasProps?: ComponentProps<'canvas'>
  onResize?: (width: number, height: number) => void
}

export type MyCanvasRef = {
  getContext: () => WebGLRenderingContext | null
  getSize: () => { width: number; height: number }
}

export default forwardRef<MyCanvasRef, MyCanvasProps>(function MyCanvas(props, ref) {
  const { canvasProps = {}, onResize } = props
  const rootRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const { width = 0, height = 0 } = useResizeObserver({
    ref: rootRef,
    box: 'border-box',
  })

  const getContext = () => (canvasRef.current ? canvasRef.current.getContext('webgl') : null)

  useImperativeHandle(ref, () => ({
    getContext,
    getSize: () => ({ width, height }),
  }))

  useEffect(() => {
    if (!width || !height) return

    const gl = getContext()

    if (gl) {
      const ratio = window.devicePixelRatio

      const canvas = gl.canvas as HTMLCanvasElement

      canvas.width = width * ratio
      canvas.height = height * ratio
      canvas.style.width = width + 'px'
      canvas.style.height = height + 'px'

      gl.viewport(0, 0, width * ratio, height * ratio)
    }

    if (onResize) {
      onResize(width, height)
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
