/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/@wordpress/icons/build-module/library/column.js":
/*!**********************************************************************!*\
  !*** ./node_modules/@wordpress/icons/build-module/library/column.js ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_primitives__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/primitives */ "@wordpress/primitives");
/* harmony import */ var _wordpress_primitives__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_1__);


/**
 * WordPress dependencies
 */

const column = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_1__.SVG, {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 24 24"
}, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_1__.Path, {
  d: "M19 6H6c-1.1 0-2 .9-2 2v9c0 1.1.9 2 2 2h13c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zM6 17.5c-.3 0-.5-.2-.5-.5V8c0-.3.2-.5.5-.5h3v10H6zm13.5-.5c0 .3-.2.5-.5.5h-3v-10h3c.3 0 .5.2.5.5v9z"
}));
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (column);
//# sourceMappingURL=column.js.map

/***/ }),

/***/ "./src/ev-column/deprecated.js":
/*!*************************************!*\
  !*** ./src/ev-column/deprecated.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! classnames */ "./node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/block-editor */ "@wordpress/block-editor");
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__);

/**
 * External dependencies
 */


/**
 * WordPress dependencies
 */

const deprecated = [{
  attributes: {
    verticalAlignment: {
      type: 'string'
    },
    width: {
      type: 'number',
      min: 0,
      max: 100
    }
  },
  isEligible({
    width
  }) {
    return isFinite(width);
  },
  migrate(attributes) {
    return {
      ...attributes,
      width: `${attributes.width}%`
    };
  },
  save({
    attributes
  }) {
    const {
      verticalAlignment,
      width
    } = attributes;
    const wrapperClasses = classnames__WEBPACK_IMPORTED_MODULE_1___default()({
      [`is-vertically-aligned-${verticalAlignment}`]: verticalAlignment
    });
    const style = {
      flexBasis: width + '%'
    };
    return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: wrapperClasses,
      style: style
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__.InnerBlocks.Content, null));
  }
}];
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (deprecated);

/***/ }),

/***/ "./src/ev-column/edit.js":
/*!*******************************!*\
  !*** ./src/ev-column/edit.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! classnames */ "./node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _editor_scss__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./editor.scss */ "./src/ev-column/editor.scss");
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/block-editor */ "@wordpress/block-editor");
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @wordpress/data */ "@wordpress/data");
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_wordpress_data__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_6__);

/**
 * External dependencies
 */


/**
 * WordPress dependencies
 */




function ColumnEdit({
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
  clientId
}) {
  const colDesktop = isDefaultDt ? '' : '-' + colonneDesktop;
  const classes = classnames__WEBPACK_IMPORTED_MODULE_1___default()(`col-${colonneMobile} col-md-${colonneTablet} col-lg${colDesktop}`, {
    [`is-vertically-aligned-${verticalAlignment}`]: verticalAlignment
  });
  const updateColumnsMb = newVal => {
    setAttributes({
      colonneMobile: newVal
    });
  };
  const updateColumnsTb = newVal => {
    setAttributes({
      colonneTablet: newVal
    });
  };
  const updateColumnsDt = newVal => {
    setAttributes({
      colonneDesktop: newVal
    });
  };
  const units = (0,_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.__experimentalUseCustomUnits)({
    availableUnits: (0,_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_3__.useSetting)('spacing.units') || ['%', 'px', 'em', 'rem', 'vw']
  });
  const {
    columnsIds,
    hasChildBlocks,
    rootClientId
  } = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_5__.useSelect)(select => {
    const {
      getBlockOrder,
      getBlockRootClientId
    } = select(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_3__.store);
    const rootId = getBlockRootClientId(clientId);
    return {
      hasChildBlocks: getBlockOrder(clientId).length > 0,
      rootClientId: rootId,
      columnsIds: getBlockOrder(rootId)
    };
  }, [clientId]);
  const {
    updateBlockAttributes
  } = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_5__.useDispatch)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_3__.store);
  const updateAlignment = value => {
    // Update own alignment.
    setAttributes({
      verticalAlignment: value
    });
    // Reset parent Columns block.
    updateBlockAttributes(rootClientId, {
      verticalAlignment: null
    });
  };
  const widthWithUnit = Number.isFinite(width) ? width + '%' : width;
  const blockProps = (0,_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_3__.useBlockProps)({
    className: classes,
    style: widthWithUnit ? {
      flexBasis: widthWithUnit
    } : undefined
  });
  const columnsCount = columnsIds.length;
  const currentColumnPosition = columnsIds.indexOf(clientId) + 1;
  const label = (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_6__.sprintf)( /* translators: 1: Block label (i.e. "Block: Column"), 2: Position of the selected block, 3: Total number of sibling blocks of the same type */
  (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_6__.__)('%1$s (%2$d of %3$d)'), blockProps['aria-label'], currentColumnPosition, columnsCount);
  const innerBlocksProps = (0,_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_3__.useInnerBlocksProps)({
    ...blockProps,
    'aria-label': label
  }, {
    templateLock,
    allowedBlocks,
    renderAppender: hasChildBlocks ? undefined : _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_3__.InnerBlocks.ButtonBlockAppender
  });
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_3__.BlockControls, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_3__.BlockVerticalAlignmentToolbar, {
    onChange: updateAlignment,
    value: verticalAlignment
  })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_3__.InspectorControls, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.PanelBody, {
    title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_6__.__)('Column settings')
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    class: "wrapper-nr-colonne mb-3"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("label", {
    class: "d-block mb-2"
  }, "Colonne Bootstrap Mobile"), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.ToggleControl, {
    label: "Default (col-12)",
    checked: isDefaultMb,
    onChange: () => setAttributes({
      isDefaultMb: !isDefaultMb
    })
  }), !isDefaultMb && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.RangeControl, {
    value: colonneMobile,
    onChange: value => updateColumnsMb(value),
    min: 1,
    max: 12
  })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    class: "wrapper-nr-colonne mb-3"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("label", {
    class: "d-block mb-2"
  }, "Colonne Bootstrap Tablet"), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.ToggleControl, {
    label: "Default (col-md-12)",
    checked: isDefaultTb,
    onChange: () => setAttributes({
      isDefaultTb: !isDefaultTb
    })
  }), !isDefaultTb && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.RangeControl, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_6__.__)('Colonne Bootstrap Tablet'),
    value: colonneTablet,
    onChange: value => updateColumnsTb(value),
    min: 1,
    max: 12
  })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    class: "wrapper-nr-colonne mb-3"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("label", {
    class: "d-block mb-2"
  }, "Colonne Bootstrap Desktop"), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.ToggleControl, {
    label: "Default (col-lg-auto)",
    checked: isDefaultDt,
    onChange: () => setAttributes({
      isDefaultDt: !isDefaultDt
    })
  }), !isDefaultDt && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.RangeControl, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_6__.__)('Colonne Bootstrap Desktop'),
    value: colonneDesktop,
    onChange: value => updateColumnsDt(value),
    min: 1,
    max: 12
  })))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", innerBlocksProps));
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ColumnEdit);

/***/ }),

/***/ "./src/ev-column/index.js":
/*!********************************!*\
  !*** ./src/ev-column/index.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   metadata: () => (/* reexport default export from named module */ _block_json__WEBPACK_IMPORTED_MODULE_3__),
