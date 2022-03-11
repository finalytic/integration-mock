import { RentalApi, Unit } from '../service';
import { createModule, transforms } from '@finalytic/integration';

// Entities can be defined the "easy" way, by just giving a name and type. No validation is done.
export const unit = createModule<Unit>(
  'unit',
  async ({ dispatch, useService, log }) => {
    log.info('Extracting...');

    // Let our system take care of connecting, just pass the service
    const service = await useService(RentalApi);

    for (const item of await service.getUnits()) {
      // Dispatch entities by passing the entity definition + the data
      dispatch(unit.entity, {
        description: item.name,
        uniqueRef: `${item.id}`,
        data: item,
      });
    }
  },
  async ({ dispatch, log, params }) => {
    log.info('Transforming ...');
    // Dispatch a transformation by passing our build in transform definitions (unit, booking, ...) and the data
    dispatch(transforms.unit, {
      name: params.data.name,
    });
  }
);
