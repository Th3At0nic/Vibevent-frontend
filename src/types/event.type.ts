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

export type TJoinedEventResponse = {
  success: boolean;
  message: string;
  data: TEvent;
};

export type TErrorSource = {
  path: string;
  message: string;
};

export type TJoinedErrorData = {
  success: false;
  message: string;
  errorSource: TErrorSource[];
  stack?: string;
};

export type TJoinedError = {
  status: number;
  data: TJoinedErrorData;
};
