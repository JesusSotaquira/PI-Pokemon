 //nombre que no este vacio, solo letras, ✅
//sin imagen ✅
//vida obligatorio solo numeros  ✅
//ataque obligatorio solo numeros ✅
//defensa obligatorio solo numeros
//velocidad, altura, peso, opcional
//elegir al menos un tipo

export const validar = (data) => {
    const error = {};
  
    // Validación para el campo Nombre
    if (!data.Nombre) {
      error.Nombre = "Se necesita un nombre";
    } else if (!/^[a-zA-Z]+$/.test(data.Nombre)) {
      error.Nombre = "El nombre solo debe contener letras";
    }
  
    // Validaciones para los campos de números
    const numeroRegex = /^\d+$/;
  
    if (!data.Vida) {
      error.Vida = "Debe contener vida";
    } else if (!numeroRegex.test(data.Vida)) {
      error.Vida = "El campo Vida solo debe contener números";
    }
  
    if (!data.Ataque) {
      error.Ataque = "Debe contener ataque";
    } else if (!numeroRegex.test(data.Ataque)) {
      error.Ataque = "El campo Ataque solo debe contener números";
    }
  
    if (!data.Defensa) {
      error.Defensa = "Debe contener defensa";
    } else if (!numeroRegex.test(data.Defensa)) {
      error.Defensa = "El campo Defensa solo debe contener números";
    }
  
    if (data.Velocidad && !numeroRegex.test(data.Velocidad)) {
      error.Velocidad = "El campo Velocidad solo debe contener números";
    }
  
    if (data.Altura && !numeroRegex.test(data.Altura)) {
      error.Altura = "El campo Altura solo debe contener números";
    }
  
    if (data.Peso && !numeroRegex.test(data.Peso)) {
      error.Peso = "El campo Peso solo debe contener números";
    }
  
    return error;
  };
   
   