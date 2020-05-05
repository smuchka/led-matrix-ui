import React, { useEffect, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { TemplateAPI, TemplateItem } from '../../helpers';
import { Keys, useKeypressListener } from '../../hooks/keypress';
import ExistTemplate from './item/ExistTemplate';
import NewTemplate from './item/NewTemplate';
import classes from './ListTemplates.module.css';

type ListTemplatesProps = {};

export const ListTemplates = () => {

    const [navToNewMatrix, setNavToNewMatrix] = useState(false);
    const [templates, setTemplates] = useState<TemplateItem[]>([]);

    useEffect(() => {
        const templates = TemplateAPI.all();
        setTemplates(templates)
    }, [])

    useKeypressListener(Keys.LETTER_N, () => setNavToNewMatrix(true));

    const resetLinkStyle = {
        textDecoration: 'none',
        color: 'inherit'
    }

    if (navToNewMatrix) {
        return <Redirect to="/new" />
    }

    return (
        <div className={classes.grid}>

            <Link to={`/new`} style={resetLinkStyle}>
                <NewTemplate />
            </Link>

            {
                templates &&
                templates.map((tmp: TemplateItem) => (
                    <Link
                        to={`/matrix/${tmp.id}`}
                        key={tmp.id}
                        style={resetLinkStyle}
                    >
                        <ExistTemplate item={tmp} />
                    </Link>
                ))
            }
        </div>
    )
}
