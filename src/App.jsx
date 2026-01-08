import React, { useState } from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { FirmouEditor } from './components/editor/FirmouEditor';
import CookieConsent from './components/common/CookieConsent';
import PrivacyPolicyModal from './components/legal/PrivacyPolicyModal';
import BlogList from './components/blog/BlogList';
import BlogPost from './components/blog/BlogPost';
import OffCanvasMenu from './components/navigation/OffCanvasMenu';

function App() {
    const [showPrivacyPolicy, setShowPrivacyPolicy] = useState(false);
    const [showMenu, setShowMenu] = useState(false);

    const toggleMenu = () => setShowMenu(!showMenu);

    return (
        <HashRouter>
            <div className="antialiased">
                <Routes>
                    <Route
                        path="/"
                        element={
                            <FirmouEditor
                                onOpenPrivacy={() => setShowPrivacyPolicy(true)}
                                onToggleMenu={toggleMenu}
                            />
                        }
                    />
                    <Route path="/blog" element={<BlogList />} />
                    <Route path="/blog/:slug" element={<BlogPost />} />
                </Routes>

                {/* Global Navigation Menu */}
                <OffCanvasMenu
                    isOpen={showMenu}
                    onClose={() => setShowMenu(false)}
                    onOpenPrivacy={() => setShowPrivacyPolicy(true)}
                />

                {/* Global Overlays */}
                <CookieConsent onOpenPrivacy={() => setShowPrivacyPolicy(true)} />

                <PrivacyPolicyModal
                    isOpen={showPrivacyPolicy}
                    onClose={() => setShowPrivacyPolicy(false)}
                />
            </div>
        </HashRouter>
    );
}

export default App;
