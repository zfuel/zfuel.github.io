var tag_selectedStoreId = 'selectedStoreId';

$(document).ready(function () {
    var storesel = $('#cd-store-selector');
    var datesel = $('#datetimepicker');
    var datesel2 = $('#datepicker');
    var discountsel = $('#discount-amount-selector');
    var genform = $('#dicountgen-form');

    $(storesel).select2({
        theme: 'bootstrap'
    });

    var selctd = localStorage.getItem(tag_selectedStoreId);
    if (selctd !== null) {
        $(storesel).val(selctd).trigger('change');
    } else {
        $(storesel)
    }

    // $(datesel).datetimepicker({
    //     format: 'DD/MM/YYYY',
    //     useCurrent: false,
    //     minDate: moment(),
    //     defaultDate: newValidRandomMoment()
    // });

    datesel2.pickadate({
        min : moment().toDate(),
        onStart : function(){
            this.set('select', newValidRandomMoment().toDate());
        }
    })

    $(genform).on('submit', function (event) {
        event.preventDefault();

        var selectedDiscount = $(discountsel).val();
        var selectedDate = moment(datesel2.data('pickadate').get('select'))
        // var selectedDate = $(datesel).data('DateTimePicker').date();
        var selectedStore = $(storesel).val()

        var barcodeText = createBarcodeText(selectedDate, selectedStore, selectedDiscount)
        displayBarcode(barcodeText);

        return false;
    });

    // $(storesel).on('select2:select', function (e) {
    //     localStorage.setItem(tag_selectedStoreId, $(storesel).val());
    // });

});

var createBarcodeText = function (expireDate, cdStore, discount) {
    var startDate = moment([2007, 3, 16]);
    var numDays = expireDate.subtract(1, 'month').diff(startDate, 'days');
    var retval = '' +
        '22' +
        numDays.toString() +
        cdStore.substring(1) +
        (50 + parseInt(discount)).toString() +
        '1';
    return retval;
}

var newValidRandomMoment = function(){
    var date = moment().add(Math.floor(Math.random() * (25 - 15 + 1)) + 15, 'days');
    return date;
}

var displayBarcode = function (barcodeText) {
    $('#barcode').JsBarcode(barcodeText, {
        format: 'EAN13',
        background: '#FFFFFF',
        lineColor: '#000000',
        fontSize: 20,
        height: 100,
        width: 3,
        margin: 10,
        textMargin: 1,
        displayValue: true,
        font: 'monospace',
        fontOptions: '',
        textAlign: 'center',
        textPosition: 'top'
    }
    );
}