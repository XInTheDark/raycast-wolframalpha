/// <reference types="@raycast/api">

/* 🚧 🚧 🚧
 * This file is auto-generated from the extension's manifest.
 * Do not modify manually. Instead, update the `package.json` file.
 * 🚧 🚧 🚧 */

/* eslint-disable @typescript-eslint/ban-types */

type ExtensionPreferences = {
  /** Wolfram Alpha App ID - See the README for instructions about how to create an App ID */
  "appID": string,
  /** Font Size - The font size used in the result */
  "fontsize": "16" | "18" | "20" | "24" | "28" | "32"
}

/** Preferences accessible in all the extension's commands */
declare type Preferences = ExtensionPreferences

declare namespace Preferences {
  /** Preferences accessible in the `query` command */
  export type Query = ExtensionPreferences & {}
}

declare namespace Arguments {
  /** Arguments passed to the `query` command */
  export type Query = {}
}

