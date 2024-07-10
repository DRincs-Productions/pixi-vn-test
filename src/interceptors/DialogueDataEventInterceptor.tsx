import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { canGoNextState } from '../atoms/canGoNextState';
import { choiceMenuState } from '../atoms/choiceMenuState';
import { dialogDataState } from '../atoms/dialogDataState';
import { hideInterfaceState } from '../atoms/hideInterfaceState';
import { reloadInterfaceDataEventState } from '../atoms/reloadInterfaceDataEventState';
import { CharacterBaseModel, getCharacterById, getChoiceMenuOptions, getDialogue } from '../pixi-vn/src';

export default function DialogueDataEventInterceptor() {
    const reloadInterfaceDataEvent = useRecoilValue(reloadInterfaceDataEventState);
    const { t } = useTranslation(["translation"]);
    const hideInterface = useRecoilValue(hideInterfaceState)
    const setNextStepButtonHidden = useSetRecoilState(canGoNextState)
    const [{ text, character }, setDialogData] = useRecoilState(dialogDataState)
    const [{ menu }, setMenu] = useRecoilState(choiceMenuState)

    useEffect(() => {
        let dial = getDialogue()
        let newText: string | undefined = dial?.text
        let newCharacter: CharacterBaseModel | undefined = undefined
        if (dial) {
            newCharacter = dial.characterId ? getCharacterById(dial.characterId) : undefined
            if (!newCharacter && dial.characterId) {
                newCharacter = new CharacterBaseModel(dial.characterId, { name: t(dial.characterId) })
            }
        }
        try {
            if (dial !== text || newCharacter !== character) {
                setDialogData({
                    text: newText,
                    character: newCharacter,
                    hidden: hideInterface || newText ? false : true,
                })
            }
        } catch (e) { }
        let m = getChoiceMenuOptions()
        setMenu({
            menu: m || [],
            hidden: hideInterface || !m || m.length == 0,
        })
    }, [reloadInterfaceDataEvent])

    useEffect(() => {
        setNextStepButtonHidden(hideInterface || !(menu.length == 0))
    }, [menu, hideInterface])

    useEffect(() => {
        setDialogData((prev) => {
            return {
                ...prev,
                hidden: hideInterface || (prev.text ? false : true),
            }
        })
        setMenu((prev) => {
            return {
                ...prev,
                hidden: hideInterface || prev.menu.length == 0,
            }
        })
    }, [hideInterface])

    return null
}
