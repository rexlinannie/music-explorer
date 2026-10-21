import "styled-components";
declare module "styled-components" {
  export interface DefaultTheme {
    colors: {
      background: string;
      surface: string;
      surfaceRaised: string;
      border: string;
      borderHover: string;
      text: string;
      muted: string;
      accent: string;
      accentSoft: string;
      artist: string;
      album: string;
      song: string;
    };
  }
}
