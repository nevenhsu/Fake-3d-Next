import Sketch from '@/components/Sketch'
import classes from './page.module.css'

const list = ['eth', 'ai', 'cloud', 'dev', 'design']

export default function Home() {
  return (
    <main className={classes.main} style={{ top: '20vh' }}>
      {list.map((img, i) => (
        <div
          key={img}
          className={classes.item}
          style={{
            zIndex: list.length - i,
            transform: `translateY(-${30 * i}%)`,
          }}
        >
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
