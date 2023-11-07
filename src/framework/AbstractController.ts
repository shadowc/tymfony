import path from 'path';
import IAbstractController from '@Framework/types/controller';
import IFramework from '@Framework/types/framework';

export default class AbstractController implements IAbstractController {
    public framework: IFramework

    constructor(framework: IFramework) {
        this.framework = framework;
    }

    protected async renderView(templateFile: string, context: any): Promise<string> {
        let out = new Promise<string>((resolve, reject) => {
            this.framework.environment.twig.renderFile(path.resolve(this.framework.environment.basePath, templateFile), context, (err, html) => {
                resolve(html);
            });
        });

        return out;
    }

    protected async render(templateFile: string, context: any): Promise<void> {

    }
}
