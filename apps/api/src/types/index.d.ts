declare module '*.json' {
  const value: any;
  export default value;
}

export interface I18nTypes {
  en: {
    hello: string;
    welcome: string;
  };
}
