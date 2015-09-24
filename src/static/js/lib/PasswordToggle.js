define([], function() {

    'use strict';

    var exports = function(element, options) {

        this._element = element;
        this._options = options;
        if (this._options.toggle === 'focus'){
            this._focus = true;
        }
        this._togglePassword = document.querySelector(this._options.toggle) || this._element.querySelector("[data-is-shown]");
        this._passwordField = document.querySelector(this._options.passwordField) || this._element.querySelector("[type=password]");

        // Check if elements exist
        if ( this._togglePassword && this._passwordField ) {
            this._buttonHide = this._togglePassword.getAttribute('data-hide');
            this._buttonShow = this._togglePassword.getAttribute('data-show');
        }

        this._initialize();
    };

    exports.prototype = {

        /**
         * Initiate
         */
        _initialize: function () {
            // check if certain toggles are on.
            if (this._togglePassword) {
                this._checkVisibility();
            }

            this._bindTrigger();
        },

        /**
         * Bind Trigger for password display.
         *
         * @private
         */
        _bindTrigger: function(){
            var _this = this;

            if (this._togglePassword) {
                this._togglePassword.addEventListener('click', function (e) {
                    e.defaultPrevented;
                    if (this.type === 'checkbox') {
                        if (this.checked) {
                            _this._toggleVisibility('on');
                        } else {
                            _this._toggleVisibility('off');
                        }
                    } else {
                        _this._toggleVisibility();
                    }

                });
            }

            if (this._focus) {
                this._passwordField.addEventListener('focus', function () {
                    _this._toggleVisibility('on');
                });

                this._passwordField.addEventListener('blur', function () {
                    _this._toggleVisibility('off');
                });
            }
        },

        /**
         * Toggle visibility for password field.
         *
         * @private
         */
        _toggleVisibility: function(){
            var toggleOn = arguments[0] || 'other';
            if (toggleOn === 'on') {
                this._passwordField.type  = 'text';
            } else if (toggleOn === 'off') {
                this._passwordField.type  = 'password';
            } else if (this._passwordField.getAttribute('type') === 'password') {
                this._passwordField.type  = 'text';
                this._setText(this._togglePassword, this._buttonHide);
                this._toggleData(this._togglePassword, 'data-is-shown', true);
            } else {
                this._passwordField.type = 'password';
                this._setText(this._togglePassword, this._buttonShow);
                this._toggleData(this._togglePassword, 'data-is-shown', false);
            }

        },

        /**
         * Check if checkbox for visibility password is checked.
         *
         * @private
         */
        _checkVisibility: function(){
            if (this._togglePassword.type === 'checkbox' && this._togglePassword.checked){
                this._toggleVisibility('on');
            }
        },

        /**
         * Set text to a given element's inner HTML
         *
         * @param element
         * @param content
         * @private
         */
        _setText: function(element, content) {
            if (content && this._buttonHide ) {
                element.innerHTML = content;
            }
        },

        /**
         * Set data-attribute for e.g. button or href
         *
         * @param element element that contains data-attribute
         * @param dataAttribute that has to be set
         * @param toggle: bool
         * @private
         */
        _toggleData: function(element, dataAttribute, toggle) {
            if (element.getAttribute(dataAttribute)) {
                element.setAttribute(dataAttribute, toggle);
            }
        }

    };

    return exports;

});