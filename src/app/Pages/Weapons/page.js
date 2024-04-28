"use client"

import { useRouter } from 'next/navigation'
import useSWR from 'swr';
import axios from 'axios';

const fetcher = (url) => axios.get(url).then((res) => res.data);

export default function Weapons() {
  const router = useRouter();
  const { data, error, isValidating } = useSWR('https://valorant-api.com/v1/weapons', fetcher);

  if (error) return <div>Error: {error.message}</div>;
  if (!data && isValidating) return (
    <div className="loading-container w-full h-screen items-center text-center">
      <div className="loading-spinner mx-auto mt-60"></div>
    </div>
  )

  // Mengorganisir senjata berdasarkan kategori
  const weaponsByCategory = data.data.reduce((acc, weapon) => {
    const category = weapon.shopData?.category || 'Uncategorized'; // Menggunakan 'Uncategorized' jika tidak ada data shopData atau category
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(weapon);
    return acc;
  }, {});

  return (
    <div className='w-full px-32 pb-3 bg-silver'>
      {Object.entries(weaponsByCategory).slice(0, 6).map(([category, weapons]) => (
        <div key={category} className='font-antonio'>
          <h1 className='text-5xl font-bold leading-relaxed uppercase border-slate-400 border-l-2 pl-5'>{category}</h1>
          <div className='grid grid-cols-2'>
            {weapons.map((weapon, index) => (
              <div key={index} className='relative w-full border-slate-400 border-2 p-5'>
                <h3 className='text-4xl font-bold leading-tight uppercase'>{weapon.displayName}</h3>
                <img src={weapon.displayIcon} alt={weapon.displayName} />
                {weapon.shopData && weapon.shopData.cost && (
                  <div className='absolute bottom-0 pb-4'>
                    <p className='text-lg font-bold'>Cost: {weapon.shopData.cost}</p>
                  </div>
                )}
                <div className='absolute inset-0 bg-red opacity-0 transition-opacity duration-300 hover:opacity-100 px-4 py-3 cursor-pointer'>
                  <h1 className='text-5xl font-bold leading-tight uppercase text-silver'>{weapon.displayName}</h1>
                  <p className='text-2xl mb-4 text-silver'>{weapon?.shopData?.category}</p>
                  <button className='absolute bottom-0 mb-5 bg-silver text-red px-24 py-4 text-2xl font-semibold uppercase' onClick={() => router.push(`/Pages/Weapons/${weapon.uuid}`)}>See Details</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );


}
