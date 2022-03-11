import { expect, test } from '@jest/globals';
import { integration } from './index';

test('integration:mock connect', async () => {
  expect(integration.info.description).toBeTruthy();
});
