// This file contains type definitions for your data.
// It describes the shape of the data, and what data type each property should accept.
// For simplicity of teaching, we're manually defining these types.
// However, these types are generated automatically if you're using an ORM such as Prisma.
export type User = {
  id: string;
  name: string;
  email: string;
  password: string;
};

export type Customer = {
  id: string;
  name: string;
  email: string;
  image_url: string;
};

export type Invoice = {
  id: string;
  customer_id: string;
  amount: number;
  date: string;
  // In TypeScript, this is called a string union type.
  // It means that the "status" property can only be one of the two strings: 'pending' or 'paid'.
  status: 'pending' | 'paid';
};

export type Revenue = {
  month: string;
  revenue: number;
};

export type LatestInvoice = {
  id: string;
  name: string;
  image_url: string;
  email: string;
  amount: string;
};

// The database returns a number for amount, but we later format it to a string with the formatCurrency function
export type LatestInvoiceRaw = Omit<LatestInvoice, 'amount'> & {
  amount: number;
};

export type InvoicesTable = {
  id: string;
  customer_id: string;
  name: string;
  email: string;
  image_url: string;
  date: string;
  amount: number;
  status: 'pending' | 'paid';
};

export type CustomersTableType = {
  id: string;
  name: string;
  email: string;
  image_url: string;
  total_invoices: number;
  total_pending: number;
  total_paid: number;
};

export type FormattedCustomersTable = {
  id: string;
  name: string;
  email: string;
  image_url: string;
  total_invoices: number;
  total_pending: string;
  total_paid: string;
};

export type CustomerField = {
  id: string;
  name: string;
};

export type InvoiceForm = {
  id: string;
  customer_id: string;
  amount: number;
  status: 'pending' | 'paid';
};

export type Parking = {
  space: number;
  is_occupied: boolean;
};

export type State = {
  errors?: {
    customerId?: string[];
    amount?: string[];
    status?: string[];
    plate?: string[];
  };
  message?: string | null;
};

export type InvoiceWithParking = {
  id: string;
  customer_id: string;
  amount: number;
  status: 'pending' | 'paid';
  date: string;
  space: number;
  plate: string;
};

export type ParkingSpace = {
  space: number;
  is_occupied: boolean;
};

export type ParkingSpaceWithInvoice = {
  space: number;
  is_occupied: boolean;
  invoice_id: string | null;
};
export type ParkingSpaceWithInvoiceAndCustomer = {
  space: number;
  is_occupied: boolean;
  invoice_id: string | null;
  customer_id: string | null;
};


export type ParkingSpaceWithInvoiceAndCustomerAndPlate = {
  space: number;
  is_occupied: boolean;
  invoice_id: string | null;
  customer_id: string | null;
  plate: string | null;
};
export type ParkingSpaceWithInvoiceAndCustomerAndPlateAndDate = {
  space: number;
  is_occupied: boolean;
  invoice_id: string | null;
  customer_id: string | null;
  plate: string | null;
  date: string | null;
};


export type ParkingSpaceWithInvoiceAndCustomerAndPlateAndDateAndAmount = {
  space: number;
  is_occupied: boolean;
  invoice_id: string | null;
  customer_id: string | null;
  plate: string | null;
  date: string | null;
  amount: number | null;
};

