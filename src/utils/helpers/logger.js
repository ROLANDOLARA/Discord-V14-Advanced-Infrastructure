const fs = require('fs').promises;
const path = require('path');
const chalk = require('chalk');

const baseDir = path.resolve(__dirname, '..', '..');
const logsDir = path.join(baseDir, 'logs');

class Logger {
    constructor() {
        this.logsDir = logsDir;
        this.startupTimestamp = this.formatTimestampForFile();
        this.ensureLogsDir();
    }

    async ensureLogsDir() {
        try {
            await fs.mkdir(this.logsDir, { recursive: true });
        } catch (error) {
            console.error(chalk.red('Failed to create logs directory: ' + error.message));
            if (error.code === 'EACCES') {
                console.error(chalk.red('Permission denied. Please run with admin privileges or adjust folder permissions.'));
            }
        }
    }

    formatTimestampForFile() {
        const date = new Date();
        return date.toISOString()
            .replace(/T/, '_')
            .replace(/:/g, '-')
            .slice(0, 19);
    }

    getLogFileName() {
        return path.join(this.logsDir, `${this.startupTimestamp}.log`);
    }

    formatTimestamp() {
        const date = new Date();
        return date.toLocaleString('en-US', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: false
        });
    }

    async log(message, level = 'INFO') {
        const timestamp = this.formatTimestamp();
        const logMessage = `[${timestamp}] [${level}] ${message}\n`;

        const color = level === 'ERROR' ? chalk.red : chalk.yellow;

        try {
            await fs.appendFile(this.getLogFileName(), logMessage);
        } catch (error) {
            console.error(chalk.red('Failed to write to log file: ' + error.message));
            if (error.code === 'EACCES') {
                console.error(chalk.red('Permission denied. Check write access to logs directory.'));
            }
        }
    }

    async logCommand(interaction) {
        const message = `Command: /${interaction.commandName} | User: ${interaction.user.tag} (${interaction.user.id}) | Channel: ${interaction.channel.name} (${interaction.channel.id})`;
        await this.log(message, 'COMMAND');
    }

    async logBotStart() {
    }

    async logError(error, context = '') {
        const message = `${context ? context + ' | ' : ''}Error: ${error.message}`;
        await this.log(message, 'ERROR');
    }
}

module.exports = new Logger();