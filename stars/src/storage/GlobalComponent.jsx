import React from 'react';
import {observer} from 'mobx-react'
import GlobalComponentsStore from './GlobalComponentsStore';
import "./styless.css";

function GlobalFooterComponent() {
    return (
        <div className="footer">
            Footer
        </div>
    )
}

const GlobalFooter = {
    key: 'global-footer',
    component: GlobalFooterComponent
}

const globalComponentsStore = new GlobalComponentsStore();

globalComponentsStore.register([GlobalFooter]);

function GlobalComponent({keyComponent, requiredComponent = true, ...props}) {
    const GlobalC = globalComponentsStore.getComponent(keyComponent, requiredComponent);

    if (!GlobalC) {
        return null;
    }

    return <GlobalC {...props}/>
}

export default observer(GlobalComponent);