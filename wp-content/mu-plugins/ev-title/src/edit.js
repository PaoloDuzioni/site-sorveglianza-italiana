/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/packages/packages-i18n/
 */
import { __ } from '@wordpress/i18n';

/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/packages/packages-block-editor/#useBlockProps
 */
import { useBlockProps, RichText, InspectorControls, ColorPalette, BlockControls, AlignmentToolbar } from '@wordpress/block-editor';

import { 
	PanelBody,
	ToggleControl,
	__experimentalToggleGroupControl as ToggleGroupControl,
    __experimentalToggleGroupControlOption as ToggleGroupControlOption,
} from '@wordpress/components';

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * Those files can contain any CSS code that gets applied to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import './editor.scss';

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/developers/block-api/block-edit-save/#edit
 *
 * @return {WPElement} Element to render.
 */
export default function Edit({attributes, setAttributes}) {

	function updateTitle(newVal) {
		setAttributes( {titolo: newVal});
	};

	const { titolo, tag_html, tipo_heading, dimensione, alignment, uppercase } = attributes;

	const onChangeAlignment = ( newAlignment ) => {
		setAttributes( { alignment: newAlignment } );
	};

	var tagName = '';
	if(tag_html=='h') {
		tagName = 'h'+tipo_heading;
	} else {
		tagName = tag_html;
	}

	var dimClass = `titolo_pb d-block h${ dimensione } has-text-align-${ alignment }`;
	if(uppercase) dimClass += ' text-uppercase';

	return (
		<section>
			<BlockControls>
				<AlignmentToolbar
					value={ alignment }
					onChange={ onChangeAlignment }
				/>
			</BlockControls>
			<InspectorControls>
				<PanelBody title="Impostazioni">
					<ToggleControl
						label={ __( 'Uppercase' ) }
						checked={ uppercase }
						onChange={ () =>
							setAttributes( {
								uppercase: ! uppercase,
							} )
						}
					/>
					<ToggleGroupControl label="Tag Html titolo" value={tag_html} isBlock 
						onChange={ (newval) =>
							setAttributes( {
								tag_html: newval,
							} )
						}>
						<ToggleGroupControlOption value="h" label="Heading" />
						<ToggleGroupControlOption value="span" label="Span" />
						<ToggleGroupControlOption value="p" label="Paragrafo" />
					</ToggleGroupControl>
					{ tag_html=='h' && ( <ToggleGroupControl label="Tipo heading" value={tipo_heading} isBlock
						onChange={ (newval) =>
							setAttributes( {
								tipo_heading: newval,
							} )
						}>
						<ToggleGroupControlOption value="1" label="H1" />
						<ToggleGroupControlOption value="2" label="H2" />
						<ToggleGroupControlOption value="3" label="H3" />
						<ToggleGroupControlOption value="4" label="H4" />
						<ToggleGroupControlOption value="5" label="H5" />
						<ToggleGroupControlOption value="6" label="H6" />
					</ToggleGroupControl> )}
					<ToggleGroupControl label="Dimensione titolo" value={dimensione} isBlock
						onChange={ (newval) =>
							setAttributes( {
								dimensione: newval,
							} )
						}>
						<ToggleGroupControlOption value="1" label="D1" />
						<ToggleGroupControlOption value="2" label="D2" />
						<ToggleGroupControlOption value="3" label="D3" />
						<ToggleGroupControlOption value="4" label="D4" />
						<ToggleGroupControlOption value="5" label="D5" />
						<ToggleGroupControlOption value="6" label="d6" />
					</ToggleGroupControl>

				</PanelBody>
			</InspectorControls>
			<RichText 
				{...useBlockProps({
					className: dimClass,
				})}
				tagName={tagName} 
                value={ titolo }
                allowedFormats={ ['core/bold'] } 
                onChange={ updateTitle } 
                placeholder="Digita il titolo"
			/>
		</section>
	);
}
