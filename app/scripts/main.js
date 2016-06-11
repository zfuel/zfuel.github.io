var tag_selectedStoreId = 'selectedStoreId';

$(document).ready(function () {
    var storesel = $('#cd-store-selector');
    var datesel = $('#datetimepicker');
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

    $(datesel).datetimepicker({
        format: 'DD/MM/YYYY',
        useCurrent: false,
        minDate: moment(),
        defaultDate: moment().add(Math.floor(Math.random() * (25 - 15 + 1)) + 15, 'days')
    });

    $(genform).on('submit', function (event) {
        event.preventDefault();

        var selectedDiscount = $(discountsel).val();
        var selectedDate = $(datesel).data('DateTimePicker').date();
        var selectedStore = $(storesel).val()

        var barcodeText = createBarcodeText(selectedDate, selectedStore, selectedDiscount)
        displayBarcode(barcodeText);

        return false;
    });

    $(storesel).on('select2:select', function (e) {
        localStorage.setItem(tag_selectedStoreId, $(storesel).val());
    });

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

var displayBarcode = function (barcodeText) {
    $('#barcode').JsBarcode(barcodeText, {
        format: 'EAN13',
        background: '#FFFFFF',
        lineColor: '#000000',
        fontSize: 20,
        height: 100,
        width: '2.5',
        margin: 10,
        textMargin: 2,
        displayValue: true,
        font: 'monospace',
        fontOptions: '',
        textAlign: 'center',
        textPosition: 'top'
    }
    );
}