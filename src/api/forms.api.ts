import { apiPost } from './client';
import type { CreateFormPayload, CreateFormResponse } from '../types/form.types';

export function createForm(payload: CreateFormPayload) {
  return apiPost<CreateFormResponse, CreateFormPayload>('/forms', payload);
}