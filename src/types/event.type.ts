// types/event.types.ts
export type TEvent = {
  _id: string;
  title: string;
  description: string;
  location: string;
  dateTime: string;
  organizerName: string;
  organizerEmail: string;
  attendeeCount: number;
  joinedUsers: string[];
  createdAt: string;
  updatedAt: string;
};