/* harmony export */   name: () => (/* binding */ name),
/* harmony export */   settings: () => (/* binding */ settings)
/* harmony export */ });
/* harmony import */ var _wordpress_icons__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @wordpress/icons */ "./node_modules/@wordpress/icons/build-module/library/column.js");
/* harmony import */ var _style_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./style.scss */ "./src/ev-column/style.scss");
/* harmony import */ var _deprecated__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./deprecated */ "./src/ev-column/deprecated.js");
/* harmony import */ var _edit__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./edit */ "./src/ev-column/edit.js");
/* harmony import */ var _block_json__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./block.json */ "./src/ev-column/block.json");
/* harmony import */ var _save__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./save */ "./src/ev-column/save.js");
/**
 * WordPress dependencies
 */


/**
 * Internal dependencies
 */





const {
  name
} = _block_json__WEBPACK_IMPORTED_MODULE_3__;

const settings = {
  icon: _wordpress_icons__WEBPACK_IMPORTED_MODULE_5__["default"],
  edit: _edit__WEBPACK_IMPORTED_MODULE_2__["default"],
  save: _save__WEBPACK_IMPORTED_MODULE_4__["default"],
  deprecated: _deprecated__WEBPACK_IMPORTED_MODULE_1__["default"]
};

/***/ }),

/***/ "./src/ev-column/save.js":
/*!*******************************!*\
  !*** ./src/ev-column/save.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ save)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! classnames */ "./node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/block-editor */ "@wordpress/block-editor");
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__);

/**
 * External dependencies
 */


/**
 * WordPress dependencies
 */

function save({
  attributes
}) {
  const {
    verticalAlignment,
    colonneMobile,
    colonneTablet,
    colonneDesktop,
    isDefaultMb,
    isDefaultTb,
    isDefaultDt
  } = attributes;
  const colMobile = isDefaultMb ? 12 : colonneMobile;
  const colTablet = isDefaultTb ? 12 : colonneTablet;
  const colDesktop = isDefaultDt ? '' : '-' + colonneDesktop;
  const wrapperClasses = classnames__WEBPACK_IMPORTED_MODULE_1___default()(`col-${colMobile} col-md-${colTablet} col-lg${colDesktop}`, {
    [`is-vertically-aligned-${verticalAlignment}`]: verticalAlignment
  });
  const blockProps = _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__.useBlockProps.save({
    className: wrapperClasses
  });
  const innerBlocksProps = _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__.useInnerBlocksProps.save(blockProps);
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", innerBlocksProps);
}

/***/ }),

/***/ "./src/ev-columns/deprecated.js":
/*!**************************************!*\
  !*** ./src/ev-columns/deprecated.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! lodash */ "lodash");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! classnames */ "./node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/blocks */ "@wordpress/blocks");
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_blocks__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @wordpress/block-editor */ "@wordpress/block-editor");
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_4__);

/**
 * External dependencies
 */



/**
 * WordPress dependencies
 */



/**
 * Given an HTML string for a deprecated columns inner block, returns the
 * column index to which the migrated inner block should be assigned. Returns
 * undefined if the inner block was not assigned to a column.
 *
 * @param {string} originalContent Deprecated Columns inner block HTML.
 *
 * @return {?number} Column to which inner block is to be assigned.
 */
function getDeprecatedLayoutColumn(originalContent) {
  let {
    doc
  } = getDeprecatedLayoutColumn;
  if (!doc) {
    doc = document.implementation.createHTMLDocument('');
    getDeprecatedLayoutColumn.doc = doc;
  }
  let columnMatch;
  doc.body.innerHTML = originalContent;
  for (const classListItem of doc.body.firstChild.classList) {
    if (columnMatch = classListItem.match(/^layout-column-(\d+)$/)) {
      return Number(columnMatch[1]) - 1;
    }
  }
}
const migrateCustomColors = attributes => {
  if (!attributes.customTextColor && !attributes.customBackgroundColor) {
    return attributes;
  }
  const style = {
    color: {}
  };
  if (attributes.customTextColor) {
    style.color.text = attributes.customTextColor;
  }
  if (attributes.customBackgroundColor) {
    style.color.background = attributes.customBackgroundColor;
  }
  return {
    ...(0,lodash__WEBPACK_IMPORTED_MODULE_1__.omit)(attributes, ['customTextColor', 'customBackgroundColor']),
    style,
    isStackedOnMobile: true
  };
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ([{
  attributes: {
    verticalAlignment: {
      type: 'string'
    },
    backgroundColor: {
      type: 'string'
    },
    customBackgroundColor: {
      type: 'string'
    },
    customTextColor: {
      type: 'string'
    },
    textColor: {
      type: 'string'
    }
  },
  migrate: migrateCustomColors,
  save({
    attributes
  }) {
    const {
      verticalAlignment,
      backgroundColor,
      customBackgroundColor,
      textColor,
      customTextColor
    } = attributes;
    const backgroundClass = (0,_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_4__.getColorClassName)('background-color', backgroundColor);
    const textClass = (0,_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_4__.getColorClassName)('color', textColor);
    const className = classnames__WEBPACK_IMPORTED_MODULE_2___default()({
      'has-background': backgroundColor || customBackgroundColor,
      'has-text-color': textColor || customTextColor,
      [backgroundClass]: backgroundClass,
      [textClass]: textClass,
      [`are-vertically-aligned-${verticalAlignment}`]: verticalAlignment
    });
    const style = {
      backgroundColor: backgroundClass ? undefined : customBackgroundColor,
      color: textClass ? undefined : customTextColor
    };
    return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: className ? className : undefined,
      style: style
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_4__.InnerBlocks.Content, null));
  }
}, {
  attributes: {
    columns: {
      type: 'number',
      default: 2
    }
  },
  isEligible(attributes, innerBlocks) {
    // Since isEligible is called on every valid instance of the
    // Columns block and a deprecation is the unlikely case due to
    // its subsequent migration, optimize for the `false` condition
    // by performing a naive, inaccurate pass at inner blocks.
    const isFastPassEligible = innerBlocks.some(innerBlock => /layout-column-\d+/.test(innerBlock.originalContent));
    if (!isFastPassEligible) {
      return false;
    }

    // Only if the fast pass is considered eligible is the more
    // accurate, durable, slower condition performed.
    return innerBlocks.some(innerBlock => getDeprecatedLayoutColumn(innerBlock.originalContent) !== undefined);
  },
  migrate(attributes, innerBlocks) {
    const columns = innerBlocks.reduce((accumulator, innerBlock) => {
      const {
        originalContent
      } = innerBlock;
      let columnIndex = getDeprecatedLayoutColumn(originalContent);
      if (columnIndex === undefined) {
        columnIndex = 0;
      }
      if (!accumulator[columnIndex]) {
        accumulator[columnIndex] = [];
      }
      accumulator[columnIndex].push(innerBlock);
      return accumulator;
    }, []);
    const migratedInnerBlocks = columns.map(columnBlocks => (0,_wordpress_blocks__WEBPACK_IMPORTED_MODULE_3__.createBlock)('evidenzio/column', {}, columnBlocks));
    return [{
      ...(0,lodash__WEBPACK_IMPORTED_MODULE_1__.omit)(attributes, ['columns']),
      isStackedOnMobile: true
    }, migratedInnerBlocks];
  },
  save({
    attributes
  }) {
    const {
      columns
    } = attributes;
    return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: `has-${columns}-columns`
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_4__.InnerBlocks.Content, null));
  }
}, {
  attributes: {
    columns: {
      type: 'number',
      default: 2
    }
  },
  migrate(attributes, innerBlocks) {
    attributes = {
      ...(0,lodash__WEBPACK_IMPORTED_MODULE_1__.omit)(attributes, ['columns']),
      isStackedOnMobile: true
    };
    return [attributes, innerBlocks];
  },
  save({
    attributes
  }) {
    const {
      verticalAlignment,
      columns
    } = attributes;
    const wrapperClasses = classnames__WEBPACK_IMPORTED_MODULE_2___default()(`has-${columns}-columns`, {
      [`are-vertically-aligned-${verticalAlignment}`]: verticalAlignment
    });
    return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: wrapperClasses
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_4__.InnerBlocks.Content, null));
  }
}]);

