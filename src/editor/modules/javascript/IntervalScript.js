'use strict';

var EventEmitter = require('events').EventEmitter;
var inherits = require('inherits');
var dialogScriptEditor = require('./dialogScriptEditor');
var amgui = require('../../amgui');
var Interval = require('./Interval');

function IntervalScript(opt) {

    EventEmitter.call(this);

    this._lineH =  21;
    this._script =  '/**/';
    this._intervals = [];

    this._onClickOpenScript = this._onClickOpenScript.bind(this);
    this._onChangeScript = this._onChangeScript.bind(this);

    this.deOptions = this._createParameterOptions();
    this.deKeyline = this._createBoundsLine();

    this._addInterval();

    if (opt) {
        this.useSave(opt);
    }
}

inherits(IntervalScript, EventEmitter);
var p = IntervalScript.prototype;









Object.defineProperties(p, {

    height: {
        get: function () {
            
            return this._lineH;
        }
    },
    script: {
        set: function (v) {

            v = v || '';

            if (this._script === v) return;

            this._script = v;
        },
        get: function () {

            return this._script;
        }
    }
});





p.getSave = function () {

    var save = {
        name: this.name,
        script: JSON.stringify(this.script).slice(1, -1).replace(/'/g, '\\\''),
        intervals: [],
    };

    this._intervals.forEach(function (interval) {

        save.intervals.push(interval.getSave());
    });

    return save;
};

p.useSave = function(save) {

    if ('name' in save) this.name = save.name;
    if ('script' in save) this.script = save.script;
    if ('intervals' in save) {

        while (this._intervals.length) {

            this._removeInterval(this._intervals[0]);
        }

        save.intervals.forEach(function (intervalSave) {

            this._intervals.push(new Interval(intervalSave));
        }, this);
    }
};

p.isInsideBounds = function (time) {

    return this._intervals.some(function (interval) {

        if (interval.start <= time && interval.end >= time) {

            return true;
        }
    });
};

p.runScript = function () {

    (new Function(this.script))();//TODO hack!!!
};









p._addInterval = function (interval) {

    if (!(interval instanceof Interval)) {

        interval = new Interval(interval);
    }

    this.deKeyline.appendChild(interval.domElem);

    this._intervals.push(interval);
}

p._removeInterval = function (interval) {

    var idx = this._intervals.indexOf(interval);

    if (idx === -1) {
        return;
    }

    this._intervals.splice(idx, 1);

    interval.domElem.parentNode.removeChild(interval.domElem);
    interval.dispose();
}








p._onDeleteKey = function (key) {

    this.removeKey(key);
};

p._onClickOpenScript = function () {

    dialogScriptEditor.show({
        script: this.script,
        onChangeScript: this._onChangeScript,
    });
};

p._onChangeScript = function (script) {

    this.script = script;
};














p._createBoundsLine = function () {

    var de = document.createElement('div');
    de.style.width = '100%';
    de.style.height = this._lineH + 'px';
    de.style.background = 'grey';
    de.style.position = 'relative';

    return de;
}


p._createParameterOptions = function () {

    var de = document.createElement('div');
    de.style.display = 'flex';
    de.style.width = '100%';
    de.style.height = this._lineH + 'px';
    de.style.background = 'linear-gradient(to bottom, blue 18%,darkblue 96%)';

    var space = document.createElement('div');
    space.style.display = 'inline-block';
    space.style.flex = '1';
    space.style.pointerEvents = 'none';
    de.appendChild(space);

    this._btnOpenScript = amgui.createIconBtn({
        icon: 'code',
        height: this._baseH,
        onClick: this._onClickOpenScript,
        parent: de
    });

    this._btnEdit = amgui.createIconBtn({
        icon: 'wrench',
        height: this._baseH,
        parent: de
    });

    amgui.bindDropdown({
        deTarget: this._btnEdit,
        deMenu: amgui.createDropdown({
            options: [
                {text: 'merge'},
                {text: 'split'},
                {text: 'end here'},
                {text: 'start here'},
                {text: 'add', icon: 'plus'},
                {text: 'remove', icon: 'minus'},
            ]
        }),
        onSelect: function () {
            am.dialogs.featureDoesntExist.show();
        }
    });

    amgui.bindDropdown({
        asContextMenu: true,
        deTarget: de,
        deMenu: amgui.createDropdown({
            options: [
                {text: 'move up', onSelect: this.emit.bind(this, 'move', this, -1)},
                {text: 'move down', onSelect: this.emit.bind(this, 'move', this, 1)},
                {text: 'delete', onSelect: this.emit.bind(this, 'delete', this)},
            ]
        })
    });

    return de;
};

p.dispose = function () {

    //TODO
};

module.exports = IntervalScript;
