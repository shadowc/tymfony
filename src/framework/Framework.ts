import path from 'path';
import { readFileSync, readdirSync, lstatSync } from 'fs';
import { parse } from 'yaml';
import  { Express } from 'express';
import express from 'express';
import 'dotenv/config';
import { TwingEnvironment, TwingLoaderFilesystem } from 'twing';
import { ConfigSchema } from '@Framework/types/config/config';
import IAbstractController from '@Framework/types/controller';
import IFramework from '@Framework/types/framework';

export default class Framework implements IFramework {
    private expressInstance: Express;
    private readonly projectRoot: string;

    public environment: TwingEnvironment;
    public config: ConfigSchema;
    public controllers: IAbstractController[];

    constructor() {
        if (typeof path.resolve === 'undefined') {
            throw 'Cannot start framework because the function path.resolve is not available in this system!';
        }

        this.expressInstance = express();

        // Assume we're running in ./build/app.js
        this.projectRoot = path.resolve(__dirname, '..');
        this.config = this.getDefaultFrameworkConfig();

        console.log(`Starting server at "${this.projectRoot}".`);

        // Read config files
        const mainConfigPath = path.resolve(this.projectRoot, 'config');
        console.log(`Reading config files at "${mainConfigPath}".`);
        this.scanFiles(mainConfigPath, this.loadConfigFile.bind(this));

        const mainControllersPath = path.resolve(this.projectRoot, this.config.framework.controller_path);
        this.scanFiles(mainControllersPath, this.loadController.bind(this));

        // Start the Twig Engine
        const twigBasePath = path.resolve(this.projectRoot, this.config.twig.template_path);
        const TwigLoader = new TwingLoaderFilesystem(path.resolve(this.projectRoot, twigBasePath));
        this.environment = new TwingEnvironment(TwigLoader);
    }

    private getDefaultFrameworkConfig(): ConfigSchema {
        return {
            framework: {
                default_lang: 'en',
                project_root: this.projectRoot,
                controller_path: 'controllers',
                services_path: 'services',
            },
            twig: {
                template_path: 'templates',
            },
        };
    }

    private loadConfigFile(absolutePath: string) {
        let contents = readFileSync(absolutePath).toString();
        this.config = Object.assign(this.config, parse(contents));
    }

    private loadController(absolutePath: string) {
        this.controllers.push(require(absolutePath).default);
    }

    private scanFiles(filesPath: string, callback: (filePath: string) => void) {
        const files = readdirSync(filesPath);

        files.forEach((file) => {
            const absolutePath = path.resolve(filesPath, file);

            if (
                file.substring(file.length - 5) === '.yaml'
                || file.substring(file.length - 4) === '.yml'
            ) {
                callback(absolutePath);
            } else {
                if (lstatSync(absolutePath).isDirectory()) {
                    this.scanFiles(absolutePath, callback);
                }
            }
        });
    }
}