/***/ }),

/***/ "./src/ev-columns/edit.js":
/*!********************************!*\
  !*** ./src/ev-columns/edit.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! classnames */ "./node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! lodash */ "lodash");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _editor_scss__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./editor.scss */ "./src/ev-columns/editor.scss");
/* harmony import */ var _node_modules_bootstrap_scss_bootstrap_scss__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../node_modules/bootstrap/scss/bootstrap.scss */ "./node_modules/bootstrap/scss/bootstrap.scss");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @wordpress/block-editor */ "@wordpress/block-editor");
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @wordpress/data */ "@wordpress/data");
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(_wordpress_data__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @wordpress/blocks */ "@wordpress/blocks");
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(_wordpress_blocks__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./utils */ "./src/ev-columns/utils.js");

/**
 * External dependencies
 */





/**
 * WordPress dependencies
 */






/**
 * Internal dependencies
 */


/**
 * Allowed blocks constant is passed to InnerBlocks precisely as specified here.
 * The contents of the array should never change.
 * The array should contain the name of each block that is allowed.
 * In columns block, the only block we allow is 'core/column'.
 *
 * @constant
 * @type {string[]}
 */
const ALLOWED_BLOCKS = ['evidenzio/column', 'evidenzio/columns'];
function ColumnsEditContainer({
  attributes,
  setAttributes,
  updateAlignment,
  updateColumns,
  updateOrizAlignment,
  clientId
}) {
  const {
    isBoxed,
    isInvertedMobile,
    verticalAlignment,
    allineamentoOrizzontale,
    pymb,
    pydt,
    alt,
    url,
    width,
    urlVideo,
    altezzaVh,
    isVideoAutoplay,
    isVideoLoop,
    isVideoCover
  } = attributes;
  const {
    count
  } = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_8__.useSelect)(select => {
    return {
      count: select(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_7__.store).getBlockCount(clientId)
    };
  }, [clientId]);
  const classes = classnames__WEBPACK_IMPORTED_MODULE_1___default()('row', {
    [`are-vertically-aligned-${verticalAlignment}`]: verticalAlignment,
    [`justify-content-${allineamentoOrizzontale}`]: allineamentoOrizzontale,
    [`is-boxed`]: isBoxed,
    [`heightvh-${altezzaVh}`]: altezzaVh
  });
  const blockProps = (0,_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_7__.useBlockProps)({
    className: classes
  });
  const innerBlocksProps = (0,_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_7__.useInnerBlocksProps)(blockProps, {
    allowedBlocks: ALLOWED_BLOCKS,
    orientation: 'horizontal',
    renderAppender: false
  });
  const onSelectImage = image => {
    if (!image || !image.url) {
      setAttributes({
        url: undefined,
        alt: '',
        width: null
      });
      return;
    }
    setAttributes({
      url: image.url,
      alt: image.alt,
      width: image.width
    });
  };
  const onSelectURL = newURL => {
    setAttributes({
      url: newURL,
      alt: ''
    });
  };
  const onSelectVideo = video => {
    if (!video || !video.url) {
      setAttributes({
        urlVideo: undefined
      });
      return;
    }
    setAttributes({
      urlVideo: video.url
    });
  };
  const onSelectURLVideo = newURL => {
    setAttributes({
      urlVideo: newURL
    });
  };
  const removeImage = () => {
    setAttributes({
      url: undefined,
      alt: '',
      width: null
    });
  };
  const removeVideo = () => {
    setAttributes({
      urlVideo: undefined
    });
  };
  if (isBoxed) var containerClass = 'container';else var containerClass = 'container-fluid';
  const poster = url ? url : false;
  if (pymb == 'default') containerClass += ' py-2';else containerClass += ' py-' + pymb;
  if (pydt == 'default') containerClass += ' py-lg-4';else containerClass += ' py-lg-' + pydt;
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_7__.BlockControls, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_7__.BlockVerticalAlignmentToolbar, {
    onChange: updateAlignment,
    value: verticalAlignment
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_7__.BlockAlignmentToolbar, {
    onChange: updateOrizAlignment,
    value: allineamentoOrizzontale
  })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_7__.InspectorControls, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_6__.PanelBody, {
    title: "Layout",
    icon: "layout",
    initialOpen: false
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_6__.SelectControl, {
    label: "Altezza in vh",
    value: altezzaVh,
    onChange: val => setAttributes({
      altezzaVh: val
    }),
    labelPosition: "side"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("optgroup", {
    label: "Theropods"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("option", {
    value: "auto"
  }, "Auto"), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("option", {
    value: "15"
  }, "15%"), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("option", {
    value: "30"
  }, "30%"), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("option", {
    value: "50"
  }, "50%"), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("option", {
    value: "65"
  }, "65%"), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("option", {
    value: "85"
  }, "85%"), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("option", {
    value: "100"
  }, "100%"))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_6__.RangeControl, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_5__.__)('Columns'),
    value: count,
    onChange: value => updateColumns(count, value),
    min: 1,
    max: Math.max(6, count)
  }), count > 6 && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_6__.Notice, {
    status: "warning",
    isDismissible: false
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_5__.__)('This column count exceeds the recommended amount and may cause visual breakage.')), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_6__.ToggleControl, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_5__.__)('Boxed'),
    checked: isBoxed,
    onChange: () => setAttributes({
      isBoxed: !isBoxed
    })
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_6__.ToggleControl, {
    label: "Inverti ordine colonne su mobile",
    checked: isInvertedMobile,
    onChange: () => setAttributes({
      isInvertedMobile: !isInvertedMobile
    })
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_6__.__experimentalToggleGroupControl, {
    label: "Padding verticale mobile",
    value: pymb,
    isBlock: true,
    onChange: newval => setAttributes({
      pymb: newval
    })
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_6__.__experimentalToggleGroupControlOption, {
    value: "default",
    label: "Default"
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_6__.__experimentalToggleGroupControlOption, {
    value: "0",
    label: "0"
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_6__.__experimentalToggleGroupControlOption, {
    value: "1",
    label: "1"
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_6__.__experimentalToggleGroupControlOption, {
    value: "2",
    label: "2"
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_6__.__experimentalToggleGroupControlOption, {
    value: "3",
    label: "3"
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_6__.__experimentalToggleGroupControlOption, {
    value: "4",
    label: "4"
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_6__.__experimentalToggleGroupControlOption, {
    value: "5",
    label: "5"
  })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_6__.__experimentalToggleGroupControl, {
    label: "Padding verticale desktop",
    value: pydt,
    isBlock: true,
    onChange: newval => setAttributes({
      pydt: newval
    })
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_6__.__experimentalToggleGroupControlOption, {
    value: "default",
    label: "Default"
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_6__.__experimentalToggleGroupControlOption, {
    value: "0",
    label: "0"
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_6__.__experimentalToggleGroupControlOption, {
    value: "1",
    label: "1"
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_6__.__experimentalToggleGroupControlOption, {
    value: "2",
    label: "2"
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_6__.__experimentalToggleGroupControlOption, {
    value: "3",
    label: "3"
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_6__.__experimentalToggleGroupControlOption, {
    value: "4",
    label: "4"
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_6__.__experimentalToggleGroupControlOption, {
    value: "5",
    label: "5"
  }))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_6__.PanelBody, {
    title: "Immagine sfondo",
    icon: "cover-image",
    initialOpen: false
  }, url && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_6__.ToolbarButton, {
    onClick: removeImage
  }, "Rimuovi Immagine"), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_7__.MediaPlaceholder, {
    icon: "image",
    onSelect: onSelectImage,
    onSelectURL: onSelectURL,
    accept: "image/*",
    allowedTypes: ['image']
  })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_6__.PanelBody, {
    title: "Video sfondo",
    icon: "cover-image",
    initialOpen: false
  }, urlVideo && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_6__.ToolbarButton, {
    onClick: removeVideo
  }, "Rimuovi video"), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_7__.MediaPlaceholder, {
    icon: "image",
    onSelect: onSelectVideo,
    onSelectURL: onSelectURLVideo,
    accept: "video/*",
    allowedTypes: ['video']
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_6__.ToggleControl, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_5__.__)('Video in autoplay'),
    checked: isVideoAutoplay,
    onChange: () => setAttributes({
      isVideoAutoplay: !isVideoAutoplay
    })
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_6__.ToggleControl, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_5__.__)('Video in loop'),
    checked: isVideoLoop,
    onChange: () => setAttributes({
      isVideoLoop: !isVideoLoop
    })
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_6__.ToggleControl, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_5__.__)('Usa Immagine di sfondo come copertina'),
    checked: isVideoCover,
    onChange: () => setAttributes({
      isVideoCover: !isVideoCover
    })
  }))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("section", blockProps, !urlVideo && url && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("img", {
    src: url,
    alt: alt,
    className: "img_background"
  }), urlVideo && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("video", {
    src: urlVideo,
    className: "video_background",
    playsinline: "playsinline",
    muted: true,
    autoplay: isVideoAutoplay,
    loop: isVideoLoop,
    poster: poster
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: containerClass
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", innerBlocksProps))));
}
const ColumnsEditContainerWrapper = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_8__.withDispatch)((dispatch, ownProps, registry) => ({
  /**
   * Update all child Column blocks with a new vertical alignment setting
   * based on whatever alignment is passed in. This allows change to parent
   * to overide anything set on a individual column basis.
   *
   * @param {string} verticalAlignment the vertical alignment setting
   */
  updateAlignment(verticalAlignment) {
    const {
      clientId,
      setAttributes
    } = ownProps;
    const {
      updateBlockAttributes
    } = dispatch(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_7__.store);
    const {
      getBlockOrder
    } = registry.select(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_7__.store);

    // Update own alignment.
    setAttributes({
      verticalAlignment
    });

    // Update all child Column Blocks to match.
    const innerBlockClientIds = getBlockOrder(clientId);
    innerBlockClientIds.forEach(innerBlockClientId => {
      updateBlockAttributes(innerBlockClientId, {
        verticalAlignment
      });
    });
  },
  updateOrizAlignment(allineamentoOrizzontale) {
    const {
      setAttributes
    } = ownProps;
    setAttributes({
      allineamentoOrizzontale
    });
  },
  /**
   * Updates the column count, including necessary revisions to child Column
   * blocks to grant required or redistribute available space.
   *
   * @param {number} previousColumns Previous column count.
   * @param {number} newColumns      New column count.
   */
  updateColumns(previousColumns, newColumns) {
    const {
      clientId
    } = ownProps;
    const {
      replaceInnerBlocks
    } = dispatch(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_7__.store);
    const {
      getBlocks
    } = registry.select(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_7__.store);
    let innerBlocks = getBlocks(clientId);
    const hasExplicitWidths = (0,_utils__WEBPACK_IMPORTED_MODULE_10__.hasExplicitPercentColumnWidths)(innerBlocks);

    // Redistribute available width for existing inner blocks.
    const isAddingColumn = newColumns > previousColumns;
    if (isAddingColumn && hasExplicitWidths) {
      // If adding a new column, assign width to the new column equal to
      // as if it were `1 / columns` of the total available space.
      const newColumnWidth = (0,_utils__WEBPACK_IMPORTED_MODULE_10__.toWidthPrecision)(100 / newColumns);

      // Redistribute in consideration of pending block insertion as
      // constraining the available working width.
      const widths = (0,_utils__WEBPACK_IMPORTED_MODULE_10__.getRedistributedColumnWidths)(innerBlocks, 100 - newColumnWidth);
      innerBlocks = [...(0,_utils__WEBPACK_IMPORTED_MODULE_10__.getMappedColumnWidths)(innerBlocks, widths), ...(0,lodash__WEBPACK_IMPORTED_MODULE_2__.times)(newColumns - previousColumns, () => {
        return (0,_wordpress_blocks__WEBPACK_IMPORTED_MODULE_9__.createBlock)('evidenzio/column', {
          width: `${newColumnWidth}%`
        });
      })];
    } else if (isAddingColumn) {
      innerBlocks = [...innerBlocks, ...(0,lodash__WEBPACK_IMPORTED_MODULE_2__.times)(newColumns - previousColumns, () => {
        return (0,_wordpress_blocks__WEBPACK_IMPORTED_MODULE_9__.createBlock)('evidenzio/column');
      })];
    } else {
      // The removed column will be the last of the inner blocks.
      innerBlocks = (0,lodash__WEBPACK_IMPORTED_MODULE_2__.dropRight)(innerBlocks, previousColumns - newColumns);
      if (hasExplicitWidths) {
        // Redistribute as if block is already removed.
        const widths = (0,_utils__WEBPACK_IMPORTED_MODULE_10__.getRedistributedColumnWidths)(innerBlocks, 100);
        innerBlocks = (0,_utils__WEBPACK_IMPORTED_MODULE_10__.getMappedColumnWidths)(innerBlocks, widths);
      }
    }
    replaceInnerBlocks(clientId, innerBlocks);
  }
}))(ColumnsEditContainer);
function Placeholder({
  clientId,
  name,
  setAttributes
}) {
  const {
    blockType,
    defaultVariation,
    variations
  } = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_8__.useSelect)(select => {
    const {
      getBlockVariations,
      getBlockType,
      getDefaultBlockVariation
    } = select(_wordpress_blocks__WEBPACK_IMPORTED_MODULE_9__.store);
    return {
      blockType: getBlockType(name),
      defaultVariation: getDefaultBlockVariation(name, 'block'),
      variations: getBlockVariations(name, 'block')
    };
  }, [name]);
  const {
    replaceInnerBlocks
  } = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_8__.useDispatch)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_7__.store);
  const blockProps = (0,_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_7__.useBlockProps)();
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", blockProps, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_7__.__experimentalBlockVariationPicker, {
    icon: (0,lodash__WEBPACK_IMPORTED_MODULE_2__.get)(blockType, ['icon', 'src']),
    label: (0,lodash__WEBPACK_IMPORTED_MODULE_2__.get)(blockType, ['title']),
    variations: variations,
    onSelect: (nextVariation = defaultVariation) => {
      if (nextVariation.attributes) {
        setAttributes(nextVariation.attributes);
      }
      if (nextVariation.innerBlocks) {
        replaceInnerBlocks(clientId, (0,_wordpress_blocks__WEBPACK_IMPORTED_MODULE_9__.createBlocksFromInnerBlocksTemplate)(nextVariation.innerBlocks), true);
      }
    },
    allowSkip: true
  }));
}
const ColumnsEdit = props => {
  const {
    clientId
  } = props;
  const hasInnerBlocks = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_8__.useSelect)(select => select(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_7__.store).getBlocks(clientId).length > 0, [clientId]);
  const Component = hasInnerBlocks ? ColumnsEditContainerWrapper : Placeholder;
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(Component, props);
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ColumnsEdit);

