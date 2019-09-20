/**
 * Enable fontawesome icons in the application
 * @author Achalaesh Lanka
 */
import Vue from 'vue';
import {FontAwesomeIcon} from '@fortawesome/vue-fontawesome';
import {library} from '@fortawesome/fontawesome-svg-core';
import {fas} from '@fortawesome/free-solid-svg-icons';
import {fab} from '@fortawesome/free-brands-svg-icons';

// Adding all icons for now, need to deal with treeshaking later.
library.add(fas, fab);

Vue.component('fa', FontAwesomeIcon);
