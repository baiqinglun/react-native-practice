import { Order } from '../../src/types';
import films from './films';
import dayjs from 'dayjs';

const now = dayjs();

const order: Order[] = [
  {
    id: 23123,
    created_at: now.subtract(1, 'hour').toISOString(),
    total: 31.4,
    status: 'Cooking',
    user_id: '1',
    order_items: [
      {
        id: 1,
        order_id: 23123,
        rate: 'G',
        times: 2,
        film_id: films[0].id,
        films: films[0],
      },
      {
        id: 2,
        order_id: 23123,
        rate: 'Q',
        times: 1,
        film_id: films[1].id,
        films: films[1],
      },
    ],
  },
  {
    id: 32145,
    created_at: now.subtract(3, 'days').toISOString(),
    total: 11.4,
    status: 'Delivered',
    user_id: '1',
    order_items: [
      {
        id: 1,
        order_id: 32145,
        rate: 'Q',
        times: 2,
        film_id: films[3].id,
        films: films[3],
      },
    ],
  },
  {
    id: 23445,
    created_at: now.subtract(3, 'weeks').toISOString(),
    total: 11.4,
    status: 'Delivered',
    user_id: '1',
    order_items: [
      {
        id: 1,
        order_id: 23445,
        rate: 'B',
        times: 1,
        film_id: films[3].id,
        films: films[3],
      },
      {
        id: 2,
        order_id: 23445,
        rate: 'G',
        times: 1,
        film_id: films[5].id,
        films: films[5],
      },
      {
        id: 3,
        order_id: 23445,
        rate: 'B',
        times: 1,
        film_id: films[6].id,
        films: films[6],
      },
    ],
  },
];


export default order