import { execSync } from "child_process";
import clipboardy from "clipboardy";

if (process.argv.length < 3) {
    console.error("Usage: node app.js '<Project Technology>'");
    process.exit(1);
}

const projectTech = process.argv[2];

try {
    // Get git diff in a single line
    const gitDiff = execSync("git diff --unified=0 --no-color", { cwd: process.cwd(), encoding: "utf-8" })
        .replace(/\n/g, " ") // Convert newlines to spaces
        .trim();

    const formattedMessage = `Generate a concise commit message for ${projectTech}: ${gitDiff || "(No changes detected)"}`;

    // Copy to clipboard
    await clipboardy.write(formattedMessage);

    console.log(formattedMessage);
    console.log("\n✅ Copied to clipboard! Paste it into DeepSeek.");

} catch (error) {
    console.error("Error retrieving git diff:", error.message);
}

