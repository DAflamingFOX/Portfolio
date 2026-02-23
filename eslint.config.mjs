import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Initialize the translator
const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  // This translates the legacy configs into the flat format
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    ignores: ["node_modules/**", ".next/**", "out/**", "build/**", "next-env.d.ts", "public/_pagefind/**", "*.config.cjs"]
  }
];

export default eslintConfig;