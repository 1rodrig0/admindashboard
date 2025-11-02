import React from 'react'
import Biblioteca from '../../modules/biblioteca/biblioteca'

interface PageProps {
  searchParams?: { [key: string]: string | string[] | undefined }
}

export default function Page({ searchParams }: PageProps) {
  let genre: string | null = null

  if (searchParams && searchParams.genre) {
    if (Array.isArray(searchParams.genre)) {
      genre = searchParams.genre[0]
    } else {
      genre = searchParams.genre
    }
  }

  return <Biblioteca genre={genre} />
}
