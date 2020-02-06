import { SharedBusinessModule } from './shared-business.module';

describe('SharedBusinessModule', () => {
  let sharedBusinessModule: SharedBusinessModule;

  beforeEach(() => {
    sharedBusinessModule = new SharedBusinessModule();
  });

  it('should create an instance', () => {
    expect(sharedBusinessModule).toBeTruthy();
  });
});
