import { setup } from 'xstate';
import { LeadStatus, LeadEvent } from '@perc/shared';
import { isPositiveReply, isNegativeReply, hasMaxFollowUps } from './guards';

export const workflowMachine = setup({
  types: {
    context: {} as any, 
    events: {} as { type: string, payload?: any },
  },
  guards: {
    isPositiveReply: ({ context, event }: any) => isPositiveReply(context as any, event as any),
    isNegativeReply: ({ context, event }: any) => isNegativeReply(context as any, event as any),
    hasMaxFollowUps: ({ context, event }: any) => hasMaxFollowUps(context as any, event as any),
  },
  actions: {
    logAction: ({ context, event }: any, params: { actionName: string }) => {
    }
  }
}).createMachine({
  id: 'leadWorkflow',
  initial: LeadStatus.NEW,
  context: {},
  states: {
    [LeadStatus.NEW]: {
      on: {
        [LeadEvent.INFO_SENT]: {
          target: LeadStatus.WAITING
        }
      }
    },
    [LeadStatus.WAITING]: {
      on: {
        [LeadEvent.REPLY_RECEIVED]: [
          {
            target: LeadStatus.INTERESTED,
            guard: 'isPositiveReply'
          },
          {
            target: LeadStatus.LOST,
            guard: 'isNegativeReply'
          },
          {
            target: LeadStatus.INTERESTED 
          }
        ],
        [LeadEvent.TIMEOUT_REACHED]: [
          {
            target: LeadStatus.RECOVERY,
            guard: 'hasMaxFollowUps'
          },
          {
            target: LeadStatus.WAITING,
            actions: [{ type: 'logAction', params: { actionName: 'SCHEDULE_FOLLOW_UP' } }]
          }
        ],
        [LeadEvent.CALL_REQUESTED]: {
          target: LeadStatus.INTERESTED
        }
      }
    },
    [LeadStatus.INTERESTED]: {
      on: {
        [LeadEvent.MEETING_BOOKED]: {
          target: LeadStatus.CALL_SCHEDULED
        }
      }
    },
    [LeadStatus.CALL_SCHEDULED]: {
      on: {
        [LeadEvent.MEETING_FINISHED]: {
          target: LeadStatus.MEETING_COMPLETED
        }
      }
    },
    [LeadStatus.MEETING_COMPLETED]: {
      on: {
        [LeadEvent.DEMO_BOOKED]: {
          target: LeadStatus.DEMO_SCHEDULED
        },
        [LeadEvent.ADMISSION_STARTED]: {
          target: LeadStatus.ADMISSION_PENDING
        }
      }
    },
    [LeadStatus.DEMO_SCHEDULED]: {
      on: {
        [LeadEvent.ADMISSION_STARTED]: {
          target: LeadStatus.ADMISSION_PENDING
        }
      }
    },
    [LeadStatus.ADMISSION_PENDING]: {
      on: {
        [LeadEvent.PAYMENT_RECEIVED]: {
          target: LeadStatus.ADMITTED
        }
      }
    },
    [LeadStatus.RECOVERY]: {
      on: {
        [LeadEvent.REPLY_RECEIVED]: {
          target: LeadStatus.INTERESTED
        },
        [LeadEvent.RECOVERY_FAILED]: {
          target: LeadStatus.LOST
        }
      }
    },
    [LeadStatus.ADMITTED]: {
      type: 'final'
    },
    [LeadStatus.LOST]: {
      type: 'final'
    },
    [LeadStatus.CLOSED]: {
      type: 'final'
    }
  },
  on: {
    [LeadEvent.MANUAL_CLOSE]: {
      target: `.${LeadStatus.CLOSED}`
    }
  }
});
