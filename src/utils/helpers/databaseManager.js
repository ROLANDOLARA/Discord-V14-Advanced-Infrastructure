const fs = require("fs").promises;
const path = require("path");

const dbDir = path.join(__dirname, "..", "..", "database");

async function loadDatabase(file, createIfMissing = false) {
    try {
        await fs.mkdir(dbDir, { recursive: true });
        const fileExists = await fs.access(file).then(() => true).catch(() => false);
        if (!fileExists) {
            if (createIfMissing) {
                await fs.writeFile(file, JSON.stringify({}, null, 2));
            }
            return {};
        }
        const fileContent = await fs.readFile(file, "utf8");
        return fileContent.trim() ? JSON.parse(fileContent) : {};
    } catch (error) {
        return {};
    }
}

async function saveDatabase(file, db) {
    try {
        await fs.writeFile(file, JSON.stringify(db, null, 2));
    } catch (error) {
    }
}

module.exports = { loadDatabase, saveDatabase };