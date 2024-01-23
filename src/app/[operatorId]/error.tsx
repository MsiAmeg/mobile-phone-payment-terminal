'use client';

export default function PaymetSectionError({error}: {error: Error}) {
  return (
    <h1>Ошибка: {error.message}</h1>
  )
}