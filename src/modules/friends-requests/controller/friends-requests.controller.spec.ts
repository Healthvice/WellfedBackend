import { Test, TestingModule } from '@nestjs/testing';
import { FriendRequestController } from './friends-requests.controller';

describe('FriendRequestController', () => {
  let controller: FriendRequestController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FriendRequestController],
    }).compile();

    controller = module.get<FriendRequestController>(FriendRequestController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
