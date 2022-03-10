import { RentalApi } from '../service';
import { S } from '@finalytic/utils';
import { createAction } from '@finalytic/integration';

export const sendEmail = createAction(
  RentalApi,
  {
    name: 'sendEmail',
    title: 'Send E-Mail',
    params: {
      message: S.string(),
    },
    output: {
      id: S.string(),
    },
  },
  // Perform the action
  ({ service, params }) => service.sendEmail('abc', params.message),
  // Undo action with last id
  ({ service, params }) => service.revokeEmail(params.id)
);
