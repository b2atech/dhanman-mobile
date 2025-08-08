declare module 'react-native-config' {
  interface Config {
    DEBUG?: string;
    [key: string]: string | undefined;
  }

  const Config: Config;
  export default Config;
}
