/**
 * External dependencies
 */
import classnames from 'classnames';
import { dropRight, get, times } from 'lodash';
import "./editor.scss";
import "../../node_modules/bootstrap/scss/bootstrap.scss";

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import {
	Notice,
	PanelBody,
	RangeControl,
	ToggleControl,
    __experimentalToggleGroupControl as ToggleGroupControl,
    __experimentalToggleGroupControlOption as ToggleGroupControlOption,
	ToolbarButton,
	SelectControl
} from '@wordpress/components';


import {
	InspectorControls,
	useInnerBlocksProps,
	BlockControls,
	BlockVerticalAlignmentToolbar,
	BlockAlignmentToolbar,
	__experimentalBlockVariationPicker,
	useBlockProps,
	store as blockEditorStore,
	MediaPlaceholder
} from '@wordpress/block-editor';
import { withDispatch, useDispatch, useSelect } from '@wordpress/data';
import {
	createBlock,
	createBlocksFromInnerBlocksTemplate,
	store as blocksStore,
} from '@wordpress/blocks';

/**
 * Internal dependencies
 */
import {
	hasExplicitPercentColumnWidths,
	getMappedColumnWidths,
	getRedistributedColumnWidths,
	toWidthPrecision,
} from './utils';

/**
 * Allowed blocks constant is passed to InnerBlocks precisely as specified here.
 * The contents of the array should never change.
 * The array should contain the name of each block that is allowed.
 * In columns block, the only block we allow is 'core/column'.
 *
 * @constant
 * @type {string[]}
 */
const ALLOWED_BLOCKS = [ 'publifarm/column', 'publifarm/columns' ];

