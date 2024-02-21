import MyCanvas from '@/components/MyCanvas'
import classes from './page.module.css'

export default function Home() {
  return (
    <main className={classes.main}>
      <MyCanvas />
    </main>
  )
}
