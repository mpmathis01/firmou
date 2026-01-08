import React from 'react';
import { TemplateLayout, Header, Info, Table, Summary, Photos, Footer } from './TemplateBase';

const DarkTemplate = (props) => (
    <TemplateLayout {...props}>
        <Info {...props} />
        <Table {...props} />
        <Summary {...props} />
        <Photos {...props} />
    </TemplateLayout>
);

export default DarkTemplate;
