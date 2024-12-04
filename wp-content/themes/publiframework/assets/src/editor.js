wp.domReady( () => {
    wp.blocks.unregisterBlockStyle('core/button', 'outline');
    wp.blocks.unregisterBlockStyle('core/button', 'fill');
  
    wp.blocks.registerBlockStyle('core/button', {
      name: 'primary-button',
      label: 'Link chiaro',
      isDefault: true
    });
    
    wp.blocks.registerBlockStyle('core/button', {
      name: 'secondary-button',
      label: 'Link scuro'
    });

    wp.blocks.registerBlockStyle('core/button', {
      name: 'terzo-button',
      label: 'Bottone aperto'
    });

    wp.blocks.registerBlockStyle('core/button', {
      name: 'quarto-button',
      label: 'Bottone chiuso'
    });

});