import React, { useState } from 'react';

const FilterSortComponent = ({ onFilter, onSortAttack, onSortAlphabetical }) => {
  const [filter, setFilter] = useState('');
  const [sortAttack, setSortAttack] = useState('');
  const [sortAlphabetical, setSortAlphabetical] = useState('');

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
    onFilter(event.target.value);
  };

  const handleSortAttackChange = (event) => {
    setSortAttack(event.target.value);
    onSortAttack(event.target.value);
  };

  const handleSortAlphabeticalChange = (event) => {
    setSortAlphabetical(event.target.value);
    onSortAlphabetical(event.target.value);
  };

  return (
    <div>
      <select value={filter} onChange={handleFilterChange}>
        <option value="">Filtrar por...</option>
        <option value="api">API</option>
        <option value="db">Base de datos</option>
      </select>

      <select value={sortAttack} onChange={handleSortAttackChange}>
        <option value="">Ordenar por ataque...</option>
        <option value="asc">Mayor a menor</option>
        <option value="desc">Menor a mayor</option>
      </select>

      <select value={sortAlphabetical} onChange={handleSortAlphabeticalChange}>
        <option value="">Ordenar alfabéticamente...</option>
        <option value="asc">De la A a la Z</option>
        <option value="desc">De la Z a la A</option>
      </select>
    </div>
  );
};

export default FilterSortComponent;
