import { selector } from "recoil";
import { GameStepManager } from "../pixi-vn/src";
import { reloadInterfaceDataEventState } from "./reloadInterfaceDataEventState";

export const canGoBackState = selector<boolean>({
    key: 'canGoBackState',
    get: ({ get }) => {
        // dipendencies: when the dipendencies change, the selector will re-run
        get(reloadInterfaceDataEventState)

        return GameStepManager.canGoBack
    },
});
