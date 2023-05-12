import { ValidateJwtGuard } from './validate-jwt.guard';

describe('ValidateJwtGuard', () => {
  it('should be defined', () => {
    expect(new ValidateJwtGuard()).toBeDefined();
  });
});
