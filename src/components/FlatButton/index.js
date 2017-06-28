import React from 'react';
// Material-UI
import FlatButtonMUI from 'material-ui/FlatButton';


class FlatButton extends React.Component {
    static muiName = 'FlatButton';

    render() {
        return (<FlatButtonMUI {...this.props} />);
    }
}

export default FlatButton;
