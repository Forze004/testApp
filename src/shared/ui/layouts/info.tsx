import React from 'react'
import { LightText, SemiboldText } from '../../../shared/ui/texts'
import {Spacing} from '../../../shared/ui/layouts'
import { TextStyle } from 'react-native'

type Props = {
    title: string
    description?: string
    titleTextTransform?: TextStyle['textTransform']
}

export const Info = ({title, description, titleTextTransform}: Props) => {
    return (
        <>
            <SemiboldText textTransform={titleTextTransform} lineHeight={24} size={24} color="#252526">
                {title}
            </SemiboldText> 
            {
                description && 
                    <>
                        <Spacing direction="vertical" value={12} />
                        <LightText lineHeight={22} color='#454545'>
                            {description}
                        </LightText>
                    </>
            }
        </>
    )
}
