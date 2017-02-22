import React from 'react';
import TitlePanel from './TitlePanel';

// styles
const styles = {
    sidebar: {
        width: 300
    },
    sidebarLink: {
        display       : 'block',
        padding       : '16px 0px',
        color         : '#757575',
        textDecoration: 'none'
    },
    divider: {
        margin         : '8px 0',
        height         : 1,
        backgroundColor: '#757575'
    },
    content: {
        padding        : '16px',
        height         : '100%',
        backgroundColor: 'white'
    }
};

const SidebarContent = () => {
    const links = [];

    for (let ind = 0; ind < 5; ind++) {
        links.push(
            <a key={ind} href='#' style={styles.sidebarLink}>Mock menu item {ind}</a>);
    }

    return (
        <TitlePanel title='Menu'>
            <div style={styles.content}>
                <a href='/' style={styles.sidebarLink}>Home</a>
                <div style={styles.divider} />
                {links}
            </div>
        </TitlePanel>
    );
};

SidebarContent.propTypes = {
};

export default SidebarContent;
