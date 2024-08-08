export function AppLoader(): JSX.Element | null {
  return (
    <div className='fixed top-0 left-0 m-0 p-0 w-screen h-screen flex flex-col bg-background z-[100000000001]'>
      <section className='flex flex-col justify-center items-center h-screen'>
        <main className='flex relative w-16 h-16 *:animate-spin-cubic-bezier'>
          <div
            className='absolute box-border block w-12 h-12 m-2 border-4 rounded-full border-t-primary border-b-transparent border-x-transparent'
            style={{ animationDelay: '-0.45s' }}
          ></div>
          <div
            className='absolute box-border block w-12 h-12 m-2 border-4 rounded-full border-t-primary border-b-transparent border-x-transparent'
            style={{ animationDelay: '-0.3s' }}
          ></div>
          <div
            className='absolute box-border block w-12 h-12 m-2 border-4 rounded-full border-t-primary border-b-transparent border-x-transparent'
            style={{ animationDelay: '-0.15s' }}
          ></div>
          <div className='absolute box-border block w-12 h-12 m-2 border-4 rounded-full border-t-primary border-b-transparent border-x-transparent'></div>
        </main>
      </section>
    </div>
  );
}
