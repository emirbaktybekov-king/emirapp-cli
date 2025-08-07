#!/usr/bin/env node
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
var chalk_1 = require("chalk");
var execa_1 = require("execa");
var figlet_1 = require("figlet");
var fs_extra_1 = require("fs-extra");
var gradient_string_1 = require("gradient-string");
var ora_1 = require("ora");
var path_1 = require("path");
var prompts_1 = require("prompts");
// Import templates
var simple_1 = require("./mobile/ReactNative_Expo/simple");
var enterprise_1 = require("./website/Next-Js/enterprise");
var simple_2 = require("./website/Next-Js/simple");
// Helper function to create colorful banners
function createBanner() {
    var banner = figlet_1.default.textSync("EmirApp CLI", {
        font: "ANSI Shadow",
        horizontalLayout: "default",
        verticalLayout: "default",
    });
    console.log((0, gradient_string_1.default)([
        "#ff0000",
        "#ff7f00",
        "#ffff00",
        "#00ff00",
        "#0000ff",
        "#4b0082",
        "#9400d3",
    ])(banner));
    console.log(chalk_1.default.cyan.bold("🚀 A powerful CLI to scaffold modern applications"));
    console.log(chalk_1.default.gray("   Next.js • React Native • Angular • Flutter • TypeScript • Enterprise Ready"));
    console.log();
}
// Template creation functions
function createAppFiles(platform, framework, complexity) {
    return __awaiter(this, void 0, void 0, function () {
        var templates, dependencies, _i, _a, _b, filePath, content;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    templates = {};
                    dependencies = [];
                    // Select templates based on platform, framework, and complexity
                    if (platform === "website" &&
                        framework === "nextjs" &&
                        complexity === "simple") {
                        templates = simple_2.nextJsSimpleTemplates;
                        dependencies = simple_2.nextJsSimpleDependencies;
                    }
                    else if (platform === "website" &&
                        framework === "nextjs" &&
                        complexity === "enterprise") {
                        templates = enterprise_1.nextJsEnterpriseTemplates;
                        dependencies = enterprise_1.nextJsEnterpriseDependencies;
                    }
                    else if (platform === "mobile" &&
                        framework === "expo" &&
                        complexity === "simple") {
                        templates = simple_1.reactNativeExpoSimpleTemplates;
                        dependencies = simple_1.reactNativeExpoSimpleDependencies;
                    }
                    _i = 0, _a = Object.entries(templates);
                    _c.label = 1;
                case 1:
                    if (!(_i < _a.length)) return [3 /*break*/, 4];
                    _b = _a[_i], filePath = _b[0], content = _b[1];
                    return [4 /*yield*/, fs_extra_1.default.writeFile(filePath, content)];
                case 2:
                    _c.sent();
                    _c.label = 3;
                case 3:
                    _i++;
                    return [3 /*break*/, 1];
                case 4: return [2 /*return*/, dependencies];
            }
        });
    });
}
function run() {
    return __awaiter(this, void 0, void 0, function () {
        var platform, frameworkChoices, framework, complexity, appName, sanitizedAppName, createAppSpinner, error_1, appPath, foldersToCreate_1, folderSpinner_1, error_2, routerSpinner, error_3, foldersToCreate, folderSpinner, error_4, barrelTemplate, barrelSpinner, indexPaths, error_5, templateSpinner, dependencies, depsSpinner, error_6, error_7;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    // Handle process interruption gracefully
                    process.on("SIGINT", function () {
                        console.log();
                        console.log(chalk_1.default.yellow("👋 Process cancelled by user. Goodbye!"));
                        process.exit(0);
                    });
                    // Show welcome banner
                    createBanner();
                    return [4 /*yield*/, (0, prompts_1.default)({
                            type: "select",
                            name: "platform",
                            message: chalk_1.default.yellow("🎯 Choose a platform"),
                            choices: [
                                {
                                    title: chalk_1.default.green("📱 Mobile") + chalk_1.default.gray(" - React Native & Flutter"),
                                    value: "mobile",
                                },
                                {
                                    title: chalk_1.default.green("🌐 Website") + chalk_1.default.gray(" - Next.js & Angular"),
                                    value: "website",
                                },
                            ],
                        })];
                case 1:
                    platform = (_a.sent()).platform;
                    if (!platform) {
                        console.log(chalk_1.default.yellow("👋 Process cancelled. Goodbye!"));
                        process.exit(0);
                    }
                    frameworkChoices = [];
                    if (platform === "mobile") {
                        frameworkChoices = [
                            {
                                title: chalk_1.default.green("Expo React Native") +
                                    chalk_1.default.gray(" - Modern React Native framework"),
                                value: "expo",
                            },
                            {
                                title: chalk_1.default.gray("Flutter") + chalk_1.default.dim(" (Coming Soon)"),
                                value: "flutter",
                                disabled: true,
                            },
                        ];
                    }
                    else if (platform === "website") {
                        frameworkChoices = [
                            {
                                title: chalk_1.default.green("Next.js") + chalk_1.default.gray(" - Modern React framework"),
                                value: "nextjs",
                            },
                            {
                                title: chalk_1.default.gray("Angular") + chalk_1.default.dim(" (Coming Soon)"),
                                value: "angular",
                                disabled: true,
                            },
                        ];
                    }
                    return [4 /*yield*/, (0, prompts_1.default)({
                            type: "select",
                            name: "framework",
                            message: chalk_1.default.yellow("🔧 Choose a framework"),
                            choices: frameworkChoices,
                        })];
                case 2:
                    framework = (_a.sent()).framework;
                    if (!framework) {
                        console.log(chalk_1.default.yellow("👋 Process cancelled. Goodbye!"));
                        process.exit(0);
                    }
                    return [4 /*yield*/, (0, prompts_1.default)({
                            type: "select",
                            name: "complexity",
                            message: chalk_1.default.yellow("📁 Choose project complexity"),
                            choices: [
                                {
                                    title: chalk_1.default.green("Simple") + chalk_1.default.gray(" - Perfect for getting started"),
                                    value: "simple",
                                },
                                {
                                    title: chalk_1.default.gray("Enterprise") + chalk_1.default.dim(" (Coming Soon)"),
                                    value: "enterprise",
                                    disabled: true,
                                },
                            ],
                        })];
                case 3:
                    complexity = (_a.sent()).complexity;
                    if (!complexity) {
                        console.log(chalk_1.default.yellow("👋 Process cancelled. Goodbye!"));
                        process.exit(0);
                    }
                    return [4 /*yield*/, (0, prompts_1.default)({
                            type: "text",
                            name: "appName",
                            message: chalk_1.default.yellow("📝 Enter your app name"),
                            initial: "my-awesome-app",
                            validate: function (name) {
                                return name && /^[a-zA-Z0-9-_ ]+$/.test(name)
                                    ? true
                                    : chalk_1.default.red("App name must be alphanumeric with optional spaces, dashes or underscores");
                            },
                        })];
                case 4:
                    appName = (_a.sent()).appName;
                    if (!appName) {
                        console.log(chalk_1.default.yellow("👋 Process cancelled. Goodbye!"));
                        process.exit(0);
                    }
                    sanitizedAppName = appName.toLowerCase().replace(/\s+/g, "-");
                    console.log();
                    console.log(chalk_1.default.cyan.bold("\uD83C\uDFD7\uFE0F  Creating ".concat(platform === "website" ? "Next.js" : "Expo React Native", " app \"").concat(sanitizedAppName, "\"")));
                    console.log(chalk_1.default.gray("   This might take a moment..."));
                    console.log();
                    createAppSpinner = (0, ora_1.default)({
                        text: chalk_1.default.blue("Setting up ".concat(platform === "website"
                            ? "Next.js with TypeScript and Tailwind"
                            : "Expo React Native with TypeScript", "...")),
                        spinner: "dots12",
                    }).start();
                    _a.label = 5;
                case 5:
                    _a.trys.push([5, 10, , 11]);
                    if (!(platform === "website" && framework === "nextjs")) return [3 /*break*/, 7];
                    return [4 /*yield*/, (0, execa_1.execa)("npx", [
                            "create-next-app@latest",
                            sanitizedAppName,
                            "--typescript",
                            "--tailwind",
                            "--app",
                            "--src-dir",
                            "--eslint",
                            "--yes",
                        ], { stdio: "pipe" })];
                case 6:
                    _a.sent();
                    return [3 /*break*/, 9];
                case 7:
                    if (!(platform === "mobile" && framework === "expo")) return [3 /*break*/, 9];
                    return [4 /*yield*/, (0, execa_1.execa)("yarn", [
                            "create",
                            "expo-app",
                            sanitizedAppName,
                            "--template",
                            "blank-typescript",
                        ], { stdio: "pipe" })];
                case 8:
                    _a.sent();
                    _a.label = 9;
                case 9:
                    createAppSpinner.succeed(chalk_1.default.green("\u2705 ".concat(platform === "website" ? "Next.js" : "Expo React Native", " app created successfully!")));
                    return [3 /*break*/, 11];
                case 10:
                    error_1 = _a.sent();
                    createAppSpinner.fail(chalk_1.default.red("\u274C Failed to create ".concat(platform === "website" ? "Next.js" : "Expo React Native", " app")));
                    console.error(chalk_1.default.red("Error details:"), error_1);
                    process.exit(1);
                    return [3 /*break*/, 11];
                case 11:
                    appPath = path_1.default.resolve(process.cwd(), sanitizedAppName);
                    process.chdir(appPath);
                    if (!(platform === "website" && framework === "nextjs")) return [3 /*break*/, 15];
                    foldersToCreate_1 = [
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
                    folderSpinner_1 = (0, ora_1.default)({
                        text: chalk_1.default.blue("Creating enterprise folder structure..."),
                        spinner: "bouncingBar",
                    }).start();
                    _a.label = 12;
                case 12:
                    _a.trys.push([12, 14, , 15]);
                    return [4 /*yield*/, Promise.all(foldersToCreate_1.map(function (folder) { return fs_extra_1.default.ensureDir(folder); }))];
                case 13:
                    _a.sent();
                    folderSpinner_1.succeed(chalk_1.default.green("✅ Folder structure created!"));
                    return [3 /*break*/, 15];
                case 14:
                    error_2 = _a.sent();
                    folderSpinner_1.fail(chalk_1.default.red("❌ Failed to create folder structure"));
                    console.error(chalk_1.default.red("Error details:"), error_2);
                    process.exit(1);
                    return [3 /*break*/, 15];
                case 15:
                    if (!(platform === "mobile" && framework === "expo")) return [3 /*break*/, 19];
                    routerSpinner = (0, ora_1.default)({
                        text: chalk_1.default.blue("Installing Expo Router and dependencies..."),
                        spinner: "bouncingBar",
                    }).start();
                    _a.label = 16;
                case 16:
                    _a.trys.push([16, 18, , 19]);
                    return [4 /*yield*/, (0, execa_1.execa)("npx", ["expo", "install", "expo-router"], { stdio: "pipe" })];
                case 17:
                    _a.sent();
                    routerSpinner.succeed(chalk_1.default.green("✅ Expo Router installed!"));
                    return [3 /*break*/, 19];
                case 18:
                    error_3 = _a.sent();
                    routerSpinner.fail(chalk_1.default.red("❌ Failed to install Expo Router"));
                    console.error(chalk_1.default.red("Error details:"), error_3);
                    process.exit(1);
                    return [3 /*break*/, 19];
                case 19:
                    foldersToCreate = [
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
                    folderSpinner = (0, ora_1.default)({
                        text: chalk_1.default.blue("Creating Expo Router app structure..."),
                        spinner: "bouncingBar",
                    }).start();
                    _a.label = 20;
                case 20:
                    _a.trys.push([20, 22, , 23]);
                    return [4 /*yield*/, Promise.all(foldersToCreate.map(function (folder) { return fs_extra_1.default.ensureDir(folder); }))];
                case 21:
                    _a.sent();
                    folderSpinner.succeed(chalk_1.default.green("✅ App structure created!"));
                    return [3 /*break*/, 23];
                case 22:
                    error_4 = _a.sent();
                    folderSpinner.fail(chalk_1.default.red("❌ Failed to create app structure"));
                    console.error(chalk_1.default.red("Error details:"), error_4);
                    process.exit(1);
                    return [3 /*break*/, 23];
                case 23:
                    barrelTemplate = "// Barrel export file for this folder\n// Example: export { default as Button } from \"./Button\";\n// Example: export { default as Input } from \"./Input\";\n";
                    barrelSpinner = (0, ora_1.default)({
                        text: chalk_1.default.blue("Creating barrel export files..."),
                        spinner: "dots2",
                    }).start();
                    indexPaths = [];
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
                    }
                    else if (platform === "mobile" && framework === "expo") {
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
                    _a.label = 24;
                case 24:
                    _a.trys.push([24, 26, , 27]);
                    return [4 /*yield*/, Promise.all(indexPaths.map(function (filePath) { return fs_extra_1.default.writeFile(filePath, barrelTemplate); }))];
                case 25:
                    _a.sent();
                    barrelSpinner.succeed(chalk_1.default.green("✅ Barrel export files created!"));
                    return [3 /*break*/, 27];
                case 26:
                    error_5 = _a.sent();
                    barrelSpinner.fail(chalk_1.default.red("❌ Failed to create barrel files"));
                    console.error(chalk_1.default.red("Error details:"), error_5);
                    process.exit(1);
                    return [3 /*break*/, 27];
                case 27:
                    templateSpinner = (0, ora_1.default)({
                        text: chalk_1.default.blue("Creating app template files..."),
                        spinner: "dots",
                    }).start();
                    _a.label = 28;
                case 28:
                    _a.trys.push([28, 37, , 38]);
                    return [4 /*yield*/, createAppFiles(platform, framework, complexity)];
                case 29:
                    dependencies = _a.sent();
                    templateSpinner.succeed(chalk_1.default.green("✅ App template files created!"));
                    if (!(dependencies.length > 0)) return [3 /*break*/, 36];
                    depsSpinner = (0, ora_1.default)({
                        text: chalk_1.default.blue(platform === "website"
                            ? "Installing Zod and TanStack React Query..."
                            : "Installing React Native dependencies..."),
                        spinner: "arc",
                    }).start();
                    _a.label = 30;
                case 30:
                    _a.trys.push([30, 35, , 36]);
                    if (!(platform === "website")) return [3 /*break*/, 32];
                    return [4 /*yield*/, (0, execa_1.execa)("yarn", __spreadArray(["add"], dependencies, true), { stdio: "pipe" })];
                case 31:
                    _a.sent();
                    return [3 /*break*/, 34];
                case 32: return [4 /*yield*/, (0, execa_1.execa)("npm", __spreadArray(["install"], dependencies, true), { stdio: "pipe" })];
                case 33:
                    _a.sent();
                    _a.label = 34;
                case 34:
                    depsSpinner.succeed(chalk_1.default.green("✅ Dependencies installed successfully!"));
                    return [3 /*break*/, 36];
                case 35:
                    error_6 = _a.sent();
                    depsSpinner.fail(chalk_1.default.red("❌ Failed to install dependencies"));
                    console.error(chalk_1.default.red("Error details:"), error_6);
                    process.exit(1);
                    return [3 /*break*/, 36];
                case 36: return [3 /*break*/, 38];
                case 37:
                    error_7 = _a.sent();
                    templateSpinner.fail(chalk_1.default.red("❌ Failed to create template files"));
                    console.error(chalk_1.default.red("Error details:"), error_7);
                    process.exit(1);
                    return [3 /*break*/, 38];
                case 38:
                    // Success banner
                    console.log();
                    console.log(chalk_1.default.green("🎉 ") + chalk_1.default.bold.green("SUCCESS!"));
                    console.log();
                    console.log(chalk_1.default.cyan.bold("\uD83D\uDCE6 Project \"".concat(sanitizedAppName, "\" created successfully!")));
                    console.log();
                    console.log(chalk_1.default.yellow.bold("🚀 Next steps:"));
                    console.log(chalk_1.default.white("   1. ".concat(chalk_1.default.cyan("cd ".concat(sanitizedAppName)))));
                    if (platform === "website") {
                        console.log(chalk_1.default.white("   2. ".concat(chalk_1.default.cyan("npm run dev"))));
                        console.log(chalk_1.default.white("   3. ".concat(chalk_1.default.cyan("Open http://localhost:3000"))));
                        console.log();
                        console.log(chalk_1.default.gray("📚 Your project includes:"));
                        console.log(chalk_1.default.gray("   • Next.js 14+ with App Router"));
                        console.log(chalk_1.default.gray("   • TypeScript configuration"));
                        console.log(chalk_1.default.gray("   • Tailwind CSS styling"));
                        console.log(chalk_1.default.gray("   • React Query for data fetching"));
                        console.log(chalk_1.default.gray("   • Zod for schema validation"));
                        console.log(chalk_1.default.gray("   • Enterprise folder structure"));
                        console.log(chalk_1.default.gray("   • Barrel export files"));
                        console.log(chalk_1.default.gray("   • Route groups (auth/protected/unprotected)"));
                    }
                    else {
                        console.log(chalk_1.default.white("   2. ".concat(chalk_1.default.cyan("npm start"))));
                        console.log(chalk_1.default.white("   3. ".concat(chalk_1.default.cyan("Scan QR code with Expo Go app"))));
                        console.log();
                        console.log(chalk_1.default.gray("📚 Your project includes:"));
                        console.log(chalk_1.default.gray("   • Expo React Native with TypeScript"));
                        console.log(chalk_1.default.gray("   • Expo Router for navigation"));
                        console.log(chalk_1.default.gray("   • Tab navigation with beautiful icons"));
                        console.log(chalk_1.default.gray("   • Authentication flow (Phone + OTP)"));
                        console.log(chalk_1.default.gray("   • React Query for data fetching"));
                        console.log(chalk_1.default.gray("   • Complete app structure"));
                        console.log(chalk_1.default.gray("   • Ready-to-use components"));
                    }
                    console.log();
                    console.log((0, gradient_string_1.default)(["#ff6b6b", "#4ecdc4", "#45b7d1", "#96ceb4", "#feca57"])("Happy coding! 🚀✨"));
                    return [2 /*return*/];
            }
        });
    });
}
run();
