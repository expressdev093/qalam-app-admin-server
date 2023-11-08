const fs = require("fs");
const ncp = require("ncp").ncp;

// Define an array of source and destination directory paths
const copyTasks = [
  {
    sourceDir: "apps/api/dist",
    buildDir: "build/apps/api/dist",
    copyFiles: {
      sourceDir: "apps/api",
      buildDir: "build/apps/api",
      files: [
        "nest-cli.json",
        "package.json",
        "tsconfig.build.json",
        "tsconfig.json",
      ],
    },
  },
  {
    sourceDir: "apps/client/dist",
    buildDir: "build/apps/client/dist",
  },
  {
    copyFiles: {
      sourceDir: __dirname,
      buildDir: "build/",
      files: [
        "package.json",
        "package-lock.json",
        "turbo.json",
        ".env",
        ".env.production",
      ],
    },
  },
  // Add more source and destination paths as needed
];

// Iterate through the copyTasks array and copy files for each task
copyTasks.forEach((task) => {
  const { sourceDir, buildDir, copyFiles } = task;
  if (sourceDir && buildDir) {
    // Create the build directory if it doesn't exist
    if (!fs.existsSync(buildDir)) {
      fs.mkdirSync(buildDir, { recursive: true });
    }

    // Copy the contents of the source directory to the build directory
    ncp(sourceDir, buildDir, function (err) {
      if (err) {
        console.error(
          `Error copying files from ${sourceDir} to ${buildDir}:`,
          err
        );
      } else {
        console.log(
          `Files copied successfully from ${sourceDir} to ${buildDir}.`
        );
      }
    });
  }

  if (copyFiles) {
    copyFiles.files.forEach((file) => {
      const sourceFile = `${copyFiles.sourceDir}/${file}`;
      const destinationFile = `${copyFiles.buildDir}/${file}`;

      ncp(sourceFile, destinationFile, function (err) {
        if (err) {
          console.error(
            `Error copying ${file} from ${sourceFile} to ${destinationFile}:`,
            err
          );
        } else {
          console.log(
            `${file} copied successfully from ${sourceFile} to ${destinationFile}.`
          );
        }
      });
    });
  }
});
