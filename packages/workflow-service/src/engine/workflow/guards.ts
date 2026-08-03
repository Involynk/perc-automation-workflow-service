export const isPositiveReply = (context: any, event: any) => {
  return event.payload?.intent === 'positive';
};

export const isNegativeReply = (context: any, event: any) => {
  return event.payload?.intent === 'negative';
};

export const hasMaxFollowUps = (context: any, event: any) => {
  return context.followUpCount >= 3;
};
