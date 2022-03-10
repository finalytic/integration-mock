import { ServiceClass } from '@finalytic/integration';
import { day } from '@finalytic/utils';

export class RentalApi extends ServiceClass {
  async connect(credentials: { apiKey: string }) {
    console;
    return credentials;
  }

  public async getUnits() {
    const items = Array(3)
      .fill(0)
      .map((_, id) => ({
        id,
        name: `Unit ${id}`,
        updatedAt: +new Date(),
        address: `Holibay St. ${id}`,
      }));
    return items;
  }
  public async getBookingsByUnit(unitId: string, start?: string, end?: string) {
    const items = Array(3)
      .fill(0)
      .map((_, id) => ({
        id,
        guestName: `Mr. ${unitId} ${id}`,
        checkin: day().toISOString(),
        checkout: day().add(2, 'd').toISOString(),
        unitId: unitId,
        updatedAt: +new Date(),
      }));
    return items;
  }
  public async verify() {
    return true;
  }
  public async sendEmail(email: string, message: string) {
    return { id: '12', email, message };
  }
  public async revokeEmail(id: string) {
    return { id: '12' };
  }
}
