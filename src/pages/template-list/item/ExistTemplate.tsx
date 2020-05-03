
import React from 'react'
import { TemplateItem } from '../../../helpers'
import Template from './Template'

export type ExistTemplateProps = {
    item: TemplateItem,
    clickHandler?: () => void,
};

export default function ExistTemplate(props: ExistTemplateProps) {

    const previewUrl = `url(${props.item.preview})`;

    return (
        <Template
            title={props.item.title}
            clickHandler={props.clickHandler}
        >
            <div style={{ backgroundImage: `${previewUrl}` }} />
        </Template>
    )
}