/***/ }),

/***/ "./src/ev-columns/index.js":
/*!*********************************!*\
  !*** ./src/ev-columns/index.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   metadata: () => (/* reexport default export from named module */ _block_json__WEBPACK_IMPORTED_MODULE_4__),
/* harmony export */   name: () => (/* binding */ name),
/* harmony export */   settings: () => (/* binding */ settings)
/* harmony export */ });
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _style_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./style.scss */ "./src/ev-columns/style.scss");
/* harmony import */ var _deprecated__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./deprecated */ "./src/ev-columns/deprecated.js");
/* harmony import */ var _edit__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./edit */ "./src/ev-columns/edit.js");
/* harmony import */ var _block_json__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./block.json */ "./src/ev-columns/block.json");
/* harmony import */ var _save__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./save */ "./src/ev-columns/save.js");
/* harmony import */ var _variations__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./variations */ "./src/ev-columns/variations.js");
/* harmony import */ var _transforms__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./transforms */ "./src/ev-columns/transforms.js");
/**
 * WordPress dependencies
 */




/**
 * Internal dependencies
 */






const {
  name
} = _block_json__WEBPACK_IMPORTED_MODULE_4__;

const settings = {
  icon: {
    src: 'columns',
    foreground: '#e91e63'
  },
  variations: _variations__WEBPACK_IMPORTED_MODULE_6__["default"],
  example: {
    viewportWidth: 600,
    // Columns collapse "@media (max-width: 599px)".
    innerBlocks: [{
      name: 'evidenzio/column',
      innerBlocks: [{
        name: 'core/paragraph',
        attributes: {
          /* translators: example text. */
          content: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent et eros eu felis.')
        }
      }, {
        name: 'core/image',
        attributes: {
          url: 'https://s.w.org/images/core/5.3/Windbuchencom.jpg'
        }
      }, {
        name: 'core/paragraph',
        attributes: {
          /* translators: example text. */
          content: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Suspendisse commodo neque lacus, a dictum orci interdum et.')
        }
      }]
    }, {
      name: 'evidenzio/column',
      innerBlocks: [{
        name: 'core/paragraph',
        attributes: {
          /* translators: example text. */
          content: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Etiam et egestas lorem. Vivamus sagittis sit amet dolor quis lobortis. Integer sed fermentum arcu, id vulputate lacus. Etiam fermentum sem eu quam hendrerit.')
        }
      }, {
        name: 'core/paragraph',
        attributes: {
          /* translators: example text. */
          content: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Nam risus massa, ullamcorper consectetur eros fermentum, porta aliquet ligula. Sed vel mauris nec enim.')
        }
      }]
    }]
  },
  deprecated: _deprecated__WEBPACK_IMPORTED_MODULE_2__["default"],
  edit: _edit__WEBPACK_IMPORTED_MODULE_3__["default"],
  save: _save__WEBPACK_IMPORTED_MODULE_5__["default"],
  transforms: _transforms__WEBPACK_IMPORTED_MODULE_7__["default"]
};

