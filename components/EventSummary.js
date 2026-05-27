import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import profilePic from '../public/img/blue-mandala.png'

export default function EventSummary({ event }) {
  //console.log({ event })
  event.url = `/event/${event.id}`
    .replace('.mdx', '/')
    .replace('/content/events', '')
  //.replace('/events//events/', '')
  //console.log({ event })
  return (
    <div className='row py-2'>
      <div className='col-md-4 text-center p-1'>
        {
          <Link href={`${event.url}`}>
            <Image
              alt={event.title}
              src={event.featuredImage}
              height={200}
              width={200}
              style={{ objectFit: 'cover', objectPosition: 'center' }}
              quality={100}
              className='rounded-circle img-fluid'
            />
          </Link>
        }
      </div>
      <div className='col-md-8 d-flex flex-column justify-content-center align-items-center align-items-md-start p-4'>
        <Link
          href={`${event.url}`} // ${event.uri}
          className='noLink position-relative'
        >
          <div>
            <h4 className='text-start'>{event.title}</h4>
            {event.subtitle && <h4 className='text-start'>{event.subtitle}</h4>}
            {event.subtitle2 && (
              <h4 className='text-start'>{event.subtitle2}</h4>
            )}
            {event.subtitle3 && (
              <h4 className='text-start'>{event.subtitle3}</h4>
            )}
          </div>
        </Link>
      </div>
    </div>
  )
}
