import React from 'react';
import { TemplateLayout, Header, Info, Table, Summary, Photos, Footer } from './TemplateBase';

const ElegantTemplate = (props) => (
    <TemplateLayout {...props}>
        <div className="flex flex-col items-center mb-16 text-center">
            <h1 className="text-6xl font-black italic serif tracking-tight mb-4" style={{ color: props.formData.primaryColor, fontFamily: 'Playfair Display' }}>
                {props.formData.docType}
            </h1>
            <div className="flex items-center gap-4 text-slate-400 font-mono text-[10px] tracking-[0.3em] uppercase">
                <span>Nº {props.formData.docNum}</span>
                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: props.formData.primaryColor }} />
                <span>Emitido em {new Date(props.formData.date).toLocaleDateString('pt-BR')}</span>
            </div>
        </div>
        <Info {...props} />
        <Table {...props} />
        <Summary {...props} />
        <Photos {...props} />
    </TemplateLayout>
);

export default ElegantTemplate;
