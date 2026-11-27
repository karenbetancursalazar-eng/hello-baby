/**
 * SearchBar: campo de búsqueda reutilizable para las listas.
 * Justificación: el filtrado debe comportarse igual en todos los módulos.
 */
function SearchBar({ value, onChange, placeholder = 'Buscar...' }) {
  return (
    <label className="search-bar">
      <span className="visually-hidden">{placeholder}</span>
      <input
        type="search"
        value={value}
        placeholder={placeholder}
        onChange={(evento) => onChange(evento.target.value)}
      />
    </label>
  );
}

export default SearchBar;
