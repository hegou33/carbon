// knobs locators
const CLASS_NAME = '#className';
export const className = () => cy.get(CLASS_NAME);

// component preview locators
const LINK_CONTENT_PREVIEW = '.carbon-link__content';
export const contentPreview = () => cy.iFrame(LINK_CONTENT_PREVIEW);
