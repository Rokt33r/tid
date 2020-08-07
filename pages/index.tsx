import React from 'react'
import { GetServerSideProps } from 'next'
import got from 'got'

const HomePage = ({ user, dayLogs }) => {
  const oauthUrl = `https://github.com/login/oauth/authorize?client_id=28d9036cc07644ae74c3`
  return (
    <div>
      <h1>Hello</h1>
      <a href={oauthUrl}>Login via Github</a>
      <hr />
      <pre>{JSON.stringify(user, null, 2)}</pre>
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
