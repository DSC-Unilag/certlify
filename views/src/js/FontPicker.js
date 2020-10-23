(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('@samuelmeuli/font-manager')) :
	typeof define === 'function' && define.amd ? define(['@samuelmeuli/font-manager'], factory) :
	(global = global || self, global.FontPicker = factory(global.FontManager));
}(this, (function (fontManager) { 'use strict';

	var FontPicker = (function () {
	    function FontPicker(apiKey, defaultFamily, _a, onChange) {
	        if (defaultFamily === void 0) { defaultFamily = fontManager.FONT_FAMILY_DEFAULT; }
	        var _b = _a.pickerId, pickerId = _b === void 0 ? fontManager.OPTIONS_DEFAULTS.pickerId : _b, _c = _a.families, families = _c === void 0 ? fontManager.OPTIONS_DEFAULTS.families : _c, _d = _a.categories, categories = _d === void 0 ? fontManager.OPTIONS_DEFAULTS.categories : _d, _e = _a.scripts, scripts = _e === void 0 ? fontManager.OPTIONS_DEFAULTS.scripts : _e, _f = _a.variants, variants = _f === void 0 ? fontManager.OPTIONS_DEFAULTS.variants : _f, _g = _a.filter, filter = _g === void 0 ? fontManager.OPTIONS_DEFAULTS.filter : _g, _h = _a.limit, limit = _h === void 0 ? fontManager.OPTIONS_DEFAULTS.limit : _h, _j = _a.sort, sort = _j === void 0 ? fontManager.OPTIONS_DEFAULTS.sort : _j;
	        if (onChange === void 0) { onChange = function () { }; }
	        this.expanded = false;
	        this.closeEventListener = this.closeEventListener.bind(this);
	        this.toggleExpanded = this.toggleExpanded.bind(this);
	        var options = {
	            pickerId: pickerId,
	            families: families,
	            categories: categories,
	            scripts: scripts,
	            variants: variants,
	            filter: filter,
	            limit: limit,
	            sort: sort,
	        };
	        this.fontManager = new fontManager.FontManager(apiKey, defaultFamily, options, onChange);
	        this.generateUI(sort);
	    }
	    FontPicker.prototype.generateUI = function (sort) {
	        var _this = this;
	        var selectorSuffix = this.fontManager.selectorSuffix;
	        var pickerId = "font-picker" + selectorSuffix;
	        this.fontPickerDiv = document.getElementById(pickerId);
	        if (!this.fontPickerDiv) {
	            throw Error("Missing div with id=\"" + pickerId + "\"");
	        }
	        var dropdownButton = document.createElement("button");
	        dropdownButton.classList.add("dropdown-button");
	        dropdownButton.onclick = this.toggleExpanded;
	        dropdownButton.onkeypress = this.toggleExpanded;
	        dropdownButton.type = "button";
	        this.fontPickerDiv.appendChild(dropdownButton);
	        this.dropdownFamily = document.createElement("p");
	        this.dropdownFamily.textContent = this.fontManager.getActiveFont().family;
	        this.dropdownFamily.classList.add("dropdown-font-family");
	        dropdownButton.appendChild(this.dropdownFamily);
	        var dropdownIcon = document.createElement("p");
	        dropdownIcon.classList.add("dropdown-icon", "loading");
	        dropdownButton.appendChild(dropdownIcon);
	        this.fontManager
	            .init()
	            .then(function (fontMap) {
	            var fonts = Array.from(fontMap.values());
	            if (sort === "alphabet") {
	                fonts.sort(function (font1, font2) {
	                    return font1.family.localeCompare(font2.family);
	                });
	            }
	            _this.generateFontList(fonts);
	            dropdownIcon.classList.replace("loading", "finished");
	        })["catch"](function (err) {
	            dropdownIcon.classList.replace("loading", "error");
	            console.error("Error trying to fetch the list of available fonts");
	            console.error(err);
	        });
	    };
	    FontPicker.prototype.generateFontList = function (fonts) {
	        var _this = this;
	        this.ul = document.createElement("ul");
	        this.ul.classList.add("font-list");
	        fonts.forEach(function (font) {
	            _this.addFontLi(font);
	        });
	        this.fontPickerDiv.appendChild(this.ul);
	        var activeFontFamily = this.fontManager.getActiveFont().family;
	        var activeFontId = fontManager.getFontId(activeFontFamily);
	        var fontButtonId = "font-button-" + activeFontId + this.fontManager.selectorSuffix;
	        this.activeFontButton = document.getElementById(fontButtonId);
	        if (this.activeFontButton) {
	            this.activeFontButton.classList.add("active-font");
	        }
	        else {
	            console.error("Could not find font button with ID (" + fontButtonId + ")");
	        }
	    };
	    FontPicker.prototype.addFontLi = function (font, listIndex) {
	        var _this = this;
	        var fontId = fontManager.getFontId(font.family);
	        var li = document.createElement("li");
	        li.classList.add("font-list-item");
	        var fontButton = document.createElement("button");
	        fontButton.type = "button";
	        fontButton.id = "font-button-" + fontId + this.fontManager.selectorSuffix;
	        fontButton.classList.add("font-button");
	        fontButton.textContent = font.family;
	        var onActivate = function () {
	            _this.toggleExpanded();
	            _this.setActiveFont(font.family);
	        };
	        fontButton.onclick = onActivate;
	        fontButton.onkeypress = onActivate;
	        li.appendChild(fontButton);
	        if (listIndex) {
	            this.ul.insertBefore(li, this.ul.children[listIndex]);
	        }
	        else {
	            this.ul.appendChild(li);
	        }
	    };
	    FontPicker.prototype.closeEventListener = function (e) {
	        var targetEl = e.target;
	        var fontPickerEl = document.getElementById("font-picker" + this.fontManager.selectorSuffix);
	        while (true) {
	            if (targetEl === fontPickerEl) {
	                return;
	            }
	            if (targetEl.parentNode) {
	                targetEl = targetEl.parentNode;
	            }
	            else {
	                this.toggleExpanded();
	                return;
	            }
	        }
	    };
	    FontPicker.prototype.toggleExpanded = function () {
	        if (this.expanded) {
	            this.expanded = false;
	            this.fontPickerDiv.classList.remove("expanded");
	            document.removeEventListener("click", this.closeEventListener);
	        }
	        else {
	            this.expanded = true;
	            this.fontPickerDiv.classList.add("expanded");
	            document.addEventListener("click", this.closeEventListener);
	        }
	    };
	    FontPicker.prototype.getFonts = function () {
	        return this.fontManager.getFonts();
	    };
	    FontPicker.prototype.addFont = function (fontFamily, index) {
	        if (Array.from(this.fontManager.getFonts().keys()).includes(fontFamily)) {
	            throw Error("Did not add font to font picker: Font family \"" + fontFamily + "\" is already in the list");
	        }
	        this.fontManager.addFont(fontFamily, true);
	        var font = this.fontManager.getFonts().get(fontFamily);
	        if (font) {
	            this.addFontLi(font, index);
	        }
	        else {
	            console.error("Font \"" + fontFamily + "\" is missing in font list");
	        }
	    };
	    FontPicker.prototype.removeFont = function (fontFamily) {
	        this.fontManager.removeFont(fontFamily);
	        var fontId = fontManager.getFontId(fontFamily);
	        var fontButton = document.getElementById("font-button-" + fontId + this.fontManager.selectorSuffix);
	        if (fontButton) {
	            var fontLi = fontButton.parentElement;
	            fontButton.remove();
	            if (fontLi) {
	                fontLi.remove();
	            }
	        }
	        else {
	            throw Error("Could not remove font from font picker: Font family \"" + fontFamily + "\" is not in the list");
	        }
	    };
	    FontPicker.prototype.getActiveFont = function () {
	        return this.fontManager.getActiveFont();
	    };
	    FontPicker.prototype.setActiveFont = function (fontFamily) {
	        this.fontManager.setActiveFont(fontFamily);
	        var fontId = fontManager.getFontId(fontFamily);
	        this.dropdownFamily.textContent = fontFamily;
	        if (this.activeFontButton) {
	            this.activeFontButton.classList.remove("active-font");
	            this.activeFontButton = document.getElementById("font-button-" + fontId + this.fontManager.selectorSuffix);
	            this.activeFontButton.classList.add("active-font");
	        }
	        else {
	            console.error("`activeFontButton` is undefined");
	        }
	    };
	    FontPicker.prototype.setOnChange = function (onChange) {
	        this.fontManager.setOnChange(onChange);
	    };
	    return FontPicker;
	}());

	return FontPicker;

})));
//# sourceMappingURL=FontPicker.js.map
