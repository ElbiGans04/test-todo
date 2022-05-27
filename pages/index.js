import Head from 'next/head'
import Image from 'next/image'
import {useEffect} from 'react'
export default function Home() {
  useEffect(() => {
    async function getData () {
      const body = new URLSearchParams({
        "name": "elbi",
        "email": "elbi@data.my.id",
        "password": "12345678",
        "password_confirmation": "12345678"
      })
      const request = await fetch('https://todos.data.my.id/api/register', {method: 'POST', body: body})
      console.log(`\n`),
      console.log(request)
      return await (request.json())
    }

    getData().then(res => {
      console.log(res)
    }).catch(err => {
      console.log(err)
    })
  })
  return (
    <div>
      <h1 className='text-white underline bg-black'>Hello World</h1>
    </div>
  )
}
