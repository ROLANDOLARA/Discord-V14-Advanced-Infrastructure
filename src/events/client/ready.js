const { REST, Routes, ActivityType } = require("discord.js");
const chalk = require("chalk");
const logger = require('../../utils/helpers/logger');

module.exports = {
  name: "ready",
  async execute(client) {
    const rest = new REST({ version: "10" }).setToken(process.env.TOKEN);
    try {
      const commands = Array.from(client.commands.values()).map((cmd) => ({
        name: cmd.name,
        description: cmd.description,
        type: cmd.type,
        options: cmd.options || [],
        dm_permission: cmd.dm_permission || false,
      }));

      await rest.put(Routes.applicationCommands(client.user.id), {
        body: commands,
      });

    } catch (error) {
      console.log(
        chalk.gray('[') +
        chalk.hex('#ff0000')('-') +
        chalk.gray(']') +
        chalk.hex('#ff0000')(' Error Failed to register commands: ' + error.message + '.')
      );
      await logger.logError(error, 'Failed to register commands');
    }

    try {
      client.user.setPresence({
        activities: [{ name: "Made By: Erxsdev", type: ActivityType.Watching }],
        status: "online",
      });

    } catch (error) {
      console.log(
        chalk.gray('[') +
        chalk.hex('#ff0000')('-') +
        chalk.gray(']') +
        chalk.hex('#ff0000')(' Error Failed to set status: ' + error.message + '.')
      );
      await logger.logError(error, 'Failed to set status');
    }
  },
};