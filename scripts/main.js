"use strict";var tag_selectedStoreId="selectedStoreId";$(document).ready(function(){var t=$("#cd-store-selector"),e=$("#datetimepicker"),a=$("#discount-amount-selector"),o=$("#dicountgen-form");$(t).select2({theme:"bootstrap"});var r=localStorage.getItem(tag_selectedStoreId);null!==r?$(t).val(r).trigger("change"):$(t),$(e).datetimepicker({format:"DD/MM/YYYY",useCurrent:!1,minDate:moment(),defaultDate:moment().add(Math.floor(11*Math.random())+15,"days")}),$(o).on("submit",function(o){o.preventDefault();var r=$(a).val(),n=$(e).data("DateTimePicker").date(),c=$(t).val(),d=createBarcodeText(n,c,r);return displayBarcode(d),!1}),$(t).on("select2:select",function(e){localStorage.setItem(tag_selectedStoreId,$(t).val())})});var createBarcodeText=function(t,e,a){var o=moment([2007,3,16]),r=t.subtract(1,"month").diff(o,"days"),n="22"+r.toString()+e.substring(1)+(50+parseInt(a)).toString()+"1";return n},displayBarcode=function(t){$("#barcode").JsBarcode(t,{format:"EAN13",background:"#FFFFFF",lineColor:"#000000",fontSize:20,height:100,width:"2.5",margin:10,textMargin:2,displayValue:!0,font:"monospace",fontOptions:"",textAlign:"center",textPosition:"top"})};