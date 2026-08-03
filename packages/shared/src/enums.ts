export enum LeadStatus {
  NEW = 'new',
  INFORMATION_SHARED = 'information_shared',
  WAITING = 'waiting',
  INTERESTED = 'interested',
  CALL_SCHEDULED = 'call_scheduled',
  MEETING_COMPLETED = 'meeting_completed',
  DEMO_SCHEDULED = 'demo_scheduled',
  ADMISSION_PENDING = 'admission_pending',
  ADMITTED = 'admitted',
  INACTIVE = 'inactive',
  RECOVERY = 'recovery',
  LOST = 'lost',
  CLOSED = 'closed',
}
export enum LeadEvent {
  INFO_SENT = 'INFO_SENT',
  REPLY_RECEIVED = 'REPLY_RECEIVED',
  TIMEOUT_REACHED = 'TIMEOUT_REACHED',
  CALL_REQUESTED = 'CALL_REQUESTED',
  MEETING_BOOKED = 'MEETING_BOOKED',
  MEETING_FINISHED = 'MEETING_FINISHED',
  DEMO_BOOKED = 'DEMO_BOOKED',
  ADMISSION_STARTED = 'ADMISSION_STARTED',
  PAYMENT_RECEIVED = 'PAYMENT_RECEIVED',
  LOST_SIGNAL = 'LOST_SIGNAL',
  RECOVERY_FAILED = 'RECOVERY_FAILED',
  MANUAL_CLOSE = 'MANUAL_CLOSE'
}

export enum LeadClassification {
  HOT = 'hot',
  WARM = 'warm',
  COLD = 'cold',
  RETURNING = 'returning',
  REFERRAL = 'referral',
  HIGH_PRIORITY = 'high_priority',
  SCHOLARSHIP_CANDIDATE = 'scholarship_candidate',
  VIP = 'vip',
}

export enum ChannelName {
  WHATSAPP = 'whatsapp',
  INSTAGRAM = 'instagram',
  FACEBOOK = 'facebook',
  EMAIL = 'email',
  WEBSITE_FORM = 'website_form',
  WEBSITE_CHAT = 'website_chat',
  GOOGLE_BUSINESS = 'google_business',
  PHONE = 'phone',
  WALKIN = 'walkin',
  REFERRAL = 'referral',
  SMS = 'sms',
}

export enum UserRole {
  SUPER_ADMIN = 'super_admin',
  ADMIN = 'admin',
  COUNSELOR = 'counselor',
  TEACHER = 'teacher',
  STUDENT = 'student',
}

export enum MessageDirection {
  INBOUND = 'inbound',
  OUTBOUND = 'outbound',
}

export enum ContentType {
  TEXT = 'text',
  IMAGE = 'image',
  DOCUMENT = 'document',
  TEMPLATE = 'template',
  VIDEO = 'video',
  AUDIO = 'audio',
  LOCATION = 'location',
  STICKER = 'sticker',
  BUTTON = 'button',
}

export enum MessageStatus {
  SENT = 'sent',
  DELIVERED = 'delivered',
  READ = 'read',
  FAILED = 'failed',
}

export enum PromiseType {
  FOLLOWUP = 'followup',
  REMINDER = 'reminder',
  ESCALATION = 'escalation',
  REPORT = 'report',
  MESSAGE_DELAY = 'message_delay',
  MEETING_REMINDER = 'meeting_reminder',
  RECOVERY = 'recovery',
  FEEDBACK = 'feedback',
  NOTIFICATION = 'notification',
}

export enum PromiseStatus {
  PENDING = 'pending',
  EXECUTING = 'executing',
  COMPLETED = 'completed',
  FAILED = 'failed',
  CANCELLED = 'cancelled',
}

export const TWO_WAY_CHANNELS: string[] = [
  ChannelName.INSTAGRAM,
  ChannelName.FACEBOOK,
  ChannelName.EMAIL,
  ChannelName.WEBSITE_CHAT,
];

export enum SourceEngine {
  LEAD_CAPTURE = 'LEAD_CAPTURE',
  RESPONSE = 'RESPONSE',
  WORKFLOW = 'WORKFLOW',
  SCHEDULER = 'SCHEDULER',
  FOLLOW_UP = 'FOLLOW_UP',
  MEETING = 'MEETING',
  NOTIFICATION = 'NOTIFICATION',
  ADMIN = 'ADMIN',
}

export enum ActorType {
  SYSTEM = 'System',
  USER = 'User',
  ADMIN = 'Admin',
  BOT = 'Bot',
}

export enum KnownEventType {
  LEAD_CREATED = 'LEAD_CREATED',
  LEAD_UPDATED = 'LEAD_UPDATED',
  LEAD_SOURCE_IDENTIFIED = 'LEAD_SOURCE_IDENTIFIED',
  MESSAGE_SENT = 'MESSAGE_SENT',
  BROCHURE_SHARED = 'BROCHURE_SHARED',
  FEE_STRUCTURE_SHARED = 'FEE_STRUCTURE_SHARED',
  COURSE_DETAILS_SHARED = 'COURSE_DETAILS_SHARED',
  WORKFLOW_STARTED = 'WORKFLOW_STARTED',
  WORKFLOW_PAUSED = 'WORKFLOW_PAUSED',
  WORKFLOW_RESUMED = 'WORKFLOW_RESUMED',
  WORKFLOW_CLOSED = 'WORKFLOW_CLOSED',
  STATE_CHANGED = 'STATE_CHANGED',
  REMINDER_SCHEDULED = 'REMINDER_SCHEDULED',
  REMINDER_CANCELLED = 'REMINDER_CANCELLED',
  REMINDER_EXECUTED = 'REMINDER_EXECUTED',
  FOLLOWUP_SENT = 'FOLLOWUP_SENT',
  RECOVERY_INITIATED = 'RECOVERY_INITIATED',
  CALL_COMPLETED = 'CALL_COMPLETED',
  MEETING_SCHEDULED = 'MEETING_SCHEDULED',
  MEETING_UPDATED = 'MEETING_UPDATED',
  MEETING_COMPLETED = 'MEETING_COMPLETED',
  INTERNAL_NOTE_ADDED = 'INTERNAL_NOTE_ADDED',
  LEAD_ASSIGNED = 'LEAD_ASSIGNED',
  DOCUMENT_UPLOADED = 'DOCUMENT_UPLOADED',
}
