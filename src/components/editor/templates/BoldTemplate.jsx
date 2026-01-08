import React from 'react';
import { TemplateLayout, Header, Info, Table, Summary, Photos, Footer } from './TemplateBase';

const BoldTemplate = (props) => (
    <TemplateLayout {...props}>
        <div className="flex justify-between items-start mb-20">
            <div className="flex-1">
                <h1 className="text-[120px] font-black leading-[0.8] tracking-tighter uppercase" style={{ color: props.formData.primaryColor, fontFamily: 'Outfit' }}>
                    {props.formData.docType.split('')[0]}<span className="opacity-20">{props.formData.docType.slice(1)}</span>
                </h1>
                <p className="text-2xl font-black mt-4 font-outfit uppercase tracking-tighter">Document Identification: {props.formData.docNum}</p>
            </div>
            <div className="w-1/3 text-right">
                {/* Header removed from here - now in TemplateLayout */}
            </div>
        </div>
        <div className="grid grid-cols-12 gap-10">
            <div className="col-span-12">
                <Info {...props} />
                <Table {...props} />
                <Summary {...props} />
            </div>
        </div>
        <Photos {...props} />
    </TemplateLayout>
);

export default BoldTemplate;
