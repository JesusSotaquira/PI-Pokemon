import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { createPokemon } from '../../redux/actions/ActionCreate';
import { validar } from './validation';
import './PokemonForm.css'; 


function PokemonForm() {
  const [errors, setErrors] = useState({});

  const dispatch = useDispatch();
  const defaultImage = 'https://es-static.z-dn.net/files/dbc/7cabf9bc89b93ce8fd55c6e741218502.jpg';

  const [formState, setFormState] = useState({
    Nombre: '',
    Imagen: defaultImage,
    Vida: '',
    Ataque: '',
    Defensa: '',
    Velocidad: '',
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

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Validar el formulario antes de enviar
    const validationErrors = validar(formState);
    setErrors(validationErrors);

    // Si no hay errores de validación, envía el formulario
    if (Object.keys(validationErrors).length === 0) {
      console.log('Enviando formulario:', formState);
      dispatch(createPokemon(formState));

      // Restablecer los valores del formulario
      setFormState({
        Nombre: '',
        Imagen: defaultImage,
        Vida: '',
        Ataque: '',
        Defensa: '',
        Velocidad: '',
        Altura: 0,
        Peso: 0,
        tiposSeleccionados: [],
        tiposDesdeAPI: [],
      });

      // Obtener tipos desde la API nuevamente
      await obtenerTiposDesdeAPI();
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Nombre:
        <input type="text" name="Nombre" onChange={handleChange} value={formState.Nombre} required />
        {errors.Nombre && <p className="error">{errors.Nombre}</p>}
      </label>
  
      <br />
      <label>
        Vida:
        <input type="text" name="Vida" onChange={handleChange} value={formState.Vida} required />
        {errors.Vida && <p className="error">{errors.Vida}</p>}
      </label>
      <br />
      <label>
        Ataque:
        <input type="text" name="Ataque" onChange={handleChange} value={formState.Ataque} required />
        {errors.Ataque && <p className="error">{errors.Ataque}</p>}
      </label>
      <br />
      <label>
        Defensa:
        <input type="text" name="Defensa" onChange={handleChange} value={formState.Defensa} required />
        {errors.Defensa && <p className="error">{errors.Defensa}</p>}
      </label>
      <br />
      <label>
        Velocidad:
        <input type="text" name="Velocidad" onChange={handleChange} value={formState.Velocidad} />
        {errors.Velocidad && <p className="error">{errors.Velocidad}</p>}
      </label>
      <br />
      <label>
        Altura:
        <input type="text" name="Altura" onChange={handleChange} value={formState.Altura} />
        {errors.Altura && <p className="error">{errors.Altura}</p>}
      </label>
      <br />
      <label>
        Peso:
        <input type="text" name="Peso" onChange={handleChange} value={formState.Peso} />
        {errors.Peso && <p className="error">{errors.Peso}</p>}
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