import { Models } from "node-appwrite";

export enum MemberRole {
  admin = "admin",
  member = "member",
}

export type Member = Models.Document & {
  workspaceId: string;
  userId: string;
  role: MemberRole;
};
