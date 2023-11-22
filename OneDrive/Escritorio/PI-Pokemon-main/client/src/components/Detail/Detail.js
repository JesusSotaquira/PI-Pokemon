import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { detail } from '../../redux/actions/detailAction';
import { useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';

const PokemonDetail = ({ match, detail, pokemonDetail }) => {
  const history = useHistory();

  useEffect(() => {
    console.log('PokemonDetail montado');
    detail(match.params.id);
  }, [detail, match.params.id]);


  
  if (!pokemonDetail) {
    console.log('No hay detalles del Pokémon en el estado');
    return <p>Loading Pokémon details...</p>;
  }
  
  console.log('Detalles del Pokémon:', pokemonDetail);
  //const handleBackToList = () => {
  // 
  //  history.push('/home');
  //};

  return (
    <div>
      <h1>{pokemonDetail.nombre}</h1>
      <img src={pokemonDetail.imagen} alt={pokemonDetail.nombre} />
      <p>Vida: {pokemonDetail.vida}</p>
      <p>Ataque: {pokemonDetail.ataque}</p>
      <p>Defensa: {pokemonDetail.defensa}</p>
      <p>Velocidad: {pokemonDetail.velocidad}</p>
      <p>Altura: {pokemonDetail.altura}</p>
      <p>Peso: {pokemonDetail.peso}</p>
      <p>Tipo: {pokemonDetail.tipos}</p>

      {/*<button onClick={handleBackToList}>Volver a la lista de Pokémon</button> */}
      <Link to="/home" className="return-button">Volver a la lista de pokemones</Link>

    </div>
  );
  
};

const mapStateToProps = (state) => ({
    pokemonDetail: state.pokemonDetail,
  });
  
  export default connect(mapStateToProps, { detail })(PokemonDetail);
