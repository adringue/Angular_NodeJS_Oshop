import { BusinessAdminModule } from './business-admin.module';

describe('BusinessAdminModule', () => {
  let businessAdminModule: BusinessAdminModule;

  beforeEach(() => {
    businessAdminModule = new BusinessAdminModule();
  });

  it('should create an instance', () => {
    expect(businessAdminModule).toBeTruthy();
  });
});
