goog.provide('ol.format.WMSCapabilities1_1_1');

goog.require('goog.asserts');
goog.require('goog.dom.NodeType');
goog.require('ol');
goog.require('ol.format.XLink');
goog.require('ol.format.XML');
goog.require('ol.format.XSD');
goog.require('ol.xml');


/**
 * @classdesc
 * Abstract base class; normally only used for creating subclasses and not
 * instantiated in apps.
 * WMS capabilities Base format for reading WMSCapabilities.
 * This class cannot be instantiated, it contains only base content/functions that
 * are shared with versioned format classes ol.format.WMSCapabilities1_1_1 and
 * ol.format.WMSCapabilities1_3_0.
 *
 * @constructor
 * @extends {ol.format.XML}
 * @api
 */
 // ol.format.WMSCapabilities1_1_1 = new ol.format.WMSCapabilitiesBase(); ???? extend
ol.format.WMSCapabilities1_1_1 = function() {

  goog.base(this);

  /**
   * @type {string|undefined}
   */
  this.version = undefined;
};
goog.inherits(ol.format.WMSCapabilities1_1_1, ol.format.XML);

//-----------------------base format---------------------------------------
/**
 * Read a WMS capabilities document.
 *
 * @function
 * @param {Document|Node|string} source The XML source.
 * @return {Object} An object representing the WMS capabilities.
 * @api
 */
ol.format.WMSCapabilities1_1_1.prototype.read;


/**
 * @param {Document} doc Document.
 * @return {Object} WMS Capability object.
 */
ol.format.WMSCapabilities1_1_1.prototype.readFromDocument = function(doc) {
  goog.asserts.assert(doc.nodeType == goog.dom.NodeType.DOCUMENT,
    'doc.nodeType should be DOCUMENT');
  for (var n = doc.firstChild; n; n = n.nextSibling) {
    if (n.nodeType == goog.dom.NodeType.ELEMENT) {
      return this.readFromNode(n);
    }
  }
  return null;
};


/**
 * @param {Node} node Node.
 * @return {Object} WMS Capability object.
 */
ol.format.WMSCapabilities1_1_1.prototype.readFromNode = function(node) {
  goog.asserts.assert(node.nodeType == goog.dom.NodeType.ELEMENT,
    'node.nodeType should be ELEMENT');
  goog.asserts.assert(node.localName == 'WMS_Capabilities' ||
    node.localName == 'WMT_MS_Capabilities',
    'localName should be WMS_Capabilities or WMT_MS_Capabilities');
  this.version = node.getAttribute('version').trim();
  goog.asserts.assertString(this.version, 'this.version should be a string');
  var wmsCapabilityObject = ol.xml.pushParseAndPop({
    'version': this.version
  }, ol.format.WMSCapabilities1_1_1.PARSERS_, node, []);
  return wmsCapabilityObject ? wmsCapabilityObject : null;
};


//---------------------Service and Capability------------------------------
/**
 * @param {Node} node Node.
 * @param {Array.<*>} objectStack Object stack.
 * @private
 * @return {Object|undefined} Service object.
 */
ol.format.WMSCapabilities1_1_1.readService_ = function(node, objectStack) {
  goog.asserts.assert(node.nodeType == goog.dom.NodeType.ELEMENT,
    'node.nodeType should be ELEMENT');
  goog.asserts.assert(node.localName == 'Service',
    'localName should be Service');
  return ol.xml.pushParseAndPop({}, ol.format.WMSCapabilities1_1_1.SERVICE_PARSERS_, node, objectStack);
};


/**
 * @param {Node} node Node.
 * @param {Array.<*>} objectStack Object stack.
 * @private
 * @return {Object|undefined} Capability object.
 */
ol.format.WMSCapabilities1_1_1.readCapability_ = function(node, objectStack) {
  goog.asserts.assert(node.nodeType == goog.dom.NodeType.ELEMENT,
    'node.nodeType should be ELEMENT');
  goog.asserts.assert(node.localName == 'Capability',
    'localName should be Capability');
  return ol.xml.pushParseAndPop({}, ol.format.WMSCapabilities1_1_1.CAPABILITY_PARSERS_, node, objectStack);
};

//-------------------------------------------------------------------------


//---------------------Service childs--------------------------------------
/**
 * @private
 * @param {Node} node Node.
 * @param {Array.<*>} objectStack Object stack.
 * @return {Array.<string>|undefined} Keyword list.
 */
ol.format.WMSCapabilities1_1_1.readKeywordList_ = function(node, objectStack) {
  goog.asserts.assert(node.nodeType == goog.dom.NodeType.ELEMENT,
    'node.nodeType should be ELEMENT');
  goog.asserts.assert(node.localName == 'KeywordList',
    'localName should be KeywordList');
  return ol.xml.pushParseAndPop(
    [], ol.format.WMSCapabilities1_1_1.KEYWORDLIST_PARSERS_, node, objectStack);
};


/**
 * @param {Node} node Node.
 * @param {Array.<*>} objectStack Object stack.
 * @private
 * @return {Object|undefined} Contact information object.
 */
