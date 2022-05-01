export interface RoutingOptions {
    path: string;
    name: string;
    method?: string;
    methods?: string[]
}

export const Route = (routingOptions: RoutingOptions) => {
    return (property: any, name: string, descriptor: PropertyDescriptor) => {
        console.log(routingOptions);
        console.log('property: ', property);
        console.log('name', name);
        console.log('descriptor', descriptor);

        console.log('framework is here!', property.framework);
        property[name]();
    };
}
