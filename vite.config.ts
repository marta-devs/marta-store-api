/// <reference types="vitest" />
import { defineConfig } from 'vite';

export default defineConfig({
	test: {
		root: './src',
		environment: 'node',
		clearMocks: true,
		coverage: {
			reportsDirectory: '../coverage',
		},
	},
});
