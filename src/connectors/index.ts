import { RentalApi } from '../service';
import { S } from '@finalytic/utils';
import { createConnector } from '@finalytic/integration';
import { createHash } from 'crypto';

export const connector = createConnector(
  {
    // shouldRaiseQuestion: S.boolean().optional(),
    apiKey: S.string(),
    country: S.string().optional(),
  },
  async ({ params, dispatch, useService }) => {
    const service = await useService(RentalApi);
    await service.connect({
      apiKey: params?.apiKey,
    });
    dispatch({
      // ? not sure why sendEmail is hardcoded here. Mock
      name: params?.apiKey,
      uniqueRef: createHash('md5').update(params?.apiKey).digest('hex'),
      credentials: {
        apiKey: params?.apiKey,
      },
    });
  }
);
