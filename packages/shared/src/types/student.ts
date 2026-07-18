import type {
  BaseEntity,
  Metadata,
} from "./common";

export interface Student extends BaseEntity {
  profile: StudentProfile;

  metadata?: Metadata;
}

export interface StudentProfile {
  displayName: string;

  email?: string;

  avatarUrl?: string;

  preferredLanguage?: string;

  timezone?: string;
}

export interface StudentSummary {
  id: string;

  displayName: string;

  avatarUrl?: string;
}