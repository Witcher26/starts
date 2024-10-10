import React from 'react';
import './DefaultLayout.css';
import {
    withStore,
    compose
} from "../core";

function MainMenu({
    formData,
    data
}) {

    return (
        <div className="App">
            <h1>Top GitHub Repos</h1>
            <ul>
                {data.map((repo) => (
                    <li key={repo.id}>
                        {repo.full_name} ({repo.stargazers_count}) stars
                    </li>
                ))}
            </ul>
        </div>
    );

}

export default compose(
    withStore,
)(MainMenu)