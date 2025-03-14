'use client';

import { CustomerField, InvoiceForm, State, Parking } from '@/app/lib/definitions';
import { createInvoice, fetchCustomers, fetchParkingSpaces } from '@/app/lib/actions';
import { useFormState } from 'react-dom';
import { PlusIcon } from '@heroicons/react/24/outline';
import { CurrencyDollarIcon, CreditCardIcon } from '@heroicons/react/24/solid';
import { QrCodeIcon } from '@heroicons/react/24/outline';
import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';

export default function FormCreateInvoice() {
  const initialState: State = { message: null, errors: {} };

  const [createInvoiceWithParking, setFormState] = useFormState(
    async (prevState: State, formData: FormData) => {
      const result = await createInvoice(prevState, formData);
      if (result.errors) {
        return result;
      }
      return { message: 'Invoice created successfully', errors: {} };
    },
    initialState
  );
  const [customers, setCustomers] = useState<CustomerField[]>([]);
  const [parkingData, setParkingData] = useState<Parking[] | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedSpace, setSelectedSpace] = useState<number | null>(null);
  const searchParams = useSearchParams();
  const query = searchParams.get('query');
  const [currentPage, setCurrentPage] = useState(1);
  const spacesPerPage = 10;

  useEffect(() => {
    const fetchData = async () => {
      const customersData = await fetchCustomers();
      setCustomers(customersData);
      const parkingSpacesData = await fetchParkingSpaces();
      setParkingData(parkingSpacesData);
    };
    fetchData();
  }, [query]);

  const availableSpaces = parkingData
    ? parkingData.filter((parking) => !parking.is_occupied).map((parking) => parking.space)
    : [];

  const totalPages = Math.ceil(availableSpaces.length / spacesPerPage);
  const startIndex = (currentPage - 1) * spacesPerPage;
  const endIndex = startIndex + spacesPerPage;
  const currentParkingSpaces = availableSpaces.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleSpaceClick = (space: number) => {
    setSelectedSpace(space);
    setShowModal(false);
  };

  const validatePlate = (plate: string) => {
    const regex = /^[A-Z]{3}-\d[A-Z\d]\d{2}$/;
    return regex.test(plate.toUpperCase());
  };

  return (
    <form action={setFormState} className="mt-8">
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        {/* Customer Name */}
        <div className="mb-4">
          <label htmlFor="customer" className="mb-2 block text-sm font-bold">
            Escolha o Cliente
          </label>
          <div className="relative">
            <select
              id="customer"
              name="customerId"
              className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              value={createInvoiceWithParking.errors?.customerId ? '' : createInvoiceWithParking.errors?.customerId}
              aria-describedby="customer-error"
            >
              <option value="" disabled>
                Selecione um cliente
              </option>
              <option value="avulso">Avulso</option>
              {customers.map((customer) => (
                <option key={customer.id} value={customer.id}>
                  {customer.name}
                </option>
              ))}
            </select>
            <PlusIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
          </div>
          <div id="customer-error" aria-live="polite" aria-atomic="true">
            {createInvoiceWithParking.errors?.customerId &&
              createInvoiceWithParking.errors.customerId.map((error) => (
                <p key={error} className="mt-2 text-sm text-red-500">
                  {error}
                </p>
              ))}
          </div>
        </div>

        {/* Invoice Amount */}
        <div className="mb-4">
          <label htmlFor="amount" className="mb-2 block text-sm font-bold">
            Valor
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="pointer-events-none absolute left-3 top-1/2 flex h-[18px] w-[18px] -translate-y-1/2 items-center text-gray-500">
              <CurrencyDollarIcon />
            </div>
            <input
              id="amount"
              type="number"
              step="0.01"
              name="amount"
              className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              placeholder="Digite o valor"
              aria-describedby="amount-error"
            />
          </div>
          <div id="amount-error" aria-live="polite" aria-atomic="true">
            {createInvoiceWithParking.errors?.amount &&
              createInvoiceWithParking.errors.amount.map((error) => (
                <p key={error} className="mt-2 text-sm text-red-500">
                  {error}
                </p>
              ))}
          </div>
        </div>

        {/* Invoice Status */}
        <div className="mb-4">
          <label htmlFor="status" className="mb-2 block text-sm font-bold">
            Forma de Pagamento
          </label>
          <div className="relative">
            <select
              id="status"
              name="status"
              className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              value={createInvoiceWithParking.errors?.status ? '' : createInvoiceWithParking.errors?.status}
              aria-describedby="status-error"
            >
              <option value="pending">Dinheiro <CurrencyDollarIcon className="inline-block ml-2 h-5 w-5" /></option>
              <option value="credit">Cartão de Crédito <CreditCardIcon className="inline-block ml-2 h-5 w-5" /></option>
              <option value="debit">Cartão de Débito <CreditCardIcon className="inline-block ml-2 h-5 w-5" /></option>
              <option value="pix">Pix <QrCodeIcon className="inline-block ml-2 h-5 w-5" /></option>
            </select>
            <CurrencyDollarIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
          </div>
          <div id="status-error" aria-live="polite" aria-atomic="true">
            {createInvoiceWithParking.errors?.status &&
              createInvoiceWithParking.errors.status.map((error) => (
                <p key={error} className="mt-2 text-sm text-red-500">
                  {error}
                </p>
              ))}
          </div>
        </div>

        {/* Parking Space */}
        <div className="mb-4">
          <label htmlFor="parking" className="mb-2 block text-sm font-bold">
            Vaga
          </label>
          <div className="relative">
            <button
              type="button"
              onClick={() => setShowModal(true)}
              className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
            >
              {selectedSpace ? `Vaga ${selectedSpace}` : 'Selecione uma vaga'}
            </button>
          </div>
        </div>

        {/* Vehicle Plate */}
        <div className="mb-4">
          <label htmlFor="plate" className="mb-2 block text-sm font-bold">
            Placa do Veículo
          </label>
          <div className="relative">
            <input
              id="plate"
              type="text"
              name="plate"
              className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              placeholder="Digite a placa do veículo"
              aria-describedby="plate-error"
            />
          </div>
          <div id="plate-error" aria-live="polite" aria-atomic="true">
            {createInvoiceWithParking.errors?.plate &&
              createInvoiceWithParking.errors.plate.map((error) => (
                <p key={error} className="mt-2 text-sm text-red-500">
                  {error}
                </p>
              ))}
          </div>
        </div>
      </div>
      <div className="mt-6 flex justify-end gap-4">
        <button
          type="submit"
          className="flex h-10 items-center rounded-lg bg-blue-600 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
        >
          Criar Venda
        </button>
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg">
            <h2 className="text-lg font-bold mb-4">Vagas Disponíveis</h2>
            <div className="grid grid-cols-5 gap-2">
              {currentParkingSpaces.map((space) => (
                <button
                  key={space}
                  onClick={() => handleSpaceClick(space)}
                  className="bg-green-500 text-white p-2 rounded-md"
                >
                  {space}
                </button>
              ))}
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
            <button
              onClick={() => setShowModal(false)}
              className="mt-4 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
            >
              Fechar
            </button>
          </div>
        </div>
      )}
    </form>
  );
}
