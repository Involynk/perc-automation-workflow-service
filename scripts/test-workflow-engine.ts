import { NestFactory } from '@nestjs/core';
import { WorkflowModule } from '../packages/workflow-service/src/workflow.module';
import { WorkflowEngineService } from '../packages/workflow-service/src/engine/workflow.engine.service';
import { LeadStatus, LeadEvent } from '@perc/shared';

async function bootstrap() {
  console.log('=== Initializing NestJS Context for Workflow Engine Test ===\n');
  
  // We initialize just the WorkflowModule to test the engine in isolation
  const app = await NestFactory.createApplicationContext(WorkflowModule);
  
  // Resolve the Injectable service
  const workflowEngine = app.get(WorkflowEngineService);

  console.log('--- Test 1: Info Sent -> Waiting ---');
  const result1 = workflowEngine.execute(LeadStatus.NEW, LeadEvent.INFO_SENT, {});
  console.log(result1);

  console.log('\n--- Test 2: Waiting -> Reply (Positive) -> Interested ---');
  const result2 = workflowEngine.execute(LeadStatus.WAITING, LeadEvent.REPLY_RECEIVED, { intent: 'positive' });
  console.log(result2);

  console.log('\n--- Test 3: Unhappy Path (Max Follow-ups Reached) -> Recovery ---');
  // Pass followUpCount: 3 in the context to trigger the hasMaxFollowUps guard
  const result3 = workflowEngine.execute(LeadStatus.WAITING, LeadEvent.TIMEOUT_REACHED, {}, { followUpCount: 3 });
  console.log(result3);

  console.log('\n--- Test 4: Terminal state detection (Payment Received -> Admitted) ---');
  const result4 = workflowEngine.execute(LeadStatus.ADMISSION_PENDING, LeadEvent.PAYMENT_RECEIVED, {});
  console.log(result4);

  await app.close();
  console.log('\n=== Tests Completed ===');
}

bootstrap().catch(err => {
  console.error('Test failed:', err);
  process.exit(1);
});
