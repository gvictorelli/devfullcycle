import { EventEmitter } from 'stream';
import { ListGatewayInMemory } from './gateways/list-gateway-in-memory';
import { Test, TestingModule } from '@nestjs/testing';
import { ListModel } from './entities/list.model';
import { ListsService } from './lists.service';
import { of } from 'rxjs';

const mockList = {
  create: jest
  .fn()
  .mockReturnValue(Promise.resolve(new ListModel({ name: 'my list'}))),
};

const mockHttpService = {
  post: jest.fn().mockReturnValue(of(null)),
};

describe('ListsService', () => {
  let service: ListsService;
  let listPersistenceGateway: ListGatewayInMemory;
  let eventEmitter: EventEmitter;
 
  beforeEach(() =>  {
    listPersistenceGateway = new ListGatewayInMemory();
    eventEmitter = new EventEmitter();
    service = new ListsService(listPersistenceGateway, eventEmitter);
  });

  it('deve criar uma lista', async() => {
    const list = await service.create({ name: 'my list' });
    console.log(list);
    expect(listPersistenceGateway.items).toEqual(list)
  });
  // beforeEach(async () => {
  //   const module: TestingModule = await Test.createTestingModule({
  //     providers: [ListsService],
  //   }).compile();

  //   service = module.get<ListsService>(ListsService);
  // });

  // it('should be defined', () => {
  //   expect(service).toBeDefined();
  // });
});
