import React from 'react';
import MobileShell from '../mobile/MobileShell';
import DesktopShell from '../desktop/DesktopShell';
import { useMediaQuery } from '../../hooks/useMediaQuery';

const AppLayout = ({ children }) => {
    const isMobile = useMediaQuery('(max-width: 768px)');

    if (isMobile) {
        return <MobileShell>{children}</MobileShell>;
    }

    return <DesktopShell>{children}</DesktopShell>;
};

export default AppLayout;
