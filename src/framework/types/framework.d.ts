import { TwingEnvironment } from 'twing';
import { ConfigSchema } from '@Framework/types/config/config';
import IAbstractController from '@Framework/types/controller';

export default interface IFramework {
    environment: TwingEnvironment;
    config: ConfigSchema;
    controllers: IAbstractController[];
    start: () => void;
}