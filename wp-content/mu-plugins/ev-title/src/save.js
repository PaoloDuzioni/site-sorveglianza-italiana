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
import { useBlockProps, RichText } from '@wordpress/block-editor';

/**
 * The save function defines the way in which the different attributes should
 * be combined into the final markup, which is then serialized by the block
 * editor into `post_content`.
 *
 * @see https://developer.wordpress.org/block-editor/developers/block-api/block-edit-save/#save
 *
 * @return {WPElement} Element to render.
 */
export default function save({attributes}) {

	const { titolo, tag_html, tipo_heading, dimensione, alignment, uppercase } = attributes;

	var dimClass = `titolo_pb d-block h${ dimensione } has-text-align-${ alignment }`;
	if(uppercase) dimClass += ' text-uppercase';

	var tagName = '';
	if(tag_html=='h') {
		tagName = 'h'+tipo_heading;
	} else {
		tagName = tag_html;
	}

	//const dimClass = 'titolo_evidenzio d-block h'+dimensione;

	const blockProps = useBlockProps.save({
		className: dimClass,
	});

	return (
		<RichText.Content tagName={tagName} value={titolo} {...blockProps}/>
	);
}
