'use client'

import MyCanvas from '@/components/MyCanvas'
import classes from './page.module.css'

export default function Home() {
  return (
    <main className={classes.main}>
      <MyCanvas
        onResize={ctx => {
          const canvas = ctx.canvas
          ctx.clearRect(0, 0, canvas.width, canvas.height)
          ctx.fillStyle = 'salmon'
          ctx.fillRect(0, 0, canvas.width, canvas.height)
          ctx.fillStyle = 'white'
          ctx.font = '50px sans-serif'
          ctx.fillText('Resize Me!', canvas.width / 2 - 100, canvas.height / 2, 200)
        }}
      />
    </main>
  )
}
