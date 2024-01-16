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
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjb2xsZWN0aW9uSWQiOiJfcGJfdXNlcnNfYXV0aF8iLCJleHAiOjE3MDY2MDE1NTQsImlkIjoidWx6YWlxa2U4eDB4ZGkxIiwidHlwZSI6ImF1dGhSZWNvcmQifQ.UoFSH6L_ibksNTV3SvXb4gAkSq7uXyHgSosJitMf6cg"
        ),
    },
});
