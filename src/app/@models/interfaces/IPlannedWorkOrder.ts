export interface IPlannedWorkOrder {
  numberOt: number;
  description: string;
  locality: string;
  landfall: string;
  eta: string;
  scheduledDate: string | Date;
  groupId: number;
  userId: number;
  statusId: number;
}