ol.format.WMSCapabilities1_1_1.readContactInformation_ = function(node, objectStack) {
  goog.asserts.assert(node.nodeType == goog.dom.NodeType.ELEMENT,
    'node.nodeType shpuld be ELEMENT');
  goog.asserts.assert(node.localName == 'ContactInformation',
    'localName should be ContactInformation');
  return ol.xml.pushParseAndPop({}, ol.format.WMSCapabilities1_1_1.CONTACT_INFORMATION_PARSERS_,
    node, objectStack);
};


/**
 * @param {Node} node Node.
 * @param {Array.<*>} objectStack Object stack.
 * @private
 * @return {Object|undefined} Contact person object.
 */
ol.format.WMSCapabilities1_1_1.readContactPersonPrimary_ = function(node, objectStack) {
  goog.asserts.assert(node.nodeType == goog.dom.NodeType.ELEMENT,
    'node.nodeType should be ELEMENT');
  goog.asserts.assert(node.localName == 'ContactPersonPrimary',
    'localName should be ContactPersonPrimary');
  return ol.xml.pushParseAndPop({}, ol.format.WMSCapabilities1_1_1.CONTACT_PERSON_PARSERS_,
    node, objectStack);
};


/**
 * @param {Node} node Node.
 * @param {Array.<*>} objectStack Object stack.
 * @private
 * @return {Object|undefined} Contact address object.
 */
ol.format.WMSCapabilities1_1_1.readContactAddress_ = function(node, objectStack) {
  goog.asserts.assert(node.nodeType == goog.dom.NodeType.ELEMENT,
    'node.nodeType should be ELEMENT');
  goog.asserts.assert(node.localName == 'ContactAddress',
    'localName should be ContactAddress');
  return ol.xml.pushParseAndPop({}, ol.format.WMSCapabilities1_1_1.CONTACT_ADDRESS_PARSERS_,
    node, objectStack);
};



//---------------------Layer childs--------------------------------------
/**
 * @private
 * @param {Node} node Node.
 * @param {Array.<*>} objectStack Object stack.
 * @return {Object|undefined} Attribution object.
 */
ol.format.WMSCapabilities1_1_1.readAttribution_ = function(node, objectStack) {
  goog.asserts.assert(node.nodeType == goog.dom.NodeType.ELEMENT,
    'node.nodeType should be ELEMENT');
  goog.asserts.assert(node.localName == 'Attribution',
    'localName should be Attribution');
  return ol.xml.pushParseAndPop({}, ol.format.WMSCapabilities1_1_1.ATTRIBUTION_PARSERS_, node, objectStack);
};


//--------------------Capability childs------------------------------------
/**
 * @private
 * @param {Node} node Node.
 * @param {Array.<*>} objectStack Object stack.
 * @return {Object|undefined} Request object.
 */
ol.format.WMSCapabilities1_1_1.readRequest_ = function(node, objectStack) {
  goog.asserts.assert(node.nodeType == goog.dom.NodeType.ELEMENT,
    'node.nodeType should be ELEMENT');
  goog.asserts.assert(node.localName == 'Request',
    'localName should be Request');
  return ol.xml.pushParseAndPop({}, ol.format.WMSCapabilities1_1_1.REQUEST_PARSERS_, node, objectStack);
};


/**
 * @param {Node} node Node.
 * @param {Array.<*>} objectStack Object stack.
 * @private
 * @return {Array.<string>|undefined} Format array.
 */
ol.format.WMSCapabilities1_1_1.readException_ = function(node, objectStack) {
  goog.asserts.assert(node.nodeType == goog.dom.NodeType.ELEMENT,
    'node.nodeType should be ELEMENT');
  goog.asserts.assert(node.localName == 'Exception',
    'localName should be Exception');
  return ol.xml.pushParseAndPop(
    [], ol.format.WMSCapabilities1_1_1.EXCEPTION_PARSERS_, node, objectStack);
};


/**
 * @param {Node} node Node.
 * @param {Array.<*>} objectStack Object stack.
 * @private
 * @return {Object|undefined} Layer object.
 */
ol.format.WMSCapabilities1_1_1.readCapabilityLayer_ = function(node, objectStack) {
  goog.asserts.assert(node.nodeType == goog.dom.NodeType.ELEMENT,
    'node.nodeType should be ELEMENT');
  goog.asserts.assert(node.localName == 'Layer', 'localName should be Layer');
  return ol.xml.pushParseAndPop({}, ol.format.WMSCapabilities1_1_1.LAYER_PARSERS_, node, objectStack);
};



//----------------------------------allgemaine ----------------------------

/**
 * @private
 * @param {Node} node Node.
 * @param {Array.<*>} objectStack Object stack.
 * @return {Object|undefined} Online resource object.
 */
ol.format.WMSCapabilities1_1_1.readFormatOnlineresource_ = function(node, objectStack) {
  goog.asserts.assert(node.nodeType == goog.dom.NodeType.ELEMENT,
    'node.nodeType should be ELEMENT');
  return ol.xml.pushParseAndPop({}, ol.format.WMSCapabilities1_1_1.FORMAT_ONLINERESOURCE_PARSERS_,
    node, objectStack);
};


/**
 * @private
 * @param {Node} node Node.
 * @param {Array.<*>} objectStack Object stack.
 * @return {Object|undefined} DCP type object.
 */
