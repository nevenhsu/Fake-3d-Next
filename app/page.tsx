import Sketch from '@/components/Sketch'
import classes from './page.module.css'

const list = ['eth', 'ai', 'cloud', 'dev', 'design']

export default function Home() {
  return (
    <main className={classes.main} style={{ top: '10vh' }}>
      {list.map((img, i) => (
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
