import { ListGatewayHttp } from './gateways/list-gateway-http';
import { Module } from '@nestjs/common';
import { ListsService } from './lists.service';
import { ListsController } from './lists.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { ListModel } from './entities/list.model';
import { HttpModule } from '@nestjs/axios';
import { ListGatewaySequelize } from './gateways/list-gateway-sequelize';
import { CreateListInCrmListener } from './listeners/create-list-in-crm.listener';
import { EventEmitter2 } from '@nestjs/event-emitter';

@Module({
  imports: [
    SequelizeModule.forFeature([ListModel]),
    HttpModule.register({
      baseURL: 'http://localhost:8000',
    }),
  ],
  controllers: [ListsController],
  providers: [
    ListsService,
    ListGatewaySequelize,
    ListGatewayHttp,
    CreateListInCrmListener,
    {
      provide: 'ListPersistenceGateway',
      useExisting: ListGatewaySequelize
    },
    {
      provide: 'ListIntegrationGateway',
      useExisting: ListGatewayHttp
    },
    {
      provide: 'EventEmitter',
      useExisting: EventEmitter2,
    }
  ],
})
export class ListsModule {}
