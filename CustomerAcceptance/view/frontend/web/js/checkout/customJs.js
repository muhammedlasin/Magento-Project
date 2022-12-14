
define(
    [
        'ko',
        'jquery',
        'uiComponent',
        'mage/url',
        'Magento_Checkout/js/model/quote',
        'domReady!',
        'Magento_Ui/js/form/element/abstract',
        'Magento_Ui/js/form/form'
    ],
    function (ko, $, Component, url, quote) {


        'use strict';
        return Component.extend({
            defaults: {

                template: 'TerrificMinds_CustomerAcceptance/checkout/customCheckbox'
            },




            initialize: function () {


                var self = this;
                this._super();





            },



            initObservable: function () {

                this._super()
                    .observe({
                        CheckVals: ko.observable(true)
                    });
                var checkVal = 0;
                var self = this;
                this.CheckVals.subscribe(function (newValue) {




                    var linkUrls = url.build('module/checkout/saveInQuote');
                    if (newValue) {
                        checkVal = 1;


                        let elem = document.querySelectorAll('button')[5];
                        console.log(elem);
                        elem.disabled = false;


                    }
                    else {
                        checkVal = 0;
                        let elem = document.querySelectorAll('button')[5];
                        console.log(elem);
                        elem.disabled = true;
                    }
                    $.ajax({
                        showLoader: true,
                        url: linkUrls,
                        data: { checkVal: checkVal },
                        type: "POST",
                        dataType: 'json'
                    }).done(function (data) {
                        console.log('success');
                    });
                });
                return this;
            },

            showCheckbox: function () {


                var result = '';



                let enable = this.myKey2;
                let threshold_value = Number(this.myKey3);
                let countryList = this.myKey;
                let selectedValue = this.myKey4;
                let selectedCountry = quote.shippingAddress().countryId;;



                let countryMatch = this.showCheckboxByCountry(selectedCountry, countryList);
                let thresholdValueMatch = this.showCheckboxByThreshold(selectedValue, threshold_value);



                if (enable === '1') {


                    if (countryMatch) {
                        if (thresholdValueMatch) {
                            result = true;

                        }
                        else {
                            result = false;
                        }
                    }
                    else {
                        result = false;
                    }
                }
                else {
                    result = false;
                }

                return result;

            },
            showCheckboxByCountry: function (selectedCountry, countryList) {

                let countryArray = countryList.split(",");
                let result = countryArray.includes(selectedCountry);

                return result;
            },

            showCheckboxByThreshold: function (selectedValue, threshold_value) {

                console.log(selectedValue);

                return selectedValue > threshold_value ? true : false;

            },


        });
    }
);


