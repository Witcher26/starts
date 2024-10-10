import React from "react";
import {default as PropTypes} from 'prop-types';
import {
    $preliminaryStore,
    eventsSaveFormDat
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

const withStore = Component => {
    const originalComponentPropTypes = {
        ...Component.propTypes
    };

    Component.propTypes = buildPropTypes(originalComponentPropTypes);

    return (class C extends React.Component {
        static displayName = `withStore(${Component.displayName || Component.name})`;

        static propTypes = originalComponentPropTypes;
        static defaultProps = Component.defaultProps;

        constructor(props) {
            super(props);
            this.state = {
                data: {}
            };
        }

        render() {
            const filteredProps = {...this.props};

            return (
                (<Component 
                    formData={{formDataStore: {store: "store"}}}
                    {...filteredProps} 
                />)
            )
        };

    });
};

export default withStore