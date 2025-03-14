'use client';

import { Parking } from '@/app/lib/definitions';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

import { fetchParkingSpaces } from '@/app/lib/parking';
export function ParkingTable() {
  const searchParams = useSearchParams();
  const query = searchParams.get('query');
  const [parkingData, setParkingData] = useState<Parking[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchParkingSpaces();
      setParkingData(data);
    };
    fetchData();
  }, [query]);

  const totalParkingSpaces = 200;
  const spacesPerPage = 100;
  const totalPages = Math.ceil(totalParkingSpaces / spacesPerPage);
  const [currentPage, setCurrentPage] = useState(1);

  const startIndex = (currentPage - 1) * spacesPerPage;
  const endIndex = startIndex + spacesPerPage;
  const currentParkingSpaces = Array.from({ length: totalParkingSpaces }, (_, i) => i + 1).slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
          <div className="md:grid md:grid-cols-10 md:gap-2 sm:flex sm:flex-wrap sm:gap-2" >
            {currentParkingSpaces.map((space) => {
              const isOccupied = parkingData.some((parking) => parking.space === space);
              return (
                <div
                  key={space}
                  className={`flex h-10 w-10 items-center justify-center  rounded-md border-2 ${isOccupied ? 'border-red-500 bg-red-500' : 'border-green-500 bg-green-500'} text-white`}
                >
                  <p className="text-center text-sm font-medium">{space}</p>
                </div>
              );
            })}
          </div>
          <div className="mt-4 flex justify-center">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                className={`mx-1 rounded-md px-3 py-1 ${currentPage === page ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
              >
                {page}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
