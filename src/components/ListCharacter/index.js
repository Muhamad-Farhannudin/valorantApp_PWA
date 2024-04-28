"use client"

import useSWR from 'swr'; 
import axios from 'axios';
import { useEffect, useState } from 'react';
import ScrambleText from '../ScrambleText';


const fetcher = (url) => axios.get(url).then((res) => res.data);

export default function ListCharacter() {
  const { data, error, isValidating } = useSWR('https://valorant-api.com/v1/agents', fetcher);
  const [selectedCharacter, setSelectedCharacter] = useState(null);
  const [selectedAbility, setSelectedAbility] = useState(null);

  useEffect(() => {
    if (data && data.data.length > 0 && !selectedCharacter) {
      setSelectedCharacter(data.data[0]);
    }

    if (data && data.data.length > 0 && !selectedAbility) {
      // Menggunakan data.data[0].abilities[0] untuk mendapatkan abiliti karakter pertama
      setSelectedAbility(data.data[0].abilities[0]);
    }
  }, [data, selectedCharacter, selectedAbility]);

  useEffect(() => {
    // Setiap kali karakter dipilih, tambahkan kelas slide-in-from-bottom
    const descriptionElement = document.getElementById('desc-description');
    if (descriptionElement) {
      descriptionElement.classList.add('slide-in-from-bottom');
    }

    // Membersihkan kelas slide-in-from-bottom setelah beberapa waktu
    const timeoutId = setTimeout(() => {
      if (descriptionElement) {
        descriptionElement.classList.remove('slide-in-from-bottom');
      }
    }, 300); // Sesuaikan waktu sesuai kebutuhan

    // Membersihkan timeout jika komponen di-unmount atau karakter dipilih kembali
    return () => clearTimeout(timeoutId);
  }, [selectedCharacter]);


  useEffect(() => {
    // Setiap kali ability dipilih, tambahkan kelas slide-in-from-bottom
    const descriptionElement = document.getElementById('ability-description');
    if (descriptionElement) {
      descriptionElement.classList.add('slide-in-from-bottom');
    }

    // Membersihkan kelas slide-in-from-bottom setelah beberapa waktu
    const timeoutId = setTimeout(() => {
      if (descriptionElement) {
        descriptionElement.classList.remove('slide-in-from-bottom');
      }
    }, 300); // Sesuaikan waktu sesuai kebutuhan

    // Membersihkan timeout jika komponen di-unmount atau ability dipilih kembali
    return () => clearTimeout(timeoutId);
  }, [selectedAbility]);

  const handleCharacterClick = (character) => {
    setSelectedCharacter(character);
    setSelectedAbility(character.abilities[0])
  };

  const handleAbilityClick = (ability) => {
    setSelectedAbility(ability);
  }

  if (error) return <div>Error: {error.message}</div>;
  if (!data && isValidating) return (
    <div className="loading-container w-full h-screen items-center text-center">
      <div className="loading-spinner mx-auto mt-60"></div>
    </div>
  )

  return (
    <div className='w-full leading-tight'>
      <div className='relative h-screen'>
        <img src="/bg-valorant.png" className='absolute top-0 left-0 w-full h-full bg-cover' />
        <div className='w-full h-screen bg-black/30 absolute top-0 left-0'></div>
        {selectedCharacter && (
          <>
            <div className='relative mx-auto px-32 flex flex-row text-silver'>
              <div className='w-[30%]'>
                <h1 className='text-6xl tracking-tight font-extrabold leading-[100px] font-antonio'>
                  <ScrambleText text={selectedCharacter.displayName} />
                </h1>
                <h3 className='text-3xl font-bold uppercase'>role</h3>
                <div className='w-[30%] flex justify-start items-center mt-3'>
                  <img width={'40px'} src={selectedCharacter.role.displayIcon} alt={selectedCharacter.role.displayName} />
                  <h2 className='text-4xl font-bold font-antonio uppercase ml-2'>{selectedCharacter.role.displayName}</h2>
                </div>
                <h3 className='text-3xl font-bold uppercase mt-5'>biography</h3>
                <p id='desc-description' className='text-lg font-normal mt-3'>{selectedCharacter.description}</p>
              </div>
              <div className='w-[40%]'>
                <img className='w-full h-full object-cover' src={selectedCharacter.fullPortrait} alt={selectedCharacter.displayName} />
              </div>
              <div className='w-[30%]'>
                <h1 className='text-6xl tracking-tight font-extrabold leading-[100px] font-antonio text-center uppercase'>abilities</h1>
                <div className='mx-auto grid grid-cols-4 gap-2 px-5'>
                  {selectedCharacter.abilities.slice(0, 4).map((ability, index) => (
                    <>
                      <div
                        key={index}
                        className={`border-2 border-silver flex justify-center py-3 cursor-pointer ${selectedAbility === ability ? 'bg-red' : 'ability'
                          }`}
                        onClick={() => handleAbilityClick(ability)}
                      >
                        <img width={'50px'} src={ability.displayIcon} alt={ability.displayName} />
                      </div>
                    </>
                  ))}
                </div>
                {selectedAbility && (
                  <div className='w-full px-5 mt-3'>
                    <h2 className='text-4xl leading-relaxed font-extrabold font-antonio uppercase'>
                      <ScrambleText text={selectedAbility.displayName} /></h2>
                    <div id='ability-description' className='overflow-y-auto h-40 scrollbar-thin scrollbar-thumb-red-500'>
                      <p className='text-md leading-tight font-normal'>{selectedAbility.description}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div className='relative mx-auto grid grid-cols-10 gap-4 w-2/3 py-5'>
              {data &&
                [
                  ...data.data.slice(0, 9),
                  ...data.data.slice(10, 21)
                ].map((character, index) => (
                  <div
                    key={index}
                    className={`w-full flex flex-row gap-2 cursor-pointer border-2 hover:border-red ${selectedCharacter === character ? 'border-red' : 'border-transparent'}`}
                    onClick={() => handleCharacterClick(character)}
                  >
                    <img width={'80px'} src={character.displayIcon} alt={character.displayName} />
                  </div>
                ))}
            </div>
          </>
        )}
      </div>
    </div>
  )
}
