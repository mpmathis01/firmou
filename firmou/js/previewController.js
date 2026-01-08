/**
 * Premium Preview Controller
 * Manages all preview interactions, zoom, navigation, and page management
 */

import { state } from './state.js';

class PreviewController {
    constructor() {
        this.currentPage = 1;
        this.totalPages = 1;
        this.zoomLevel = 0.8;
        this.fitMode = 'width'; // 'width', 'height', 'page'
        this.isMinimapVisible = false;
        this.isNavControlsVisible = false;
        this.zoomIndicatorTimeout = null;

        this.init();
    }

    init() {
        console.log('🎮 PreviewController initialized');
        this.setupEventListeners();
        this.updatePageCount();
        this.setupKeyboardShortcuts();
    }

    setupEventListeners() {
        // Zoom controls
        const zoomInBtn = document.querySelector('[data-action="zoom-in"]');
        const zoomOutBtn = document.querySelector('[data-action="zoom-out"]');
        const resetBtn = document.querySelector('[data-action="reset-view"]');

        if (zoomInBtn) zoomInBtn.addEventListener('click', () => this.zoomIn());
        if (zoomOutBtn) zoomOutBtn.addEventListener('click', () => this.zoomOut());
        if (resetBtn) resetBtn.addEventListener('click', () => this.resetView());

        // Fit mode controls
        document.querySelectorAll('[data-fit-mode]').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.setFitMode(e.target.dataset.fitMode);
            });
        });

        // Page navigation
        const prevPageBtn = document.querySelector('[data-action="prev-page"]');
        const nextPageBtn = document.querySelector('[data-action="next-page"]');

        if (prevPageBtn) prevPageBtn.addEventListener('click', () => this.previousPage());
        if (nextPageBtn) nextPageBtn.addEventListener('click', () => this.nextPage());

        // Minimap toggle
        const minimapToggle = document.querySelector('[data-action="toggle-minimap"]');
        if (minimapToggle) minimapToggle.addEventListener('click', () => this.toggleMinimap());

        // Scroll detection for page tracking
        const wrapper = document.getElementById('pdf-root-wrapper');
        if (wrapper) {
            wrapper.addEventListener('scroll', () => this.updateCurrentPage());
        }
    }

    setupKeyboardShortcuts() {
        document.addEventListener('keydown', (e) => {
            // Prevent shortcuts when typing in inputs
            if (e.target.matches('input, textarea, select')) return;

            switch (e.key) {
                case '+':
                case '=':
                    e.preventDefault();
                    this.zoomIn();
                    break;
                case '-':
                    e.preventDefault();
                    this.zoomOut();
                    break;
                case '0':
                    e.preventDefault();
                    this.resetView();
                    break;
                case 'ArrowDown':
                case 'PageDown':
                    if (e.ctrlKey) {
                        e.preventDefault();
                        this.nextPage();
                    }
                    break;
                case 'ArrowUp':
                case 'PageUp':
                    if (e.ctrlKey) {
                        e.preventDefault();
                        this.previousPage();
                    }
                    break;
                case 'Home':
                    if (e.ctrlKey) {
                        e.preventDefault();
                        this.goToPage(1);
                    }
                    break;
                case 'End':
                    if (e.ctrlKey) {
                        e.preventDefault();
                        this.goToPage(this.totalPages);
                    }
                    break;
                case 'm':
                case 'M':
                    if (e.ctrlKey) {
                        e.preventDefault();
                        this.toggleMinimap();
                    }
                    break;
            }
        });
    }

    zoomIn() {
        this.setZoom(this.zoomLevel + 0.1);
    }

    zoomOut() {
        this.setZoom(this.zoomLevel - 0.1);
    }

    setZoom(level) {
        // Clamp zoom between 0.3 and 3.0
        this.zoomLevel = Math.max(0.3, Math.min(3.0, level));

        if (state && state.cfg) {
            state.cfg.zoom = this.zoomLevel;
        }

        // Update UI
        const zoomVal = document.getElementById('zoom-val');
        if (zoomVal) {
            zoomVal.textContent = Math.round(this.zoomLevel * 100) + '%';
        }

        // Apply zoom
        if (window.autoScale) {
            window.autoScale();
        }

        // Show zoom indicator
        this.showZoomIndicator();
    }

    showZoomIndicator() {
        let indicator = document.getElementById('zoom-indicator');

        if (!indicator) {
            indicator = document.createElement('div');
            indicator.id = 'zoom-indicator';
            indicator.className = 'zoom-indicator';
            document.body.appendChild(indicator);
        }

        indicator.textContent = Math.round(this.zoomLevel * 100) + '%';
        indicator.classList.add('show');

        clearTimeout(this.zoomIndicatorTimeout);
        this.zoomIndicatorTimeout = setTimeout(() => {
            indicator.classList.remove('show');
        }, 800);
    }

    resetView() {
        this.setZoom(0.8);
        this.goToPage(1);
    }

    setFitMode(mode) {
        this.fitMode = mode;

        // Update active button
        document.querySelectorAll('[data-fit-mode]').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.fitMode === mode);
        });

        // Apply fit mode
        const wrapper = document.getElementById('pdf-root-wrapper');
        const root = document.getElementById('pdf-root');
        const previewSide = document.getElementById('preview-side');

        if (!wrapper || !root || !previewSide) return;

        const a4WidthMm = 210;
        const a4HeightMm = 297;
        const mmToPx = 3.78;
        const a4WidthPx = a4WidthMm * mmToPx;
        const a4HeightPx = a4HeightMm * mmToPx;

        const containerWidth = previewSide.clientWidth;
        const containerHeight = window.innerHeight * 0.85;

        let newZoom = 1;

        switch (mode) {
            case 'width':
                newZoom = (containerWidth - 80) / a4WidthPx;
                break;
            case 'height':
                newZoom = (containerHeight - 120) / a4HeightPx;
                break;
            case 'page':
                const scaleX = (containerWidth - 80) / a4WidthPx;
                const scaleY = (containerHeight - 120) / a4HeightPx;
                newZoom = Math.min(scaleX, scaleY);
                break;
        }

        this.setZoom(newZoom);
    }

    updatePageCount() {
        const root = document.getElementById('pdf-root');
        if (!root) return;

        this.totalPages = root.querySelectorAll('.a4-container').length;

        const pageCountEl = document.getElementById('page-count');
        if (pageCountEl) {
            pageCountEl.textContent = `${this.totalPages} ${this.totalPages > 1 ? 'PÁGINAS' : 'PÁGINA'}`;
        }

        // Update navigation controls visibility
        const navControls = document.querySelector('.preview-nav-controls');
        if (navControls) {
            if (this.totalPages > 1) {
                navControls.classList.add('show');
            } else {
                navControls.classList.remove('show');
            }
        }

        // Update minimap
        this.updateMinimap();

        // Add page numbers to each page
        this.addPageNumbers();
    }

    addPageNumbers() {
        const pages = document.querySelectorAll('.a4-container');
        pages.forEach((page, index) => {
            // Remove existing page number if any
            const existing = page.querySelector('.page-number-overlay');
            if (existing) existing.remove();

            // Add new page number
            const pageNum = document.createElement('div');
            pageNum.className = 'page-number-overlay no-print';
            pageNum.textContent = `Página ${index + 1} de ${this.totalPages}`;
            page.appendChild(pageNum);
        });
    }

    updateCurrentPage() {
        const wrapper = document.getElementById('pdf-root-wrapper');
        const pages = document.querySelectorAll('.a4-container');

        if (!wrapper || pages.length === 0) return;

        const scrollTop = wrapper.scrollTop;
        const wrapperHeight = wrapper.clientHeight;
        const viewportCenter = scrollTop + (wrapperHeight / 2);

        let currentPage = 1;
        pages.forEach((page, index) => {
            const pageTop = page.offsetTop;
            const pageBottom = pageTop + page.offsetHeight;

            if (viewportCenter >= pageTop && viewportCenter <= pageBottom) {
                currentPage = index + 1;
            }
        });

        if (this.currentPage !== currentPage) {
            this.currentPage = currentPage;
            this.updatePageIndicator();
            this.updateMinimapActive();
        }
    }

    updatePageIndicator() {
        const indicator = document.querySelector('.page-indicator');
        if (indicator) {
            indicator.textContent = `${this.currentPage} / ${this.totalPages}`;
        }
    }

    goToPage(pageNumber) {
        if (pageNumber < 1 || pageNumber > this.totalPages) return;

        const pages = document.querySelectorAll('.a4-container');
        const targetPage = pages[pageNumber - 1];

        if (!targetPage) return;

        const wrapper = document.getElementById('pdf-root-wrapper');
        if (!wrapper) return;

        const pageTop = targetPage.offsetTop;
        const wrapperHeight = wrapper.clientHeight;
        const pageHeight = targetPage.offsetHeight;

        // Center the page in viewport
        const scrollTo = pageTop - (wrapperHeight / 2) + (pageHeight / 2);

        wrapper.scrollTo({
            top: scrollTo,
            behavior: 'smooth'
        });

        this.currentPage = pageNumber;
        this.updatePageIndicator();
        this.updateMinimapActive();
    }

    nextPage() {
        if (this.currentPage < this.totalPages) {
            this.goToPage(this.currentPage + 1);
        }
    }

    previousPage() {
        if (this.currentPage > 1) {
            this.goToPage(this.currentPage - 1);
        }
    }

    toggleMinimap() {
        this.isMinimapVisible = !this.isMinimapVisible;

        const minimap = document.querySelector('.preview-minimap');
        if (minimap) {
            minimap.classList.toggle('show', this.isMinimapVisible);
        }

        const toggleBtn = document.querySelector('[data-action="toggle-minimap"]');
        if (toggleBtn) {
            toggleBtn.classList.toggle('active', this.isMinimapVisible);
        }
    }

    updateMinimap() {
        const minimap = document.querySelector('.preview-minimap');
        if (!minimap) return;

        const pages = document.querySelectorAll('.a4-container');
        minimap.innerHTML = '';

        pages.forEach((page, index) => {
            const minimapPage = document.createElement('div');
            minimapPage.className = 'minimap-page';
            minimapPage.dataset.page = index + 1;

            const pageNumber = document.createElement('div');
            pageNumber.className = 'minimap-page-number';
            pageNumber.textContent = index + 1;
            minimapPage.appendChild(pageNumber);

            minimapPage.addEventListener('click', () => {
                this.goToPage(index + 1);
            });

            minimap.appendChild(minimapPage);
        });

        this.updateMinimapActive();
    }

    updateMinimapActive() {
        const minimapPages = document.querySelectorAll('.minimap-page');
        minimapPages.forEach((page, index) => {
            page.classList.toggle('active', index + 1 === this.currentPage);
        });
    }

    // Public method to be called when preview content changes
    refresh() {
        this.updatePageCount();
        this.updateCurrentPage();
    }
}

// Create singleton instance
let previewController = null;

export function initPreviewController() {
    if (!previewController) {
        previewController = new PreviewController();
    }
    return previewController;
}

export function getPreviewController() {
    return previewController;
}

export function refreshPreview() {
    if (previewController) {
        previewController.refresh();
    }
}
