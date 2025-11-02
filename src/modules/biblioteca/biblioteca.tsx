import React from 'react'

interface BibliotecaProps {
  genre?: string | null;
}

const GENRE_NAMES: Record<string, string> = {
  'romance': 'Romance',
  'fantasia': 'Fantasía',
  'literatura-boliviana': 'Literatura Boliviana',
  'novela-juvenil': 'Novela Juvenil',
  'ciencia-ficcion': 'Ciencia Ficción',
  'terror': 'Terror',
  'poesia': 'Poesía',
  'clasicos': 'Clásicos',
}

function formatGenre(slug?: string | null) {
  if (!slug) return null
  const lower = String(slug).toLowerCase()
  if (GENRE_NAMES[lower]) return GENRE_NAMES[lower]
  // fallback: replace hyphens with spaces and capitalize each word
  return lower
    .split('-')
    .map(s => s.charAt(0).toUpperCase() + s.slice(1))
    .join(' ')
}

function Biblioteca({ genre }: BibliotecaProps) {
  const displayGenre = formatGenre(genre)

  return (
    <div>
      <h1>
        Historias de{displayGenre ? `   ${displayGenre}` : ''}
      </h1>

      <section className="BusquedaEtiquta"></section>
      <section className='busqueda_libros'>
        <div className='filtro'></div>
        <div className='librosSection'></div>
      </section>
    </div>
  )
}

export default Biblioteca
