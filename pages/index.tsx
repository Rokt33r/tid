import React from 'react'
import { NextPage } from 'next'
import ky from 'ky-universal'

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
export async function getStaticProps() {
  const data = await ky('http://localhost:3000/api').json()
  return {
    props: { data },
  }
}

export default HomePage
