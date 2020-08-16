import React from 'react'
import { GetServerSideProps } from 'next'
import got from 'got'

import config from '../configs/config'

const HomePage = ({ user, dayLogs }) => {
  const oauthUrl = `https://github.com/login/oauth/authorize?client_id=${config.github.clientId}`
  return (
    <div>
      <h1>Hello</h1>
      {!user && <a href={oauthUrl}>Login via Github</a>}
      <hr />
      {user && (
        <form action='/api/dayLogs' method='POST'>
          <input type='text' name='date' placeholder='20xx-xx-xx' />
          <input type='text' name='title' placeholder='Title' />
          <textarea name='content' />
          <button type='submit'>Submit</button>
        </form>
      )}
      {user && dayLogs && (
        <section>
          <h3>DayLogs</h3>
          <ol>
            {dayLogs.map((dayLog) => (
              <li key={`${dayLog.date}-${dayLog.id}`}>
                <h4>{dayLog.title}</h4>
                <p>{dayLog.content}</p>
                <strong>{dayLog.date}</strong>
              </li>
            ))}
          </ol>
        </section>
      )}
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { user, dayLogs } = await got('http://localhost:3000/api', {
    headers: {
      cookie: ctx.req.headers.cookie
    }
  }).json()

  return {
    props: { user, dayLogs }
  }
}

export default HomePage
