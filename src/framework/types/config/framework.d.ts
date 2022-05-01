interface FrameworkConfig {
    default_lang: string;
    controller_path: string;
    services_path: string;
    project_root: string;
}

export default interface FrameworkConfigSchema {
    framework: FrameworkConfig;
}
