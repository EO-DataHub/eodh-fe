import { LoadingSpinner } from '../loading-spinner';

export function AppLoader(): JSX.Element | null {
  return (
    <main className='fixed top-0 left-0 m-0 p-0 w-screen h-screen flex flex-col bg-background z-[100000000001]'>
      <section className='flex flex-col justify-center items-center h-screen'>
        <LoadingSpinner />
      </section>
    </main>
  );
}
