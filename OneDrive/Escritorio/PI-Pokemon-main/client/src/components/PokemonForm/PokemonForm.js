import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { createPokemon } from '../../redux/actions/ActionCreate';

function PokemonForm() {
  const dispatch = useDispatch();

  const [formState, setFormState] = useState({
    Nombre: '',
    Imagen: '',
    Vida: 0,
    Ataque: 0,
    Defensa: 0,
    Velocidad: 0,
    Altura: 0,
    Peso: 0,
    tiposSeleccionados: [],
    tiposDesdeAPI: [],
  });

  const obtenerTiposDesdeAPI = async () => {
    try {
      const response = await fetch('http://localhost:3001/types');
      const tipos = await response.json();

      console.log('Tipos obtenidos desde la API:', tipos);

      setFormState((prevState) => ({
        ...prevState,
        tiposDesdeAPI: tipos.map((tipo) => tipo.Nombre),
      }));
    } catch (error) {
      console.error('Error al obtener tipos desde la API:', error);
    }
  };

  useEffect(() => {
    console.log('Componente montado');
    obtenerTiposDesdeAPI();
  }, []);

  const handleTypeChange = (event) => {
    if (event.target.checked) {
      setFormState({
        ...formState,
        tiposSeleccionados: [...formState.tiposSeleccionados, event.target.value],
      });
    } else {
      setFormState({
        ...formState,
        tiposSeleccionados: formState.tiposSeleccionados.filter(
          (tipo) => tipo !== event.target.value
        ),
      });
    }
  };

  const handleChange = (event) => {
    setFormState({
      ...formState,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Enviando formulario:', formState);
    dispatch(createPokemon(formState));
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Nombre:
        <input type="text" name="Nombre" onChange={handleChange} value={formState.Nombre} required />
      </label>
      <br />
      <label>
        Imagen:
        <input
          type="text"
          name="Imagen"
          onChange={handleChange}
          value={formState.Imagen}
          placeholder="URL de la imagen (opcional)"
        />
      </label>
      <br />
      <label>
        Vida:
        <input type="text" name="Vida" onChange={handleChange} value={formState.Vida} required />
      </label>
      <br />
      <label>
        Ataque:
        <input type="text" name="Ataque" onChange={handleChange} value={formState.Ataque} required />
      </label>
      <br />
      <label>
        Defensa:
        <input type="text" name="Defensa" onChange={handleChange} value={formState.Defensa} required />
      </label>
      <br />
      <label>
        Velocidad:
        <input type="text" name="Velocidad" onChange={handleChange} value={formState.Velocidad} />
      </label>
      <br />
      <label>
        Altura:
        <input type="text" name="Altura" onChange={handleChange} value={formState.Altura} />
      </label>
      <br />
      <label>
        Peso:
        <input type="text" name="Peso" onChange={handleChange} value={formState.Peso} />
      </label>
      <br />

      <label>
        Tipos:
        {formState.tiposDesdeAPI &&
          formState.tiposDesdeAPI.map((tipo) => (
            <div key={tipo}>
              <input
                type="checkbox"
                id={tipo}
                value={tipo}
                onChange={handleTypeChange}
                checked={formState.tiposSeleccionados.includes(tipo)}
              />
              <label htmlFor={tipo}>{tipo}</label>
            </div>
          ))}
      </label>
      <br />

      <button type="submit">Crear Pokémon</button>
    </form>
  );
}

export default PokemonForm;