/***/ }),

/***/ "./src/ev-columns/save.js":
/*!********************************!*\
  !*** ./src/ev-columns/save.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ save)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/extends */ "./node_modules/@babel/runtime/helpers/esm/extends.js");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! classnames */ "./node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/block-editor */ "@wordpress/block-editor");
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_3__);


/**
 * External dependencies
 */


/**
 * WordPress dependencies
 */

function save({
  attributes
}) {
  const {
    isBoxed,
    isInvertedMobile,
    verticalAlignment,
    pymb,
    pydt,
    alt,
    url,
    urlVideo,
    width,
    allineamentoOrizzontale,
    altezzaVh,
    isVideoAutoplay,
    isVideoLoop,
    isVideoCover
  } = attributes;
  const className = classnames__WEBPACK_IMPORTED_MODULE_2___default()('row', {
    [`are-vertically-aligned-${verticalAlignment}`]: verticalAlignment,
    [`justify-content-${allineamentoOrizzontale}`]: allineamentoOrizzontale,
    [`flex-column-reverse flex-lg-row`]: isInvertedMobile
  });
  if (isBoxed) var containerClass = 'container';else var containerClass = 'container-fluid';
  if (pymb !== 'default') containerClass += ' py-' + pymb;
  if (pydt !== 'default') containerClass += ' py-lg-' + pydt;
  const blockProps = _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_3__.useBlockProps.save({
    className: altezzaVh ? `heightvh-${altezzaVh}` : null
  });
  const innerBlocksProps = _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_3__.useInnerBlocksProps.save({
    className
  });
  const poster = url ? url : false;
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("section", blockProps, !urlVideo && url && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("img", {
    src: url,
    alt: alt,
    className: "img_background"
  }), urlVideo && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("video", {
    src: urlVideo,
    className: "video_background",
    playsinline: "playsinline",
    muted: true,
    autoplay: isVideoAutoplay,
    loop: isVideoLoop,
    poster: poster
  }), urlVideo && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("span", {
    className: "iconaAudio"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    height: "1em",
    viewBox: "0 0 640 512"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("path", {
    d: "M533.6 32.5C598.5 85.3 640 165.8 640 256s-41.5 170.8-106.4 223.5c-10.3 8.4-25.4 6.8-33.8-3.5s-6.8-25.4 3.5-33.8C557.5 398.2 592 331.2 592 256s-34.5-142.2-88.7-186.3c-10.3-8.4-11.8-23.5-3.5-33.8s23.5-11.8 33.8-3.5zM473.1 107c43.2 35.2 70.9 88.9 70.9 149s-27.7 113.8-70.9 149c-10.3 8.4-25.4 6.8-33.8-3.5s-6.8-25.4 3.5-33.8C475.3 341.3 496 301.1 496 256s-20.7-85.3-53.2-111.8c-10.3-8.4-11.8-23.5-3.5-33.8s23.5-11.8 33.8-3.5zm-60.5 74.5C434.1 199.1 448 225.9 448 256s-13.9 56.9-35.4 74.5c-10.3 8.4-25.4 6.8-33.8-3.5s-6.8-25.4 3.5-33.8C393.1 284.4 400 271 400 256s-6.9-28.4-17.7-37.3c-10.3-8.4-11.8-23.5-3.5-33.8s23.5-11.8 33.8-3.5zM301.1 34.8C312.6 40 320 51.4 320 64V448c0 12.6-7.4 24-18.9 29.2s-25 3.1-34.4-5.3L131.8 352H64c-35.3 0-64-28.7-64-64V224c0-35.3 28.7-64 64-64h67.8L266.7 40.1c9.4-8.4 22.9-10.4 34.4-5.3z"
  }))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("div", {
    className: containerClass
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("div", (0,_babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({
    className: "row justify-content-"
  }, innerBlocksProps))));
}

/***/ }),

/***/ "./src/ev-columns/transforms.js":
/*!**************************************!*\
  !*** ./src/ev-columns/transforms.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/blocks */ "@wordpress/blocks");
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__);
/**
 * WordPress dependencies
 */

