/**
 * External dependencies
 */
import classnames from 'classnames';
import './editor.scss';
/**
 * WordPress dependencies
 */
import {
	InnerBlocks,
	BlockControls,
	BlockVerticalAlignmentToolbar,
	InspectorControls,
	useBlockProps,
	useSetting,
	useInnerBlocksProps,
	store as blockEditorStore,
	AlignmentToolbar
} from '@wordpress/block-editor';
import {
	__experimentalUseCustomUnits as useCustomUnits,
	PanelBody,
	__experimentalUnitControl as UnitControl,
	RangeControl,
	ToggleControl
} from '@wordpress/components';
import { useSelect, useDispatch } from '@wordpress/data';
import { sprintf, __ } from '@wordpress/i18n';

function ColumnEdit( {
	attributes: {
		verticalAlignment,
		width,
		templateLock = false,
		allowedBlocks,
		colonneMobile,
		colonneTablet,
		colonneDesktop,
		isDefaultMb,
		isDefaultTb,
		isDefaultDt
	},
	setAttributes,
	clientId,
} ) {

	const colDesktop = isDefaultDt ? '' : '-'+colonneDesktop;

	const classes = classnames( `col-${colonneMobile} col-md-${colonneTablet} col-lg${colDesktop}`, {
		[ `is-vertically-aligned-${ verticalAlignment }` ]: verticalAlignment,
	} );

	const updateColumnsMb = (newVal) => {
		setAttributes({colonneMobile: newVal})
	}
	const updateColumnsTb = (newVal) => {
		setAttributes({colonneTablet: newVal})
	}
	const updateColumnsDt = (newVal) => {
		setAttributes({colonneDesktop: newVal})
	}

	const units = useCustomUnits( {
		availableUnits: useSetting( 'spacing.units' ) || [
			'%',
			'px',
			'em',
			'rem',
			'vw',
		],
	} );

	const { columnsIds, hasChildBlocks, rootClientId } = useSelect(
		( select ) => {
			const { getBlockOrder, getBlockRootClientId } = select(
				blockEditorStore
			);

			const rootId = getBlockRootClientId( clientId );

			return {
				hasChildBlocks: getBlockOrder( clientId ).length > 0,
				rootClientId: rootId,
				columnsIds: getBlockOrder( rootId ),
			};
		},
		[ clientId ]
	);

	const { updateBlockAttributes } = useDispatch( blockEditorStore );

	const updateAlignment = ( value ) => {
		// Update own alignment.
		setAttributes( { verticalAlignment: value } );
		// Reset parent Columns block.
		updateBlockAttributes( rootClientId, {
			verticalAlignment: null,
		} );
	};

	const widthWithUnit = Number.isFinite( width ) ? width + '%' : width;
	const blockProps = useBlockProps( {
		className: classes,
		style: widthWithUnit ? { flexBasis: widthWithUnit } : undefined,
	} );

	const columnsCount = columnsIds.length;
	const currentColumnPosition = columnsIds.indexOf( clientId ) + 1;

	const label = sprintf(
		/* translators: 1: Block label (i.e. "Block: Column"), 2: Position of the selected block, 3: Total number of sibling blocks of the same type */
		__( '%1$s (%2$d of %3$d)' ),
		blockProps[ 'aria-label' ],
		currentColumnPosition,
		columnsCount
	);

	const innerBlocksProps = useInnerBlocksProps(
		{ ...blockProps, 'aria-label': label },
		{
			templateLock,
			allowedBlocks,
			renderAppender: hasChildBlocks
				? undefined
				: InnerBlocks.ButtonBlockAppender,
		}
	);


	return (
		<>
			<BlockControls>
				<BlockVerticalAlignmentToolbar
					onChange={ updateAlignment }
					value={ verticalAlignment }
				/>
			</BlockControls>
			<InspectorControls>
				<PanelBody title={ __( 'Column settings' ) }>
					<div class="wrapper-nr-colonne mb-3">
						<label class="d-block mb-2">Colonne Bootstrap Mobile</label>
						<ToggleControl
							label="Default (col-12)"
							checked={ isDefaultMb }
							onChange={ () =>
								setAttributes( {
									isDefaultMb: ! isDefaultMb,
								} )
							}
						/>
						{ !isDefaultMb && (
							<RangeControl
								value={ colonneMobile }
								onChange={ ( value ) => updateColumnsMb( value ) }
								min={ 1 }
								max={ 12 }
							/>
						)}
					</div>
					<div class="wrapper-nr-colonne mb-3">
						<label class="d-block mb-2">Colonne Bootstrap Tablet</label>
						<ToggleControl
							label="Default (col-md-12)"
							checked={ isDefaultTb }
							onChange={ () =>
								setAttributes( {
									isDefaultTb: ! isDefaultTb,
								} )
							}
						/>
						{ !isDefaultTb && (
							<RangeControl
								label={ __( 'Colonne Bootstrap Tablet' ) }
								value={ colonneTablet }
								onChange={ ( value ) => updateColumnsTb( value ) }
								min={ 1 }
								max={ 12 }
							/>
						)}
					</div>
					<div class="wrapper-nr-colonne mb-3">
						<label class="d-block mb-2">Colonne Bootstrap Desktop</label>
						<ToggleControl
							label="Default (col-lg-auto)"
							checked={ isDefaultDt }
							onChange={ () =>
								setAttributes( {
									isDefaultDt: ! isDefaultDt,
								} )
							}
						/>
						{ !isDefaultDt && (
							<RangeControl
								label={ __( 'Colonne Bootstrap Desktop' ) }
								value={ colonneDesktop }
								onChange={ ( value ) => updateColumnsDt( value ) }
								min={ 1 }
								max={ 12 }
							/>
						)}
					</div>
				</PanelBody>
			</InspectorControls>
			<div { ...innerBlocksProps } />
		</>
	);
}

export default ColumnEdit;
