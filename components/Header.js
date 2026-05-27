import Link from 'next/link'

import { useRouter } from 'next/router'
import styles from '../styles/Header.module.css'

// Just a reminder to those who are reading this, that if you insert <a/> wrapped inside a custom component inside <Link/> that you should include passHref if the <a/> wraps anything other than a string, otherwise your site may take a hit on SEO.

export default function Header() {
  const router = useRouter()

  return (
    <header>
      <nav>
        <nav className='navbar navbar-light navbar-expand-lg'>
          <div className='container'>
            <Link href='/' className='navbar-brand pulse'>
              <h1> contemplative trip</h1>
            </Link>

            <button
              className='navbar-toggler'
              data-bs-toggle='collapse'
              data-bs-target='#navcol-1'
            >
              <span className='visually-hidden'>Toggle navigation</span>
              <span className='navbar-toggler-icon'></span>
            </button>
            <div id='navcol-1' className='collapse navbar-collapse fs-5'>
              <ul className='navbar-nav ms-auto'>
                <li className='nav-item'>
                  <Link
                    href='/events'
                    className={
                      router.pathname == '/events'
                        ? 'nav-link active'
                        : 'nav-link'
                    }
                  >
                    Events
                  </Link>
                </li>

                <li className='nav-item'>
                  <Link href='/articles' className='nav-link'>
                    Articles
                  </Link>
                </li>

                <li className='nav-item'>
                  <Link href='/direction' className='nav-link'>
                    Direction
                  </Link>
                </li>

                <li className='nav-item'>
                  <Link href='/friends' className='nav-link'>
                    Friends
                  </Link>
                </li>

                <li className='nav-item'>
                  <Link href='/contact' className='nav-link'>
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </nav>
    </header>
  )
}
