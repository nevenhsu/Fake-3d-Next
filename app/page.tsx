import Sketch from '@/components/Sketch'
import classes from './page.module.css'

const list = ['ai', 'cloud', 'design', 'dev', 'eth']

export default function Home() {
  return (
    <main className={classes.main}>
      {list.map(img => (
        <div key={img} className={classes.item}>
          <Sketch
            key={img}
            uid={img}
            imageUrl={`/images/${img}.png`}
            depthUrl={`/images/${img}-d.jpg`}
          />
        </div>
      ))}
    </main>
  )
}
