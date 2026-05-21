// types/lead.types.ts

export enum LeadStatus {
  NEW = "New",
  CONTACTED = "Contacted",
  QUALIFIED = "Qualified",
  LOST = "Lost",
}

export enum LeadSource {
  WEBSITE = "Website",
  INSTAGRAM = "Instagram",
  REFERRAL = "Referral",
}

export interface Lead {
  _id?: string;

  name: string;

  email: string;

  status: LeadStatus;

  source: LeadSource;

  createdAt?: string;
  createdBy?: {
  _id: string;

  name: string;

  email: string;

  role: string;
};
}
export interface CreateLeadInput {
  name: string;
  email: string;
  source: LeadSource | "";
}