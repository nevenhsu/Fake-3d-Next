import Sketch from '@/components/Sketch'
import classes from './page.module.css'

export default function Home() {
  return (
    <main className={classes.main}>
      <Sketch imageUrl="/images/ai.png" depthUrl="/images/ai-depth.jpg" />
    </main>
  )
}
