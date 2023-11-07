import Framework from '@Framework/Framework';

const framework = new Framework();
framework.start();
/*
const start = async () => {
    console.log(await framework.environment.render('Pages/index.html.twig', {
        app: {
            lang: framework.config.framework.default_lang,
        },
    }));
}

start();
*/