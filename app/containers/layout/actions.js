const OPEN_DESKTOP_MENU = 'app/containers/layout/actions/OPEN_DESKTOP_MENU';
const CLOSE_DESKTOP_MENU = 'app/containers/layout/actions/CLOSE_DESKTOP_MENU';
const OPEN_MOBILE_MENU = 'app/containers/layout/actions/OPEN_MOBILE_MENU';
const CLOSE_MOBILE_MENU = 'app/containers/layout/actions/CLOSE_MOBILE_MENU';

export {
    OPEN_DESKTOP_MENU,
    CLOSE_DESKTOP_MENU,
    OPEN_MOBILE_MENU,
    CLOSE_MOBILE_MENU
}

export const openDesktopMenu = (anchorEl) => ({
    type: OPEN_DESKTOP_MENU,
    anchorEl: anchorEl
});
export const closeDesktopMenu = (anchorEl) => ({
    type: CLOSE_DESKTOP_MENU,
    anchorEl: anchorEl
});
export const openMobileMenu = (open) => ({
    type: OPEN_MOBILE_MENU,
    open: open
});
export const closeMobileMenu = (open) => ({
    type: CLOSE_MOBILE_MENU,
    open: open
});