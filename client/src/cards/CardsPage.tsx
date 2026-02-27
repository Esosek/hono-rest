import { GetCardById } from './GetCardById'
import { GetCards } from './GetCards'
import { PostCard } from './PostCard'

export const CardsPage = () => {
  return (
    <>
      <section>
        <GetCards />
      </section>
      <section>
        <GetCardById maxId={6} />
      </section>
      <section>
        <PostCard />
      </section>
    </>
  )
}
