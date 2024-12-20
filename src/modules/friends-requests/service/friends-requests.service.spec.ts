import { Test, TestingModule } from '@nestjs/testing';
import { FriendRequestsService } from './friends-requests.service';

describe('FriendRequestsService', () => {
  let service: FriendRequestsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FriendRequestsService],
    }).compile();

    service = module.get<FriendRequestsService>(FriendRequestsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
