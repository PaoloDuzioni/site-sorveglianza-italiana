/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * WordPress dependencies
 */
import { useInnerBlocksProps, useBlockProps } from '@wordpress/block-editor';

export default function save( { attributes } ) {

	const { verticalAlignment, colonneMobile, colonneTablet, colonneDesktop, isDefaultMb, isDefaultTb, isDefaultDt } = attributes;

	const colMobile = isDefaultMb ? 12 : colonneMobile;
	const colTablet = isDefaultTb ? 12 : colonneTablet;
	const colDesktop = isDefaultDt ? '' : '-'+colonneDesktop;

	const wrapperClasses = classnames( `col-${colMobile} col-md-${colTablet} col-lg${colDesktop}`, {
		[ `is-vertically-aligned-${ verticalAlignment }` ]: verticalAlignment,
		
	} );
	
	const blockProps = useBlockProps.save( {
		className: wrapperClasses,
	} );
	const innerBlocksProps = useInnerBlocksProps.save( blockProps );

	return <div { ...innerBlocksProps } />;

}
