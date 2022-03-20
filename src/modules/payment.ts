import { Payment, RentalApi } from '../service';
import { bankersRoundToCents, toCamelCase } from '@finalytic/utils';
import { createModule, transforms } from '@finalytic/integration';
import { gql } from '@finalytic/client';

export const payment = createModule<Payment>(
  'payment',
  // Entities can be defined the "hard" way. In this case we'll validate entities in our system, since we know the structure
  async ({ dispatch, useService, scope, log }) => {
    console.log('API');

    // Let our system take care of connecting, just pass the service
    const service = await useService(RentalApi);

    for (const item of await service.getPayments()) {
      // Dispatch entities by passing the entity definition + the data
      dispatch(payment.entity, {
        uniqueRef: `${item.id}`,
        description: item.reference,
        data: item,
      });
    }
  },
  async ({ dispatch, log, params }) => {
    log.info('Transforming ...');
    // Dispatch a transformation by passing our build in transform definitions (unit, booking, ...) and the data
    dispatch(transforms.payment, {
      description: params.data.reference,
      centTotal: bankersRoundToCents(params.data.amount),
      paidAt: params.data.sentAt,
      status: 'paid',
      currency: 'eur',
      lines: params.data.lines.map((line) => ({
        uniqueRef: toCamelCase(line[0]),
        classification: mapLineClass(line[0]),
        description: line[0],
        centTotal: bankersRoundToCents(line[1]),
      })),
    });
  }
);

function mapLineClass(line: string): gql.line_classifications_enum {
  if (line === 'Accommodation') return 'revenue_accommodation';
  if (line === 'Cleaning') return 'revenue_cleaning';
  if (line === 'OTA') return 'commission_ota';
  return 'adjustment_other';
}
