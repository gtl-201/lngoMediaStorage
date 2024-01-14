
import {
    Route,
} from 'react-router-dom';


const ProtectedRoute = (
    {
        component: Component,
        permission,
        render,
        ...rest
    }: {
        component?: any,
        permission?: any,
        render?: any,
        rest?: any
    },
): JSX.Element => {

    return (
        <Route
            {...rest}
            element
        // element={props =>

        >
            {
                Component ? <Component {...rest} /> : render()
            }
        </Route>
    );
};

export default ProtectedRoute;
