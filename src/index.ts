#!/usr/bin/env node

import { execa } from "execa";
import prompts from "prompts";
import fs from "fs-extra";
import path from "path";
import chalk from "chalk";
import ora from "ora";
import gradient from "gradient-string";
import figlet from "figlet";

// Helper function to create colorful banners
function createBanner() {
  const banner = figlet.textSync("EmirApp CLI", {
    font: "ANSI Shadow",
    horizontalLayout: "default",
    verticalLayout: "default",
  });

  console.log(
    gradient([
      "#ff0000",
      "#ff7f00",
      "#ffff00",
      "#00ff00",
      "#0000ff",
      "#4b0082",
      "#9400d3",
    ])(banner)
  );
  console.log(
    chalk.cyan.bold("🚀 A powerful CLI to scaffold modern Next.js applications")
  );
  console.log(
    chalk.gray(
      "   Enterprise-grade structure • TypeScript • Tailwind • React Query"
    )
  );
  console.log();
}

async function run() {
  // Handle process interruption gracefully
  process.on("SIGINT", () => {
    console.log();
    console.log(chalk.yellow("👋 Process cancelled by user. Goodbye!"));
    process.exit(0);
  });

  // Show welcome banner
  createBanner();

  // 1. Choose framework
  const { framework } = await prompts({
    type: "select",
    name: "framework",
    message: chalk.yellow("🎯 Choose a framework"),
    choices: [
      {
        title:
          chalk.green("Next.js (App Router)") +
          chalk.gray(" - Modern React framework"),
        value: "nextjs",
      },
    ],
  });

  if (!framework) {
    console.log(chalk.yellow("👋 Process cancelled. Goodbye!"));
    process.exit(0);
  }

  if (framework !== "nextjs") {
    console.log(chalk.red("❌ Currently only Next.js is supported."));
    process.exit(1);
  }

  // 2. Choose project type
  const { projectType } = await prompts({
    type: "select",
    name: "projectType",
    message: chalk.yellow("📁 Choose a project structure"),
    choices: [
      {
        title:
          chalk.green("Simple") + chalk.gray(" - Perfect for most projects"),
        value: "simple",
      },
      {
        title: chalk.gray("Enterprise") + chalk.dim(" (Coming Soon)"),
        value: "enterprise",
        disabled: true,
      },
    ],
  });

  if (!projectType) {
    console.log(chalk.yellow("👋 Process cancelled. Goodbye!"));
    process.exit(0);
  }

  if (projectType === "enterprise") {
    console.log(
      chalk.yellow("⚠️  Enterprise structure is not implemented yet.")
    );
    process.exit(0);
  }

  // 3. Ask for project name
  const { appName } = await prompts({
    type: "text",
    name: "appName",
    message: chalk.yellow("📝 Enter your app name"),
    initial: "my-awesome-app",
    validate: (name) =>
      name && /^[a-zA-Z0-9-_ ]+$/.test(name)
        ? true
        : chalk.red(
            "App name must be alphanumeric with optional spaces, dashes or underscores"
          ),
  });

  if (!appName) {
    console.log(chalk.yellow("👋 Process cancelled. Goodbye!"));
    process.exit(0);
  }

  // Sanitize app name: lowercase and replace spaces with dashes
  const sanitizedAppName = appName.toLowerCase().replace(/\s+/g, "-");

  console.log();
  console.log(
    chalk.cyan.bold(`🏗️  Creating Next.js app "${sanitizedAppName}"`)
  );
  console.log(chalk.gray("   This might take a moment..."));
  console.log();

  // 4. Run create-next-app with spinner
  const createAppSpinner = ora({
    text: chalk.blue("Setting up Next.js with TypeScript and Tailwind CSS..."),
    spinner: "dots12",
  }).start();

  try {
    await execa(
      "npx",
      [
        "create-next-app@latest",
        sanitizedAppName,
        "--typescript",
        "--tailwind",
        "--app",
        "--src-dir",
        "--eslint",
        "--yes",
      ],
      { stdio: "pipe" } // Changed from "inherit" to "pipe" for cleaner output
    );

    createAppSpinner.succeed(
      chalk.green("✅ Next.js app created successfully!")
    );
  } catch (error) {
    createAppSpinner.fail(chalk.red("❌ Failed to create Next.js app"));
    console.error(chalk.red("Error details:"), error);
    process.exit(1);
  }

  // 5. Change working directory to the created app
  const appPath = path.resolve(process.cwd(), sanitizedAppName);
  process.chdir(appPath);

  // 6. Create custom folders under src/
  const foldersToCreate = [
    "src/app/(auth)",
    "src/app/(protected)",
    "src/app/(unprotected)",
    "src/components/ui",
    "src/components/layout",
    "src/components/features",
    "src/components/modals",
    "src/components/icons",
    "src/components/common",
    "src/api/hooks",
    "src/api/services",
    "src/context",
    "src/data",
    "src/data/stores",
    "src/lib",
    "src/types",
  ];

  const folderSpinner = ora({
    text: chalk.blue("Creating enterprise folder structure..."),
    spinner: "bouncingBar",
  }).start();

  try {
    await Promise.all(foldersToCreate.map((folder) => fs.ensureDir(folder)));
    folderSpinner.succeed(chalk.green("✅ Folder structure created!"));
  } catch (error) {
    folderSpinner.fail(chalk.red("❌ Failed to create folder structure"));
    console.error(chalk.red("Error details:"), error);
    process.exit(1);
  }

  // 7. Create index.ts barrel files with template content
  const barrelTemplate = `// Barrel export file for this folder
// Example: export { default as Button } from "./Button";
// Example: export { default as Input } from "./Input";
`;

  const barrelSpinner = ora({
    text: chalk.blue("Creating barrel export files..."),
    spinner: "dots2",
  }).start();

  const indexPaths = [
    "src/components/ui/index.ts",
    "src/components/layout/index.ts",
    "src/components/features/index.ts",
    "src/components/modals/index.ts",
    "src/components/icons/index.ts",
    "src/components/common/index.ts",
    "src/api/hooks/index.ts",
    "src/api/services/index.ts",
    "src/context/index.ts",
    "src/data/index.ts",
    "src/data/stores/index.ts",
    "src/lib/index.ts",
    "src/types/index.ts",
  ];

  try {
    await Promise.all(
      indexPaths.map((filePath) => fs.writeFile(filePath, barrelTemplate))
    );
    barrelSpinner.succeed(chalk.green("✅ Barrel export files created!"));
  } catch (error) {
    barrelSpinner.fail(chalk.red("❌ Failed to create barrel files"));
    console.error(chalk.red("Error details:"), error);
    process.exit(1);
  }

  // 8. Install additional dependencies with yarn
  const depsSpinner = ora({
    text: chalk.blue("Installing Zod and TanStack React Query..."),
    spinner: "arc",
  }).start();

  try {
    await execa("yarn", ["add", "zod", "@tanstack/react-query"], {
      stdio: "pipe", // Changed from "inherit" for cleaner output
    });
    depsSpinner.succeed(chalk.green("✅ Dependencies installed successfully!"));
  } catch (error) {
    depsSpinner.fail(chalk.red("❌ Failed to install dependencies"));
    console.error(chalk.red("Error details:"), error);
    process.exit(1);
  }

  // Success banner
  console.log();
  console.log(chalk.green("🎉 ") + chalk.bold.green("SUCCESS!"));
  console.log();
  console.log(
    chalk.cyan.bold(`📦 Project "${sanitizedAppName}" created successfully!`)
  );
  console.log();
  console.log(chalk.yellow.bold("🚀 Next steps:"));
  console.log(chalk.white(`   1. ${chalk.cyan(`cd ${sanitizedAppName}`)}`));
  console.log(chalk.white(`   2. ${chalk.cyan("yarn dev")}`));
  console.log(chalk.white(`   3. ${chalk.cyan("Open http://localhost:3000")}`));
  console.log();
  console.log(chalk.gray("📚 Your project includes:"));
  console.log(chalk.gray("   • Next.js 14+ with App Router"));
  console.log(chalk.gray("   • TypeScript configuration"));
  console.log(chalk.gray("   • Tailwind CSS styling"));
  console.log(chalk.gray("   • React Query for data fetching"));
  console.log(chalk.gray("   • Zod for schema validation"));
  console.log(chalk.gray("   • Enterprise folder structure"));
  console.log(chalk.gray("   • Barrel export files"));
  console.log();
  console.log(
    gradient(["#ff6b6b", "#4ecdc4", "#45b7d1", "#96ceb4", "#feca57"])(
      "Happy coding! 🚀✨"
    )
  );
}

run();
