"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require("@angular/core");
var VisDirective = (function () {
    function VisDirective(element) {
        this.element = element;
        // Default value set to ""
        this.__defaultValue = "";
        this.testString = [];
        this.equationString = [];
        this.equationLink = [];
        this.rootLink = [];
        // First relation
        this.equationString.push("$$\Re$$");
        this.equationString.push("$$a \\in b$$");
        this.equationString.push("$$\\in$$");
        this.equationString.push("$$a$$");
        this.equationString.push("$$b$$");
        this.equationLink.push({ from: 0, to: 1 });
        this.equationLink.push({ from: 1, to: 2 });
        this.equationLink.push({ from: 1, to: 3 });
        this.equationLink.push({ from: 1, to: 4 });
        // second relation
        this.equationString.push("$$2^2=4$$");
        this.equationString.push("$$=$$");
        this.equationString.push("$$2^2$$");
        this.equationString.push("$$4$$");
        this.equationLink.push({ from: 5, to: 6 });
        this.equationLink.push({ from: 5, to: 7 });
        this.equationLink.push({ from: 5, to: 8 });
        this.rootLink.push({ from: 0, to: 5 });
        // We use hidden div in order create svg object with MathJax
        for (var i = 0; i < this.equationString.length; i++) {
            // Div creation
            var equationHiddenBox = document.createElement('div');
            equationHiddenBox.style.display = "none";
            equationHiddenBox.innerHTML = this.equationString[i];
            document.body.appendChild(equationHiddenBox);
            // MathJax
            MathJax.Hub.Queue(["Typeset", MathJax.Hub, equationHiddenBox]);
        }
        var callGraph = function () {
            for (var i = 0; i < this.equationString.length; i++) {
                // Get important svg definition defined by MathJax
                var glyphs = document.querySelector('#MathJax_SVG_glyphs');
                // Get MathJax-frame
                var span = document.querySelector('#MathJax-Element-' + (1 + i) + '-Frame');
                var svg = span.firstChild;
                // Build the svg
                var svgString = '<' + '?xml version="1.0" encoding="UTF-8" standalone="no" ?' + '>\n';
                svgString += '<svg xmlns="http://www.w3.org/2000/svg"';
                for (var j = 0; j < svg.attributes.length; j++) {
                    svgString += ' ' + svg.attributes[j].name + '="' + svg.attributes[j].value + '"';
                }
                // Get viewport and the y-offset (Mathjax works with a negative offset)
                var y = svg.getAttribute("viewBox").split(" ")[1];
                svgString += '>\n';
                svgString += '<rect x="0" y="' + y + '" width="100%" height="100%" fill="#ffffff" stroke-width="20" stroke="#ffffff" ></rect>';
                svgString += glyphs.outerHTML;
                svgString += '\n';
                svgString += svg.innerHTML;
                svgString += '\n</svg>';
                this.testString.push(svgString);
            }
            // Go to draw the graph
            this.drawGraph(element);
        };
        MathJax.Hub.Queue(callGraph.bind(this));
    }
    VisDirective.prototype.drawGraph = function (element) {
        var nodes = null;
        var edges = null;
        var network = null;
        // Create a data table with nodes.
        nodes = [];
        // Create a data table with links.
        edges = [];
        // transform svg-description to svg-object
        // nodes creation with the svg-object and visjs
        for (var i = 0; i < this.equationString.length; i++) {
            var data = this.testString[i];
            var svg = new Blob([data], { type: 'image/svg+xml' });
            var url = URL.createObjectURL(svg);
            nodes.push({ id: i, image: url, shape: 'image' });
        }
        // edges creation 
        for (var i = 0; i < this.equationLink.length; i++) {
            edges.push({ id: i, from: this.equationLink[i].from, to: this.equationLink[i].to, length: 200, arrows: "to" });
        }
        for (var i = this.equationLink.length; i < this.equationLink.length + this.rootLink.length; i++) {
            var j = i - this.equationLink.length;
            edges.push({ id: i, from: this.rootLink[j].from, to: this.rootLink[j].to, length: 300, color: { opacity: 0 } });
        }
        // create a network
        var dataVis = {
            nodes: nodes,
            edges: edges
        };
        var options = {
            physics: {
                stabilization: false,
                "barnesHut": {
                    "gravitationalConstant": -1750,
                    "centralGravity": 0,
                    "springLength": 240
                },
                "minVelocity": 0.75
            },
            edges: { smooth: false }
        };
        var network = new vis.Network(element.nativeElement, dataVis, options);
    };
    __decorate([
        core_1.Input("mynetwork"), 
        __metadata('design:type', String)
    ], VisDirective.prototype, "value", void 0);
    VisDirective = __decorate([
        core_1.Directive({ selector: '[mynetwork]' }), 
        __metadata('design:paramtypes', [core_1.ElementRef])
    ], VisDirective);
    return VisDirective;
}());
exports.VisDirective = VisDirective;
//# sourceMappingURL=vis.directive.js.map