ol.format.WMSCapabilities1_1_1.readDCPType_ = function(node, objectStack) {
  goog.asserts.assert(node.nodeType == goog.dom.NodeType.ELEMENT,
    'node.nodeType should be ELEMENT');
  goog.asserts.assert(node.localName == 'DCPType',
    'localName should be DCPType');
  return ol.xml.pushParseAndPop({}, ol.format.WMSCapabilities1_1_1.DCPTYPE_PARSERS_, node, objectStack);
};


/**
 * @private
 * @param {Node} node Node.
 * @param {Array.<*>} objectStack Object stack.
 * @return {Object|undefined} HTTP object.
 */
ol.format.WMSCapabilities1_1_1.readHTTP_ = function(node, objectStack) {
  goog.asserts.assert(node.nodeType == goog.dom.NodeType.ELEMENT,
    'node.nodeType should be ELEMENT');
  goog.asserts.assert(node.localName == 'HTTP', 'localName should be HTTP');
  return ol.xml.pushParseAndPop({}, ol.format.WMSCapabilities1_1_1.HTTP_PARSERS_, node, objectStack);
};


/**
 * @private
 * @param {Node} node Node.
 * @param {Array.<*>} objectStack Object stack.
 * @return {Object|undefined} Operation type object.
 */
ol.format.WMSCapabilities1_1_1.readOperationType_ = function(node, objectStack) {
  goog.asserts.assert(node.nodeType == goog.dom.NodeType.ELEMENT,
    'node.nodeType should be ELEMENT');
  return ol.xml.pushParseAndPop({}, ol.format.WMSCapabilities1_1_1.OPERATIONTYPE_PARSERS_, node, objectStack);
};


/**
 * @private
 * @param {Node} node Node.
 * @param {Array.<*>} objectStack Object stack.
 * @return {Object|undefined} Online resource object.
 */
ol.format.WMSCapabilities1_1_1.readSizedFormatOnlineresource_ = function(node, objectStack) {
  goog.asserts.assert(node.nodeType == goog.dom.NodeType.ELEMENT,
    'node.nodeType should be ELEMENT');
  var formatOnlineresource =
    ol.format.WMSCapabilities1_1_1.readFormatOnlineresource_(node, objectStack);
  if (formatOnlineresource) {
    var size = [
      ol.format.XSD.readNonNegativeIntegerString(node.getAttribute('width')),
      ol.format.XSD.readNonNegativeIntegerString(node.getAttribute('height'))
    ];
    formatOnlineresource['size'] = size;
    return formatOnlineresource;
  }
  return undefined;
};

//in Layer
/**
 * @private
 * @param {Node} node Node.
 * @param {Array.<*>} objectStack Object stack.
 * @return {Object|undefined} Authority URL object.
 */
ol.format.WMSCapabilities1_1_1.readAuthorityURL_ = function(node, objectStack) {
  goog.asserts.assert(node.nodeType == goog.dom.NodeType.ELEMENT,
    'node.nodeType should be ELEMENT');
  goog.asserts.assert(node.localName == 'AuthorityURL',
    'localName should be AuthorityURL');
  var authorityObject =
    ol.format.WMSCapabilities1_1_1.readFormatOnlineresource_(node, objectStack);
  if (authorityObject) {
    authorityObject['name'] = node.getAttribute('name');
    return authorityObject;
  }
  return undefined;
};


//in Layer
/**
 * @private
 * @param {Node} node Node.
 * @param {Array.<*>} objectStack Object stack.
 * @return {Object|undefined} Metadata URL object.
 */
ol.format.WMSCapabilities1_1_1.readMetadataURL_ = function(node, objectStack) {
  goog.asserts.assert(node.nodeType == goog.dom.NodeType.ELEMENT,
    'node.nodeType should be ELEMENT');
  goog.asserts.assert(node.localName == 'MetadataURL',
    'localName should be MetadataURL');
  var metadataObject =
    ol.format.WMSCapabilities1_1_1.readFormatOnlineresource_(node, objectStack);
  if (metadataObject) {
    metadataObject['type'] = node.getAttribute('type');
    return metadataObject;
  }
  return undefined;
};

//in Layer
/**
 * @private
 * @param {Node} node Node.
 * @param {Array.<*>} objectStack Object stack.
 * @return {Object|undefined} Style object.
 */
ol.format.WMSCapabilities1_1_1.readStyle_ = function(node, objectStack) {
  goog.asserts.assert(node.nodeType == goog.dom.NodeType.ELEMENT,
    'node.nodeType should be ELEMENT');
  goog.asserts.assert(node.localName == 'Style', 'localName should be Style');
  return ol.xml.pushParseAndPop({}, ol.format.WMSCapabilities1_1_1.STYLE_PARSERS_, node, objectStack);
};


//----------------------------not base functions---------------------------

// for version 1.1.1
/**
 * @param {Node} node Node.
 * @param {Array.<*>} objectStack Object stack.
 * @private
 * @return {Array.<string>|undefined} Format array.
 */
 /*
ol.format.WMSCapabilities1_1_1.VendorSpecificCapabilities = function(node, objectStack) {
  goog.asserts.assert(node.nodeType == goog.dom.NodeType.ELEMENT,
    'node.nodeType should be ELEMENT');
  goog.asserts.assert(node.localName == 'VendorSpecificCapabilities',
    'localName should be VendorSpecificCapabilities');
    return node.children;
};
*/


// for version 1.1.1
/**
 * @param {Node} node Node.
 * @param {Array.<*>} objectStack Object stack.
 * @private
 * @return {Object} UserDefinedSymbolization object.
 */
