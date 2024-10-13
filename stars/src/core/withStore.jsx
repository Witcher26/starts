import React from "react";
import {default as PropTypes} from 'prop-types';
import {
    $gitHubStarsStore,
} from "../storage";

const buildPropTypes = originalPropTypes => ({
    ...originalPropTypes,

    formData: PropTypes.shape({

        /**
         * Хранилище данных.
         */
        formDataStore: PropTypes.object
    })
});

const _store = {};

const withStore = Component => {
    const originalComponentPropTypes = {
        ...Component.propTypes
    };

    Component.propTypes = buildPropTypes(originalComponentPropTypes);

    $gitHubStarsStore.watch(values => {
        _store.gitHubStars = values;
    });

    return (class C extends React.Component {
        static displayName = `withStore(${Component.displayName || Component.name})`;

        static propTypes = originalComponentPropTypes;
        static defaultProps = Component.defaultProps;

        constructor(props) {
            super(props);
            this.state = {
                store: _store
            };
        }

        render() {
            const filteredProps = {...this.props};

            return (
                (<Component 
                    formData={{formDataStore: this.state.store}}
                    {...filteredProps} 
                />)
            )
        };

    });
};

export default withStore