const MAXIMUM_SELECTED_BLOCKS = 6;
const transforms = {
  from: [{
    type: 'block',
    isMultiBlock: true,
    blocks: ['*'],
    __experimentalConvert: blocks => {
      const columnWidth = +(100 / blocks.length).toFixed(2);
      const innerBlocksTemplate = blocks.map(({
        name,
        attributes,
        innerBlocks
      }) => ['evidenzio/column', {
        width: `${columnWidth}%`
      }, [[name, {
        ...attributes
      }, innerBlocks]]]);
      return (0,_wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__.createBlock)('evidenzio/columns', {}, (0,_wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__.createBlocksFromInnerBlocksTemplate)(innerBlocksTemplate));
    },
    isMatch: ({
      length: selectedBlocksLength
    }) => selectedBlocksLength && selectedBlocksLength <= MAXIMUM_SELECTED_BLOCKS
  }, {
    type: 'block',
    blocks: ['core/media-text'],
    priority: 1,
    transform: (attributes, innerBlocks) => {
      const {
        align,
        backgroundColor,
        textColor,
        style,
        mediaAlt: alt,
        mediaId: id,
        mediaPosition,
        mediaSizeSlug: sizeSlug,
        mediaType,
        mediaUrl: url,
        mediaWidth,
        verticalAlignment
      } = attributes;
      let media;
      if (mediaType === 'image' || !mediaType) {
        const imageAttrs = {
          id,
          alt,
          url,
          sizeSlug
        };
        const linkAttrs = {
          href: attributes.href,
          linkClass: attributes.linkClass,
          linkDestination: attributes.linkDestination,
          linkTarget: attributes.linkTarget,
          rel: attributes.rel
        };
        media = ['core/image', {
          ...imageAttrs,
          ...linkAttrs
        }];
      } else {
        media = ['core/video', {
          id,
          src: url
        }];
      }
      const innerBlocksTemplate = [['evidenzio/column', {
        width: `${mediaWidth}%`
      }, [media]], ['evidenzio/column', {
        width: `${100 - mediaWidth}%`
      }, innerBlocks]];
      if (mediaPosition === 'right') {
        innerBlocksTemplate.reverse();
      }
      return (0,_wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__.createBlock)('evidenzio/columns', {
        align,
        backgroundColor,
        textColor,
        style,
        verticalAlignment
      }, (0,_wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__.createBlocksFromInnerBlocksTemplate)(innerBlocksTemplate));
    }
  }]
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (transforms);

/***/ }),

/***/ "./src/ev-columns/utils.js":
/*!*********************************!*\
  !*** ./src/ev-columns/utils.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getColumnWidths: () => (/* binding */ getColumnWidths),
/* harmony export */   getEffectiveColumnWidth: () => (/* binding */ getEffectiveColumnWidth),
/* harmony export */   getMappedColumnWidths: () => (/* binding */ getMappedColumnWidths),
/* harmony export */   getRedistributedColumnWidths: () => (/* binding */ getRedistributedColumnWidths),
/* harmony export */   getTotalColumnsWidth: () => (/* binding */ getTotalColumnsWidth),
/* harmony export */   getWidthWithUnit: () => (/* binding */ getWidthWithUnit),
/* harmony export */   getWidths: () => (/* binding */ getWidths),
/* harmony export */   hasExplicitPercentColumnWidths: () => (/* binding */ hasExplicitPercentColumnWidths),
/* harmony export */   isPercentageUnit: () => (/* binding */ isPercentageUnit),
/* harmony export */   toWidthPrecision: () => (/* binding */ toWidthPrecision)
/* harmony export */ });
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lodash */ "lodash");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_0__);
/**
 * External dependencies
 */


/**
 * Returns a column width attribute value rounded to standard precision.
 * Returns `undefined` if the value is not a valid finite number.
 *
 * @param {?number} value Raw value.
 *
 * @return {number} Value rounded to standard precision.
 */
const toWidthPrecision = value => {
  const unitlessValue = parseFloat(value);
  return Number.isFinite(unitlessValue) ? parseFloat(unitlessValue.toFixed(2)) : undefined;
};
/**
 * Returns an effective width for a given block. An effective width is equal to
 * its attribute value if set, or a computed value assuming equal distribution.
 *
 * @param {WPBlock} block           Block object.
 * @param {number}  totalBlockCount Total number of blocks in Columns.
 *
 * @return {number} Effective column width.
 */
function getEffectiveColumnWidth(block, totalBlockCount) {
  const {
    width = 100 / totalBlockCount
  } = block.attributes;
  return toWidthPrecision(width);
}

/**
 * Returns the total width occupied by the given set of column blocks.
 *
 * @param {WPBlock[]} blocks          Block objects.
 * @param {?number}   totalBlockCount Total number of blocks in Columns.
 *                                    Defaults to number of blocks passed.
 *
 * @return {number} Total width occupied by blocks.
 */
function getTotalColumnsWidth(blocks, totalBlockCount = blocks.length) {
  return (0,lodash__WEBPACK_IMPORTED_MODULE_0__.sumBy)(blocks, block => getEffectiveColumnWidth(block, totalBlockCount));
}

/**
 * Returns an object of `clientId` → `width` of effective column widths.
 *
 * @param {WPBlock[]} blocks          Block objects.
 * @param {?number}   totalBlockCount Total number of blocks in Columns.
 *                                    Defaults to number of blocks passed.
 *
 * @return {Object<string,number>} Column widths.
 */
function getColumnWidths(blocks, totalBlockCount = blocks.length) {
  return blocks.reduce((accumulator, block) => {
    const width = getEffectiveColumnWidth(block, totalBlockCount);
    return Object.assign(accumulator, {
      [block.clientId]: width
    });
  }, {});
}

/**
 * Returns an object of `clientId` → `width` of column widths as redistributed
 * proportional to their current widths, constrained or expanded to fit within
 * the given available width.
 *
 * @param {WPBlock[]} blocks          Block objects.
 * @param {number}    availableWidth  Maximum width to fit within.
 * @param {?number}   totalBlockCount Total number of blocks in Columns.
 *                                    Defaults to number of blocks passed.
 *
 * @return {Object<string,number>} Redistributed column widths.
 */
function getRedistributedColumnWidths(blocks, availableWidth, totalBlockCount = blocks.length) {
  const totalWidth = getTotalColumnsWidth(blocks, totalBlockCount);
  return (0,lodash__WEBPACK_IMPORTED_MODULE_0__.mapValues)(getColumnWidths(blocks, totalBlockCount), width => {
    const newWidth = availableWidth * width / totalWidth;
    return toWidthPrecision(newWidth);
  });
}

/**
 * Returns true if column blocks within the provided set are assigned with
 * explicit widths, or false otherwise.
 *
 * @param {WPBlock[]} blocks Block objects.
 *
 * @return {boolean} Whether columns have explicit widths.
 */
function hasExplicitPercentColumnWidths(blocks) {
  return blocks.every(block => {
    const blockWidth = block.attributes.width;
    return Number.isFinite(blockWidth?.endsWith?.('%') ? parseFloat(blockWidth) : blockWidth);
  });
}

/**
 * Returns a copy of the given set of blocks with new widths assigned from the
 * provided object of redistributed column widths.
 *
 * @param {WPBlock[]}             blocks Block objects.
 * @param {Object<string,number>} widths Redistributed column widths.
 *
 * @return {WPBlock[]} blocks Mapped block objects.
 */
