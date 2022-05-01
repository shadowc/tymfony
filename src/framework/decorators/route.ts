export interface RoutingOptions {
    path: string;
    name: string;
    method?: string;
    methods?: string[]
}

export interface RoutingItem {
    object: any;
    property: string;
    routingOptions: RoutingOptions;
}

export interface RoutingData {
    [index: string]: RoutingItem;
}

export const Routes: RoutingData = {};

export const Route = (routingOptions: RoutingOptions) => {
    return (property: any, name: string, descriptor: PropertyDescriptor) => {
        Routes[routingOptions.name] = {
            object: property,
            property: name,
            routingOptions,
        };
    };
}
