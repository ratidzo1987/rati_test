Number.prototype.formatMoney = function(decimals, thousands_sep, decimal_sep) {
	var n = this,
		c = isNaN(decimals) ? 2 : Math.abs(decimals),
		d = decimal_sep || '.',
		t = (typeof thousands_sep === 'undefined') ? ',' : thousands_sep,
		sign = (n < 0) ? '-' : '',
		i = parseInt(n = Math.abs(n).toFixed(c)) + '',
		j = ((j = i.length) > 3) ? j % 3 : 0;
	return sign + (j ? i.substr(0, j) + t : '') + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : ''); 
}

String.prototype.capitalizeFirstLetter = function() {
	return this.charAt(0).toUpperCase() + this.slice(1);
}

Array.prototype.remove = function() {
	var what, a = arguments, L = a.length, ax;
	while (L && this.length) {
		what = a[--L];
		while ((ax = this.indexOf(what)) !== -1) {
			this.splice(ax, 1);
		}
	}
	return this;
};

if (!Array.indexOf) {
	Array.indexOf = [].indexOf ?
		function (arr, obj, from) { return arr.indexOf(obj, from); }:
		function (arr, obj, from) {
			var l = arr.length,
				i = from ? parseInt( (1*from) + (from<0 ? l:0), 10) : 0;
			i = i<0 ? 0 : i;
			for (; i<l; i++) {
				if (i in arr  &&  arr[i] === obj) { return i; }
			}
			return -1;
		};
}

if (!Array.prototype.forEach) {
	Array.prototype.forEach = function(callback, thisArg) {
		var T, k;
		if (this == null) {
			throw new TypeError(' this is null or not defined');
		}
		var O = Object(this);
		var len = O.length >>> 0;
		if (typeof callback !== "function") {
			throw new TypeError(callback + ' is not a function');
		}
		if (arguments.length > 1) {
			T = thisArg;
		}
		k = 0;
		while (k < len) {
			var kValue;
			if (k in O) {
				kValue = O[k];
				callback.call(T, kValue, k, O);
			}
			k++;
		}
	};
}

(function(doc, proto) {
	try {
		doc.querySelector(':scope body');
	} catch (err) {
		['querySelector', 'querySelectorAll'].forEach(function(method) {
			var native = proto[method];
			proto[method] = function(selectors) {
				if (/(^|,)\s*:scope/.test(selectors)) {
					var id = this.id;
					this.id = 'ID_' + Date.now();
					selectors = selectors.replace(/((^|,)\s*):scope/g, '$1#' + this.id);
					var result = doc[method](selectors);
					this.id = id;
					return result;
				} else {
					return native.call(this, selectors);
				}
			}
		});
	}
})(window.document, Element.prototype);


















