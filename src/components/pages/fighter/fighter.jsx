import React, { useState } from 'react';

// O componente agora gerencia seu próprio estado para os inputs
function Fighter({ id, name, tipo, especial }) {
  // Estado para o nome do lutador, inicializado com a prop 'name'
  const [nome, setNome] = useState(name);
  // Estado para o tipo de luta, inicializado com a prop 'tipo'
  const [tipo, setTipo] = useState(tipo);
  
  const [especial, setEspecial] = useState(especial);

  // Funções para lidar com mudanças seriam adicionadas aqui,
  // bem como um botão para salvar as alterações.
  // Por enquanto, o código abaixo apenas reflete os valores.

  return (
    <div>
      <h3>Fighter Details</h3>
      <p>ID: {id}</p>
      <div>
        <label>Nome: </label>
        <input 
          type="text" 
          value={nome} 
          onChange={(e) => setNome(e.target.value)} 
        />
      </div>
      <div>
        <label>Tipo: </label>
        <input 
          type="text" 
          value={tipo} 
          onChange={(e) => setTipo(e.target.value)} 
        />
      </div>
      <div>
        <label>Especial: </label>
        <input 
          type="text" 
          value={tipo} 
          onChange={(e) => setEspecial(e.target.value)} 
        />
      </div>
      <p>Especial: {especial}</p>
    </div>
  );
}

export default Fighter;