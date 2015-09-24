# PasswordToggler
Password field display/hide component. 

## Workings
This component uses a toggle and the password input and gives the opportunity to display the password to the user.
No need for asking twice for a password, the user can decide to check the password before submitting.

### How does it work?
You can require the PasswordToggle on a form or other parent element.

## Library information
The library can be found in the ``` src/static/js/lib ``` folder.

### Manual initialization 
The structure can be as following:
```html
    <form id="passwordToggleForm">
        <label for="password">Password </label>
        <input id="password" type="password" />
        <button type="button" id="togglePassword" data-show="show password" data-hide="hide password" data-is-shown="false">show password</button>
    </form>
```
And this can be initialized with:
```js
require(['lib/PasswordToggle'], function(PasswordToggle){
    var node = document.getElementById('passwordToggleForm'),
        options = {
            passwordField: '#password', 
            toggle: '#togglePassword' 
        };

    new PasswordToggle(node, options);
});
```

### Automatic initialization with require
Or with require & conditioner
```html
<form id="passwordToggleForm" data-module="utils\PasswordToggle" data-options='{ "toggle": "#togglePasswordId", "passwordField" : "#passwordFieldId"}'>
    <label for="password">Password </label>
    <input id="passwordFieldId" type="password" />
    <button type="button" id="togglePasswordId" data-show="show password" data-hide="hide password" data-is-shown="false">show password</button>
</form>
```
The options with field ID's are not mandatory but I recommend using them. There is a default fallback selector, for the password field the fall back is ```[type=password]``` and for the button the fallback is ```[data-is-shown]```.

## Browsersupport
* All modern browsers
* IE 10 and newer