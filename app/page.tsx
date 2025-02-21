import AcmeLogo from '@/app/ui/acme-logo';
import { ArrowRightIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { lusitana } from './ui/fonts';
import Image from 'next/image';
import { fetchRevenue, fetchLatestInvoices, fetchCardData } from './lib/data';

export default function Page() {
  return (
    
    <main className="flex flex-col min-h-screen flex-col items-center p-6 bg-white">
      {/* Header */}
      <div className="w-full flex h-20 md:h-52 items-end bg-blue-500 p-4 rounded-lg">
        <AcmeLogo />
      </div>
      
      {/* Content Section */}
      <div className="mt-10 flex flex-col md:flex-row md:w-3/5 gap-6">
        <div className="bg-gray-50 p-6 md:p-10 rounded-lg flex flex-col">
          <p className={`text-xl text-gray-800 md:text-3xl md:leading-normal ${lusitana.className}`}>
            <strong>Welcome to Acme.</strong> This is the example for the{' '}
            <a href="https://nextjs.org/learn/" className="text-blue-500">
              Next.js Learn Course
            </a>
            , brought to you by Vercel.
          </p>
          
          <Link
            href="/login"
            className="mt-6 flex items-center gap-2 bg-blue-500 px-6 py-3 text-white text-sm md:text-base font-medium rounded-lg transition hover:bg-blue-400 self-start"
          >
            <span>Log in</span> <ArrowRightIcon className="w-5 md:w-6" />
          </Link>
        </div>
        
        {/* Image Section */}
        <div className="flex justify-center">
          <Image
            src="/hero-desktop.png"
            width={1000}
            height={760}
            alt="Screenshots of the dashboard project showing desktop version"
            className="hidden md:block"
          />
          <Image
            src="/hero-mobile.png"
            width={560}
            height={620}
            className="block md:hidden"
            alt="Screenshot of the dashboard project showing mobile version"
          />
        </div>
      </div>
      
      {/* Decorative Triangle */}
      <div className="mt-4 flex justify-center">
        <div className="w-0 h-0 border-l-[15px] border-r-[15px] border-b-[26px] border-l-transparent border-r-transparent border-b-black" />
      </div>
    </main>
  );
}
