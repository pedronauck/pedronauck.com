import Image from 'next/image'
import { Fragment } from 'react'
import { FiInstagram, FiGithub, FiYoutube, FiTwitter } from 'react-icons/fi'
import { useWindowSize } from 'react-use'

export default function Info() {
  const { width } = useWindowSize()
  const size = width > 600 ? 200 : 140

  const content = (
    <div className="mr-5 sm:mr-0">
      <h1 className="mb-3 text-2xl sm:text-center sm:mt-2 sm:mb-7 sm:mt-7">
        @pedronauck
      </h1>
      <div className="grid grid-flow-col auto-cols-min gap-4 sm:grid-flow-row sm:gap-6 sm:justify-center">
        <a href="https://instagram.com/pedronauck" target="_blank">
          <FiInstagram size={40} />
        </a>
        <a href="https://github.com/pedronauck" target="_blank">
          <FiGithub size={40} />
        </a>
        <a href="https://twitter.com/pedronauck" target="_blank">
          <FiTwitter size={40} />
        </a>
        <a href="https://youtube.com/pedronauck" target="_blank">
          <FiYoutube size={40} />
        </a>
      </div>
    </div>
  )

  const image = (
    <Image src="/avatar.png" alt="@pedronauck" width={size} height={size} />
  )

  return (
    <div className="flex items-center p-5 mt-5 sm:mt-0 sm:p-12 sm:flex-col">
      {width > 600 ? (
        <Fragment>
          {image}
          {content}
        </Fragment>
      ) : (
        <Fragment>
          {content}
          {image}
        </Fragment>
      )}
    </div>
  )
}