ol.format.WMSCapabilities1_1_1.UserDefinedSymbolization = function(node, objectStack) {
  goog.asserts.assert(node.nodeType == goog.dom.NodeType.ELEMENT,
    'node.nodeType should be ELEMENT');
  goog.asserts.assert(node.localName == 'UserDefinedSymbolization',
    'localName should be UserDefinedSymbolization');

    return {
      'SupportSLD': ol.format.XSD.readDecimalString(node.getAttribute('SupportSLD')),
      'UserLayer': ol.format.XSD.readDecimalString(node.getAttribute('UserLayer')),
      'UserStyle': ol.format.XSD.readDecimalString(node.getAttribute('UserStyle')),
      'RemoteWFS': ol.format.XSD.readDecimalString(node.getAttribute('RemoteWFS'))
    };
};

/**
 * @private
 * @param {Node} node Node.
 * @param {Array.<*>} objectStack Object stack.
 * @return {Object} Bounding box object.
 */
ol.format.WMSCapabilities1_1_1.readBoundingBox_ = function(node, objectStack) {
  goog.asserts.assert(node.nodeType == goog.dom.NodeType.ELEMENT,
    'node.nodeType should be ELEMENT');
  goog.asserts.assert(node.localName == 'BoundingBox',
    'localName should be BoundingBox');

  var extent = [
    ol.format.XSD.readDecimalString(node.getAttribute('minx')),
    ol.format.XSD.readDecimalString(node.getAttribute('miny')),
    ol.format.XSD.readDecimalString(node.getAttribute('maxx')),
    ol.format.XSD.readDecimalString(node.getAttribute('maxy'))
  ];

  var resolutions = [
    ol.format.XSD.readDecimalString(node.getAttribute('resx')),
    ol.format.XSD.readDecimalString(node.getAttribute('resy'))
  ];

  return {
    //'crs': node.getAttribute('CRS'),
    'srs': node.getAttribute('SRS'),
    'extent': extent,
    'res': resolutions
  };
};




/**
 * @private
 * @param {Node} node Node.
 * @param {Array.<*>} objectStack Object stack.
 * @return {ol.Extent|undefined} Bounding box object.
 */
ol.format.WMSCapabilities1_1_1.readLatLonBoundingBox_ = function(node, objectStack) {
  goog.asserts.assert(node.nodeType == goog.dom.NodeType.ELEMENT,
    'node.nodeType should be ELEMENT');
  goog.asserts.assert(node.localName == 'LatLonBoundingBox',
    'localName should be LatLonBoundingBox');

    var extent = [
      ol.format.XSD.readDecimalString(node.getAttribute('minx')),
      ol.format.XSD.readDecimalString(node.getAttribute('miny')),
      ol.format.XSD.readDecimalString(node.getAttribute('maxx')),
      ol.format.XSD.readDecimalString(node.getAttribute('maxy'))
    ];

    return {
      'extent': extent,
      'srs': "EPSG:4326" // FIXME get from projections
    }
};

/**
 * @private
 * @param {Node} node Node.
 * @param {Array.<*>} objectStack Object stack.
 * @return {ol.Extent|undefined} Bounding box object.
 */
ol.format.WMSCapabilities1_1_1.readEXGeographicBoundingBox_ = function(node, objectStack) {
  goog.asserts.assert(node.nodeType == goog.dom.NodeType.ELEMENT,
    'node.nodeType should be ELEMENT');
  goog.asserts.assert(node.localName == 'EX_GeographicBoundingBox',
    'localName should be EX_GeographicBoundingBox');
  var geographicBoundingBox = ol.xml.pushParseAndPop({},
    ol.format.WMSCapabilities1_1_1.EX_GEOGRAPHIC_BOUNDING_BOX_PARSERS_,
    node, objectStack);
  if (!geographicBoundingBox) {
    return undefined;
  }
  var westBoundLongitude = /** @type {number|undefined} */
    (geographicBoundingBox['westBoundLongitude']);
  var southBoundLatitude = /** @type {number|undefined} */
    (geographicBoundingBox['southBoundLatitude']);
  var eastBoundLongitude = /** @type {number|undefined} */
    (geographicBoundingBox['eastBoundLongitude']);
  var northBoundLatitude = /** @type {number|undefined} */
    (geographicBoundingBox['northBoundLatitude']);
  if (westBoundLongitude === undefined || southBoundLatitude === undefined ||
    eastBoundLongitude === undefined || northBoundLatitude === undefined) {
    return undefined;
  }
  return [
    westBoundLongitude, southBoundLatitude,
    eastBoundLongitude, northBoundLatitude
  ];
};


/**
 * @private
 * @param {Node} node Node.
 * @param {Array.<*>} objectStack Object stack.
 * @return {Object|undefined} Layer object.
 */