function getMappedColumnWidths(blocks, widths) {
  return blocks.map(block => (0,lodash__WEBPACK_IMPORTED_MODULE_0__.merge)({}, block, {
    attributes: {
      width: `${widths[block.clientId]}%`
    }
  }));
}

/**
 * Returns an array with columns widths values, parsed or no depends on `withParsing` flag.
 *
 * @param {WPBlock[]} blocks      Block objects.
 * @param {?boolean}  withParsing Whether value has to be parsed.
 *
 * @return {Array<number,string>} Column widths.
 */
function getWidths(blocks, withParsing = true) {
  return blocks.map(innerColumn => {
    const innerColumnWidth = innerColumn.attributes.width || 100 / blocks.length;
    return withParsing ? parseFloat(innerColumnWidth) : innerColumnWidth;
  });
}

/**
 * Returns a column width with unit.
 *
 * @param {string} width Column width.
 * @param {string} unit  Column width unit.
 *
 * @return {string} Column width with unit.
 */
function getWidthWithUnit(width, unit) {
  width = 0 > parseFloat(width) ? '0' : width;
  if (isPercentageUnit(unit)) {
    width = Math.min(width, 100);
  }
  return `${width}${unit}`;
}

/**
 * Returns a boolean whether passed unit is percentage
 *
 * @param {string} unit Column width unit.
 *
 * @return {boolean} 	Whether unit is '%'.
 */
function isPercentageUnit(unit) {
  return unit === '%';
}

/***/ }),

/***/ "./src/ev-columns/variations.js":
/*!**************************************!*\
  !*** ./src/ev-columns/variations.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__);

/**
 * WordPress dependencies
 */



/** @typedef {import('@wordpress/blocks').WPBlockVariation} WPBlockVariation */

/**
 * Template option choices for predefined columns layouts.
 *
 * @type {WPBlockVariation[]}
 */
const variations = [{
  name: 'one-column-full',
  title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('100'),
  description: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('One column'),
  icon: (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.SVG, {
    width: "48",
    height: "48",
    viewBox: "0 0 48 48",
    xmlns: "http://www.w3.org/2000/svg"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Path, {
    fillRule: "evenodd",
    clipRule: "evenodd",
    d: "m39.0625 14h-30.0625v20.0938h30.0625zm-30.0625-2c-1.10457 0-2 .8954-2 2v20.0938c0 1.1045.89543 2 2 2h30.0625c1.1046 0 2-.8955 2-2v-20.0938c0-1.1046-.8954-2-2-2z"
  })),
  innerBlocks: [['evidenzio/column']],
  scope: ['block']
}, {
  name: 'three-columns-equal',
  title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('33 / 33 / 33'),
  description: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Three columns; equal split'),
  icon: (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.SVG, {
    width: "48",
    height: "48",
    viewBox: "0 0 48 48",
    xmlns: "http://www.w3.org/2000/svg"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Path, {
    fillRule: "evenodd",
    d: "M41 14a2 2 0 0 0-2-2H9a2 2 0 0 0-2 2v20a2 2 0 0 0 2 2h30a2 2 0 0 0 2-2V14zM28.5 34h-9V14h9v20zm2 0V14H39v20h-8.5zm-13 0H9V14h8.5v20z"
  })),
  innerBlocks: [['evidenzio/column'], ['evidenzio/column'], ['evidenzio/column']],
  scope: ['block']
}];
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (variations);

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/blocks */ "@wordpress/blocks");
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _style_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./style.scss */ "./src/style.scss");
/* harmony import */ var _ev_columns__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./ev-columns */ "./src/ev-columns/index.js");
/* harmony import */ var _ev_column__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./ev-column */ "./src/ev-column/index.js");




var {
  metadata,
  settings,
  name
} = _ev_columns__WEBPACK_IMPORTED_MODULE_2__;
(0,_wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__.registerBlockType)({
  name,
  ...metadata
}, settings);
var {
  metadata,
  settings,
  name
} = _ev_column__WEBPACK_IMPORTED_MODULE_3__;
(0,_wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__.registerBlockType)({
  name,
  ...metadata
}, settings);

/***/ }),

/***/ "./node_modules/bootstrap/scss/bootstrap.scss":
/*!****************************************************!*\
  !*** ./node_modules/bootstrap/scss/bootstrap.scss ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/ev-column/editor.scss":
/*!***********************************!*\
  !*** ./src/ev-column/editor.scss ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/ev-column/style.scss":
/*!**********************************!*\
  !*** ./src/ev-column/style.scss ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/ev-columns/editor.scss":
/*!************************************!*\
  !*** ./src/ev-columns/editor.scss ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/ev-columns/style.scss":
/*!***********************************!*\
  !*** ./src/ev-columns/style.scss ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/style.scss":
/*!************************!*\
  !*** ./src/style.scss ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "lodash":
/*!*************************!*\
  !*** external "lodash" ***!
  \*************************/
/***/ ((module) => {

"use strict";
module.exports = window["lodash"];

/***/ }),

/***/ "@wordpress/block-editor":
/*!*************************************!*\
  !*** external ["wp","blockEditor"] ***!
  \*************************************/
/***/ ((module) => {

"use strict";
module.exports = window["wp"]["blockEditor"];

/***/ }),

/***/ "@wordpress/blocks":
/*!********************************!*\
  !*** external ["wp","blocks"] ***!
  \********************************/
/***/ ((module) => {

"use strict";
module.exports = window["wp"]["blocks"];

/***/ }),

/***/ "@wordpress/components":
/*!************************************!*\
  !*** external ["wp","components"] ***!
  \************************************/
/***/ ((module) => {

"use strict";
module.exports = window["wp"]["components"];

/***/ }),

/***/ "@wordpress/data":
/*!******************************!*\
  !*** external ["wp","data"] ***!
  \******************************/
/***/ ((module) => {

"use strict";
module.exports = window["wp"]["data"];

/***/ }),

/***/ "@wordpress/element":
/*!*********************************!*\
  !*** external ["wp","element"] ***!
  \*********************************/
/***/ ((module) => {

"use strict";
module.exports = window["wp"]["element"];

/***/ }),

/***/ "@wordpress/i18n":
/*!******************************!*\
  !*** external ["wp","i18n"] ***!
  \******************************/
/***/ ((module) => {

"use strict";
module.exports = window["wp"]["i18n"];

/***/ }),

/***/ "@wordpress/primitives":
/*!************************************!*\
  !*** external ["wp","primitives"] ***!
  \************************************/
/***/ ((module) => {

"use strict";
module.exports = window["wp"]["primitives"];

/***/ }),

/***/ "./node_modules/classnames/index.js":
/*!******************************************!*\
  !*** ./node_modules/classnames/index.js ***!
  \******************************************/
