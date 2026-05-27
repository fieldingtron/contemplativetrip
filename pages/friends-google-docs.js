import Layout from '../components/Layout'
import Link from 'next/link'
import axios from 'axios'
import csvtojson from 'csvtojson'
import CloudBackgroundOrange from '../components/CloudBackgroundOrange'

export default function friends({ links }) {
  const SSKEY = process.env.SPREADSHEET_KEY
  //console.log(links)

  return (
    <Layout title='List of Friends'>
      <main>
        <CloudBackgroundOrange />

        <div
          key='main'
          className='container py-3 position-relative text-black-50 '
        >
          <h1 className='text-center hero-text text-black-50 py-3'>Friends</h1>

          <h2>Introduction Friends Page</h2>

          <p>
            It is our hope that the links listed on this page will help the
            sites have their “serchability” increase.The more incoming links a
            site has,the better its rating by search engines.
          </p>
          <p>
            The links on the Friends page contain information truly from
            friends; Also this page contains information from sites that are in
            sync with the contemplative mission of this site. We hope they enjoy
            increase activity too.
          </p>

          <ul>
            {links.map((link) => (
              <li className='fs-4' key={link.Link}>
                <Link href={link.Link} target='_blank'>
                  {link.Title}
                </Link>
                - {link.Comments}
              </li>
            ))}
          </ul>

          <p className='fs-4'>
            <strong>Disclaimer : </strong>
            The friends (firms or individuals) listed on this page are simply a
            service to our web site visitors to quickly locate a spiritual web
            site of interest. We do not necessarily condone or agree with the
            mission and/or services of any of the listed friends.
          </p>
        </div>
      </main>
    </Layout>
  )
}

export async function getStaticProps() {
  const csvURL = process.env.CSV_URL

  if (!csvURL) {
    console.warn('CSV_URL is not set. Rendering friends-google-docs with empty links.')
    return {
      props: {
        links: [],
      },
    }
  }

  const getLinks = async () => {
    try {
      return await axios.get(csvURL)
    } catch (error) {
      console.error(error)
      return null
    }
  }

  const linkInfo = async () => {
    const links = await getLinks()
    if (links?.data) {
      const jsonArray = await csvtojson().fromString(links.data)
      return jsonArray
    }

    return []
  }

  const linkz = await linkInfo()

  return {
    props: {
      links: linkz,
    },
  }
}
