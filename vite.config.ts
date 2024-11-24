/// <reference types="vitest" />
import { defineConfig } from 'vite';

export default defineConfig({
	test: {
		root: './src',
		environment: 'node',
		coverage: {
			reportsDirectory: '../coverage',
		},
	},
});