function ColumnsEditContainer( {
	attributes,
	setAttributes,
	updateAlignment,
	updateColumns,
	updateOrizAlignment,
	clientId,
} ) {
	const { isBoxed, isInvertedMobile, verticalAlignment, allineamentoOrizzontale, pymb, pydt, alt, url, width, urlVideo, altezzaVh, isVideoAutoplay, isVideoLoop, isVideoCover } = attributes;


	const { count } = useSelect(
		( select ) => {
			return {
				count: select( blockEditorStore ).getBlockCount( clientId ),
			};
		},
		[ clientId ]
	);
	

	const classes = classnames( 'row', {
		[ `are-vertically-aligned-${ verticalAlignment }` ]: verticalAlignment,
		[ `justify-content-${ allineamentoOrizzontale }` ]: allineamentoOrizzontale,
		[ `is-boxed` ]: isBoxed,
		[ `heightvh-${ altezzaVh }` ]: altezzaVh
	} );

	const blockProps = useBlockProps( {
		className: classes
	} );
	const innerBlocksProps = useInnerBlocksProps( blockProps, {
		allowedBlocks: ALLOWED_BLOCKS,
		orientation: 'horizontal',
		renderAppender: false,
	} );

	const onSelectImage = (image) => {
		if(!image || !image.url) {
			setAttributes({url: undefined, alt: '', width:null});
			return;
		}
		setAttributes({url: image.url, alt: image.alt, width: image.width})
	}
	const onSelectURL = ( newURL ) => {
		setAttributes( {
			url: newURL,
			alt: '',
		} );
	};
	const onSelectVideo = (video) => {
		if(!video || !video.url) {
			setAttributes({urlVideo: undefined});
			return;
		}
		setAttributes({urlVideo: video.url})
	}
	const onSelectURLVideo = ( newURL ) => {
		setAttributes( {
			urlVideo: newURL
		} );
	};

	const removeImage = () => {
		setAttributes( {
			url: undefined,
			alt: '',
			width: null
		} );
	};
	const removeVideo = () => {
		setAttributes( {
			urlVideo: undefined
		} );
	};

	if(isBoxed) var containerClass = 'container'; else var containerClass = 'container-fluid'; 

	const poster = url ? url : false

	if(pymb=='default') containerClass += ' py-2'; else containerClass += ' py-'+pymb;
	if(pydt=='default') containerClass += ' py-lg-4'; else containerClass += ' py-lg-'+pydt;

	return (
		<>
			<BlockControls>
				<BlockVerticalAlignmentToolbar
					onChange={ updateAlignment }
					value={ verticalAlignment }
				/>
				<BlockAlignmentToolbar
					onChange={ updateOrizAlignment }
					value={ allineamentoOrizzontale }
				/>
			</BlockControls>
			<InspectorControls>
				<PanelBody title="Layout" icon="layout" initialOpen={ false }>
					<SelectControl
						label="Altezza in vh"
						value={altezzaVh}
						onChange={ (val) =>
							setAttributes( {
								altezzaVh: val,
							} )
						}
						labelPosition='side'					
					>
						<optgroup label="Theropods">
							<option value="auto">Auto</option>
							<option value="15">15%</option>
							<option value="30">30%</option>
							<option value="50">50%</option>
							<option value="65">65%</option>
							<option value="85">85%</option>
							<option value="100">100%</option>
						</optgroup>
					</SelectControl>
					<RangeControl
						label={ __( 'Columns' ) }
						value={ count }
						onChange={ ( value ) => updateColumns( count, value ) }
						min={ 1 }
						max={ Math.max( 6, count ) }
					/>
					{ count > 6 && (
						<Notice status="warning" isDismissible={ false }>
							{ __(
								'This column count exceeds the recommended amount and may cause visual breakage.'
							) }
						</Notice>
					) }
					<ToggleControl
						label={ __( 'Boxed' ) }
						checked={ isBoxed }
						onChange={ () =>
							setAttributes( {
								isBoxed: ! isBoxed,
							} )
						}
					/>
					<ToggleControl
						label='Inverti ordine colonne su mobile'
						checked={ isInvertedMobile }
						onChange={ () =>
							setAttributes( {
								isInvertedMobile: ! isInvertedMobile,
							} )
						}
					/>
					<ToggleGroupControl 
						label="Padding verticale mobile" 
						value={ pymb }
						isBlock
						onChange={ (newval) =>
							setAttributes( {
								pymb: newval,
							} )
						}
						>
						<ToggleGroupControlOption value="default" label="Default" />
						<ToggleGroupControlOption value="0" label="0" />
						<ToggleGroupControlOption value="1" label="1" />
						<ToggleGroupControlOption value="2" label="2" />
						<ToggleGroupControlOption value="3" label="3" />
						<ToggleGroupControlOption value="4" label="4" />
						<ToggleGroupControlOption value="5" label="5" />
					</ToggleGroupControl>
					<ToggleGroupControl 
						label="Padding verticale desktop" 
						value={ pydt }
						isBlock
						onChange={ (newval) =>
							setAttributes( {
								pydt: newval,
							} )
						}
						>
						<ToggleGroupControlOption value="default" label="Default" />
						<ToggleGroupControlOption value="0" label="0" />
						<ToggleGroupControlOption value="1" label="1" />
						<ToggleGroupControlOption value="2" label="2" />
						<ToggleGroupControlOption value="3" label="3" />
						<ToggleGroupControlOption value="4" label="4" />
						<ToggleGroupControlOption value="5" label="5" />
					</ToggleGroupControl>
				</PanelBody>
				<PanelBody title="Immagine sfondo" icon="cover-image" initialOpen={ false }>
					{url && 
					<ToolbarButton onClick={ removeImage }>
						Rimuovi Immagine
					</ToolbarButton>	
					}
					<MediaPlaceholder
						icon="image"
						onSelect={ onSelectImage }
						onSelectURL={ onSelectURL }
						accept="image/*"
						allowedTypes={['image']}
					/>
				</PanelBody>
				<PanelBody title="Video sfondo" icon="cover-image" initialOpen={ false }>
					{urlVideo && 
					<ToolbarButton onClick={ removeVideo }>
						Rimuovi video
					</ToolbarButton>	
					}
					<MediaPlaceholder
						icon="image"
						onSelect={ onSelectVideo }
						onSelectURL={ onSelectURLVideo }
						accept="video/*"
						allowedTypes={['video']}
					/>
					<ToggleControl
						label={ __( 'Video in autoplay' ) }
						checked={ isVideoAutoplay }
						onChange={ () =>
							setAttributes( {
								isVideoAutoplay: ! isVideoAutoplay,
							} )
						}
					/>
					<ToggleControl
						label={ __( 'Video in loop' ) }
						checked={ isVideoLoop }
						onChange={ () =>
							setAttributes( {
								isVideoLoop: ! isVideoLoop,
							} )
						}
					/>
					<ToggleControl
						label={ __( 'Usa Immagine di sfondo come copertina' ) }
						checked={ isVideoCover }
						onChange={ () =>
							setAttributes( {
								isVideoCover: ! isVideoCover,
							} )
						}
					/>					
				</PanelBody>
			</InspectorControls>


			
			<section {...blockProps}>
				{(!urlVideo && url) && <img src={ url } alt={ alt } className="img_background" />}
				{urlVideo && <video 
					src={ urlVideo } 
					className="video_background" 
					playsinline="playsinline" 
					muted 
					autoplay={isVideoAutoplay}
					loop={isVideoLoop}
					poster={poster}
				/> }
				<div className={containerClass}>
					<div { ...innerBlocksProps } />
				</div>
			</section>
		</>
	);
}

