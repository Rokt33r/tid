import React from 'react'
import { GetServerSideProps } from 'next'
import got from 'got'

const HomePage = ({ data }: { data: any }) => {
  return (
    <div>
      <h1>Hello</h1>
      <a href='https://github.com/login/oauth/authorize?client_id=28d9036cc07644ae74c3'>
        Login via Github
      </a>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const data = await got('http://localhost:3000/api', {
    headers: {
      cookie: context.req.headers.cookie,
    },
  }).json()
  return {
    props: { data },
  }
}

export default HomePage
