import React, { Component } from 'react';
import { TemplateItem, TemplateAPI } from '../../helpers';
import classes from './ListTemplates.module.css';
import ExistTemplate from './item/ExistTemplate';
import NewTemplate from './item/NewTemplate';
import { Link } from 'react-router-dom'

type ListTemplatesProps = {};

type ListTemplatesState = {
    templates: TemplateItem[],
};

export default class ListTemplates extends Component<ListTemplatesProps, ListTemplatesState> {

    state = {
        templates: []
    }

    componentDidMount() {
        const templates = TemplateAPI.all();
        this.setState({ templates })
    }

    render() {
        const resetLinkStyle = {
            textDecoration: 'none',
            color: 'inherit'
        }
        return (
            <div className={classes.grid}>
                <Link to={`/template/new`} style={resetLinkStyle}                >
                    <NewTemplate />
                </Link>
                {
                    this.state.templates &&
                    this.state.templates.map((tmp: TemplateItem) => (
                        <Link
                            to={`/template/${tmp.id}`}
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
}
