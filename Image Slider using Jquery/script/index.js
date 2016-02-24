$(document).ready(function () {
    $('#slider').cycle({
        next: '#next',
        prev: '#prev',
        pager: '#pager'

    });
});


$.fn.cycle = function (options, arg2) {
    //run for each slide
    return this.each(function () {
        //handle the input arguments, it can be a number for pager or next button or prev button presses
        var opts = handleArgs(this, options, arg2);

        //based on the number of slides, generate the pager
        opts.updateActivePagerLink = $.fn.cycle.updateActivePagerLink;

        //create variables based on the button values
        var $cont = $(this);
        var $slides = $cont.children();
        var els = $slides.get();

        //build the options based on the input parameters and then run the slider.
        var opts2 = buildOptions($cont, $slides, els, opts);


        //start time is set to 3 seconds
        var startTime = 3000;
        //a timout function is gonna start running for every slide. It is gonna move to next slide as the time is finished
        this.cycleTimeout = setTimeout(function () {
            go(els, opts2, !opts.backwards);
        }, startTime);
    });
};


// process the arguments
function handleArgs(cont, options) {

    if (options.constructor == Number) {

        var num = options;

        options = $(cont).data('cycle.opts');

        options.nextSlide = num;

        go(options.elements, options, 1, num >= options.currSlide);

    }
    return options;
}

// one-time initialization of the options
function buildOptions($cont, $slides, els, options) {
    var opts = $.extend($.fn.cycle.defaults, options || {});
    $cont.data('cycle.opts', opts);
    opts.$cont = $cont;
    opts.elements = els;
    opts.before = opts.before ? [opts.before] : [];
    opts.after = opts.after ? [opts.after] : [];
    opts.currSlide = 0;
    var first = 0;

    // set position and zIndex on all the slides
    $slides.css({
        position: 'absolute',
        top: 0,
        left: 0
    }).hide().each(function (i) {
        var z;
        z = first ? i >= first ? els.length - (i - first) : first - i : els.length - i;
        $(this).css('z-index', z);
    });


    $(els[first]).css('opacity', 1).show();

    opts.cssBefore = {};
    opts.cssAfter = {};
    opts.cssFirst = {};
    opts.animIn = {};
    opts.animOut = {};

    $slides.not(':eq(' + first + ')').css(opts.cssBefore);
    $($slides[first]).css(opts.cssFirst);

    opts.slideCount = els.length;
    opts.currSlide = first;
    opts.nextSlide = 1;

    var init = $.fn.cycle.transitions[opts.fx];
    if ($.isFunction(init))
        init($cont, $slides, opts);

    // fire artificial events
    var e0 = $slides[first];
    if (opts.before.length)
        opts.before[0].apply(e0, [e0, e0, opts, true]);
    if (opts.after.length)
        opts.after[0].apply(e0, [e0, e0, opts, true]);

    if (opts.next)
        $(opts.next).bind('click.cycle', function () {
            return advance(opts, 1);
        });
    if (opts.prev)
        $(opts.prev).bind('click.cycle', function () {
            return advance(opts, 0);
        });
    var $p = $(opts.pager);
    $.each(els, function (i, o) {
        $.fn.cycle.createPagerAnchor(i, o, $p, els, opts);
    });
    opts.updateActivePagerLink(opts.pager, 0, 'activeSlide');
    return opts;
}


// this is the main engine function, it handles timeouts and slide changing
function go(els, opts, fwd) {
    var p = opts.$cont[0],
        curr = els[opts.currSlide],
        next = els[opts.nextSlide];

    // opts.busy is true if we're in the middle of an animation
    if (opts.busy) {
        $(els).stop(true, true);
        opts.busy = 0;
        clearTimeout(p.cycleTimeout);
    }


    // if slideshow is paused, only transition on a manual trigger
    var changed = false;
    if (opts.nextSlide != opts.currSlide) {
        changed = true;
        // keep trying to get the slide size if we don't have it yet
        curr.cycleH = $(curr).height();
        curr.cycleW = $(curr).width();
        next.cycleH = $(next).height();
        next.cycleW = $(next).width();

        // run the before callbacks
        if (opts.before.length)
            $.each(opts.before, function (i, o) {
                o.apply(next, [curr, next, opts, fwd]);
            });

        // stage the after callacks
        var after = function () {
            opts.busy = 0;
            $.each(opts.after, function (i, o) {
                o.apply(next, [curr, next, opts, fwd]);
            });
            queueNext();

        };

        // get ready to perform the transition
        opts.busy = 1;
        $.fn.cycle.custom(curr, next, opts, after);
    }

    if (changed || opts.nextSlide == opts.currSlide) {
        // calculate the next slide
        var roll;
        opts.lastSlide = opts.currSlide;

        roll = (opts.nextSlide + 1) == els.length;
        if (roll && opts.bounce) {
            opts.backwards = !opts.backwards;
            opts.nextSlide = els.length - 2;
            opts.currSlide = els.length - 1;
        } else {
            opts.nextSlide = roll ? 0 : opts.nextSlide + 1;
            opts.currSlide = roll ? els.length - 1 : opts.nextSlide - 1;
        }

    }
    if (changed && opts.pager)
        opts.updateActivePagerLink(opts.pager, opts.currSlide, 'activeSlide');

    function queueNext() {
        // stage the next transition
        var ms = 3000;


        p.cycleTimeout = setTimeout(function () {
            go(els, opts, 0, !opts.backwards);
        }, ms);
    }
}

