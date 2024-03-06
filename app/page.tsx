'use client'

import { useState } from 'react'
import Sketch from '@/components/Sketch'
import classes from './page.module.css'

const list = ['ai', 'cloud', 'design', 'dev', 'ether']

export default function Home() {
  const [index, setIndex] = useState(0)
  const img = list[index]

  return (
    <main className={classes.main}>
      <Sketch imageUrl={`/images/${img}.png`} depthUrl={`/images/${img}-depth.jpg`} />
      <button className={classes.btn} onClick={() => setIndex((index + 1) % list.length)}>
        Next
      </button>
    </main>
  )
}
