import { Injectable, Logger } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { createActor } from 'xstate';
import { workflowMachine } from './workflow/machine';
import { LeadStatus } from '@perc/shared';

@Injectable()
export class WorkflowEngineService {
  private readonly logger = new Logger(WorkflowEngineService.name);

  constructor(private eventEmitter: EventEmitter2) {}

  public execute(currentState: string, eventType: string, eventPayload: any, context: any = {}) {
    this.logger.log(`Executing workflow transition for state ${currentState} with event ${eventType}`);
    
    try {
      const actor = createActor(workflowMachine, {
        state: workflowMachine.resolveState({
          value: currentState as any,
          context: context
        })
      });
      
      actor.start();

      actor.send({
        type: eventType,
        payload: eventPayload
      });

      const snapshot = actor.getSnapshot();
      
      const isTerminal = snapshot.status === 'done' || 
                         snapshot.value === LeadStatus.ADMITTED || 
                         snapshot.value === LeadStatus.LOST || 
                         snapshot.value === LeadStatus.CLOSED;

      actor.stop();

      const nextState = snapshot.value as string;
      
      if (nextState !== currentState) {
        this.eventEmitter.emit('workflow.state_changed', {
          previousState: currentState,
          nextState: nextState,
          isTerminal
        });
      }

      return {
        success: true,
        previousState: currentState,
        nextState: nextState,
        isTerminal,
      };

    } catch (error: any) {
      this.logger.error(`Failed to execute workflow transition: ${error.message}`);
      return {
        success: false,
        error: error.message
      };
    }
  }
}
