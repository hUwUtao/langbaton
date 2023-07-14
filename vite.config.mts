import { resolve } from 'path'
import { UserConfig } from "vite";
export default {
    rollupOptions: {
        input: resolve(__dirname, "./server.mts")
    }
} as UserConfig;
