import { lusitana } from '@/app/ui/fonts';
import Image from 'next/image';

export default function Logo() {
  return (
    <div
      className={`${lusitana.className} flex flex-row items-center leading-none text-white`}
    >
      <Image
        src="/logo.png"
        alt="logo"
        width={120}
        height={150}
        className=""
        priority
      />
      

      
      <p className="text-[44px]"></p>
    </div>
  );
}
