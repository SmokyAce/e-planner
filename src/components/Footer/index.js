import React from 'react';
import LocaleToggle from '../../containers/LocaleToogle';
// styles
import './Footer.scss';


const Footer = () => (
    <footer>
        <p>Copyright &copy; 2017 - Built By Andranik Simonyan
            <a href='mailto:andranik.s.s@gmail.com'>andranik.s.s@gmail.com</a>
        </p>
        <LocaleToggle />
    </footer>
);

export default Footer;
