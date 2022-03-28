import { RentalApi } from '../service';
import { S } from '@finalytic/utils';
import { createModule, transforms } from '@finalytic/integration';

export const booking = createModule(
  'booking',
  // Entities can be defined the "hard" way. In this case we'll validate entities in our system, since we know the structure
  {
    id: S.number(),
    guestName: S.string(),
    unitId: S.number(),
    checkin: S.string(),
    checkout: S.string(),
    updatedAt: S.number(),
  },
  async ({ dispatch, useService, scope, log }) => {
    console.log('API');

    // Let our system take care of connecting, just pass the service
    const service = await useService(RentalApi);

    for (const item of await service.getBookings(
      scope.cursor?.start,
      scope.cursor?.end,
      5
    )) {
      // Dispatch entities by passing the entity definition + the data
      dispatch(booking.entity, {
        uniqueRef: `${item.id}`,
        description: item.guestName,
        data: item,
      });
      scope.cursor.end = item.checkout;
    }
  },
  async ({ dispatch, log, params }) => {
    log.info('Transforming ...');
    // Dispatch a transformation by passing our build in transform definitions (unit, booking, ...) and the data
    dispatch(transforms.booking, {
      bookerName: params.data.guestName,
      checkIn: params.data.checkin,
      checkOut: params.data.checkout,
      unit: { uniqueRef: '' },
      lines: [
        {
          classification: 'adjustment_alteration',
          centTotal: 100,
          // payment: { uniqueRef: '' },
        },
      ],
    });
  }
);
