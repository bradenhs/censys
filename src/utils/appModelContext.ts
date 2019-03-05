import { createContext } from "react";
import { AppModel } from "../models/AppModel";

export const appModelContext = createContext<AppModel | null>(null);
