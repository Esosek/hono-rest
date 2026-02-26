import { GetCardById } from './GetCardById'
import { GetCards } from './GetCards'

export const CardsPage = () => {
  return (
    <>
      <section>
        <GetCards />
      </section>
      <section>
        <GetCardById maxId={6} />
      </section>
    </>
  )
}
