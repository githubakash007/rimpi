(function (window,undefined) {
  var rimpi = function (selector) {

    if (!(this instanceof rimpi)) {
      return new rimpi(selector);
    }

    var elements;
    if (typeof selector === 'string') {
      elements = document.querySelectorAll(selector);
    }
    else if (selector.length) {
      elements = selector;
    }
    else {
      elements = [selector];
    }

    for (var i = 0; i < elements.length; i++) {
      this[i] = elements[i];
    }
    this.length = elements.length;
  }


  rimpi.prototype.map = function (callback) {

    var result = [];
    for (var i = 0; i < this.length; i++) {
      result.push(callback.call(this, this[i], i));
    }
    return result;

  }

  rimpi.prototype.forEach = function (callback) {
    for (var i = 0; i < this.length; i++) {
      callback.call(this, this[i], i);
    }

    return this;
  }

  rimpi.prototype.text = function (txt) {

    // console.log(this);
    if (txt !== undefined) {
      return this.forEach(function (el) {
        el.innerText = txt;

      });
    }
    else {

      var m = this.map(function (el) {
        return el.innerText;
      });

      return m.length > 1 ? m : m[0];
    }

  }

  rimpi.prototype.filter = function (callback) {

    var filteredList = [];

    for (var i = 0; i < this.length; i++) {
      if (callback.call(this, this[i], i)) {
        filteredList.push(this[i].innerText);
      }
    }

    return filteredList;
  }


  //Email first Part must contain atleast 6 character
  // length :: [Number] → Number
  rimpi.validateEmail = function (email) {
    let regex = "^([a-z]{6}_?(\d{3})?)@([A-Za-z]{3})\.([a-z]{2,3})$";
    return /regex/.test(email);
  }
  window.rimpi = window.r = rimpi;
})(window,undefined)