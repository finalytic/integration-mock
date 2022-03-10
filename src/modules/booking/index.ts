import { RentalApi } from '../../service';
import { S, day } from '@finalytic/utils';
import { createModule, transforms } from '@finalytic/integration';

export const booking = createModule(
  'booking',
  {
    id: S.number(),
    guestName: S.string(),
    unitId: S.string(),
    checkin: S.string(),
    checkout: S.string(),
    updatedAt: S.number(),
  },
  async ({ dispatch, useService, scope, log }) => {
    console.log('API');
    const service = await useService(RentalApi);

    console.log('EXTRACT', scope);
    for (const unit of scope.units || []) {
      log.info(`Extracting unit ${unit} ...`);
      for (const item of await service.getBookingsByUnit(
        unit,
        scope.date?.start,
        scope.date?.end
      )) {
        dispatch(booking.entity, {
          uniqueRef: `${item.id}`,
          description: item.guestName,
          data: item,
        });
        // dispatch(something, { message: '' });
      }
    }
  },
  async ({ dispatch, log, params }) => {
    log.info('Transforming ...');
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
