"use client"

import { useRouter } from 'next/navigation'
import useSWR from 'swr';
import axios from 'axios';

const fetcher = (url) => axios.get(url).then((res) => res.data);

export default function Page({ params }) {
  const router = useRouter();

  // // gunakan weaponId untuk membuat permintaan API
  const { data: weaponDetail, error } = useSWR(
    params.weaponId ? `https://valorant-api.com/v1/weapons/${params.weaponId}` : null,
    fetcher
  );
  if (error) return <div>Error: {error.message}</div>;
  if (!weaponDetail) return (
    <div className="loading-container w-full h-screen items-center text-center">
      <div className="loading-spinner mx-auto mt-60"></div>
    </div>
  )

  return (
    <div className='grid grid-cols-2 gap-32 p-8 px-44 bg-slate-600 text-silver relative h-screen'>
      <img src="/bg-valorant.png" className='absolute top-0 left-0 w-full h-full bg-cover' />
      <div className='w-full h-screen bg-black/30 absolute top-0 left-0'></div>
      <div className='relative'>
        <h1 className='text-6xl font-bold mb-2'>{weaponDetail.data.displayName}</h1>
        <p className='text-2xl mb-4'>{weaponDetail.data.shopData.category}</p>
        <button className='border-2 border-silver text-white px-28 py-4 text-xl font-semibold uppercase hover:bg-red' onClick={() => router.push(`/Pages/Weapons`)}>Compare</button>
        <img src={weaponDetail.data.displayIcon} alt={weaponDetail.data.displayName} className='mt-7 w-full' />
      </div>
      <div className='relative px-5'>
        <h2 className='text-4xl font-bold text-center mb-4'>STATS</h2>
        <div className='mb-4'>
          <p className='text-lg'>Fire Rate <span className='font-bold'>({weaponDetail.data.weaponStats.fireRate}</span> / 16)</p>
          <div className='bg-silver h-4 mt-1'>
            <div
              className='bg-red h-full'
              style={{ width: `${(weaponDetail.data.weaponStats.fireRate / 16) * 100}%` }}
            />
          </div>
        </div>
        <div className='mb-4'>
          <p className='text-lg'>Equip Time <span className='font-bold'>({weaponDetail.data.weaponStats.equipTimeSeconds}</span>s / 1.5s)</p>
          <div className='bg-silver h-4 mt-1'>
            <div
              className='bg-red h-full'
              style={{ width: `${(weaponDetail.data.weaponStats.equipTimeSeconds / 1.5) * 100}%` }}
            />
          </div>
        </div>
        <div className='mb-4'>
          <p className='text-lg'>Reload Time <span className='font-bold'>({weaponDetail.data.weaponStats.reloadTimeSeconds}</span>s / 5s)</p>
          <div className='bg-silver h-4 mt-1'>
            <div
              className='bg-red h-full'
              style={{ width: `${(weaponDetail.data.weaponStats.reloadTimeSeconds / 5) * 100}%` }}
            />
          </div>
        </div>
        <div className='mb-4'>
          <p className='text-lg'>Magazine <span className='font-bold'>({weaponDetail.data.weaponStats.magazineSize}</span> / 100)</p>
          <div className='bg-silver h-4 mt-1'>
            <div
              className='bg-red h-full'
              style={{ width: `${(weaponDetail.data.weaponStats.magazineSize / 100) * 100}%` }}
            />
          </div>
        </div>
        <div className='mb-4'>
          <p className='text-lg'>Head Demage <span className='font-bold'>({weaponDetail.data.weaponStats.damageRanges[0].headDamage}</span> / 255)</p>
          <div className='bg-silver h-4 mt-1'>
            <div
              className='bg-red h-full'
              style={{ width: `${(weaponDetail.data.weaponStats.damageRanges[0].headDamage / 255) * 100}%` }}
            />
          </div>
        </div>
        <div className='mb-4'>
          <p className='text-lg'>Body Damage <span className='font-bold'>({weaponDetail.data.weaponStats.damageRanges[0].bodyDamage}</span> / 150)</p>
          <div className='bg-silver h-4 mt-1'>
            <div
              className='bg-red h-full'
              style={{ width: `${(weaponDetail.data.weaponStats.damageRanges[0].bodyDamage / 150) * 100}%` }}
            />
          </div>
        </div>
        <div className='mb-4'>
          <p className='text-lg'>Leg Damage <span className='font-bold'>({weaponDetail.data.weaponStats.damageRanges[0].legDamage}</span> / 120)</p>
          <div className='bg-silver h-4 mt-1'>
            <div
              className='bg-red h-full'
              style={{ width: `${(weaponDetail.data.weaponStats.damageRanges[0].legDamage / 120) * 100}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
