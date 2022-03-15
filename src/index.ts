import { booking, payment, unit } from './modules';
import { connector } from './connectors';
import { createIntegration } from '@finalytic/integration';
import { emailResult, something } from './tags';

export const integration = createIntegration({
  // Setup
  info: {
    icon: '',
    name: 'mock',
    title: 'Mock',
    description: 'Some description',
    version: '1.0.2',
    // icon: '92103i91ppe1o2',
    type: 'otherService',
  },
  connectors: [connector],
  // Extract
  modules: [unit, booking, payment],
  // Act
  // actions: [sendEmail],
  // Etc
  tags: [emailResult, something],
  /*orchestrator: async ({ extract, retrieve }) => {
    // Extract units (if not skipped by specifying scope.entityTypes)
    await extract(unit.entity);
    // Retrieve units from DB
    const units = await retrieve(unit.entity);
    // Extract bookings for each unit by passing units scope
    for (const unit of units) {
      await extract(booking.entity, { units: [`${unit.id}`] });
    }
  },*/
});
