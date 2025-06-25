function figther({ id, name , tipo,especial }) {
  return (
    <div>
      <label>nome</label>
      <input type="text"value={name}onChange={(e) => setTipo(e.target.value)}/>
      <label>Tipo</label>
      <input type="text"value={tipo}onChange={(e) => setTipo(e.target.value)}/>

    </div>
  );
}

export default figther;