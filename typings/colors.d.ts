declare module 'colors' {
  interface Colors {
    customServer: string[]
    msgServer: string[]
    customDB: string[]
    msgDB: string[]
    error: string[]
    errorTxt: string[]
  }

  interface ColorThemes {
    customServer: string[]
    msgServer: string[]
    customDB: string[]
    msgDB: string[]
    error: string[]
    errorTxt: string[]
  }

  interface String {
    customServer: string
    msgServer: string
    customDB: string
    msgDB: string
    error: string
    errorTxt: string
  }

  const colors: Colors & { setTheme(theme: ColorThemes): void }

  export = colors
}
