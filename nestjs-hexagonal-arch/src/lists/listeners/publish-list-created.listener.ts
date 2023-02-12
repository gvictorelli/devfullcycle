import { Injectable } from '@nestjs/common';
import { ListCreatedEvent } from "../events/list-created.events";
import { OnEvent } from '@nestjs/event-emitter';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';

@Injectable()
export class PublishListCreatedListener {
    constructor(
        @InjectQueue('default')
         private queue: Queue,
        ){}
    
    @OnEvent('list.created')
    async hadle(event: ListCreatedEvent) {
        await this.queue.add('list.created', event) 
    }
}