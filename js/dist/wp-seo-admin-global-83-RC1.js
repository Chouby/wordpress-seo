yoastWebpackJsonp([27],{

/***/ 2225:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\n/* global ajaxurl */\n/* global wpseoAdminGlobalL10n, wpseoConsoleNotifications */\n/* jshint -W097 */\n/* jshint unused:false */\n\n(function ($) {\n\t/**\n  * Displays console notifications.\n  *\n  * Looks at a global variable to display all notifications in there.\n  *\n  * @returns {void}\n  */\n\tfunction displayConsoleNotifications() {\n\t\tif (typeof window.wpseoConsoleNotifications === \"undefined\" || typeof console === \"undefined\") {\n\t\t\treturn;\n\t\t}\n\n\t\t/* jshint ignore:start */\n\t\tfor (var index = 0; index < wpseoConsoleNotifications.length; index++) {\n\t\t\tconsole.warn(wpseoConsoleNotifications[index]);\n\t\t}\n\t\t/* jshint ignore:end */\n\t}\n\n\tjQuery(document).ready(displayConsoleNotifications);\n\n\t/**\n  * Used to dismiss the tagline notice for a specific user.\n  *\n  * @param {string} nonce Nonce for verification.\n  *\n  * @returns {void}\n  */\n\tfunction wpseoDismissTaglineNotice(nonce) {\n\t\tjQuery.post(ajaxurl, {\n\t\t\taction: \"wpseo_dismiss_tagline_notice\",\n\t\t\t_wpnonce: nonce\n\t\t});\n\t}\n\n\t/**\n  * Used to remove the admin notices for several purposes, dies on exit.\n  *\n  * @param {string} option The option to ignore.\n  * @param {string} hide   The target element to hide.\n  * @param {string} nonce  Nonce for verification.\n  *\n  * @returns {void}\n  */\n\tfunction wpseoSetIgnore(option, hide, nonce) {\n\t\tjQuery.post(ajaxurl, {\n\t\t\taction: \"wpseo_set_ignore\",\n\t\t\toption: option,\n\t\t\t_wpnonce: nonce\n\t\t}, function (data) {\n\t\t\tif (data) {\n\t\t\t\tjQuery(\"#\" + hide).hide();\n\t\t\t\tjQuery(\"#hidden_ignore_\" + option).val(\"ignore\");\n\t\t\t}\n\t\t});\n\t}\n\n\t/**\n  * Generates a dismissable anchor button.\n  *\n  * @param {string} dismissLink The URL that leads to the dismissing of the notice.\n  *\n  * @returns {Object} Anchor to dismiss.\n  */\n\tfunction wpseoDismissLink(dismissLink) {\n\t\treturn jQuery('<a href=\"' + dismissLink + '\" type=\"button\" class=\"notice-dismiss\">' + '<span class=\"screen-reader-text\">Dismiss this notice.</span>' + \"</a>\");\n\t}\n\n\tjQuery(document).ready(function () {\n\t\tjQuery(\".yoast-dismissible\").on(\"click\", \".yoast-notice-dismiss\", function () {\n\t\t\tvar $parentDiv = jQuery(this).parent();\n\n\t\t\t// Deprecated, todo: remove when all notifiers have been implemented.\n\t\t\tjQuery.post(ajaxurl, {\n\t\t\t\taction: $parentDiv.attr(\"id\").replace(/-/g, \"_\"),\n\t\t\t\t_wpnonce: $parentDiv.data(\"nonce\"),\n\t\t\t\tdata: $parentDiv.data(\"json\")\n\t\t\t});\n\n\t\t\tjQuery.post(ajaxurl, {\n\t\t\t\taction: \"yoast_dismiss_notification\",\n\t\t\t\tnotification: $parentDiv.attr(\"id\"),\n\t\t\t\tnonce: $parentDiv.data(\"nonce\"),\n\t\t\t\tdata: $parentDiv.data(\"json\")\n\t\t\t});\n\n\t\t\t$parentDiv.fadeTo(100, 0, function () {\n\t\t\t\t$parentDiv.slideUp(100, function () {\n\t\t\t\t\t$parentDiv.remove();\n\t\t\t\t});\n\t\t\t});\n\n\t\t\treturn false;\n\t\t});\n\n\t\tjQuery(\".yoast-help-button\").on(\"click\", function () {\n\t\t\tvar $button = jQuery(this),\n\t\t\t    helpPanel = jQuery(\"#\" + $button.attr(\"aria-controls\")),\n\t\t\t    isPanelVisible = helpPanel.is(\":visible\");\n\n\t\t\tjQuery(helpPanel).slideToggle(200, function () {\n\t\t\t\t$button.attr(\"aria-expanded\", !isPanelVisible);\n\t\t\t});\n\t\t});\n\t});\n\twindow.wpseoDismissTaglineNotice = wpseoDismissTaglineNotice;\n\twindow.wpseoSetIgnore = wpseoSetIgnore;\n\twindow.wpseoDismissLink = wpseoDismissLink;\n\n\t/**\n  * Hides popup showing new alerts message.\n  *\n  * @returns {void}\n  */\n\tfunction hideAlertPopup() {\n\t\t// Remove the namespaced hover event from the menu top level list items.\n\t\t$(\"#wp-admin-bar-root-default > li\").off(\"mouseenter.yoastalertpopup mouseleave.yoastalertpopup\");\n\t\t// Hide the notification popup by fading it out.\n\t\t$(\".yoast-issue-added\").fadeOut(200);\n\t}\n\n\t/**\n  * Shows popup with new alerts message.\n  *\n  * @returns {void}\n  */\n\tfunction showAlertPopup() {\n\t\t// Attach an hover event and show the notification popup by fading it in.\n\t\t$(\".yoast-issue-added\").on(\"mouseenter mouseleave\", function (evt) {\n\t\t\t// Avoid the hover event to propagate on the parent elements.\n\t\t\tevt.stopPropagation();\n\t\t\t// Hide the notification popup when hovering on it.\n\t\t\thideAlertPopup();\n\t\t}).fadeIn();\n\n\t\t/*\n   * Attach a namespaced hover event on the menu top level items to hide\n   * the notification popup when hovering them.\n   * Note: this will work just the first time the list items get hovered in the\n   * first 3 seconds after DOM ready because this event is then removed.\n   */\n\t\t$(\"#wp-admin-bar-root-default > li\").on(\"mouseenter.yoastalertpopup mouseleave.yoastalertpopup\", hideAlertPopup);\n\n\t\t// Hide the notification popup after 3 seconds from DOM ready.\n\t\tsetTimeout(hideAlertPopup, 3000);\n\t}\n\n\t/**\n  * Handles dismiss and restore AJAX responses.\n  *\n  * @param {Object} $source Object that triggered the request.\n  * @param {Object} response AJAX response.\n  *\n  * @returns {void}\n  */\n\tfunction handleDismissRestoreResponse($source, response) {\n\t\t$(\".yoast-alert-holder\").off(\"click\", \".restore\").off(\"click\", \".dismiss\");\n\n\t\tif (typeof response.html === \"undefined\") {\n\t\t\treturn;\n\t\t}\n\n\t\tif (response.html) {\n\t\t\t$source.closest(\".yoast-container\").html(response.html);\n\t\t\t/* jshint ignore:start */\n\t\t\t/* eslint-disable */\n\t\t\thookDismissRestoreButtons();\n\t\t\t/* jshint ignore:end */\n\t\t\t/* eslint-enable */\n\t\t}\n\n\t\tvar $wpseoMenu = $(\"#wp-admin-bar-wpseo-menu\");\n\t\tvar $issueCounter = $wpseoMenu.find(\".yoast-issue-counter\");\n\n\t\tif (!$issueCounter.length) {\n\t\t\t$wpseoMenu.find(\"> a:first-child\").append('<div class=\"yoast-issue-counter\"/>');\n\t\t\t$issueCounter = $wpseoMenu.find(\".yoast-issue-counter\");\n\t\t}\n\n\t\t$issueCounter.html(response.total);\n\t\tif (response.total === 0) {\n\t\t\t$issueCounter.hide();\n\t\t} else {\n\t\t\t$issueCounter.show();\n\t\t}\n\n\t\t$(\"#toplevel_page_wpseo_dashboard .update-plugins\").removeClass().addClass(\"update-plugins count-\" + response.total);\n\t\t$(\"#toplevel_page_wpseo_dashboard .plugin-count\").html(response.total);\n\t}\n\n\t/**\n  * Hooks the restore and dismiss buttons.\n  *\n  * @returns {void}\n  */\n\tfunction hookDismissRestoreButtons() {\n\t\tvar $dismissible = $(\".yoast-alert-holder\");\n\n\t\t$dismissible.on(\"click\", \".dismiss\", function () {\n\t\t\tvar $this = $(this);\n\t\t\tvar $source = $this.closest(\".yoast-alert-holder\");\n\n\t\t\tvar $container = $this.closest(\".yoast-container\");\n\t\t\t$container.append('<div class=\"yoast-container-disabled\"/>');\n\n\t\t\t$this.find(\"span\").removeClass(\"dashicons-no-alt\").addClass(\"dashicons-randomize\");\n\n\t\t\t$.post(ajaxurl, {\n\t\t\t\taction: \"yoast_dismiss_alert\",\n\t\t\t\tnotification: $source.attr(\"id\"),\n\t\t\t\tnonce: $source.data(\"nonce\"),\n\t\t\t\tdata: $source.data(\"json\")\n\t\t\t}, handleDismissRestoreResponse.bind(this, $source), \"json\");\n\t\t});\n\n\t\t$dismissible.on(\"click\", \".restore\", function () {\n\t\t\tvar $this = $(this);\n\t\t\tvar $source = $this.closest(\".yoast-alert-holder\");\n\n\t\t\tvar $container = $this.closest(\".yoast-container\");\n\t\t\t$container.append('<div class=\"yoast-container-disabled\"/>');\n\n\t\t\t$this.find(\"span\").removeClass(\"dashicons-arrow-up\").addClass(\"dashicons-randomize\");\n\n\t\t\t$.post(ajaxurl, {\n\t\t\t\taction: \"yoast_restore_alert\",\n\t\t\t\tnotification: $source.attr(\"id\"),\n\t\t\t\tnonce: $source.data(\"nonce\"),\n\t\t\t\tdata: $source.data(\"json\")\n\t\t\t}, handleDismissRestoreResponse.bind(this, $source), \"json\");\n\t\t});\n\t}\n\n\t/**\n  * Sets the color of the svg for the premium indicator based on the color of the color scheme.\n  *\n  * @returns {void}\n  */\n\tfunction setPremiumIndicatorColor() {\n\t\tvar $premiumIndicator = jQuery(\".wpseo-js-premium-indicator\");\n\t\tvar $svg = $premiumIndicator.find(\"svg\");\n\n\t\t// Don't change the color to stand out when premium is actually enabled.\n\t\tif ($premiumIndicator.hasClass(\"wpseo-premium-indicator--no\")) {\n\t\t\tvar $svgPath = $svg.find(\"path\");\n\n\t\t\tvar backgroundColor = $premiumIndicator.css(\"backgroundColor\");\n\n\t\t\t$svgPath.css(\"fill\", backgroundColor);\n\t\t}\n\n\t\t$svg.css(\"display\", \"block\");\n\t\t$premiumIndicator.css({\n\t\t\tbackgroundColor: \"transparent\",\n\t\t\twidth: \"20px\",\n\t\t\theight: \"20px\"\n\t\t});\n\t}\n\n\t/**\n  * Checks a scrollable table width.\n  *\n  * Compares the scrollable table width against the size of its container and\n  * adds or removes CSS classes accordingly.\n  *\n  * @param {object} table A jQuery object with one scrollable table.\n  * @returns {void}\n  */\n\tfunction checkScrollableTableSize(table) {\n\t\t// Bail if the table is hidden.\n\t\tif (table.is(\":hidden\")) {\n\t\t\treturn;\n\t\t}\n\n\t\t// When the table is wider than its parent, make it scrollable.\n\t\tif (table.outerWidth() > table.parent().outerWidth()) {\n\t\t\ttable.data(\"scrollHint\").addClass(\"yoast-has-scroll\");\n\t\t\ttable.data(\"scrollContainer\").addClass(\"yoast-has-scroll\");\n\t\t} else {\n\t\t\ttable.data(\"scrollHint\").removeClass(\"yoast-has-scroll\");\n\t\t\ttable.data(\"scrollContainer\").removeClass(\"yoast-has-scroll\");\n\t\t}\n\t}\n\n\t/**\n  * Checks the width of multiple scrollable tables.\n  *\n  * @param {object} tables A jQuery collection of scrollable tables.\n  * @returns {void}\n  */\n\tfunction checkMultipleScrollableTablesSize(tables) {\n\t\ttables.each(function () {\n\t\t\tcheckScrollableTableSize($(this));\n\t\t});\n\t}\n\n\t/**\n  * Makes tables scrollable.\n  *\n  * Usage: see related stylesheet.\n  *\n  * @returns {void}\n  */\n\tfunction createScrollableTables() {\n\t\t// Get the tables elected to be scrollable and store them for later reuse.\n\t\twindow.wpseoScrollableTables = $(\".yoast-table-scrollable\");\n\n\t\t// Bail if there are no tables.\n\t\tif (!window.wpseoScrollableTables.length) {\n\t\t\treturn;\n\t\t}\n\n\t\t// Loop over the collection of tables and build some HTML around them.\n\t\twindow.wpseoScrollableTables.each(function () {\n\t\t\tvar table = $(this);\n\n\t\t\t// Continue if the table already has the necessary markup.\n\t\t\tif (table.data(\"scrollContainer\")) {\n\t\t\t\t// This is a jQuery equivalent of `continue` within an `each()` loop.\n\t\t\t\treturn;\n\t\t\t}\n\n\t\t\t/*\n    * Create an element with a hint message and insert it in the DOM\n    * before each table.\n    */\n\t\t\tvar scrollHint = $(\"<div />\", {\n\t\t\t\t\"class\": \"yoast-table-scrollable__hintwrapper\",\n\t\t\t\thtml: \"<span class='yoast-table-scrollable__hint' aria-hidden='true' />\"\n\t\t\t}).insertBefore(table);\n\n\t\t\t/*\n    * Create a wrapper element with an inner div necessary for\n    * styling and insert them in the DOM before each table.\n    */\n\t\t\tvar scrollContainer = $(\"<div />\", {\n\t\t\t\t\"class\": \"yoast-table-scrollable__container\",\n\t\t\t\thtml: \"<div class='yoast-table-scrollable__inner' />\"\n\t\t\t}).insertBefore(table);\n\n\t\t\t// Set the hint message text.\n\t\t\tscrollHint.find(\".yoast-table-scrollable__hint\").text(wpseoAdminGlobalL10n.scrollable_table_hint);\n\n\t\t\t// For each table, store a reference to its wrapper element.\n\t\t\ttable.data(\"scrollContainer\", scrollContainer);\n\n\t\t\t// For each table, store a reference to its hint message.\n\t\t\ttable.data(\"scrollHint\", scrollHint);\n\n\t\t\t// Move the scrollable table inside the wrapper.\n\t\t\ttable.appendTo(scrollContainer.find(\".yoast-table-scrollable__inner\"));\n\n\t\t\t// Check each table's width.\n\t\t\tcheckScrollableTableSize(table);\n\t\t});\n\t}\n\n\t/*\n  * When the viewport size changes, check again the scrollable tables width.\n  * About the events: technically `wp-window-resized` is triggered on the\n  * body but since it bubbles, it happens also on the window.\n  * Also, instead of trying to detect events support on devices and browsers,\n  * we just run the check on both `wp-window-resized` and `orientationchange`.\n  */\n\t$(window).on(\"wp-window-resized orientationchange\", function () {\n\t\t/*\n   * Bail if there are no tables. Check also for the jQuery object itself,\n   * see https://github.com/Yoast/wordpress-seo/issues/8214\n   */\n\t\tif (!window.wpseoScrollableTables || !window.wpseoScrollableTables.length) {\n\t\t\treturn;\n\t\t}\n\n\t\tcheckMultipleScrollableTablesSize(window.wpseoScrollableTables);\n\t});\n\n\t/*\n  * Generates the scrollable tables markuo when the react tabs are mounted,\n  * when a table is in the active tab. Or, generates the markup when a react\n  * tabs is selected. Uses a timeout to wait for the HTML injection of the table.\n  */\n\t$(window).on({\n\t\t\"Yoast:YoastTabsMounted\": function YoastYoastTabsMounted() {\n\t\t\tsetTimeout(function () {\n\t\t\t\tcreateScrollableTables();\n\t\t\t}, 100);\n\t\t},\n\t\t\"Yoast:YoastTabsSelected\": function YoastYoastTabsSelected() {\n\t\t\tsetTimeout(function () {\n\t\t\t\tcreateScrollableTables();\n\t\t\t}, 100);\n\t\t}\n\t});\n\n\t$(document).ready(function () {\n\t\tshowAlertPopup();\n\t\thookDismissRestoreButtons();\n\t\tsetPremiumIndicatorColor();\n\t\tcreateScrollableTables();\n\t});\n})(jQuery);//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiMjIyNS5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy9qcy9zcmMvd3Atc2VvLWFkbWluLWdsb2JhbC5qcz82MDVmIl0sInNvdXJjZXNDb250ZW50IjpbIi8qIGdsb2JhbCBhamF4dXJsICovXG4vKiBnbG9iYWwgd3BzZW9BZG1pbkdsb2JhbEwxMG4sIHdwc2VvQ29uc29sZU5vdGlmaWNhdGlvbnMgKi9cbi8qIGpzaGludCAtVzA5NyAqL1xuLyoganNoaW50IHVudXNlZDpmYWxzZSAqL1xuXG4oIGZ1bmN0aW9uKCAkICkge1xuXHQvKipcblx0ICogRGlzcGxheXMgY29uc29sZSBub3RpZmljYXRpb25zLlxuXHQgKlxuXHQgKiBMb29rcyBhdCBhIGdsb2JhbCB2YXJpYWJsZSB0byBkaXNwbGF5IGFsbCBub3RpZmljYXRpb25zIGluIHRoZXJlLlxuXHQgKlxuXHQgKiBAcmV0dXJucyB7dm9pZH1cblx0ICovXG5cdGZ1bmN0aW9uIGRpc3BsYXlDb25zb2xlTm90aWZpY2F0aW9ucygpIHtcblx0XHRpZiAoIHR5cGVvZiB3aW5kb3cud3BzZW9Db25zb2xlTm90aWZpY2F0aW9ucyA9PT0gXCJ1bmRlZmluZWRcIiB8fCB0eXBlb2YgY29uc29sZSA9PT0gXCJ1bmRlZmluZWRcIiApIHtcblx0XHRcdHJldHVybjtcblx0XHR9XG5cblx0XHQvKiBqc2hpbnQgaWdub3JlOnN0YXJ0ICovXG5cdFx0Zm9yICggdmFyIGluZGV4ID0gMDsgaW5kZXggPCB3cHNlb0NvbnNvbGVOb3RpZmljYXRpb25zLmxlbmd0aDsgaW5kZXgrKyApIHtcblx0XHRcdGNvbnNvbGUud2Fybiggd3BzZW9Db25zb2xlTm90aWZpY2F0aW9uc1sgaW5kZXggXSApO1xuXHRcdH1cblx0XHQvKiBqc2hpbnQgaWdub3JlOmVuZCAqL1xuXHR9XG5cblx0alF1ZXJ5KCBkb2N1bWVudCApLnJlYWR5KCBkaXNwbGF5Q29uc29sZU5vdGlmaWNhdGlvbnMgKTtcblxuXHQvKipcblx0ICogVXNlZCB0byBkaXNtaXNzIHRoZSB0YWdsaW5lIG5vdGljZSBmb3IgYSBzcGVjaWZpYyB1c2VyLlxuXHQgKlxuXHQgKiBAcGFyYW0ge3N0cmluZ30gbm9uY2UgTm9uY2UgZm9yIHZlcmlmaWNhdGlvbi5cblx0ICpcblx0ICogQHJldHVybnMge3ZvaWR9XG5cdCAqL1xuXHRmdW5jdGlvbiB3cHNlb0Rpc21pc3NUYWdsaW5lTm90aWNlKCBub25jZSApIHtcblx0XHRqUXVlcnkucG9zdCggYWpheHVybCwge1xuXHRcdFx0YWN0aW9uOiBcIndwc2VvX2Rpc21pc3NfdGFnbGluZV9ub3RpY2VcIixcblx0XHRcdF93cG5vbmNlOiBub25jZSxcblx0XHR9XG5cdFx0KTtcblx0fVxuXG5cdC8qKlxuXHQgKiBVc2VkIHRvIHJlbW92ZSB0aGUgYWRtaW4gbm90aWNlcyBmb3Igc2V2ZXJhbCBwdXJwb3NlcywgZGllcyBvbiBleGl0LlxuXHQgKlxuXHQgKiBAcGFyYW0ge3N0cmluZ30gb3B0aW9uIFRoZSBvcHRpb24gdG8gaWdub3JlLlxuXHQgKiBAcGFyYW0ge3N0cmluZ30gaGlkZSAgIFRoZSB0YXJnZXQgZWxlbWVudCB0byBoaWRlLlxuXHQgKiBAcGFyYW0ge3N0cmluZ30gbm9uY2UgIE5vbmNlIGZvciB2ZXJpZmljYXRpb24uXG5cdCAqXG5cdCAqIEByZXR1cm5zIHt2b2lkfVxuXHQgKi9cblx0ZnVuY3Rpb24gd3BzZW9TZXRJZ25vcmUoIG9wdGlvbiwgaGlkZSwgbm9uY2UgKSB7XG5cdFx0alF1ZXJ5LnBvc3QoIGFqYXh1cmwsIHtcblx0XHRcdGFjdGlvbjogXCJ3cHNlb19zZXRfaWdub3JlXCIsXG5cdFx0XHRvcHRpb246IG9wdGlvbixcblx0XHRcdF93cG5vbmNlOiBub25jZSxcblx0XHR9LCBmdW5jdGlvbiggZGF0YSApIHtcblx0XHRcdGlmICggZGF0YSApIHtcblx0XHRcdFx0alF1ZXJ5KCBcIiNcIiArIGhpZGUgKS5oaWRlKCk7XG5cdFx0XHRcdGpRdWVyeSggXCIjaGlkZGVuX2lnbm9yZV9cIiArIG9wdGlvbiApLnZhbCggXCJpZ25vcmVcIiApO1xuXHRcdFx0fVxuXHRcdH1cblx0XHQpO1xuXHR9XG5cblx0LyoqXG5cdCAqIEdlbmVyYXRlcyBhIGRpc21pc3NhYmxlIGFuY2hvciBidXR0b24uXG5cdCAqXG5cdCAqIEBwYXJhbSB7c3RyaW5nfSBkaXNtaXNzTGluayBUaGUgVVJMIHRoYXQgbGVhZHMgdG8gdGhlIGRpc21pc3Npbmcgb2YgdGhlIG5vdGljZS5cblx0ICpcblx0ICogQHJldHVybnMge09iamVjdH0gQW5jaG9yIHRvIGRpc21pc3MuXG5cdCAqL1xuXHRmdW5jdGlvbiB3cHNlb0Rpc21pc3NMaW5rKCBkaXNtaXNzTGluayApIHtcblx0XHRyZXR1cm4galF1ZXJ5KFxuXHRcdFx0JzxhIGhyZWY9XCInICsgZGlzbWlzc0xpbmsgKyAnXCIgdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwibm90aWNlLWRpc21pc3NcIj4nICtcblx0XHRcdCc8c3BhbiBjbGFzcz1cInNjcmVlbi1yZWFkZXItdGV4dFwiPkRpc21pc3MgdGhpcyBub3RpY2UuPC9zcGFuPicgK1xuXHRcdFx0XCI8L2E+XCJcblx0XHQpO1xuXHR9XG5cblx0alF1ZXJ5KCBkb2N1bWVudCApLnJlYWR5KCBmdW5jdGlvbigpIHtcblx0XHRqUXVlcnkoIFwiLnlvYXN0LWRpc21pc3NpYmxlXCIgKS5vbiggXCJjbGlja1wiLCBcIi55b2FzdC1ub3RpY2UtZGlzbWlzc1wiLCBmdW5jdGlvbigpIHtcblx0XHRcdHZhciAkcGFyZW50RGl2ID0galF1ZXJ5KCB0aGlzICkucGFyZW50KCk7XG5cblx0XHRcdC8vIERlcHJlY2F0ZWQsIHRvZG86IHJlbW92ZSB3aGVuIGFsbCBub3RpZmllcnMgaGF2ZSBiZWVuIGltcGxlbWVudGVkLlxuXHRcdFx0alF1ZXJ5LnBvc3QoXG5cdFx0XHRcdGFqYXh1cmwsXG5cdFx0XHRcdHtcblx0XHRcdFx0XHRhY3Rpb246ICRwYXJlbnREaXYuYXR0ciggXCJpZFwiICkucmVwbGFjZSggLy0vZywgXCJfXCIgKSxcblx0XHRcdFx0XHRfd3Bub25jZTogJHBhcmVudERpdi5kYXRhKCBcIm5vbmNlXCIgKSxcblx0XHRcdFx0XHRkYXRhOiAkcGFyZW50RGl2LmRhdGEoIFwianNvblwiICksXG5cdFx0XHRcdH1cblx0XHRcdCk7XG5cblx0XHRcdGpRdWVyeS5wb3N0KFxuXHRcdFx0XHRhamF4dXJsLFxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0YWN0aW9uOiBcInlvYXN0X2Rpc21pc3Nfbm90aWZpY2F0aW9uXCIsXG5cdFx0XHRcdFx0bm90aWZpY2F0aW9uOiAkcGFyZW50RGl2LmF0dHIoIFwiaWRcIiApLFxuXHRcdFx0XHRcdG5vbmNlOiAkcGFyZW50RGl2LmRhdGEoIFwibm9uY2VcIiApLFxuXHRcdFx0XHRcdGRhdGE6ICRwYXJlbnREaXYuZGF0YSggXCJqc29uXCIgKSxcblx0XHRcdFx0fVxuXHRcdFx0KTtcblxuXHRcdFx0JHBhcmVudERpdi5mYWRlVG8oIDEwMCwgMCwgZnVuY3Rpb24oKSB7XG5cdFx0XHRcdCRwYXJlbnREaXYuc2xpZGVVcCggMTAwLCBmdW5jdGlvbigpIHtcblx0XHRcdFx0XHQkcGFyZW50RGl2LnJlbW92ZSgpO1xuXHRcdFx0XHR9ICk7XG5cdFx0XHR9ICk7XG5cblx0XHRcdHJldHVybiBmYWxzZTtcblx0XHR9ICk7XG5cblx0XHRqUXVlcnkoIFwiLnlvYXN0LWhlbHAtYnV0dG9uXCIgKS5vbiggXCJjbGlja1wiLCBmdW5jdGlvbigpIHtcblx0XHRcdHZhciAkYnV0dG9uID0galF1ZXJ5KCB0aGlzICksXG5cdFx0XHRcdGhlbHBQYW5lbCA9IGpRdWVyeSggXCIjXCIgKyAkYnV0dG9uLmF0dHIoIFwiYXJpYS1jb250cm9sc1wiICkgKSxcblx0XHRcdFx0aXNQYW5lbFZpc2libGUgPSBoZWxwUGFuZWwuaXMoIFwiOnZpc2libGVcIiApO1xuXG5cdFx0XHRqUXVlcnkoIGhlbHBQYW5lbCApLnNsaWRlVG9nZ2xlKCAyMDAsIGZ1bmN0aW9uKCkge1xuXHRcdFx0XHQkYnV0dG9uLmF0dHIoIFwiYXJpYS1leHBhbmRlZFwiLCAhIGlzUGFuZWxWaXNpYmxlICk7XG5cdFx0XHR9ICk7XG5cdFx0fSApO1xuXHR9ICk7XG5cdHdpbmRvdy53cHNlb0Rpc21pc3NUYWdsaW5lTm90aWNlID0gd3BzZW9EaXNtaXNzVGFnbGluZU5vdGljZTtcblx0d2luZG93Lndwc2VvU2V0SWdub3JlID0gd3BzZW9TZXRJZ25vcmU7XG5cdHdpbmRvdy53cHNlb0Rpc21pc3NMaW5rID0gd3BzZW9EaXNtaXNzTGluaztcblxuXHQvKipcblx0ICogSGlkZXMgcG9wdXAgc2hvd2luZyBuZXcgYWxlcnRzIG1lc3NhZ2UuXG5cdCAqXG5cdCAqIEByZXR1cm5zIHt2b2lkfVxuXHQgKi9cblx0ZnVuY3Rpb24gaGlkZUFsZXJ0UG9wdXAoKSB7XG5cdFx0Ly8gUmVtb3ZlIHRoZSBuYW1lc3BhY2VkIGhvdmVyIGV2ZW50IGZyb20gdGhlIG1lbnUgdG9wIGxldmVsIGxpc3QgaXRlbXMuXG5cdFx0JCggXCIjd3AtYWRtaW4tYmFyLXJvb3QtZGVmYXVsdCA+IGxpXCIgKS5vZmYoIFwibW91c2VlbnRlci55b2FzdGFsZXJ0cG9wdXAgbW91c2VsZWF2ZS55b2FzdGFsZXJ0cG9wdXBcIiApO1xuXHRcdC8vIEhpZGUgdGhlIG5vdGlmaWNhdGlvbiBwb3B1cCBieSBmYWRpbmcgaXQgb3V0LlxuXHRcdCQoIFwiLnlvYXN0LWlzc3VlLWFkZGVkXCIgKS5mYWRlT3V0KCAyMDAgKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBTaG93cyBwb3B1cCB3aXRoIG5ldyBhbGVydHMgbWVzc2FnZS5cblx0ICpcblx0ICogQHJldHVybnMge3ZvaWR9XG5cdCAqL1xuXHRmdW5jdGlvbiBzaG93QWxlcnRQb3B1cCgpIHtcblx0XHQvLyBBdHRhY2ggYW4gaG92ZXIgZXZlbnQgYW5kIHNob3cgdGhlIG5vdGlmaWNhdGlvbiBwb3B1cCBieSBmYWRpbmcgaXQgaW4uXG5cdFx0JCggXCIueW9hc3QtaXNzdWUtYWRkZWRcIiApXG5cdFx0XHQub24oIFwibW91c2VlbnRlciBtb3VzZWxlYXZlXCIsIGZ1bmN0aW9uKCBldnQgKSB7XG5cdFx0XHRcdC8vIEF2b2lkIHRoZSBob3ZlciBldmVudCB0byBwcm9wYWdhdGUgb24gdGhlIHBhcmVudCBlbGVtZW50cy5cblx0XHRcdFx0ZXZ0LnN0b3BQcm9wYWdhdGlvbigpO1xuXHRcdFx0XHQvLyBIaWRlIHRoZSBub3RpZmljYXRpb24gcG9wdXAgd2hlbiBob3ZlcmluZyBvbiBpdC5cblx0XHRcdFx0aGlkZUFsZXJ0UG9wdXAoKTtcblx0XHRcdH0gKVxuXHRcdFx0LmZhZGVJbigpO1xuXG5cdFx0Lypcblx0XHQgKiBBdHRhY2ggYSBuYW1lc3BhY2VkIGhvdmVyIGV2ZW50IG9uIHRoZSBtZW51IHRvcCBsZXZlbCBpdGVtcyB0byBoaWRlXG5cdFx0ICogdGhlIG5vdGlmaWNhdGlvbiBwb3B1cCB3aGVuIGhvdmVyaW5nIHRoZW0uXG5cdFx0ICogTm90ZTogdGhpcyB3aWxsIHdvcmsganVzdCB0aGUgZmlyc3QgdGltZSB0aGUgbGlzdCBpdGVtcyBnZXQgaG92ZXJlZCBpbiB0aGVcblx0XHQgKiBmaXJzdCAzIHNlY29uZHMgYWZ0ZXIgRE9NIHJlYWR5IGJlY2F1c2UgdGhpcyBldmVudCBpcyB0aGVuIHJlbW92ZWQuXG5cdFx0ICovXG5cdFx0JCggXCIjd3AtYWRtaW4tYmFyLXJvb3QtZGVmYXVsdCA+IGxpXCIgKS5vbiggXCJtb3VzZWVudGVyLnlvYXN0YWxlcnRwb3B1cCBtb3VzZWxlYXZlLnlvYXN0YWxlcnRwb3B1cFwiLCBoaWRlQWxlcnRQb3B1cCApO1xuXG5cdFx0Ly8gSGlkZSB0aGUgbm90aWZpY2F0aW9uIHBvcHVwIGFmdGVyIDMgc2Vjb25kcyBmcm9tIERPTSByZWFkeS5cblx0XHRzZXRUaW1lb3V0KCBoaWRlQWxlcnRQb3B1cCwgMzAwMCApO1xuXHR9XG5cblx0LyoqXG5cdCAqIEhhbmRsZXMgZGlzbWlzcyBhbmQgcmVzdG9yZSBBSkFYIHJlc3BvbnNlcy5cblx0ICpcblx0ICogQHBhcmFtIHtPYmplY3R9ICRzb3VyY2UgT2JqZWN0IHRoYXQgdHJpZ2dlcmVkIHRoZSByZXF1ZXN0LlxuXHQgKiBAcGFyYW0ge09iamVjdH0gcmVzcG9uc2UgQUpBWCByZXNwb25zZS5cblx0ICpcblx0ICogQHJldHVybnMge3ZvaWR9XG5cdCAqL1xuXHRmdW5jdGlvbiBoYW5kbGVEaXNtaXNzUmVzdG9yZVJlc3BvbnNlKCAkc291cmNlLCByZXNwb25zZSApIHtcblx0XHQkKCBcIi55b2FzdC1hbGVydC1ob2xkZXJcIiApLm9mZiggXCJjbGlja1wiLCBcIi5yZXN0b3JlXCIgKS5vZmYoIFwiY2xpY2tcIiwgXCIuZGlzbWlzc1wiICk7XG5cblx0XHRpZiAoIHR5cGVvZiByZXNwb25zZS5odG1sID09PSBcInVuZGVmaW5lZFwiICkge1xuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblxuXHRcdGlmICggcmVzcG9uc2UuaHRtbCApIHtcblx0XHRcdCRzb3VyY2UuY2xvc2VzdCggXCIueW9hc3QtY29udGFpbmVyXCIgKS5odG1sKCByZXNwb25zZS5odG1sICk7XG5cdFx0XHQvKiBqc2hpbnQgaWdub3JlOnN0YXJ0ICovXG5cdFx0XHQvKiBlc2xpbnQtZGlzYWJsZSAqL1xuXHRcdFx0aG9va0Rpc21pc3NSZXN0b3JlQnV0dG9ucygpO1xuXHRcdFx0LyoganNoaW50IGlnbm9yZTplbmQgKi9cblx0XHRcdC8qIGVzbGludC1lbmFibGUgKi9cblx0XHR9XG5cblx0XHR2YXIgJHdwc2VvTWVudSA9ICQoIFwiI3dwLWFkbWluLWJhci13cHNlby1tZW51XCIgKTtcblx0XHR2YXIgJGlzc3VlQ291bnRlciA9ICR3cHNlb01lbnUuZmluZCggXCIueW9hc3QtaXNzdWUtY291bnRlclwiICk7XG5cblx0XHRpZiAoICEgJGlzc3VlQ291bnRlci5sZW5ndGggKSB7XG5cdFx0XHQkd3BzZW9NZW51LmZpbmQoIFwiPiBhOmZpcnN0LWNoaWxkXCIgKS5hcHBlbmQoICc8ZGl2IGNsYXNzPVwieW9hc3QtaXNzdWUtY291bnRlclwiLz4nICk7XG5cdFx0XHQkaXNzdWVDb3VudGVyID0gJHdwc2VvTWVudS5maW5kKCBcIi55b2FzdC1pc3N1ZS1jb3VudGVyXCIgKTtcblx0XHR9XG5cblx0XHQkaXNzdWVDb3VudGVyLmh0bWwoIHJlc3BvbnNlLnRvdGFsICk7XG5cdFx0aWYgKCByZXNwb25zZS50b3RhbCA9PT0gMCApIHtcblx0XHRcdCRpc3N1ZUNvdW50ZXIuaGlkZSgpO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHQkaXNzdWVDb3VudGVyLnNob3coKTtcblx0XHR9XG5cblx0XHQkKCBcIiN0b3BsZXZlbF9wYWdlX3dwc2VvX2Rhc2hib2FyZCAudXBkYXRlLXBsdWdpbnNcIiApLnJlbW92ZUNsYXNzKCkuYWRkQ2xhc3MoIFwidXBkYXRlLXBsdWdpbnMgY291bnQtXCIgKyByZXNwb25zZS50b3RhbCApO1xuXHRcdCQoIFwiI3RvcGxldmVsX3BhZ2Vfd3BzZW9fZGFzaGJvYXJkIC5wbHVnaW4tY291bnRcIiApLmh0bWwoIHJlc3BvbnNlLnRvdGFsICk7XG5cdH1cblxuXHQvKipcblx0ICogSG9va3MgdGhlIHJlc3RvcmUgYW5kIGRpc21pc3MgYnV0dG9ucy5cblx0ICpcblx0ICogQHJldHVybnMge3ZvaWR9XG5cdCAqL1xuXHRmdW5jdGlvbiBob29rRGlzbWlzc1Jlc3RvcmVCdXR0b25zKCkge1xuXHRcdHZhciAkZGlzbWlzc2libGUgPSAkKCBcIi55b2FzdC1hbGVydC1ob2xkZXJcIiApO1xuXG5cdFx0JGRpc21pc3NpYmxlLm9uKCBcImNsaWNrXCIsIFwiLmRpc21pc3NcIiwgZnVuY3Rpb24oKSB7XG5cdFx0XHR2YXIgJHRoaXMgPSAkKCB0aGlzICk7XG5cdFx0XHR2YXIgJHNvdXJjZSA9ICR0aGlzLmNsb3Nlc3QoIFwiLnlvYXN0LWFsZXJ0LWhvbGRlclwiICk7XG5cblx0XHRcdHZhciAkY29udGFpbmVyID0gJHRoaXMuY2xvc2VzdCggXCIueW9hc3QtY29udGFpbmVyXCIgKTtcblx0XHRcdCRjb250YWluZXIuYXBwZW5kKCAnPGRpdiBjbGFzcz1cInlvYXN0LWNvbnRhaW5lci1kaXNhYmxlZFwiLz4nICk7XG5cblx0XHRcdCR0aGlzLmZpbmQoIFwic3BhblwiICkucmVtb3ZlQ2xhc3MoIFwiZGFzaGljb25zLW5vLWFsdFwiICkuYWRkQ2xhc3MoIFwiZGFzaGljb25zLXJhbmRvbWl6ZVwiICk7XG5cblx0XHRcdCQucG9zdChcblx0XHRcdFx0YWpheHVybCxcblx0XHRcdFx0e1xuXHRcdFx0XHRcdGFjdGlvbjogXCJ5b2FzdF9kaXNtaXNzX2FsZXJ0XCIsXG5cdFx0XHRcdFx0bm90aWZpY2F0aW9uOiAkc291cmNlLmF0dHIoIFwiaWRcIiApLFxuXHRcdFx0XHRcdG5vbmNlOiAkc291cmNlLmRhdGEoIFwibm9uY2VcIiApLFxuXHRcdFx0XHRcdGRhdGE6ICRzb3VyY2UuZGF0YSggXCJqc29uXCIgKSxcblx0XHRcdFx0fSxcblx0XHRcdFx0aGFuZGxlRGlzbWlzc1Jlc3RvcmVSZXNwb25zZS5iaW5kKCB0aGlzLCAkc291cmNlICksXG5cdFx0XHRcdFwianNvblwiXG5cdFx0XHQpO1xuXHRcdH0gKTtcblxuXHRcdCRkaXNtaXNzaWJsZS5vbiggXCJjbGlja1wiLCBcIi5yZXN0b3JlXCIsIGZ1bmN0aW9uKCkge1xuXHRcdFx0dmFyICR0aGlzID0gJCggdGhpcyApO1xuXHRcdFx0dmFyICRzb3VyY2UgPSAkdGhpcy5jbG9zZXN0KCBcIi55b2FzdC1hbGVydC1ob2xkZXJcIiApO1xuXG5cdFx0XHR2YXIgJGNvbnRhaW5lciA9ICR0aGlzLmNsb3Nlc3QoIFwiLnlvYXN0LWNvbnRhaW5lclwiICk7XG5cdFx0XHQkY29udGFpbmVyLmFwcGVuZCggJzxkaXYgY2xhc3M9XCJ5b2FzdC1jb250YWluZXItZGlzYWJsZWRcIi8+JyApO1xuXG5cdFx0XHQkdGhpcy5maW5kKCBcInNwYW5cIiApLnJlbW92ZUNsYXNzKCBcImRhc2hpY29ucy1hcnJvdy11cFwiICkuYWRkQ2xhc3MoIFwiZGFzaGljb25zLXJhbmRvbWl6ZVwiICk7XG5cblx0XHRcdCQucG9zdChcblx0XHRcdFx0YWpheHVybCxcblx0XHRcdFx0e1xuXHRcdFx0XHRcdGFjdGlvbjogXCJ5b2FzdF9yZXN0b3JlX2FsZXJ0XCIsXG5cdFx0XHRcdFx0bm90aWZpY2F0aW9uOiAkc291cmNlLmF0dHIoIFwiaWRcIiApLFxuXHRcdFx0XHRcdG5vbmNlOiAkc291cmNlLmRhdGEoIFwibm9uY2VcIiApLFxuXHRcdFx0XHRcdGRhdGE6ICRzb3VyY2UuZGF0YSggXCJqc29uXCIgKSxcblx0XHRcdFx0fSxcblx0XHRcdFx0aGFuZGxlRGlzbWlzc1Jlc3RvcmVSZXNwb25zZS5iaW5kKCB0aGlzLCAkc291cmNlICksXG5cdFx0XHRcdFwianNvblwiXG5cdFx0XHQpO1xuXHRcdH0gKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBTZXRzIHRoZSBjb2xvciBvZiB0aGUgc3ZnIGZvciB0aGUgcHJlbWl1bSBpbmRpY2F0b3IgYmFzZWQgb24gdGhlIGNvbG9yIG9mIHRoZSBjb2xvciBzY2hlbWUuXG5cdCAqXG5cdCAqIEByZXR1cm5zIHt2b2lkfVxuXHQgKi9cblx0ZnVuY3Rpb24gc2V0UHJlbWl1bUluZGljYXRvckNvbG9yKCkge1xuXHRcdGxldCAkcHJlbWl1bUluZGljYXRvciA9IGpRdWVyeSggXCIud3BzZW8tanMtcHJlbWl1bS1pbmRpY2F0b3JcIiApO1xuXHRcdGxldCAkc3ZnID0gJHByZW1pdW1JbmRpY2F0b3IuZmluZCggXCJzdmdcIiApO1xuXG5cdFx0Ly8gRG9uJ3QgY2hhbmdlIHRoZSBjb2xvciB0byBzdGFuZCBvdXQgd2hlbiBwcmVtaXVtIGlzIGFjdHVhbGx5IGVuYWJsZWQuXG5cdFx0aWYgKCAkcHJlbWl1bUluZGljYXRvci5oYXNDbGFzcyggXCJ3cHNlby1wcmVtaXVtLWluZGljYXRvci0tbm9cIiApICkge1xuXHRcdFx0bGV0ICRzdmdQYXRoID0gJHN2Zy5maW5kKCBcInBhdGhcIiApO1xuXG5cdFx0XHRsZXQgYmFja2dyb3VuZENvbG9yID0gJHByZW1pdW1JbmRpY2F0b3IuY3NzKCBcImJhY2tncm91bmRDb2xvclwiICk7XG5cblx0XHRcdCRzdmdQYXRoLmNzcyggXCJmaWxsXCIsIGJhY2tncm91bmRDb2xvciApO1xuXHRcdH1cblxuXHRcdCRzdmcuY3NzKCBcImRpc3BsYXlcIiwgXCJibG9ja1wiICk7XG5cdFx0JHByZW1pdW1JbmRpY2F0b3IuY3NzKCB7XG5cdFx0XHRiYWNrZ3JvdW5kQ29sb3I6IFwidHJhbnNwYXJlbnRcIixcblx0XHRcdHdpZHRoOiBcIjIwcHhcIixcblx0XHRcdGhlaWdodDogXCIyMHB4XCIsXG5cdFx0fSApO1xuXHR9XG5cblx0LyoqXG5cdCAqIENoZWNrcyBhIHNjcm9sbGFibGUgdGFibGUgd2lkdGguXG5cdCAqXG5cdCAqIENvbXBhcmVzIHRoZSBzY3JvbGxhYmxlIHRhYmxlIHdpZHRoIGFnYWluc3QgdGhlIHNpemUgb2YgaXRzIGNvbnRhaW5lciBhbmRcblx0ICogYWRkcyBvciByZW1vdmVzIENTUyBjbGFzc2VzIGFjY29yZGluZ2x5LlxuXHQgKlxuXHQgKiBAcGFyYW0ge29iamVjdH0gdGFibGUgQSBqUXVlcnkgb2JqZWN0IHdpdGggb25lIHNjcm9sbGFibGUgdGFibGUuXG5cdCAqIEByZXR1cm5zIHt2b2lkfVxuXHQgKi9cblx0ZnVuY3Rpb24gY2hlY2tTY3JvbGxhYmxlVGFibGVTaXplKCB0YWJsZSApIHtcblx0XHQvLyBCYWlsIGlmIHRoZSB0YWJsZSBpcyBoaWRkZW4uXG5cdFx0aWYgKCB0YWJsZS5pcyggXCI6aGlkZGVuXCIgKSApIHtcblx0XHRcdHJldHVybjtcblx0XHR9XG5cblx0XHQvLyBXaGVuIHRoZSB0YWJsZSBpcyB3aWRlciB0aGFuIGl0cyBwYXJlbnQsIG1ha2UgaXQgc2Nyb2xsYWJsZS5cblx0XHRpZiAoIHRhYmxlLm91dGVyV2lkdGgoKSA+IHRhYmxlLnBhcmVudCgpLm91dGVyV2lkdGgoKSApIHtcblx0XHRcdHRhYmxlLmRhdGEoIFwic2Nyb2xsSGludFwiICkuYWRkQ2xhc3MoIFwieW9hc3QtaGFzLXNjcm9sbFwiICk7XG5cdFx0XHR0YWJsZS5kYXRhKCBcInNjcm9sbENvbnRhaW5lclwiICkuYWRkQ2xhc3MoIFwieW9hc3QtaGFzLXNjcm9sbFwiICk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdHRhYmxlLmRhdGEoIFwic2Nyb2xsSGludFwiICkucmVtb3ZlQ2xhc3MoIFwieW9hc3QtaGFzLXNjcm9sbFwiICk7XG5cdFx0XHR0YWJsZS5kYXRhKCBcInNjcm9sbENvbnRhaW5lclwiICkucmVtb3ZlQ2xhc3MoIFwieW9hc3QtaGFzLXNjcm9sbFwiICk7XG5cdFx0fVxuXHR9XG5cblx0LyoqXG5cdCAqIENoZWNrcyB0aGUgd2lkdGggb2YgbXVsdGlwbGUgc2Nyb2xsYWJsZSB0YWJsZXMuXG5cdCAqXG5cdCAqIEBwYXJhbSB7b2JqZWN0fSB0YWJsZXMgQSBqUXVlcnkgY29sbGVjdGlvbiBvZiBzY3JvbGxhYmxlIHRhYmxlcy5cblx0ICogQHJldHVybnMge3ZvaWR9XG5cdCAqL1xuXHRmdW5jdGlvbiBjaGVja011bHRpcGxlU2Nyb2xsYWJsZVRhYmxlc1NpemUoIHRhYmxlcyApIHtcblx0XHR0YWJsZXMuZWFjaCggZnVuY3Rpb24oKSB7XG5cdFx0XHRjaGVja1Njcm9sbGFibGVUYWJsZVNpemUoICQoIHRoaXMgKSApO1xuXHRcdH0gKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBNYWtlcyB0YWJsZXMgc2Nyb2xsYWJsZS5cblx0ICpcblx0ICogVXNhZ2U6IHNlZSByZWxhdGVkIHN0eWxlc2hlZXQuXG5cdCAqXG5cdCAqIEByZXR1cm5zIHt2b2lkfVxuXHQgKi9cblx0ZnVuY3Rpb24gY3JlYXRlU2Nyb2xsYWJsZVRhYmxlcygpIHtcblx0XHQvLyBHZXQgdGhlIHRhYmxlcyBlbGVjdGVkIHRvIGJlIHNjcm9sbGFibGUgYW5kIHN0b3JlIHRoZW0gZm9yIGxhdGVyIHJldXNlLlxuXHRcdHdpbmRvdy53cHNlb1Njcm9sbGFibGVUYWJsZXMgPSAkKCBcIi55b2FzdC10YWJsZS1zY3JvbGxhYmxlXCIgKTtcblxuXHRcdC8vIEJhaWwgaWYgdGhlcmUgYXJlIG5vIHRhYmxlcy5cblx0XHRpZiAoICEgd2luZG93Lndwc2VvU2Nyb2xsYWJsZVRhYmxlcy5sZW5ndGggKSB7XG5cdFx0XHRyZXR1cm47XG5cdFx0fVxuXG5cdFx0Ly8gTG9vcCBvdmVyIHRoZSBjb2xsZWN0aW9uIG9mIHRhYmxlcyBhbmQgYnVpbGQgc29tZSBIVE1MIGFyb3VuZCB0aGVtLlxuXHRcdHdpbmRvdy53cHNlb1Njcm9sbGFibGVUYWJsZXMuZWFjaCggZnVuY3Rpb24oKSB7XG5cdFx0XHR2YXIgdGFibGUgPSAkKCB0aGlzICk7XG5cblx0XHRcdC8vIENvbnRpbnVlIGlmIHRoZSB0YWJsZSBhbHJlYWR5IGhhcyB0aGUgbmVjZXNzYXJ5IG1hcmt1cC5cblx0XHRcdGlmICggdGFibGUuZGF0YSggXCJzY3JvbGxDb250YWluZXJcIiApICkge1xuXHRcdFx0XHQvLyBUaGlzIGlzIGEgalF1ZXJ5IGVxdWl2YWxlbnQgb2YgYGNvbnRpbnVlYCB3aXRoaW4gYW4gYGVhY2goKWAgbG9vcC5cblx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0fVxuXG5cdFx0XHQvKlxuXHRcdFx0ICogQ3JlYXRlIGFuIGVsZW1lbnQgd2l0aCBhIGhpbnQgbWVzc2FnZSBhbmQgaW5zZXJ0IGl0IGluIHRoZSBET01cblx0XHRcdCAqIGJlZm9yZSBlYWNoIHRhYmxlLlxuXHRcdFx0ICovXG5cdFx0XHR2YXIgc2Nyb2xsSGludCA9ICQoIFwiPGRpdiAvPlwiLCB7XG5cdFx0XHRcdFwiY2xhc3NcIjogXCJ5b2FzdC10YWJsZS1zY3JvbGxhYmxlX19oaW50d3JhcHBlclwiLFxuXHRcdFx0XHRodG1sOiBcIjxzcGFuIGNsYXNzPSd5b2FzdC10YWJsZS1zY3JvbGxhYmxlX19oaW50JyBhcmlhLWhpZGRlbj0ndHJ1ZScgLz5cIixcblx0XHRcdH0gKS5pbnNlcnRCZWZvcmUoIHRhYmxlICk7XG5cblx0XHRcdC8qXG5cdFx0XHQgKiBDcmVhdGUgYSB3cmFwcGVyIGVsZW1lbnQgd2l0aCBhbiBpbm5lciBkaXYgbmVjZXNzYXJ5IGZvclxuXHRcdFx0ICogc3R5bGluZyBhbmQgaW5zZXJ0IHRoZW0gaW4gdGhlIERPTSBiZWZvcmUgZWFjaCB0YWJsZS5cblx0XHRcdCAqL1xuXHRcdFx0dmFyIHNjcm9sbENvbnRhaW5lciA9ICQoIFwiPGRpdiAvPlwiLCB7XG5cdFx0XHRcdFwiY2xhc3NcIjogXCJ5b2FzdC10YWJsZS1zY3JvbGxhYmxlX19jb250YWluZXJcIixcblx0XHRcdFx0aHRtbDogXCI8ZGl2IGNsYXNzPSd5b2FzdC10YWJsZS1zY3JvbGxhYmxlX19pbm5lcicgLz5cIixcblx0XHRcdH0gKS5pbnNlcnRCZWZvcmUoIHRhYmxlICk7XG5cblx0XHRcdC8vIFNldCB0aGUgaGludCBtZXNzYWdlIHRleHQuXG5cdFx0XHRzY3JvbGxIaW50LmZpbmQoIFwiLnlvYXN0LXRhYmxlLXNjcm9sbGFibGVfX2hpbnRcIiApLnRleHQoIHdwc2VvQWRtaW5HbG9iYWxMMTBuLnNjcm9sbGFibGVfdGFibGVfaGludCApO1xuXG5cdFx0XHQvLyBGb3IgZWFjaCB0YWJsZSwgc3RvcmUgYSByZWZlcmVuY2UgdG8gaXRzIHdyYXBwZXIgZWxlbWVudC5cblx0XHRcdHRhYmxlLmRhdGEoIFwic2Nyb2xsQ29udGFpbmVyXCIsIHNjcm9sbENvbnRhaW5lciApO1xuXG5cdFx0XHQvLyBGb3IgZWFjaCB0YWJsZSwgc3RvcmUgYSByZWZlcmVuY2UgdG8gaXRzIGhpbnQgbWVzc2FnZS5cblx0XHRcdHRhYmxlLmRhdGEoIFwic2Nyb2xsSGludFwiLCBzY3JvbGxIaW50ICk7XG5cblx0XHRcdC8vIE1vdmUgdGhlIHNjcm9sbGFibGUgdGFibGUgaW5zaWRlIHRoZSB3cmFwcGVyLlxuXHRcdFx0dGFibGUuYXBwZW5kVG8oIHNjcm9sbENvbnRhaW5lci5maW5kKCBcIi55b2FzdC10YWJsZS1zY3JvbGxhYmxlX19pbm5lclwiICkgKTtcblxuXHRcdFx0Ly8gQ2hlY2sgZWFjaCB0YWJsZSdzIHdpZHRoLlxuXHRcdFx0Y2hlY2tTY3JvbGxhYmxlVGFibGVTaXplKCB0YWJsZSApO1xuXHRcdH0gKTtcblx0fVxuXG5cdC8qXG5cdCAqIFdoZW4gdGhlIHZpZXdwb3J0IHNpemUgY2hhbmdlcywgY2hlY2sgYWdhaW4gdGhlIHNjcm9sbGFibGUgdGFibGVzIHdpZHRoLlxuXHQgKiBBYm91dCB0aGUgZXZlbnRzOiB0ZWNobmljYWxseSBgd3Atd2luZG93LXJlc2l6ZWRgIGlzIHRyaWdnZXJlZCBvbiB0aGVcblx0ICogYm9keSBidXQgc2luY2UgaXQgYnViYmxlcywgaXQgaGFwcGVucyBhbHNvIG9uIHRoZSB3aW5kb3cuXG5cdCAqIEFsc28sIGluc3RlYWQgb2YgdHJ5aW5nIHRvIGRldGVjdCBldmVudHMgc3VwcG9ydCBvbiBkZXZpY2VzIGFuZCBicm93c2Vycyxcblx0ICogd2UganVzdCBydW4gdGhlIGNoZWNrIG9uIGJvdGggYHdwLXdpbmRvdy1yZXNpemVkYCBhbmQgYG9yaWVudGF0aW9uY2hhbmdlYC5cblx0ICovXG5cdCQoIHdpbmRvdyApLm9uKCBcIndwLXdpbmRvdy1yZXNpemVkIG9yaWVudGF0aW9uY2hhbmdlXCIsIGZ1bmN0aW9uKCkge1xuXHRcdC8qXG5cdFx0ICogQmFpbCBpZiB0aGVyZSBhcmUgbm8gdGFibGVzLiBDaGVjayBhbHNvIGZvciB0aGUgalF1ZXJ5IG9iamVjdCBpdHNlbGYsXG5cdFx0ICogc2VlIGh0dHBzOi8vZ2l0aHViLmNvbS9Zb2FzdC93b3JkcHJlc3Mtc2VvL2lzc3Vlcy84MjE0XG5cdFx0ICovXG5cdFx0aWYgKCAhIHdpbmRvdy53cHNlb1Njcm9sbGFibGVUYWJsZXMgfHwgISB3aW5kb3cud3BzZW9TY3JvbGxhYmxlVGFibGVzLmxlbmd0aCApIHtcblx0XHRcdHJldHVybjtcblx0XHR9XG5cblx0XHRjaGVja011bHRpcGxlU2Nyb2xsYWJsZVRhYmxlc1NpemUoIHdpbmRvdy53cHNlb1Njcm9sbGFibGVUYWJsZXMgKTtcblx0fSApO1xuXG5cdC8qXG5cdCAqIEdlbmVyYXRlcyB0aGUgc2Nyb2xsYWJsZSB0YWJsZXMgbWFya3VvIHdoZW4gdGhlIHJlYWN0IHRhYnMgYXJlIG1vdW50ZWQsXG5cdCAqIHdoZW4gYSB0YWJsZSBpcyBpbiB0aGUgYWN0aXZlIHRhYi4gT3IsIGdlbmVyYXRlcyB0aGUgbWFya3VwIHdoZW4gYSByZWFjdFxuXHQgKiB0YWJzIGlzIHNlbGVjdGVkLiBVc2VzIGEgdGltZW91dCB0byB3YWl0IGZvciB0aGUgSFRNTCBpbmplY3Rpb24gb2YgdGhlIHRhYmxlLlxuXHQgKi9cblx0JCggd2luZG93ICkub24oIHtcblx0XHRcIllvYXN0OllvYXN0VGFic01vdW50ZWRcIjogZnVuY3Rpb24oKSB7XG5cdFx0XHRzZXRUaW1lb3V0KCBmdW5jdGlvbigpIHtcblx0XHRcdFx0Y3JlYXRlU2Nyb2xsYWJsZVRhYmxlcygpO1xuXHRcdFx0fSwgMTAwICk7XG5cdFx0fSxcblx0XHRcIllvYXN0OllvYXN0VGFic1NlbGVjdGVkXCI6IGZ1bmN0aW9uKCkge1xuXHRcdFx0c2V0VGltZW91dCggZnVuY3Rpb24oKSB7XG5cdFx0XHRcdGNyZWF0ZVNjcm9sbGFibGVUYWJsZXMoKTtcblx0XHRcdH0sIDEwMCApO1xuXHRcdH0sXG5cdH0gKTtcblxuXHQkKCBkb2N1bWVudCApLnJlYWR5KCBmdW5jdGlvbigpIHtcblx0XHRzaG93QWxlcnRQb3B1cCgpO1xuXHRcdGhvb2tEaXNtaXNzUmVzdG9yZUJ1dHRvbnMoKTtcblx0XHRzZXRQcmVtaXVtSW5kaWNhdG9yQ29sb3IoKTtcblx0XHRjcmVhdGVTY3JvbGxhYmxlVGFibGVzKCk7XG5cdH0gKTtcbn0oIGpRdWVyeSApICk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8ganMvc3JjL3dwLXNlby1hZG1pbi1nbG9iYWwuanMiXSwibWFwcGluZ3MiOiI7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7QUFPQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7QUFPQTtBQUNBO0FBQ0E7QUFDQTtBQUZBO0FBS0E7QUFDQTtBQUNBOzs7Ozs7Ozs7QUFTQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBSEE7QUFLQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBOzs7Ozs7O0FBT0E7QUFDQTtBQUtBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFHQTtBQUNBO0FBQ0E7QUFIQTtBQUNBO0FBTUE7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUpBO0FBQ0E7QUFPQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFBQTtBQUNBO0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7O0FBS0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7QUFLQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTs7Ozs7O0FBTUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7O0FBUUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7OztBQUtBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFKQTtBQVNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBSkE7QUFTQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7QUFLQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFIQTtBQUtBO0FBQ0E7QUFDQTs7Ozs7Ozs7O0FBU0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7O0FBTUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7QUFPQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7O0FBSUE7QUFDQTtBQUNBO0FBRkE7QUFDQTtBQUlBOzs7O0FBSUE7QUFDQTtBQUNBO0FBRkE7QUFDQTtBQUlBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztBQU9BO0FBQ0E7Ozs7QUFJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7OztBQUtBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFWQTtBQUNBO0FBWUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///2225\n");

/***/ })

},[2225]);