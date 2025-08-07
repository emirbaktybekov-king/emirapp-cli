#!/usr/bin/env node

import chalk from "chalk";
import { execa } from "execa";
import figlet from "figlet";
import fs from "fs-extra";
import gradient from "gradient-string";
import ora from "ora";
import path from "path";
import prompts from "prompts";

// Import templates
import {
  reactNativeExpoSimpleDependencies,
  reactNativeExpoSimpleTemplates,
} from "./mobile/ReactNative_Expo/simple";
import {
  nextJsEnterpriseDependencies,
  nextJsEnterpriseTemplates,
} from "./website/Next-Js/enterprise";
import {
  nextJsSimpleDependencies,
  nextJsSimpleTemplates,
} from "./website/Next-Js/simple";

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
    chalk.cyan.bold("🚀 A powerful CLI to scaffold modern applications")
  );
  console.log(
    chalk.gray(
      "   Next.js • React Native • Angular • Flutter • TypeScript • Enterprise Ready"
    )
  );
  console.log();
}

// Template creation functions
async function createAppFiles(
  platform: string,
  framework: string,
  complexity: string
) {
  let templates = {};
  let dependencies: string[] = [];

  // Select templates based on platform, framework, and complexity
  if (
    platform === "website" &&
    framework === "nextjs" &&
    complexity === "simple"
  ) {
    templates = nextJsSimpleTemplates;
    dependencies = nextJsSimpleDependencies;
  } else if (
    platform === "website" &&
    framework === "nextjs" &&
    complexity === "enterprise"
  ) {
    templates = nextJsEnterpriseTemplates;
    dependencies = nextJsEnterpriseDependencies;
  } else if (
    platform === "mobile" &&
    framework === "expo" &&
    complexity === "simple"
  ) {
    templates = reactNativeExpoSimpleTemplates;
    dependencies = reactNativeExpoSimpleDependencies;
  }

  // Write all template files
  for (const [filePath, content] of Object.entries(templates)) {
    await fs.writeFile(filePath, content as string);
  }

  return dependencies;
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

  // 1. Choose platform
  const { platform } = await prompts({
    type: "select",
    name: "platform",
    message: chalk.yellow("🎯 Choose a platform"),
    choices: [
      {
        title:
          chalk.green("📱 Mobile") + chalk.gray(" - React Native & Flutter"),
        value: "mobile",
      },
      {
        title: chalk.green("🌐 Website") + chalk.gray(" - Next.js & Angular"),
        value: "website",
      },
    ],
  });

  if (!platform) {
    console.log(chalk.yellow("👋 Process cancelled. Goodbye!"));
    process.exit(0);
  }

  // 2. Choose framework based on platform
  let frameworkChoices: any[] = [];
  if (platform === "mobile") {
    frameworkChoices = [
      {
        title:
          chalk.green("Expo React Native") +
          chalk.gray(" - Modern React Native framework"),
        value: "expo",
      },
      {
        title: chalk.gray("Flutter") + chalk.dim(" (Coming Soon)"),
        value: "flutter",
        disabled: true,
      },
    ];
  } else if (platform === "website") {
    frameworkChoices = [
      {
        title: chalk.green("Next.js") + chalk.gray(" - Modern React framework"),
        value: "nextjs",
      },
      {
        title: chalk.gray("Angular") + chalk.dim(" (Coming Soon)"),
        value: "angular",
        disabled: true,
      },
    ];
  }

  const { framework } = await prompts({
    type: "select",
    name: "framework",
    message: chalk.yellow("🔧 Choose a framework"),
    choices: frameworkChoices,
  });

  if (!framework) {
    console.log(chalk.yellow("👋 Process cancelled. Goodbye!"));
    process.exit(0);
  }

  // 3. Choose complexity
  const { complexity } = await prompts({
    type: "select",
    name: "complexity",
    message: chalk.yellow("📁 Choose project complexity"),
    choices: [
      {
        title:
          chalk.green("Simple") + chalk.gray(" - Perfect for getting started"),
        value: "simple",
      },
      {
        title: chalk.gray("Enterprise") + chalk.dim(" (Coming Soon)"),
        value: "enterprise",
        disabled: true,
      },
    ],
  });

  if (!complexity) {
    console.log(chalk.yellow("👋 Process cancelled. Goodbye!"));
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
    chalk.cyan.bold(
      `🏗️  Creating ${
        platform === "website" ? "Next.js" : "Expo React Native"
      } app "${sanitizedAppName}"`
    )
  );
  console.log(chalk.gray("   This might take a moment..."));
  console.log();

  // 4. Create app based on platform and framework
  const createAppSpinner = ora({
    text: chalk.blue(
      `Setting up ${
        platform === "website"
          ? "Next.js with TypeScript and Tailwind"
          : "Expo React Native with TypeScript"
      }...`
    ),
    spinner: "dots12",
  }).start();

  try {
    if (platform === "website" && framework === "nextjs") {
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
        { stdio: "pipe" }
      );
    } else if (platform === "mobile" && framework === "expo") {
      await execa(
        "yarn",
        [
          "create",
          "expo-app",
          sanitizedAppName,
          "--template",
          "blank-typescript",
        ],
        { stdio: "pipe" }
      );
    }

    createAppSpinner.succeed(
      chalk.green(
        `✅ ${
          platform === "website" ? "Next.js" : "Expo React Native"
        } app created successfully!`
      )
    );
  } catch (error) {
    createAppSpinner.fail(
      chalk.red(
        `❌ Failed to create ${
          platform === "website" ? "Next.js" : "Expo React Native"
        } app`
      )
    );
    console.error(chalk.red("Error details:"), error);
    process.exit(1);
  }

  // 5. Change working directory to the created app
  const appPath = path.resolve(process.cwd(), sanitizedAppName);
  process.chdir(appPath);

  // 6. Create platform-specific folder structure
  if (platform === "website" && framework === "nextjs") {
    // Create Next.js enterprise folder structure
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
  }

  // 7. Install platform-specific dependencies
  if (platform === "mobile" && framework === "expo") {
    const routerSpinner = ora({
      text: chalk.blue("Installing Expo Router and dependencies..."),
      spinner: "bouncingBar",
    }).start();

    try {
      await execa("npx", ["expo", "install", "expo-router"], { stdio: "pipe" });
      routerSpinner.succeed(chalk.green("✅ Expo Router installed!"));
    } catch (error) {
      routerSpinner.fail(chalk.red("❌ Failed to install Expo Router"));
      console.error(chalk.red("Error details:"), error);
      process.exit(1);
    }
  }

  // 7. Create Expo Router app structure
  const foldersToCreate = [
    "app/(auth)",
    "app/(protected)",
    "app/(protected)/main",
    "app/(protected)/main/home",
    "app/(protected)/main/explore",
    "src/components/ui",
    "src/components/business",
    "src/components/forms",
    "src/components/layout",
    "src/components/screens",
    "src/components/feetback",
    "src/context/providers",
    "src/api/hooks",
    "src/api/services",
    "src/data",
    "src/lib",
    "src/types",
    "src/utils",
  ];

  const folderSpinner = ora({
    text: chalk.blue("Creating Expo Router app structure..."),
    spinner: "bouncingBar",
  }).start();

  try {
    await Promise.all(foldersToCreate.map((folder) => fs.ensureDir(folder)));
    folderSpinner.succeed(chalk.green("✅ App structure created!"));
  } catch (error) {
    folderSpinner.fail(chalk.red("❌ Failed to create app structure"));
    console.error(chalk.red("Error details:"), error);
    process.exit(1);
  }

  // 8. Create index.ts barrel files with template content
  const barrelTemplate = `// Barrel export file for this folder
// Example: export { default as Button } from "./Button";
// Example: export { default as Input } from "./Input";
`;

  const barrelSpinner = ora({
    text: chalk.blue("Creating barrel export files..."),
    spinner: "dots2",
  }).start();

  let indexPaths: string[] = [];

  if (platform === "website" && framework === "nextjs") {
    // Next.js barrel export paths
    indexPaths = [
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
  } else if (platform === "mobile" && framework === "expo") {
    // React Native Expo barrel export paths
    indexPaths = [
      "src/components/ui/index.ts",
      "src/components/business/index.ts",
      "src/components/forms/index.ts",
      "src/components/layout/index.ts",
      "src/components/screens/index.ts",
      "src/components/feetback/index.ts",
      "src/context/index.ts",
      "src/context/providers/index.ts",
      "src/api/hooks/index.ts",
      "src/api/services/index.ts",
      "src/data/index.ts",
      "src/lib/index.ts",
      "src/types/index.ts",
      "src/utils/index.ts",
    ];
  }

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

  // Dependencies are now handled in the createAppFiles function

  // 10. Create app template files
  const templateSpinner = ora({
    text: chalk.blue("Creating app template files..."),
    spinner: "dots",
  }).start();

  try {
    const dependencies = await createAppFiles(platform, framework, complexity);
    templateSpinner.succeed(chalk.green("✅ App template files created!"));

    // Install dependencies if any
    if (dependencies.length > 0) {
      const depsSpinner = ora({
        text: chalk.blue(
          platform === "website"
            ? "Installing Zod and TanStack React Query..."
            : "Installing React Native dependencies..."
        ),
        spinner: "arc",
      }).start();

      try {
        if (platform === "website") {
          await execa("yarn", ["add", ...dependencies], { stdio: "pipe" });
        } else {
          await execa("npm", ["install", ...dependencies], { stdio: "pipe" });
        }
        depsSpinner.succeed(
          chalk.green("✅ Dependencies installed successfully!")
        );
      } catch (error) {
        depsSpinner.fail(chalk.red("❌ Failed to install dependencies"));
        console.error(chalk.red("Error details:"), error);
        process.exit(1);
      }
    }
  } catch (error) {
    templateSpinner.fail(chalk.red("❌ Failed to create template files"));
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

  if (platform === "website") {
    console.log(chalk.white(`   2. ${chalk.cyan("npm run dev")}`));
    console.log(
      chalk.white(`   3. ${chalk.cyan("Open http://localhost:3000")}`)
    );
    console.log();
    console.log(chalk.gray("📚 Your project includes:"));
    console.log(chalk.gray("   • Next.js 14+ with App Router"));
    console.log(chalk.gray("   • TypeScript configuration"));
    console.log(chalk.gray("   • Tailwind CSS styling"));
    console.log(chalk.gray("   • React Query for data fetching"));
    console.log(chalk.gray("   • Zod for schema validation"));
    console.log(chalk.gray("   • Enterprise folder structure"));
    console.log(chalk.gray("   • Barrel export files"));
    console.log(chalk.gray("   • Route groups (auth/protected/unprotected)"));
  } else {
    console.log(chalk.white(`   2. ${chalk.cyan("npm start")}`));
    console.log(
      chalk.white(`   3. ${chalk.cyan("Scan QR code with Expo Go app")}`)
    );
    console.log();
    console.log(chalk.gray("📚 Your project includes:"));
    console.log(chalk.gray("   • Expo React Native with TypeScript"));
    console.log(chalk.gray("   • Expo Router for navigation"));
    console.log(chalk.gray("   • Tab navigation with beautiful icons"));
    console.log(chalk.gray("   • Authentication flow (Phone + OTP)"));
    console.log(chalk.gray("   • React Query for data fetching"));
    console.log(chalk.gray("   • Complete app structure"));
    console.log(chalk.gray("   • Ready-to-use components"));
  }
  console.log();
  console.log(
    gradient(["#ff6b6b", "#4ecdc4", "#45b7d1", "#96ceb4", "#feca57"])(
      "Happy coding! 🚀✨"
    )
  );
}

run();
