// CharacterDetail.js
import React from 'react';

const CharacterDetail = ({ character }) => {
  return (
    <div className='mx-auto mt-4'>
      <h2>{character.displayName}</h2>
      <p>{character.description}</p>
      <p>Role: {character.role.displayName}</p>
      <p>{character.role.description}</p>
      <img width={'80px'} src={character.role.displayIcon} alt={character.role.displayName} />
      {character.abilities.map((ability, index) => (
        <div key={index}>
          <p>{ability.displayName}</p>
          <p>{ability.description}</p>
          <img width={'80px'} src={ability.displayIcon} alt={ability.displayName} />
        </div>
      ))}
    </div>
  );
};

export default CharacterDetail;
