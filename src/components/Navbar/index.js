'use client'

import { usePathname } from 'next/navigation'
import Link from 'next/link'

export function Navbar() {
  const pathname = usePathname()

  return (
    <div className='w-full bg-gray-700 text-white'>
      <div className='flex justify-center items-center gap-7 uppercase py-5 text-2xl font-bold'>
        <Link className={`link ${pathname === '/' ? 'text-red' : 'text-white'}`} href="/">
          Agents
        </Link>
        <Link
          className={`link ${pathname === '/Pages/Weapons' ? 'text-red' : 'text-white'}`}
          href="/Pages/Weapons"
        >
          Weapons
        </Link>
      </div>
    </div>
  )
}