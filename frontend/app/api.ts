import type { CreateClientConfig } from './_client/client.gen';

export const createClientConfig: CreateClientConfig = (config) => ({
  ...config,
  baseURL: 'http://host.docker.internal:8000',
});