// invoked after transition
$.fn.cycle.updateActivePagerLink = function (pager, currSlide, clsName) {
    $(pager).each(function () {
        $(this).children().removeClass(clsName).eq(currSlide).addClass(clsName);
    });
};

// expose next/prev function,
$.fn.cycle.next = function (opts) {
    advance(opts, 1);
};
$.fn.cycle.prev = function (opts) {
    advance(opts, 0);
};
// advance slide forward or back
function advance(opts, moveForward) {
    var val = moveForward ? 1 : -1;
    var els = opts.elements;
    var p = opts.$cont[0],
        timeout = p.cycleTimeout;
    if (timeout) {
        clearTimeout(timeout);
        p.cycleTimeout = 0;
    }
    opts.nextSlide = opts.currSlide + val;
    if (opts.nextSlide >= els.length)
        opts.nextSlide = 0;

    go(els, opts, 1, moveForward);
    return false;
}

//creating the pagers on top
$.fn.cycle.createPagerAnchor = function (i, el, $p, els, opts) {
    var a;
    if ($.isFunction(opts.pagerAnchorBuilder)) {
        a = opts.pagerAnchorBuilder(i, el);
    } else
        a = '<a href="#">' + (i + 1) + '</a>';

    if (!a)
        return;
    var $a = $(a);
    if ($a.parents('body').length === 0) {
        var arr = [];
        if ($p.length > 1) {
            $p.each(function () {
                var $clone = $a.clone(true);
                $(this).append($clone);
                arr.push($clone[0]);
            });
            $a = $(arr);
        } else {
            $a.appendTo($p);
        }
    }

    opts.pagerAnchors = opts.pagerAnchors || [];
    opts.pagerAnchors.push($a);

    var pagerFn = function (e) {
        e.preventDefault();
        opts.nextSlide = i;
        var p = opts.$cont[0],
            timeout = p.cycleTimeout;
        if (timeout) {
            clearTimeout(timeout);
            p.cycleTimeout = 0;
        }

        go(els, opts, opts.currSlide < i); // trigger the transition

    };
    $a.bind('click.cycle', pagerFn);
};

// reset common properties before the next transition
$.fn.cycle.commonReset = function (curr, next, opts) {
    $(opts.elements).not(curr).hide();
    opts.cssBefore.opacity = 1;
    opts.cssBefore.display = 'block';
    opts.cssAfter.display = 'none';
    $(curr).css('zIndex', opts.slideCount + 0);
    $(next).css('zIndex', opts.slideCount + 1);
};

// Making the transition happen
$.fn.cycle.custom = function (curr, next, opts, cb) {
    var $l = $(curr),
        $n = $(next);
    var animInDelay = 100,
        animOutDelay = 100;
    $n.css(opts.cssBefore);

    var fn = function () {
        $n.delay(animInDelay).animate(opts.animIn, function () {
            cb();
        });
    };
    $l.delay(animOutDelay).animate(opts.animOut, function () {
        $l.css(opts.cssAfter);

    });
    fn();
};


//some properties of the transition
$.fn.cycle.transitions = {
    fade: function ($cont, $slides, opts) {
        $slides.not(':eq(' + opts.currSlide + ')').css('opacity', 0);
        opts.before.push(function (curr, next, opts) {
            $.fn.cycle.commonReset(curr, next, opts);
            opts.cssBefore.opacity = 0;
        });
        opts.animIn = {opacity: 1};
        opts.animOut = {opacity: 0};
        opts.cssBefore = {top: 0, left: 0};
    }
};
$.fn.cycle.defaults = {
    fx: 'fade'
};