ol.format.WMSCapabilities1_1_1.readLayer_ = function(node, objectStack) {
  goog.asserts.assert(node.nodeType == goog.dom.NodeType.ELEMENT,
    'node.nodeType should be ELEMENT');
  goog.asserts.assert(node.localName == 'Layer', 'localName should be Layer');
  var parentLayerObject = /**  @type {Object.<string,*>} */
    (objectStack[objectStack.length - 1]);

  var layerObject = ol.xml.pushParseAndPop({}, ol.format.WMSCapabilities1_1_1.LAYER_PARSERS_, node, objectStack);

  if (!layerObject) {
    return undefined;
  }
  var queryable =
    ol.format.XSD.readBooleanString(node.getAttribute('queryable'));
  if (queryable === undefined) {
    queryable = parentLayerObject['queryable'];
  }
  layerObject['queryable'] = queryable !== undefined ? queryable : false;

  var cascaded = ol.format.XSD.readNonNegativeIntegerString(
    node.getAttribute('cascaded'));
  if (cascaded === undefined) {
    cascaded = parentLayerObject['cascaded'];
  }
  layerObject['cascaded'] = cascaded;

  var opaque = ol.format.XSD.readBooleanString(node.getAttribute('opaque'));
  if (opaque === undefined) {
    opaque = parentLayerObject['opaque'];
  }
  layerObject['opaque'] = opaque !== undefined ? opaque : false;

  var noSubsets =
    ol.format.XSD.readBooleanString(node.getAttribute('noSubsets'));
  if (noSubsets === undefined) {
    noSubsets = parentLayerObject['noSubsets'];
  }
  layerObject['noSubsets'] = noSubsets !== undefined ? noSubsets : false;

  var fixedWidth =
    ol.format.XSD.readDecimalString(node.getAttribute('fixedWidth'));
  if (!fixedWidth) {
    fixedWidth = parentLayerObject['fixedWidth'];
  }
  layerObject['fixedWidth'] = fixedWidth;

  var fixedHeight =
    ol.format.XSD.readDecimalString(node.getAttribute('fixedHeight'));
  if (!fixedHeight) {
    fixedHeight = parentLayerObject['fixedHeight'];
  }
  layerObject['fixedHeight'] = fixedHeight;

  // See 7.2.4.8
  var addKeys = ['Style', 'CRS', 'AuthorityURL'];
  addKeys.forEach(function(key) {
    if (key in parentLayerObject) {
      var childValue = layerObject[key] || [];
      layerObject[key] = childValue.concat(parentLayerObject[key]);
    }
  });

/*
  var replaceKeys = ['EX_GeographicBoundingBox', 'BoundingBox', 'Dimension',
    'Attribution', 'MinScaleDenominator', 'MaxScaleDenominator'
  ];
  */

  var replaceKeys = ['BoundingBox', 'Dimension',
    'Attribution'
  ];
  replaceKeys.forEach(function(key) {
    if (!(key in layerObject)) {
      var parentValue = parentLayerObject[key];
      layerObject[key] = parentValue;
    }
  });

  return layerObject;

  /*
  Name?, Title, Abstract?, KeywordList?, SRS*,
                  LatLonBoundingBox?, BoundingBox*, Dimension*, Extent*,
                  Attribution?, AuthorityURL*, Identifier*, MetadataURL*, DataURL*,
                  FeatureListURL*, Style*, ScaleHint?, Layer*
  */
};


/**
 * @private
 * @param {Node} node Node.
 * @param {Array.<*>} objectStack Object stack.
 * @return {Object} Dimension object.
 */
ol.format.WMSCapabilities1_1_1.readDimension_ = function(node, objectStack) {
  goog.asserts.assert(node.nodeType == goog.dom.NodeType.ELEMENT,
    'node.nodeType should be ELEMENT');
  goog.asserts.assert(node.localName == 'Dimension',
    'localName should be Dimension');
  var dimensionObject = {
    'name': node.getAttribute('name'),
    'units': node.getAttribute('units'),
    'unitSymbol': node.getAttribute('unitSymbol')
    /*
    'default': node.getAttribute('default'),
    'multipleValues': ol.format.XSD.readBooleanString(
      node.getAttribute('multipleValues')),
    'nearestValue': ol.format.XSD.readBooleanString(
      node.getAttribute('nearestValue')),
    'current': ol.format.XSD.readBooleanString(node.getAttribute('current')),
    'values': ol.format.XSD.readString(node)
    */
  };
  return dimensionObject;
};


/**
 * @private
 * @description The Extent element indicates what _values_ along a dimension are valid.
 * @param {Node} node Node.
 * @param {Array.<*>} objectStack Object stack.
 * @return {Object} Dimension Extent object.
 */
ol.format.WMSCapabilities1_1_1.readExtent_ = function(node, objectStack) {
  goog.asserts.assert(node.nodeType == goog.dom.NodeType.ELEMENT,
    'node.nodeType should be ELEMENT');
  goog.asserts.assert(node.localName == 'Extent',
    'localName should be Extent');
  var dimensionExtentObject = {
    'name': node.getAttribute('name'),
    'default': node.getAttribute('default'),
    'nearestValue': ol.format.XSD.readBooleanString(node.getAttribute('nearestValue')),
    'values': ol.format.XSD.readString(node)
  };
  return dimensionExtentObject;
};


/**
 * @private
 * @description Minimum and maximum scale hints for which it is appropriate to display this layer.
 * @param {Node} node Node.
 * @param {Array.<*>} objectStack Object stack.
 * @return {Object} ScaleHint object.
 */
