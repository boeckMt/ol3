//goog.require('ol.format.WMSCapabilities');
goog.require('ol.format.WMSCapabilities1_3_0');
goog.require('ol.format.WMSCapabilities1_1_1');
/*
var parser1_3_0 = new ol.format.WMSCapabilities1_3_0();
var parser1_1_1 = new ol.format.WMSCapabilities1_1_1();
*/
var select = document.getElementById("wmsVersion");
var  wmsvmap = {
  '1.1.1':{
    'xml':'data/getcapabilities_1.1.1.xml',
    'parser': new ol.format.WMSCapabilities1_1_1()
},
  '1.3.0':{
    'xml': 'data/ogcsample.xml',
    'parser':new ol.format.WMSCapabilities1_3_0()
  }
}
var wmsVersion = select.options[select.selectedIndex].value;


select.addEventListener("change", function(data){
  wmsVersion = select.options[select.selectedIndex].value;
  if(wmsvmap[wmsVersion]){
    getCapabilities(wmsvmap[wmsVersion]);
  }else{
    console.log('version not defined!')
  }

});


function getCapabilities(wmsv){
  fetch(wmsv.xml).then(function(response) {
    return response.text();
  }).then(function(text) {
    var result = wmsv.parser.read(text);
    console.log(result)
    document.getElementById('log').innerText = JSON.stringify(result, null, 2);
  });
}

select.selectedIndex = 0;
getCapabilities(wmsvmap['1.1.1']);
