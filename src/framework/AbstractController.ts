import IAbstractController from '@Framework/types/controller';
import IFramework from '@Framework/types/framework';

export default class AbstractController implements IAbstractController {
    protected framework: IFramework
    protected route: string = '';

    constructor(framework: IFramework) {
        this.framework = framework;
    }

    protected action() {
        // Override
    }

    protected async renderView(templateFile: string, context: any): Promise<string> {
        return await this.framework.environment.render(templateFile, context);
    }

    protected async render(templateFile: string, context: any): Promise<void> {

    }
}