ol.format.WMSCapabilities1_1_1.readScaleHint_ = function(node, objectStack) {
  goog.asserts.assert(node.nodeType == goog.dom.NodeType.ELEMENT,
    'node.nodeType should be ELEMENT');
  goog.asserts.assert(node.localName == 'ScaleHint',
    'localName should be ScaleHint');
  return {
    'min': ol.format.XSD.readDecimalString(node.getAttribute('min')),
    'max': ol.format.XSD.readDecimalString(node.getAttribute('max'))
  };
};



//-------------------------------------------------------------------------

/**
 * @const
 * @private
 * @type {Array.<string>}
 */
ol.format.WMSCapabilities1_1_1.NAMESPACE_URIS_ = [
  null,
  'http://www.opengis.net/wms'
];


/**
 * @const
 * @type {Object.<string, Object.<string, ol.xml.Parser>>}
 * @private
 */
ol.format.WMSCapabilities1_1_1.PARSERS_ = ol.xml.makeStructureNS(
  ol.format.WMSCapabilities1_1_1.NAMESPACE_URIS_, {
    'Service': ol.xml.makeObjectPropertySetter(
      ol.format.WMSCapabilities1_1_1.readService_),
    'Capability': ol.xml.makeObjectPropertySetter(
      ol.format.WMSCapabilities1_1_1.readCapability_)
  });


/**
 * @const
 * @type {Object.<string, Object.<string, ol.xml.Parser>>}
 * @private
 */
ol.format.WMSCapabilities1_1_1.CAPABILITY_PARSERS_ = ol.xml.makeStructureNS(
  ol.format.WMSCapabilities1_1_1.NAMESPACE_URIS_, {
    'Request': ol.xml.makeObjectPropertySetter(
      ol.format.WMSCapabilities1_1_1.readRequest_),
    'Exception': ol.xml.makeObjectPropertySetter(
      ol.format.WMSCapabilities1_1_1.readException_),
    'Layer': ol.xml.makeObjectPropertySetter(
      ol.format.WMSCapabilities1_1_1.readCapabilityLayer_),

    /*
        'VendorSpecificCapabilities':ol.xml.makeObjectPropertySetter(
          ol.format.WMSCapabilities1_1_1.VendorSpecificCapabilities)
    */
      'UserDefinedSymbolization': ol.xml.makeObjectPropertySetter(
      ol.format.WMSCapabilities1_1_1.UserDefinedSymbolization)
  });


/**
 * @const
 * @type {Object.<string, Object.<string, ol.xml.Parser>>}
 * @private
 */
ol.format.WMSCapabilities1_1_1.SERVICE_PARSERS_ = ol.xml.makeStructureNS(
  ol.format.WMSCapabilities1_1_1.NAMESPACE_URIS_, {
    'Name': ol.xml.makeObjectPropertySetter(ol.format.XSD.readString),
    'Title': ol.xml.makeObjectPropertySetter(ol.format.XSD.readString),
    'Abstract': ol.xml.makeObjectPropertySetter(ol.format.XSD.readString),
    'KeywordList': ol.xml.makeObjectPropertySetter(
      ol.format.WMSCapabilities1_1_1.readKeywordList_),
    'OnlineResource': ol.xml.makeObjectPropertySetter(
      ol.format.XLink.readHref),
    'ContactInformation': ol.xml.makeObjectPropertySetter(
      ol.format.WMSCapabilities1_1_1.readContactInformation_),
    'Fees': ol.xml.makeObjectPropertySetter(ol.format.XSD.readString),
    'AccessConstraints': ol.xml.makeObjectPropertySetter(
        ol.format.XSD.readString)
  });


/**
 * @const
 * @type {Object.<string, Object.<string, ol.xml.Parser>>}
 * @private
 */
ol.format.WMSCapabilities1_1_1.CONTACT_INFORMATION_PARSERS_ = ol.xml.makeStructureNS(
  ol.format.WMSCapabilities1_1_1.NAMESPACE_URIS_, {
    'ContactPersonPrimary': ol.xml.makeObjectPropertySetter(
      ol.format.WMSCapabilities1_1_1.readContactPersonPrimary_),
    'ContactPosition': ol.xml.makeObjectPropertySetter(
      ol.format.XSD.readString),
    'ContactAddress': ol.xml.makeObjectPropertySetter(
      ol.format.WMSCapabilities1_1_1.readContactAddress_),
    'ContactVoiceTelephone': ol.xml.makeObjectPropertySetter(
      ol.format.XSD.readString),
    'ContactFacsimileTelephone': ol.xml.makeObjectPropertySetter(
      ol.format.XSD.readString),
    'ContactElectronicMailAddress': ol.xml.makeObjectPropertySetter(
      ol.format.XSD.readString)
  });


/**
 * @const
 * @type {Object.<string, Object.<string, ol.xml.Parser>>}
 * @private
 */
ol.format.WMSCapabilities1_1_1.CONTACT_PERSON_PARSERS_ = ol.xml.makeStructureNS(
  ol.format.WMSCapabilities1_1_1.NAMESPACE_URIS_, {
    'ContactPerson': ol.xml.makeObjectPropertySetter(
      ol.format.XSD.readString),
    'ContactOrganization': ol.xml.makeObjectPropertySetter(
      ol.format.XSD.readString)
  });


/**
 * @const
 * @type {Object.<string, Object.<string, ol.xml.Parser>>}
 * @private
 */
