import { CarModel } from './models/car-model';
import { CarsModel } from './models/cars-model';
import { CarMovementCharcsModel } from './models/car-motion-model';
import { CarStatusModel } from './models/car-drive-mode-model';
import { WinnersModel } from './models/winners-model';
import { WinnerModel } from './models/winner-model';
import { WinnerSort } from './models/winner-sort-model';
import { WinnerOrder } from './models/winner-order-model';
import { CarWriteModel } from './models/car-write-model';
import { WinnerWriteModel } from './models/winner-write-model';

const baseUrl = 'http://localhost:3000';

const paths = {
  garage: '/garage',
  winners: '/winners',
  engine: '/engine',
};

export const getCars = async (page: number, limit = 7): Promise<CarsModel> => {
  const response = await fetch(`${baseUrl}${paths.garage}?_page=${page}&_limit=${limit}`);
  const cars: CarModel[] = await response.json();
  const count = Number(response.headers.get('X-Total-Count'));

  return {
    cars,
    count,
  };
};

export const getCar = async (id: number): Promise<CarModel> => {
  const response = await fetch(`${baseUrl}${paths.garage}/${id}`);
  const car: CarModel = await response.json();

  return car;
};

export const createCar = async (body: CarWriteModel): Promise<CarModel> => {
  const response = await fetch(`${baseUrl}${paths.garage}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });

  const car: CarModel = await response.json();

  return car;
};

export const deleteCar = async (id: number): Promise<Record<string, never>> => {
  const response = await fetch(`${baseUrl}${paths.garage}/${id}`, {
    method: 'DELETE',
  });

  const car: Record<string, never> = await response.json();

  return car;
};

export const updateCar = async (id: number, body: CarWriteModel): Promise<CarModel> => {
  const response = await fetch(`${baseUrl}${paths.garage}/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });

  const car: CarModel = await response.json();

  return car;
};

export const startEngine = async (id: number): Promise<CarMovementCharcsModel> => {
  const response = await fetch(`${baseUrl}${paths.engine}?id=${id}&status=started`);
  const carMovementCharcs: CarMovementCharcsModel = await response.json();

  return carMovementCharcs;
};

export const stopEngine = async (id: number): Promise<CarMovementCharcsModel> => {
  const response = await fetch(`${baseUrl}${paths.engine}?id=${id}&status=stopped`);
  const carMovementCharcs: CarMovementCharcsModel = await response.json();

  return carMovementCharcs;
};

export const driveCar = async (id: number): Promise<CarStatusModel> => {
  const response = await fetch(`${baseUrl}${paths.engine}?id=${id}&status=drive`);
  const carStatus: CarStatusModel = response.status === 200 ? await response.json() : { success: false };

  return carStatus;
};

export const getWinners = async (
  page: number,
  limit = 10,
  sort: WinnerSort = 'time',
  order: WinnerOrder = 'ASC'
): Promise<WinnersModel> => {
  const response = await fetch(
    `${baseUrl}${paths.winners}?_page=${page}&_limit=${limit}&_sort=${sort}&_order=${order}`
  );

  const winners: WinnerModel[] = await response.json();
  const count = Number(response.headers.get('X-Total-Count'));
  const winnersWithCars = await Promise.all(
    winners.map(async (winner) => ({ ...winner, ...(await getCar(winner.id)) }))
  );

  return {
    winnersWithCars,
    count,
  };
};

export const getWinner = async (id: number): Promise<WinnerModel> => {
  const response = await fetch(`${baseUrl}${paths.winners}/${id}`);
  const winner: WinnerModel = await response.json();

  return winner;
};

export const getWinnerStatus = async (id: number): Promise<number> => {
  const response = await fetch(`${baseUrl}${paths.winners}/${id}`);

  return response.status;
};

export const createWinner = async (body: WinnerModel): Promise<WinnerModel> => {
  const response = await fetch(`${baseUrl}${paths.winners}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });

  const winner: WinnerModel = await response.json();

  return winner;
};

export const deleteWinner = async (id: number): Promise<Record<string, never>> => {
  const response = await fetch(`${baseUrl}${paths.winners}/${id}`, {
    method: 'DELETE',
  });

  const winner: Record<string, never> = await response.json();

  return winner;
};

export const updateWinner = async (id: number, body: WinnerWriteModel): Promise<WinnerWriteModel> => {
  const response = await fetch(`${baseUrl}${paths.winners}/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });

  const winner: WinnerModel = await response.json();

  return winner;
};

export const saveWinner = async (id: number, time: number): Promise<void> => {
  const winnerStatus = await getWinnerStatus(id);

  if (winnerStatus === 200) {
    const winner = await getWinner(id);

    await updateWinner(id, {
      wins: (winner.wins += 1),
      time: time < winner.time ? time : winner.time,
    });
  } else if (winnerStatus === 404) {
    await createWinner({
      id,
      wins: 1,
      time,
    });
  }
};
