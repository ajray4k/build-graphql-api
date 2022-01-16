#!/usr/bin/env node

// MODULES
const argv = require("minimist")(process.argv.slice(2));
const { mkdir } = require("fs").promises;

// JOBS
const { createPackageDotJson } = require("./jobs/createPackageDotJson");
const { installDependencies } = require("./jobs/installDependencies");
const { addScripts } = require("./jobs/addScripts");
const { createTsConfigDotJson } = require("./jobs/createTsConfigDotJson");
const { createFolderStructure } = require("./jobs/createFolderStructure");
const { createEnvFile } = require("./jobs/createEnvFile");
const { createMainFiles } = require("./jobs/createMainFiles");
const { createConfigFiles } = require("./jobs/createConfigFiles");
const { createObjects } = require("./jobs/createObjects");
const { createUtils } = require("./jobs/createUtils");
const { createBookFeature } = require("./jobs/createBookFeature");
const { createAuthorFeature } = require("./jobs/createAuthorFeature");
const { createIndexDotTs } = require("./jobs/createIndexDotTs");
const { build } = require("./jobs/build");

const [dir] = argv._;
const { session } = argv;

const main = async () => {
  if (!dir) {
    throw new Error("\n📂 Please enter a directory!");
  }

  if (dir !== ".") {
    await mkdir(dir);
  }

  console.log("\n📃 Creating package.json...");
  await createPackageDotJson(dir);

  console.log("\n🌐 Installing dependencies... (this might take a while)");
  await installDependencies(dir, session);

  console.log("\n🔨 Adding scripts...");
  await addScripts(dir);

  console.log("\n🦸 Configuring Typescript...");
  await createTsConfigDotJson(dir);

  console.log("\n🌳 Setting up environment...");
  await createFolderStructure(dir);

  await createEnvFile(dir, session);

  await createMainFiles(dir, session);

  await createConfigFiles(dir, session);

  console.log("\n👍 Creating utils...");
  await createUtils(dir, session);

  console.log("\n🏆 Creating examples...");
  await createObjects(dir);

  await createAuthorFeature(dir);

  await createBookFeature(dir);

  console.log("\n🛫 Bringing it all together...");
  await createIndexDotTs(dir, session);

  await build(dir);

  console.log(
    "\nPlease go to https://www.npmjs.com/package/build-graphql-api for further instructions"
      .green.bold
  );
};

main().catch((e) => {
  console.log(e);
});
