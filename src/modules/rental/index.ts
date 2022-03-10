import { createModule, transforms } from '@finalytic/integration';

export const rental = createModule<{
  id: number;
  title: string;
}>(
  'rental',
  async ({ dispatch, useService, scope, log }) => {
    log.info('Extracting...');
    scope.units = ['Unit'];
  },
  async ({ dispatch, log, params }) => {
    log.info('Transforming ...');
    dispatch(transforms.unit, {
      name: params.data.title,
    });
  }
);
