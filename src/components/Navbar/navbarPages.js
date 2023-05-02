import ROUTES from "../../routes/ROUTES";

// access to all
const pages = [
    {
        label: "HOME",
        url: ROUTES.HOME,
    },
    {
        label: "ABOUT",
        url: ROUTES.ABOUT,
    },
];
//not logged in users
const notAuthPages = [
    {
        label: "REGISTER",
        url: ROUTES.REGISTER,
    },
    {
        label: "LOGIN",
        url: ROUTES.LOGIN,
    },
];
//logged in users
const loggedInPages = [
    {
        label: "FAV CARDS",
        url: ROUTES.FAVCARDS,
    },
    {
        label: "LOGOUT",
        url: ROUTES.LOGOUT,
    },
];
//biz pages
const bizPages = [
    {
        label: "MY CARDS",
        url: ROUTES.MYCARDS,
    },
];
//admin pages
const adminPages = [
    { label: "SANDBOX", url: ROUTES.SANDBOX },
    {
        label: "MY CARDS",
        url: ROUTES.MYCARDS,
    },
];

export { pages, adminPages, bizPages, loggedInPages, notAuthPages };