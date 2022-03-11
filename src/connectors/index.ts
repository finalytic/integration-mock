import { RentalApi } from '../service';
import { S } from '@finalytic/utils';
import { createConnector } from '@finalytic/integration';
import { createHash } from 'crypto';

export const connector = createConnector(
  // Define a schema, we'll use it to provide an input form
  {
    apiKey: S.string().title('API Key').description('Some API Key'),
    country: S.string().optional(),
  },
  async ({ params, dispatch, useService }) => {
    // Let our system take care of setup the service, just pass the service class
    const service = await useService(RentalApi);

    // Call the connect function with the provided params. They are equivalent to above definition
    await service.connect({
      apiKey: params?.apiKey,
    });

    // Dispatch a connection, with a name (ideally not being the api key), a uniqueRef and the actual credentials
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
