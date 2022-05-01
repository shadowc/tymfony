import 'dotenv/config';
import path from 'path';
import  { Express } from 'express';
import express from 'express';
import { TwingEnvironment, TwingLoaderFilesystem } from 'twing';
import { ConfigSchema } from '@Framework/types/config/config';
import IAbstractController from '@Framework/types/controller';
import IFramework from '@Framework/types/framework';
import FileScanner from '@Framework/helpers/FileScanner.js';
import ConfigLoader from '@Framework/helpers/ConfigLoader.js';
import * as Controllers from '@src/controllers_bundle';
import { Routes, RoutingData } from '@Framework/decorators/route';

export default class Framework implements IFramework {
    private expressInstance: Express;
    private readonly projectRoot: string;
    private readonly sourceRoot: string;
    private readonly appPort: number = 8000;

    private fileScanner: FileScanner;
    private configLoader: ConfigLoader;

    public environment: TwingEnvironment;
    public config: ConfigSchema;
    public controllers: IAbstractController[] = [];
    public routes: RoutingData;

    constructor() {
        if (typeof path.resolve === 'undefined') {
            throw 'Cannot start framework because the function path.resolve is not available in this system!';
        }

        this.expressInstance = express();
        this.fileScanner = new FileScanner();
        this.configLoader = new ConfigLoader();

        // Assume we're running in ./build/app.js
        this.projectRoot = path.resolve(__dirname, '..');
        this.sourceRoot = path.resolve(__dirname, '..', 'src');

        if (process.env.APP_PORT && !isNaN(Number(process.env.APP_PORT))) {
            this.appPort = Number(process.env.APP_PORT);
        }

        this.config = this.getDefaultFrameworkConfig();

        console.log(`Starting server at "${this.projectRoot}".`);

        // Read config files
        const mainConfigPath = path.resolve(this.projectRoot, 'config');
        console.log(`Reading config files at "${mainConfigPath}".`);
        this.scanFiles(mainConfigPath, this.loadConfigFile.bind(this));

        this.controllers = Object.keys(Controllers).map(key => (new (Controllers as any)[key](this) as IAbstractController));

        this.routes = Routes;
        console.log(this.routes);

        // Start the Twig Engine
        const twigBasePath = path.resolve(this.projectRoot, this.config.twig.template_path);
        const TwigLoader = new TwingLoaderFilesystem(path.resolve(this.projectRoot, twigBasePath));
        this.environment = new TwingEnvironment(TwigLoader);
    }

    public start() {
        // start server listen
        this.expressInstance.listen(this.appPort);
    }

    private getDefaultFrameworkConfig(): ConfigSchema {
        return {
            framework: {
                default_lang: 'en',
                project_root: this.projectRoot,
                app_port: this.appPort,
                controller_path: 'controllers',
                services_path: 'services',
            },
            twig: {
                template_path: 'templates',
            },
        };
    }

    private loadConfigFile(absolutePath: string) {
        const configObject = this.configLoader.loadConfigFile(absolutePath);

        if (configObject !== null) {
            this.config = Object.assign(this.config, configObject);
        }
    }

    private scanFiles(absolutePath: string, callback: (filePath: string) => void) {
        this.fileScanner.scanFiles(absolutePath, callback);
    }
}
