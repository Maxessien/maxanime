import { ReactNode } from 'react';
import AppHeader from './AppHeader';
import AppNavigation from './AppNavigation';

const AppLayout = ({children}: {children: ReactNode}) => {
  return (
    <>
    <AppHeader />
    <main className='w-full h-full md:grid md:grid-cols-[30%_70%] lg:grid-cols-[25%_75%]'>
        <aside className='w-full md:h-full h-max md:bg-gray-800 md:px-3 md:py-4 absolute bottom-3 left-0 md:sticky px-2'>
            <AppNavigation />
        </aside>
        <section className='w-full px-2 py-4 sm:px-3 lg:px-5'>
            {children}
        </section>
    </main>
    </>
  )
}

export default AppLayout