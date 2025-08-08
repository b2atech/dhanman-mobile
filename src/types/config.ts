import { ICompany, IFinYear, IOrganization } from './common';


export type FontFamily = '\'Inter\', sans-serif' | '\'Poppins\', sans-serif' | '\'Roboto\', sans-serif' | '\'Public Sans\', sans-serif';
export type PresetColor = 'default' | 'theme1' | 'theme2' | 'theme3' | 'theme4' | 'theme5' | 'theme6' | 'theme7' | 'theme8';
export type I18n = 'en' | 'fr' | 'ro' | 'zh'; // 'en' - English, 'fr' - French, 'ro' - Romanian, 'zh' - Chinese


export type DefaultConfigProps = {
    /**
     * The props used for the theme font-style.
     * We provide static below options -
     * `'Inter', sans-serif`
     * `'Poppins', sans-serif`
     * `'Roboto', sans-serif`
     * `'Public Sans', sans-serif` (default)
     */
    fontFamily: FontFamily;

    /**
     * The props used for display menu-items with multi-language.
     * We provide static below languages according to 'react-intl' options - https://www.npmjs.com/package/react-intl
     * 'en' (default)
     * 'fr'
     * 'ro'
     * 'zh'
     */
    i18n: I18n;

    /**
     * the props used for show mini variant drawer
     * the mini variant is recommended for apps sections that need quick selection access alongside content.
     * default - false
     */
    miniDrawer: boolean;

    /**
     * the props used for theme container.
     * the container centers your content horizontally. It's the most basic layout element.
     * default - true which show container
     * false - will show fluid
     */
    container: boolean;

    /**
     * the props used for theme primary color variants
     * we provide static below options thoe s are already defaine in src/themes/theme -
     * 'default'
     * 'theme1'
     * 'theme2'
     * 'theme3'
     * 'theme4'
     * 'theme5'
     * 'theme6'
     * 'theme7'
     * 'theme8'
     */
    presetColor: PresetColor;

    finYear: IFinYear;

    company: ICompany;

    organization: IOrganization;
  };