/***/ ((module, exports) => {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*!
	Copyright (c) 2018 Jed Watson.
	Licensed under the MIT License (MIT), see
	http://jedwatson.github.io/classnames
*/
/* global define */

(function () {
	'use strict';

	var hasOwn = {}.hasOwnProperty;

	function classNames () {
		var classes = '';

		for (var i = 0; i < arguments.length; i++) {
			var arg = arguments[i];
			if (arg) {
				classes = appendClass(classes, parseValue(arg));
			}
		}

		return classes;
	}

	function parseValue (arg) {
		if (typeof arg === 'string' || typeof arg === 'number') {
			return arg;
		}

		if (typeof arg !== 'object') {
			return '';
		}

		if (Array.isArray(arg)) {
			return classNames.apply(null, arg);
		}

		if (arg.toString !== Object.prototype.toString && !arg.toString.toString().includes('[native code]')) {
			return arg.toString();
		}

		var classes = '';

		for (var key in arg) {
			if (hasOwn.call(arg, key) && arg[key]) {
				classes = appendClass(classes, key);
			}
		}

		return classes;
	}

	function appendClass (value, newClass) {
		if (!newClass) {
			return value;
		}
	
		if (value) {
			return value + ' ' + newClass;
		}
	
		return value + newClass;
	}

	if ( true && module.exports) {
		classNames.default = classNames;
		module.exports = classNames;
	} else if (true) {
		// register as 'classnames', consistent with npm package name
		!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = (function () {
			return classNames;
		}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
		__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	} else {}
}());


/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/esm/extends.js":
/*!************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/extends.js ***!
  \************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _extends)
/* harmony export */ });
function _extends() {
  _extends = Object.assign ? Object.assign.bind() : function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };
  return _extends.apply(this, arguments);
}

/***/ }),

/***/ "./src/ev-column/block.json":
/*!**********************************!*\
  !*** ./src/ev-column/block.json ***!
  \**********************************/
/***/ ((module) => {

"use strict";
module.exports = /*#__PURE__*/JSON.parse('{"$schema":"https://schemas.wp.org/trunk/block.json","apiVersion":2,"name":"evidenzio/column","title":"Ev Column","category":"text","parent":["evidenzio/columns"],"description":"A single column within a columns block.","textdomain":"default","attributes":{"verticalAlignment":{"type":"string"},"width":{"type":"string"},"allowedBlocks":{"type":"array"},"colonneMobile":{"type":"number","default":12},"colonneTablet":{"type":"number","default":12},"colonneDesktop":{"type":"number","default":""},"isDefaultMb":{"type":"boolean","default":true},"isDefaultTb":{"type":"boolean","default":true},"isDefaultDt":{"type":"boolean","default":true},"templateLock":{"type":["string","boolean"],"enum":["all","insert",false]}},"supports":{"anchor":true,"reusable":false,"html":false,"color":{"gradients":true,"link":true,"__experimentalDefaultControls":{"background":true,"text":true}},"spacing":{"padding":true,"__experimentalDefaultControls":{"padding":true}}}}');

/***/ }),

/***/ "./src/ev-columns/block.json":
/*!***********************************!*\
  !*** ./src/ev-columns/block.json ***!
  \***********************************/
/***/ ((module) => {

"use strict";
module.exports = /*#__PURE__*/JSON.parse('{"$schema":"https://schemas.wp.org/trunk/block.json","apiVersion":2,"name":"evidenzio/columns","title":"Ev Columns","category":"evblocks","description":"Display content in multiple columns, with blocks added to each column.","textdomain":"default","attributes":{"verticalAlignment":{"type":"string"},"allineamentoOrizzontale":{"type":"string"},"isBoxed":{"type":"boolean","default":true},"isInvertedMobile":{"type":"boolean","default":false},"pymb":{"type":"string","default":"default"},"pydt":{"type":"string","default":"default"},"alt":{"type":"string","source":"attribute","selector":"img","attribute":"alt","default":""},"url":{"type":"string","source":"attribute","selector":"img","attribute":"src"},"urlVideo":{"type":"string","source":"attribute","selector":"video","attribute":"src"},"altezzaVh":{"type":"string","default":null},"isVideoAutoplay":{"type":"boolean","default":false},"isVideoLoop":{"type":"boolean","default":false},"isVideoCover":{"type":"boolean","default":false}},"supports":{"anchor":true,"html":false,"color":{"gradients":true,"link":true,"__experimentalDefaultControls":{"background":true,"text":true}},"spacing":{"blockGap":true,"margin":["top","bottom"],"padding":true,"__experimentalDefaultControls":{"padding":true}},"__experimentalLayout":{"allowSwitching":false,"allowInheriting":false,"allowEditing":false,"default":{"type":"flex","flexWrap":"nowrap"}},"__experimentalBorder":{"color":true,"radius":true,"style":true,"width":true,"__experimentalDefaultControls":{"color":true,"radius":true,"style":true,"width":true}}},"editorStyle":"wp-block-columns-editor"}');

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/chunk loaded */
/******/ 	(() => {
/******/ 		var deferred = [];
/******/ 		__webpack_require__.O = (result, chunkIds, fn, priority) => {
/******/ 			if(chunkIds) {
/******/ 				priority = priority || 0;
/******/ 				for(var i = deferred.length; i > 0 && deferred[i - 1][2] > priority; i--) deferred[i] = deferred[i - 1];
/******/ 				deferred[i] = [chunkIds, fn, priority];
/******/ 				return;
/******/ 			}
/******/ 			var notFulfilled = Infinity;
/******/ 			for (var i = 0; i < deferred.length; i++) {
/******/ 				var [chunkIds, fn, priority] = deferred[i];
/******/ 				var fulfilled = true;
/******/ 				for (var j = 0; j < chunkIds.length; j++) {
/******/ 					if ((priority & 1 === 0 || notFulfilled >= priority) && Object.keys(__webpack_require__.O).every((key) => (__webpack_require__.O[key](chunkIds[j])))) {
/******/ 						chunkIds.splice(j--, 1);
/******/ 					} else {
/******/ 						fulfilled = false;
/******/ 						if(priority < notFulfilled) notFulfilled = priority;
/******/ 					}
/******/ 				}
/******/ 				if(fulfilled) {
/******/ 					deferred.splice(i--, 1)
/******/ 					var r = fn();
/******/ 					if (r !== undefined) result = r;
/******/ 				}
/******/ 			}
/******/ 			return result;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			"index": 0,
/******/ 			"style-index": 0
/******/ 		};
/******/ 		
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		__webpack_require__.O.j = (chunkId) => (installedChunks[chunkId] === 0);
/******/ 		
/******/ 		// install a JSONP callback for chunk loading
/******/ 		var webpackJsonpCallback = (parentChunkLoadingFunction, data) => {
/******/ 			var [chunkIds, moreModules, runtime] = data;
/******/ 			// add "moreModules" to the modules object,
/******/ 			// then flag all "chunkIds" as loaded and fire callback
/******/ 			var moduleId, chunkId, i = 0;
/******/ 			if(chunkIds.some((id) => (installedChunks[id] !== 0))) {
/******/ 				for(moduleId in moreModules) {
/******/ 					if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 						__webpack_require__.m[moduleId] = moreModules[moduleId];
/******/ 					}
/******/ 				}
/******/ 				if(runtime) var result = runtime(__webpack_require__);
/******/ 			}
/******/ 			if(parentChunkLoadingFunction) parentChunkLoadingFunction(data);
/******/ 			for(;i < chunkIds.length; i++) {
/******/ 				chunkId = chunkIds[i];
/******/ 				if(__webpack_require__.o(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 					installedChunks[chunkId][0]();
/******/ 				}
/******/ 				installedChunks[chunkId] = 0;
/******/ 			}
/******/ 			return __webpack_require__.O(result);
/******/ 		}
/******/ 		
/******/ 		var chunkLoadingGlobal = globalThis["webpackChunkboilerplate"] = globalThis["webpackChunkboilerplate"] || [];
/******/ 		chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
/******/ 		chunkLoadingGlobal.push = webpackJsonpCallback.bind(null, chunkLoadingGlobal.push.bind(chunkLoadingGlobal));
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module depends on other loaded chunks and execution need to be delayed
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, ["style-index"], () => (__webpack_require__("./src/index.js")))
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;
//# sourceMappingURL=index.js.map