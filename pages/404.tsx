import Link from 'next/link';

export default function FourOhFour() {
  return <div className='flex flex-col items-center mt-10'>
    <h1 className='text-xl text-mainInfo-500'>404 - Pagina no encontrada</h1>
    <Link href="/">
      <a className='btn btn-primary text-main-100 mt-5'>
        Volver a la tienda
      </a>
    </Link>
  </div>
}