ol.format.WMSCapabilities1_1_1.CONTACT_ADDRESS_PARSERS_ = ol.xml.makeStructureNS(
  ol.format.WMSCapabilities1_1_1.NAMESPACE_URIS_, {
    'AddressType': ol.xml.makeObjectPropertySetter(ol.format.XSD.readString),
    'Address': ol.xml.makeObjectPropertySetter(ol.format.XSD.readString),
    'City': ol.xml.makeObjectPropertySetter(ol.format.XSD.readString),
    'StateOrProvince': ol.xml.makeObjectPropertySetter(
      ol.format.XSD.readString),
    'PostCode': ol.xml.makeObjectPropertySetter(ol.format.XSD.readString),
    'Country': ol.xml.makeObjectPropertySetter(ol.format.XSD.readString)
  });


/**
 * @const
 * @type {Object.<string, Object.<string, ol.xml.Parser>>}
 * @private
 */
ol.format.WMSCapabilities1_1_1.EXCEPTION_PARSERS_ = ol.xml.makeStructureNS(
  ol.format.WMSCapabilities1_1_1.NAMESPACE_URIS_, {
    'Format': ol.xml.makeArrayPusher(ol.format.XSD.readString)
  });


/**
 * @const
 * @type {Object.<string, Object.<string, ol.xml.Parser>>}
 * @private
 */
ol.format.WMSCapabilities1_1_1.LAYER_PARSERS_ = ol.xml.makeStructureNS(
  ol.format.WMSCapabilities1_1_1.NAMESPACE_URIS_, {
    'Name': ol.xml.makeObjectPropertySetter(ol.format.XSD.readString),
    'Title': ol.xml.makeObjectPropertySetter(ol.format.XSD.readString),
    'Abstract': ol.xml.makeObjectPropertySetter(ol.format.XSD.readString),
    'KeywordList': ol.xml.makeObjectPropertySetter(
      ol.format.WMSCapabilities1_1_1.readKeywordList_),
    //1.3.0 'CRS': ol.xml.makeObjectPropertyPusher(ol.format.XSD.readString),
    'SRS': ol.xml.makeObjectPropertyPusher(ol.format.XSD.readString), //not base
    //1.3.0 'EX_GeographicBoundingBox': ol.xml.makeObjectPropertySetter(ol.format.WMSCapabilities1_1_1.readEXGeographicBoundingBox_),
    'LatLonBoundingBox':ol.xml.makeObjectPropertySetter(ol.format.WMSCapabilities1_1_1.readLatLonBoundingBox_),
    'BoundingBox': ol.xml.makeObjectPropertyPusher(
      ol.format.WMSCapabilities1_1_1.readBoundingBox_),
    'Dimension': ol.xml.makeObjectPropertyPusher(
      ol.format.WMSCapabilities1_1_1.readDimension_),
    'Extent':ol.xml.makeObjectPropertySetter(
      ol.format.WMSCapabilities1_1_1.readExtent_),
    'Attribution': ol.xml.makeObjectPropertySetter(
      ol.format.WMSCapabilities1_1_1.readAttribution_),
    'AuthorityURL': ol.xml.makeObjectPropertyPusher(
      ol.format.WMSCapabilities1_1_1.readAuthorityURL_),
    'Identifier': ol.xml.makeObjectPropertyPusher(ol.format.XSD.readString),
    'MetadataURL': ol.xml.makeObjectPropertyPusher(
      ol.format.WMSCapabilities1_1_1.readMetadataURL_),
    'DataURL': ol.xml.makeObjectPropertyPusher(
      ol.format.WMSCapabilities1_1_1.readFormatOnlineresource_),
    'FeatureListURL': ol.xml.makeObjectPropertyPusher(
      ol.format.WMSCapabilities1_1_1.readFormatOnlineresource_),
    'Style': ol.xml.makeObjectPropertyPusher(
      ol.format.WMSCapabilities1_1_1.readStyle_),
    'ScaleHint':ol.xml.makeObjectPropertyPusher(
      ol.format.WMSCapabilities1_1_1.readScaleHint_),
    //1.3.0 'MinScaleDenominator': ol.xml.makeObjectPropertySetter(ol.format.XSD.readDecimal),
    //1.3.0 'MaxScaleDenominator': ol.xml.makeObjectPropertySetter(ol.format.XSD.readDecimal),
    'Layer': ol.xml.makeObjectPropertyPusher(
      ol.format.WMSCapabilities1_1_1.readLayer_)
  });


/**
 * @const
 * @type {Object.<string, Object.<string, ol.xml.Parser>>}
 * @private
 */
ol.format.WMSCapabilities1_1_1.ATTRIBUTION_PARSERS_ = ol.xml.makeStructureNS(
  ol.format.WMSCapabilities1_1_1.NAMESPACE_URIS_, {
    'Title': ol.xml.makeObjectPropertySetter(ol.format.XSD.readString),
    'OnlineResource': ol.xml.makeObjectPropertySetter(
      ol.format.XLink.readHref),
    'LogoURL': ol.xml.makeObjectPropertySetter(
      ol.format.WMSCapabilities1_1_1.readSizedFormatOnlineresource_)
  });
//------------------------------------------------------------------------------

// for 1.3.0
/**
 * @const
 * @type {Object.<string, Object.<string, ol.xml.Parser>>}
 * @private
 */
