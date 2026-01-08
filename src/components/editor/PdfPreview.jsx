import React from 'react';

// Templates
import CleanTemplate from './templates/CleanTemplate';
import IndustrialTemplate from './templates/IndustrialTemplate';
import ElegantTemplate from './templates/ElegantTemplate';
import TechTemplate from './templates/TechTemplate';
import ModernTemplate from './templates/ModernTemplate';
import CorporateTemplate from './templates/CorporateTemplate';
import BoldTemplate from './templates/BoldTemplate';
import PastelTemplate from './templates/PastelTemplate';
import DarkTemplate from './templates/DarkTemplate';
import HandwrittenTemplate from './templates/HandwrittenTemplate';

const TEMPLATE_MAP = {
    clean: CleanTemplate,
    industrial: IndustrialTemplate,
    elegant: ElegantTemplate,
    tech: TechTemplate,
    modern: ModernTemplate,
    corporate: CorporateTemplate,
    bold: BoldTemplate,
    pastel: PastelTemplate,
    dark: DarkTemplate,
    handwritten: HandwrittenTemplate,
};

const PdfPreview = (props) => {
    const { formData } = props;
    const SelectedTemplate = TEMPLATE_MAP[formData.templateId] || CleanTemplate;

    return <SelectedTemplate {...props} />;
};

export default PdfPreview;
