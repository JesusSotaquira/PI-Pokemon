import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { detail } from '../../redux/actions/detailAction';
import { useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import './Detail.css';

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
    <div className="card-details">
      <div className="row no-gutters">
        <div className="col-md-5">
          <div className="image-container">
            <img src={pokemonDetail.imagen} alt={pokemonDetail.imagen} className="card-img" />
          </div>
        </div>
        <div className="col-md-7 card-body">
          <h1>{pokemonDetail.nombre}</h1>
          <p>Vida: {pokemonDetail.vida}</p>
          <p>Ataque: {pokemonDetail.ataque}</p>
          <p>Defensa: {pokemonDetail.defensa}</p>
          <p>Velocidad: {pokemonDetail.velocidad}</p>
          <p>Altura: {pokemonDetail.altura}</p>
          <p>Peso: {pokemonDetail.peso}</p>
          <p>Tipo: {pokemonDetail.tipos}</p>

          <Link to="/home" className="return-button">
            Volver a la lista de pokemones
          </Link>
        </div>
      </div>
    </div>
  );
  
};

const mapStateToProps = (state) => ({
    pokemonDetail: state.pokemonDetail,
  });
  
  export default connect(mapStateToProps, { detail })(PokemonDetail);
