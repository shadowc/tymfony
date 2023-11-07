import { ConfigSchema } from '@Framework/types/config/config';
import IAbstractController from '@Framework/types/controller';
import Twig from 'twig';

export default interface IFramework {
    config: ConfigSchema;
    controllers: IAbstractController[];
    environment: { basePath: string, twig: typeof Twig };
    start: () => void;
}