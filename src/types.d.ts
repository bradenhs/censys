declare module "*.svg" {
  const src: string;
  export default src;
}

interface Window {
  Cypress: any;
}

interface NodeModule {
  hot?: {
    dispose: (fn: () => void) => void;
  };
}
