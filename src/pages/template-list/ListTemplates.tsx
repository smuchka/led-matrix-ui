import React, { useState, useEffect } from 'react';
import { TemplateItem, TemplateAPI } from '../../helpers';
import classes from './ListTemplates.module.css';
import ExistTemplate from './item/ExistTemplate';
import NewTemplate from './item/NewTemplate';
import { Link } from 'react-router-dom'

type ListTemplatesProps = {};

export const ListTemplates = () => {

    const [templates, setTemplates] = useState<TemplateItem[]>([]);

    useEffect(() => {
        const templates = TemplateAPI.all();
        setTemplates(templates)
    }, [])


    const resetLinkStyle = {
        textDecoration: 'none',
        color: 'inherit'
    }

    return (
        <div className={classes.grid}>
            <Link to={`/new`} style={resetLinkStyle}                >
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
