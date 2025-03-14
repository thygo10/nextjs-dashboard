
import { unstable_noStore as noStore } from 'next/cache';

export async function fetchParkingSpaces() {
  noStore();
  try {
    const data = await sql`SELECT * FROM parking`;
    return data.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch parking spaces.');
  }
}

export async function updateParkingSpace(space: number, isOccupied: boolean) {
  try {
    await sql`
      UPDATE parking
      SET is_occupied = ${isOccupied}
      WHERE space = ${space}
    `;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to update parking space.');
  }
}

export async function createParkingSpace(space: number) {
  try {
    await sql`
      INSERT INTO parking (space, is_occupied)
      VALUES (${space}, false)
    `;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to create parking space.');
  }
}
