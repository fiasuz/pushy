#!/usr/bin/env node
import { Command } from "commander";
import process from "process";
import { initCommand } from "../src/commands/init.js";

const program = new Command();

program
  .name("app-pilot")
  .description("App build and deployment automation CLI")
  .version("0.1.0");

program
  .command("init")
  .description("Initialize Pushy configuration")
  .action(initCommand);

program.parse(process.argv);
