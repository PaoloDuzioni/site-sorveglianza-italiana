import { registerBlockType } from '@wordpress/blocks';
import './style.scss';
import * as columns from './ev-columns';
import * as column from './ev-column';

var { metadata, settings, name } = columns;
registerBlockType( { name, ...metadata }, settings );

var { metadata, settings, name } = column;
registerBlockType( { name, ...metadata }, settings );