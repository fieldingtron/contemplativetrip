import Layout from '../../components/Layout'
import moment from 'moment'
import Image from 'next/image'
import sunsetPic from '../../public/img/sunset-clouds.jpg'
import EventSummary from '../../components/EventSummary'
import fs from 'fs'
import path from 'path'

export default function Events({ events }) {
  //console.log('data received')
  ///console.log({ events })
  //console.log('first event received')
  const event = events[0]
  // console.log('first event ')
  // console.log(event)
  const d = new Date()
  const date = moment(d).format('YYYY-MM-DD')
  const pastEvents = events.filter((event) => event.date <= date).length

  const upcomingEvents = events.filter((event) => event.date > date).length

  return (
    <Layout title='Upcoming and Past Events'>
      <main>
        <Image
          src={sunsetPic}
          className='overlayz'
          alt='Sunset Cloud Background'
          fill
          style={{ objectFit: 'cover', objectPosition: 'center' }}
          priority
        />

        <div className='container py-3'>
          {upcomingEvents > 0 && (
            <h1 className='text-center hero-text text-black-50 animate__animated animate__shakeX'>
              Upcoming Events
            </h1>
          )}

          {upcomingEvents > 0 &&
            events
              .filter((event) => event.date >= date)
              .map((event) => (
                <EventSummary event={event} key={event.id} value={event.id} />
                //value={number}
              ))}

          <h1 className='text-center hero-text text-black-50 animate__animated animate__shakeX'>
            {pastEvents} Past Events
          </h1>

          {events
            .filter((event) => event.date < date)
            .map((event) => (
              <EventSummary event={event} key={event.id} value={event.id} />
              //value={number}
            ))}
        </div>
      </main>
    </Layout>
  )
}

export async function getStaticProps() {
  const eventsDir = path.join(process.cwd(), 'content', 'events')
  const files = fs.readdirSync(eventsDir)

  const events = files
    .filter((f) => f.endsWith('.mdx'))
    .map((filename) => {
      const fullPath = path.join(eventsDir, filename)
      const raw = fs.readFileSync(fullPath, 'utf8')
      const match = raw.match(/^---\n([\s\S]*?)\n---/)
      let meta = {}
      if (match) {
        try {
          meta = JSON.parse(match[1])
        } catch (e) {
          meta = {}
        }
      }
      const slug = filename.replace(/\.mdx$/, '')
      return {
        id: `${slug}.mdx`,
        title: meta.title || slug,
        date: meta.date || '',
        subtitle: meta.subtitle || '',
        subtitle2: meta.subtitle2 || '',
        subtitle3: meta.subtitle3 || '',
        featuredImage: meta.featuredImage || '/img/blue-mandala.png',
      }
    })

  return {
    props: {
      events,
    },
  }
}