ol.format.WMSCapabilities1_1_1.EX_GEOGRAPHIC_BOUNDING_BOX_PARSERS_ =
  ol.xml.makeStructureNS(ol.format.WMSCapabilities1_1_1.NAMESPACE_URIS_, {
    'westBoundLongitude': ol.xml.makeObjectPropertySetter(
      ol.format.XSD.readDecimal),
    'eastBoundLongitude': ol.xml.makeObjectPropertySetter(
      ol.format.XSD.readDecimal),
    'southBoundLatitude': ol.xml.makeObjectPropertySetter(
      ol.format.XSD.readDecimal),
    'northBoundLatitude': ol.xml.makeObjectPropertySetter(
      ol.format.XSD.readDecimal)
  });


/**
 * @const
 * @type {Object.<string, Object.<string, ol.xml.Parser>>}
 * @private
 */
ol.format.WMSCapabilities1_1_1.REQUEST_PARSERS_ = ol.xml.makeStructureNS(
  ol.format.WMSCapabilities1_1_1.NAMESPACE_URIS_, {
    'GetCapabilities': ol.xml.makeObjectPropertySetter(
      ol.format.WMSCapabilities1_1_1.readOperationType_),
    'GetMap': ol.xml.makeObjectPropertySetter(
      ol.format.WMSCapabilities1_1_1.readOperationType_),
    'GetFeatureInfo': ol.xml.makeObjectPropertySetter(
        ol.format.WMSCapabilities1_1_1.readOperationType_)
      //1.3.0 '_ExtendedOperation'
      //1.1.1 'DescribeLayer?, GetLegendGraphic?, GetStyles?, PutStyles?'
  });


/**
 * @const
 * @type {Object.<string, Object.<string, ol.xml.Parser>>}
 * @private
 */
ol.format.WMSCapabilities1_1_1.OPERATIONTYPE_PARSERS_ = ol.xml.makeStructureNS(
  ol.format.WMSCapabilities1_1_1.NAMESPACE_URIS_, {
    'Format': ol.xml.makeObjectPropertyPusher(ol.format.XSD.readString),
    'DCPType': ol.xml.makeObjectPropertyPusher(
      ol.format.WMSCapabilities1_1_1.readDCPType_)
  });


/**
 * @const
 * @type {Object.<string, Object.<string, ol.xml.Parser>>}
 * @private
 */
ol.format.WMSCapabilities1_1_1.DCPTYPE_PARSERS_ = ol.xml.makeStructureNS(
  ol.format.WMSCapabilities1_1_1.NAMESPACE_URIS_, {
    'HTTP': ol.xml.makeObjectPropertySetter(
      ol.format.WMSCapabilities1_1_1.readHTTP_)
  });


/**
 * @const
 * @type {Object.<string, Object.<string, ol.xml.Parser>>}
 * @private
 */
ol.format.WMSCapabilities1_1_1.HTTP_PARSERS_ = ol.xml.makeStructureNS(
  ol.format.WMSCapabilities1_1_1.NAMESPACE_URIS_, {
    'Get': ol.xml.makeObjectPropertySetter(
      ol.format.WMSCapabilities1_1_1.readFormatOnlineresource_),
    'Post': ol.xml.makeObjectPropertySetter(
      ol.format.WMSCapabilities1_1_1.readFormatOnlineresource_)
  });


/**
 * @const
 * @type {Object.<string, Object.<string, ol.xml.Parser>>}
 * @private
 */
ol.format.WMSCapabilities1_1_1.STYLE_PARSERS_ = ol.xml.makeStructureNS(
  ol.format.WMSCapabilities1_1_1.NAMESPACE_URIS_, {
    'Name': ol.xml.makeObjectPropertySetter(ol.format.XSD.readString),
    'Title': ol.xml.makeObjectPropertySetter(ol.format.XSD.readString),
    'Abstract': ol.xml.makeObjectPropertySetter(ol.format.XSD.readString),
    'LegendURL': ol.xml.makeObjectPropertyPusher(
      ol.format.WMSCapabilities1_1_1.readSizedFormatOnlineresource_),
    'StyleSheetURL': ol.xml.makeObjectPropertySetter(
      ol.format.WMSCapabilities1_1_1.readFormatOnlineresource_),
    'StyleURL': ol.xml.makeObjectPropertySetter(
      ol.format.WMSCapabilities1_1_1.readFormatOnlineresource_)
  });


/**
 * @const
 * @type {Object.<string, Object.<string, ol.xml.Parser>>}
 * @private
 */
ol.format.WMSCapabilities1_1_1.FORMAT_ONLINERESOURCE_PARSERS_ =
  ol.xml.makeStructureNS(ol.format.WMSCapabilities1_1_1.NAMESPACE_URIS_, {
    'Format': ol.xml.makeObjectPropertySetter(ol.format.XSD.readString),
    'OnlineResource': ol.xml.makeObjectPropertySetter(
      ol.format.XLink.readHref)
  });


/**
 * @const
 * @type {Object.<string, Object.<string, ol.xml.Parser>>}
 * @private
 */
ol.format.WMSCapabilities1_1_1.KEYWORDLIST_PARSERS_ = ol.xml.makeStructureNS(
  ol.format.WMSCapabilities1_1_1.NAMESPACE_URIS_, {
    'Keyword': ol.xml.makeArrayPusher(ol.format.XSD.readString)
  });
