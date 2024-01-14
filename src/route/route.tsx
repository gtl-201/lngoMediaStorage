import { Route } from "react-router-dom"
import { Home } from "../home"
import { Upload } from "../upload"
import { View } from "../view"
import Deck from "../cardAnimation/cardAnimation.js"




const route = [
    {
        path: '/',
        exact: true,
        name: 'home',
        permission: '',
        title: 'Home',
        component: <Home />,
        isLayout: true,
        showInMenu: false,
    },
    {
        path: '/upload',
        exact: true,
        name: 'home2',
        permission: '',
        title: 'Home 2',
        component: <Upload />,
        isLayout: true,
        showInMenu: false,
    },

    {
        path: '/view/:id',
        exact: true,
        name: 'home2',
        permission: '',
        title: 'View',
        component: <View />,
        isLayout: true,
        showInMenu: false,
    },

    {
        path: '/cardAnimation',
        exact: true,
        name: 'cardAnimation',
        permission: '',
        title: 'CardAnimation',
        component: <Deck />,
        isLayout: true,
        showInMenu: false,
    },
    
]

export const getRouter = () => {
    return route.map(config => (<Route  path={config.path} element={config.component}></Route>))
}

export const appRouters: any = [
    {
        path: '/',
        exact: true,
        name: 'home',
        permission: '',
        title: 'Home',
        component: <Home />,
        isLayout: true,
        showInMenu: false,
    },
  
];

let routersAndChild = appRouters;
appRouters.forEach((route: any) =>
{
    if (route.children?.length > 0)
    {
        routersAndChild = routersAndChild.concat(route.children);
    }
});

export const appRoutersAndChild = routersAndChild;

export const routers = [...appRoutersAndChild];
