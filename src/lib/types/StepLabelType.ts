import { MunuOptionsType } from "./MunuOptionsType";

/**
 * StepLabel is a function that will be executed as the game continues.
 */
export type StepLabelType = (() => void | Promise<void> | MunuOptionsType | Promise<MunuOptionsType>)
