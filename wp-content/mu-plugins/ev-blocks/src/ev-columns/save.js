/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * WordPress dependencies
 */
import { useInnerBlocksProps, useBlockProps } from '@wordpress/block-editor';

export default function save( { attributes } ) {
	const { isBoxed, isInvertedMobile, verticalAlignment, pymb, pydt, alt, url, urlVideo, width, allineamentoOrizzontale, altezzaVh, isVideoAutoplay, isVideoLoop, isVideoCover } = attributes;
	
	const className = classnames( 'row', {
		[ `are-vertically-aligned-${ verticalAlignment }` ]: verticalAlignment,
		[ `justify-content-${ allineamentoOrizzontale }` ]: allineamentoOrizzontale,
		[ `flex-column-reverse flex-lg-row` ]: isInvertedMobile,
	} );

	if(isBoxed) var containerClass = 'container'; else var containerClass = 'container-fluid'; 
	if(pymb!=='default') containerClass += ' py-'+pymb;
	if(pydt!=='default') containerClass += ' py-lg-'+pydt;

	const blockProps = useBlockProps.save({
		className: altezzaVh ? `heightvh-${ altezzaVh }` : null
	});
	const innerBlocksProps = useInnerBlocksProps.save({ className });

	const poster = url ? url : false

	return <section {...blockProps}>
		{(!urlVideo && url) && <img src={ url } alt={ alt } className="img_background" />}
		{urlVideo && <video src={ urlVideo } className="video_background" playsinline="playsinline" muted autoplay={isVideoAutoplay} loop={isVideoLoop} poster={poster} /> }
		{urlVideo && 
		<span className='iconaAudio'>
			<svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 640 512"><path d="M533.6 32.5C598.5 85.3 640 165.8 640 256s-41.5 170.8-106.4 223.5c-10.3 8.4-25.4 6.8-33.8-3.5s-6.8-25.4 3.5-33.8C557.5 398.2 592 331.2 592 256s-34.5-142.2-88.7-186.3c-10.3-8.4-11.8-23.5-3.5-33.8s23.5-11.8 33.8-3.5zM473.1 107c43.2 35.2 70.9 88.9 70.9 149s-27.7 113.8-70.9 149c-10.3 8.4-25.4 6.8-33.8-3.5s-6.8-25.4 3.5-33.8C475.3 341.3 496 301.1 496 256s-20.7-85.3-53.2-111.8c-10.3-8.4-11.8-23.5-3.5-33.8s23.5-11.8 33.8-3.5zm-60.5 74.5C434.1 199.1 448 225.9 448 256s-13.9 56.9-35.4 74.5c-10.3 8.4-25.4 6.8-33.8-3.5s-6.8-25.4 3.5-33.8C393.1 284.4 400 271 400 256s-6.9-28.4-17.7-37.3c-10.3-8.4-11.8-23.5-3.5-33.8s23.5-11.8 33.8-3.5zM301.1 34.8C312.6 40 320 51.4 320 64V448c0 12.6-7.4 24-18.9 29.2s-25 3.1-34.4-5.3L131.8 352H64c-35.3 0-64-28.7-64-64V224c0-35.3 28.7-64 64-64h67.8L266.7 40.1c9.4-8.4 22.9-10.4 34.4-5.3z"></path></svg>
		</span>

		}
		<div className={containerClass}>
			<div className='row justify-content-' { ...innerBlocksProps } />
		</div>
	</section>
		
}
