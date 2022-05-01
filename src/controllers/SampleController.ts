import AbstractController from '@Framework/AbstractController';
import { Route } from '@Framework/decorators/route';

export class SampleController extends AbstractController {
    @Route({ path: '/', name: 'app_index', method: 'GET' })
    indexAction() {
        // TODO: work with express!
        console.log('indexAction has been called!');
    }
}
