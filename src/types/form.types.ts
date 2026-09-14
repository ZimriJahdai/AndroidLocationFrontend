export type LocationPayload = {
  latitude: number;
  longitude: number;
  accuracy: number | null;
};

export type CreateFormPayload = {
  fullName: string;
  className: string;
  leaderName: string;
  phone: string;
  comment: string;
  location: LocationPayload;
};

export type CreateFormResponse = {
  message: string;
  formId: string;
};
