import { S } from '@finalytic/utils';
import { createTag } from '@finalytic/integration';

export const something = createTag('connection', 'someTag', {
  message: S.string(),
});

export const emailResult = createTag('entity', 'emailResult', {
  success: S.boolean(),
  emailId: S.string(),
});
