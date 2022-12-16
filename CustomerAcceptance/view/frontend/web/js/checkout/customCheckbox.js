
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

                    // enable / disable the 'Next' button
                    if (newValue) {
                        checkVal = 1;
                        let nextButton = document.querySelectorAll('button')[5];
                        nextButton.disabled = false;

                    }

                    else {
                        checkVal = 0;
                        let nextButton = document.querySelectorAll('button')[5];
                        nextButton.disabled = true;
                    }

                    // save data
                    $.ajax({
                        showLoader: true,
                        url: linkUrls,
                        data: { checkVal: checkVal },
                        type: "POST",
                        dataType: 'json'
                    }).done(function (data) {

                    });
                });
                return this;
            },



            // enable/disable the checkbox
            showCheckbox: function () {


                var linkUrls = url.build('module/checkout/saveInQuote');
                var result = '';
                let enable_module = this.moduleStatus;
                let threshold_value = Number(this.thresholdValue);
                let countryList = this.countryList;
                let grand_total = this.grandTotal;
                let selectedCountry = quote.shippingAddress().countryId;;



                let countryMatch = this.showCheckboxByCountry(selectedCountry, countryList);
                let thresholdValueMatch = this.showCheckboxByThreshold(grand_total, threshold_value);


                // 
                if (enable_module === '1') {


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


                // initial conditions

                if (result) {

                    $.ajax({
                        showLoader: true,
                        url: linkUrls,
                        data: { checkVal: 1 },
                        type: "POST",
                        dataType: 'json'
                    }).done(function (data) {

                    });


                    let nextButton = document.querySelectorAll('button')[5];
                    nextButton.disabled = false;

                }

                else {
                    $.ajax({
                        showLoader: true,
                        url: linkUrls,
                        data: { checkVal: 0 },
                        type: "POST",
                        dataType: 'json'
                    }).done(function (data) {

                    });

                    let nextButton = document.querySelectorAll('button')[5];
                    nextButton.disabled = false;

                }




                return result;

            },

            // check if the selected country is in the list configured from backend

            showCheckboxByCountry: function (selectedCountry, countryList) {


                let countryArray = countryList.split(",");
                let result = countryArray.includes(selectedCountry);

                return result;
            },

            // check if the total price of items in the cart is above threshold value

            showCheckboxByThreshold: function (selectedValue, threshold_value) {


                return selectedValue > threshold_value ? true : false;

            },

        });
    }
);


