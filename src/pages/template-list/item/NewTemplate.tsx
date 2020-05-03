import React from 'react'
import Template from './Template'
import { ReactComponent as PlusIcon } from './Plus.svg';

type NewTemplateProps = {
    title?: string,
    clickHandler?: () => void,
};

export default function NewTemplate(props: NewTemplateProps) {

    const defaultTitle = 'New';

    return (
        <Template
            title={props.title || defaultTitle}
            clickHandler={props.clickHandler}
        >
            <PlusIcon width={'40%'} style={{
                color: 'var(--main-bg-color)'

            }} />
        </Template>
    )
}
