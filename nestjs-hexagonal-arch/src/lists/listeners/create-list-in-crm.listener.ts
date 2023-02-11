import { Inject, Injectable } from '@nestjs/common';
import { ListGatewayInterface } from './../gateways/list-gateway-interface';
import { ListCreatedEvent } from "../events/list-created.events";
import { OnEvent } from '@nestjs/event-emitter';

@Injectable()
export class CreateListInCrmListener {
    constructor(
        @Inject('ListIntegrationGateway')
        private listIntegrationGateway: ListGatewayInterface
        ){}
    
    @OnEvent('list.created')
    async hadle(event: ListCreatedEvent) {
     this.listIntegrationGateway.create(event.list);   
    }
}