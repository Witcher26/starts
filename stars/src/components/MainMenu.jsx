import React from 'react';
import './styles.css';
import {
    withStore,
    compose,
    useHasRight
} from "../core";

import { useAppContext } from './DefaultLayout';

import Rights from '../core/rights';

function MainMenu({
    formData,
    authContext
}) {
    const {name} = useAppContext();
    const checkPermission = useHasRight(authContext.rights);
    const {gitHubStars} = formData.formDataStore;

    if (!Array.isArray(gitHubStars.value)) {
        return null
    }

    if (!checkPermission(Rights.ACCESS__ALL)) {
        return null
    }

    return (
        <div className="App">
            <ul>
                {gitHubStars.value?.map(repo => (
                    <li key={repo.id}>
                        {repo.full_name} ({repo.stargazers_count}) {name}
                    </li>
                ))}
            </ul>
        </div>
    );

}

export default compose(
    withStore,
)(MainMenu)