import Image from 'next/image'
import React from 'react'
import Title from './ui/Title'
import Link from 'next/link'

function About() {
  return (
    <div className=' bg-secondary py-14 mt-0'>
       <div className=' container mx-auto flex items-center text-white gap-20 justify-center flex-wrap-reverse'>
            <div className=' flex justify-center'>
            <div className='relative sm:w-[445px] sm:h-[600px] flex justify-center w-[300px] h-[450px]'>
                <Image src="/images/About-img.png" alt='' layout='fill' priority/>
            </div>
            </div>
            <div className='md:w-1/2'>
                <Title addClass="font-dancing text-[40px]">We Are Feane</Title>
                <p className='my-5'>There are many variations of passages of Lorem Ipsum available, but
            the majority have suffered alteration in some form, by injected
            humour, or randomised words which don`t look even slightly
            believable. If you are going to use a passage of Lorem Ipsum, you
            need to be sure there isn`t anything embarrassing hidden in the
            middle of text. All</p>
            <Link href="/about">
            <button className=' btn-primary' >Read More</button>
            </Link>
            </div>
       </div>
    </div>
  )
}

export default About
