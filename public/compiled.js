(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['404'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<h1>ERROR 404, PAGE NOT FOUND</h1>\n";
},"useData":true});
templates['home'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "";
},"useData":true});
templates['store'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "";
},"useData":true});
templates['header'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<div id=\"navBar\">\n    <span>\n        <a href=\"#\">Home</a>\n        <a href=\"supplies\">Stock Up</a>\n        <a href=\"crafting\">Crafting</a>\n        <a href=\"store\">Manage</a>\n    </span>\n    <span id=\"logLink\">\n        <!--For some god-forsaken reason, this won't stay on the page.-->\n        <a href=\"#\" >Login</a>\n    </span>\n</div>\n\n<div id=\"navShow\">^</div>\n";
},"useData":true});
templates['item'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<div class=\"itemFrame\">\n    <div class=\"itemTitle\">\n        "
    + alias4(((helper = (helper = helpers.itemName || (depth0 != null ? depth0.itemName : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"itemName","hash":{},"data":data}) : helper)))
    + "\n    </div>\n    <img class=\"itemImage\" src="
    + alias4(((helper = (helper = helpers.imgSrc || (depth0 != null ? depth0.imgSrc : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"imgSrc","hash":{},"data":data}) : helper)))
    + " alt="
    + alias4(((helper = (helper = helpers.itemName || (depth0 != null ? depth0.itemName : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"itemName","hash":{},"data":data}) : helper)))
    + "/>\n    <div class=\"itemDetails\">\n        Price:"
    + alias4(((helper = (helper = helpers.itemPrice || (depth0 != null ? depth0.itemPrice : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"itemPrice","hash":{},"data":data}) : helper)))
    + "<button>Change</button>\n    </div>\n</div>\n";
},"useData":true});
templates['leaderboard'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "";
},"useData":true});
templates['sidebar'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<aside>\n    "
    + alias4(((helper = (helper = helpers.Username || (depth0 != null ? depth0.Username : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"Username","hash":{},"data":data}) : helper)))
    + " <br/>\n    Total Earnings: "
    + alias4(((helper = (helper = helpers.earnings || (depth0 != null ? depth0.earnings : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"earnings","hash":{},"data":data}) : helper)))
    + "<br/>\n    Current bank: "
    + alias4(((helper = (helper = helpers.bank || (depth0 != null ? depth0.bank : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"bank","hash":{},"data":data}) : helper)))
    + "<br/>\n    Global Rank: "
    + alias4(((helper = (helper = helpers.rank || (depth0 != null ? depth0.rank : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"rank","hash":{},"data":data}) : helper)))
    + "<br/>\n    User since: "
    + alias4(((helper = (helper = helpers.joinDate || (depth0 != null ? depth0.joinDate : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"joinDate","hash":{},"data":data}) : helper)))
    + "<br/>\n</aside>\n";
},"useData":true});
})();