import { defineConfig } from "vitest/config";
import vue from "@vitejs/plugin-vue2";

export default defineConfig({
    plugins: [vue()],
    test: {
        globals: true,
        environment: "jsdom",
    },
    define: {
        BASE_API_URL: JSON.stringify("http://127.0.0.1:8090/api/collections/"),
        AUTH_TOKEN: JSON.stringify(
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjb2xsZWN0aW9uSWQiOiJfcGJfdXNlcnNfYXV0aF8iLCJleHAiOjE3MDUzOTY5NDUsImlkIjoidWx6YWlxa2U4eDB4ZGkxIiwidHlwZSI6ImF1dGhSZWNvcmQifQ.xLpZFf5v1lqsqSGUY9e3JuFFR0Nz14mjq4jh74L7HnQ"
        ),
    },
});
