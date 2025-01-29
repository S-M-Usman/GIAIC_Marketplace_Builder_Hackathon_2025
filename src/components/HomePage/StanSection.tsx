import Image from 'next/image'
import React from 'react'
import { Button } from '../ui/button'
import Link from 'next/link'

export default function StanSection() {
  return (
    <>
      <div className='mt-28 mb-7'>
        <span className='text-xl font-semibold px-10 lg:px-16'>{`Don't`} Miss</span>
      </div>

      <div className='flex justify-center px-10'>
        <Image
          className=''
          src={'/assets/Stan.png'}
          alt='shoes banner'
          width={1200}
          height={600}
        />
      </div>


      <div className='text-center text-black mt-16'>
        <span className=' text-3xl lg:text-5xl font-semibold uppercase '>flight essentials</span><br /><br />

        <span>Your built-to-last, all-week wears—but with style only Jordan Brand can deliver.</span><br />

        <Button variant="default" size="lg" className="rounded-full" asChild>
          <Link href="/Products">Shop</Link>
        </Button>

      </div>
    </>
  )
}