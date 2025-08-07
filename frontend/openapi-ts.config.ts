import { defineConfig } from '@hey-api/openapi-ts';

export default defineConfig({
  input: 'http://host.docker.internal:8000/openapi.json',
  output: 'app/_client',
  plugins: [
    {
      name: '@hey-api/client-axios',
      runtimeConfigPath: './app/api.ts', 
    },
  ],
});