const ColumnsEditContainerWrapper = withDispatch(
	( dispatch, ownProps, registry ) => ( {
		/**
		 * Update all child Column blocks with a new vertical alignment setting
		 * based on whatever alignment is passed in. This allows change to parent
		 * to overide anything set on a individual column basis.
		 *
		 * @param {string} verticalAlignment the vertical alignment setting
		 */
		updateAlignment( verticalAlignment ) {
			const { clientId, setAttributes } = ownProps;
			const { updateBlockAttributes } = dispatch( blockEditorStore );
			const { getBlockOrder } = registry.select( blockEditorStore );

			// Update own alignment.
			setAttributes( { verticalAlignment } );

			// Update all child Column Blocks to match.
			const innerBlockClientIds = getBlockOrder( clientId );
			innerBlockClientIds.forEach( ( innerBlockClientId ) => {
				updateBlockAttributes( innerBlockClientId, {
					verticalAlignment,
				} );
			} );
		},

		updateOrizAlignment( allineamentoOrizzontale ) {
			const { setAttributes } = ownProps;
			setAttributes( { allineamentoOrizzontale } );
		},

		/**
		 * Updates the column count, including necessary revisions to child Column
		 * blocks to grant required or redistribute available space.
		 *
		 * @param {number} previousColumns Previous column count.
		 * @param {number} newColumns      New column count.
		 */
		updateColumns( previousColumns, newColumns ) {
			const { clientId } = ownProps;
			const { replaceInnerBlocks } = dispatch( blockEditorStore );
			const { getBlocks } = registry.select( blockEditorStore );

			let innerBlocks = getBlocks( clientId );
			const hasExplicitWidths = hasExplicitPercentColumnWidths(
				innerBlocks
			);

			// Redistribute available width for existing inner blocks.
			const isAddingColumn = newColumns > previousColumns;

			if ( isAddingColumn && hasExplicitWidths ) {
				// If adding a new column, assign width to the new column equal to
				// as if it were `1 / columns` of the total available space.
				const newColumnWidth = toWidthPrecision( 100 / newColumns );

				// Redistribute in consideration of pending block insertion as
				// constraining the available working width.
				const widths = getRedistributedColumnWidths(
					innerBlocks,
					100 - newColumnWidth
				);

				innerBlocks = [
					...getMappedColumnWidths( innerBlocks, widths ),
					...times( newColumns - previousColumns, () => {
						return createBlock( 'publifarm/column', {
							width: `${ newColumnWidth }%`,
						} );
					} ),
				];
			} else if ( isAddingColumn ) {
				innerBlocks = [
					...innerBlocks,
					...times( newColumns - previousColumns, () => {
						return createBlock( 'publifarm/column' );
					} ),
				];
			} else {
				// The removed column will be the last of the inner blocks.
				innerBlocks = dropRight(
					innerBlocks,
					previousColumns - newColumns
				);

				if ( hasExplicitWidths ) {
					// Redistribute as if block is already removed.
					const widths = getRedistributedColumnWidths(
						innerBlocks,
						100
					);

					innerBlocks = getMappedColumnWidths( innerBlocks, widths );
				}
			}

			replaceInnerBlocks( clientId, innerBlocks );
		},
	} )
)( ColumnsEditContainer );

function Placeholder( { clientId, name, setAttributes } ) {
	const { blockType, defaultVariation, variations } = useSelect(
		( select ) => {
			const {
				getBlockVariations,
				getBlockType,
				getDefaultBlockVariation,
			} = select( blocksStore );

			return {
				blockType: getBlockType( name ),
				defaultVariation: getDefaultBlockVariation( name, 'block' ),
				variations: getBlockVariations( name, 'block' ),
			};
		},
		[ name ]
	);
	const { replaceInnerBlocks } = useDispatch( blockEditorStore );
	const blockProps = useBlockProps();

	return (
		<div { ...blockProps }>
			<__experimentalBlockVariationPicker
				icon={ get( blockType, [ 'icon', 'src' ] ) }
				label={ get( blockType, [ 'title' ] ) }
				variations={ variations }
				onSelect={ ( nextVariation = defaultVariation ) => {
					if ( nextVariation.attributes ) {
						setAttributes( nextVariation.attributes );
					}
					if ( nextVariation.innerBlocks ) {
						replaceInnerBlocks(
							clientId,
							createBlocksFromInnerBlocksTemplate(
								nextVariation.innerBlocks
							),
							true
						);
					}
				} }
				allowSkip
			/>
		</div>
	);
}

const ColumnsEdit = ( props ) => {
	const { clientId } = props;
	const hasInnerBlocks = useSelect(
		( select ) =>
			select( blockEditorStore ).getBlocks( clientId ).length > 0,
		[ clientId ]
	);
	const Component = hasInnerBlocks
		? ColumnsEditContainerWrapper
		: Placeholder;

	return <Component { ...props } />;
};

export default ColumnsEdit;
