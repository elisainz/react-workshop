import React, { useState } from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import styled from "styled-components"; // Importamos `Styled Components`

import Ritmosustanciometro from "./Ritmosustanciometro";

// Creamos un container de `styled.div` con unos estilos básicos
const Container = styled.div`
  width: 100%;
  max-width: 640px;
  text-shadow: 0.5px 0.5px 0.5px cornflowerblue;
  font-family: Arial;
  color: white;
  text-align: center;
`;

function App() {
  const [nombre, setNombre] = useState("");
  const [individuos, setIndividuos] = useState([
    {
      nombre: "Eli",
      ritmosustancia: 70
    },
    {
      nombre: "Mateo",
      ritmosustancia: 18
    },
    {
      nombre: "Fede",
      ritmosustancia: 95
    },
    {
      nombre: "Lore",
      ritmosustancia: 42
    }
  ]);

  function actualizarNombre(event) {
    setNombre(event.target.value);
  }

  async function obtenerRitmosustancia(event) {
    event.preventDefault();

    const ritmosustancia = await axios(
      "https://wt-3581e5a0e6c19bb4a0552203b2738a9d-0.run.webtask.io/obtener-ritmosustancia"
    ).then(res => res.data);

    setIndividuos(
      individuos.concat({
        nombre,
        ritmosustancia
      })
    );
    setNombre("");
  }

  return (
    <Container>
      <h1>Ritmosustanciometro</h1>

      {individuos.map(individuo => (
        <Ritmosustanciometro
          nombre={individuo.nombre}
          ritmosustancia={individuo.ritmosustancia}
        />
      ))}
      <h4>Ingrese su nombre y obtenga su ritmosustancia</h4>
      <form onSubmit={obtenerRitmosustancia}>
        <input type="text" value={nombre} onChange={actualizarNombre} />
        <button type="submit">Obtener ritmosustancia</button>
      </form>
    </Container>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));
