import React, { useState } from 'react';
import { connect } from 'react-redux';
import { getName } from '../../redux/actions/Actions';
import { Link } from 'react-router-dom';

const Search = ({ getName, pokemonData, setPagina }) => {
  const [query, setQuery] = useState('');
  

  const handleInputChange = (event) => {
    setQuery(event.target.value);
  };

  const handleSearch = () => {
    if (query.trim() !== '') {
      getName(query);
      setPagina(1);  // Utiliza la función setPagina para resetear la página a 1
      setQuery('');
    }
  };
  

  return (
    <div>
      <input type="text" value={query} onChange={handleInputChange} />
      <button onClick={handleSearch}>Buscar</button>
   
   
    </div>
  );
};

const mapStateToProps = (state) => ({
  pokemonData: state.pokemonData,
});

export default connect(mapStateToProps, { getName })(Search);
