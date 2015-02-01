var trek = (function($, _, Mustache, io) {

    var t = {};
    t.socket = io.connect( window.location.protocol + "//" + window.location.host );

    // Red Alert
    var alertCallbacks = [];


    // depreciated... use onAlert
    t.on_alert = function(callback) {
        console.log( "depreciated trek.on_alert call" );
        alertCallbacks.push( callback );

    };


    t.onAlert = function(callback) {

        alertCallbacks.push( callback );

    };


    function displayRedAlert() {

        var drawAlert = function ( svg ) {

            var $alert_svg = $( svg.children[ 0 ] );
            var $bg = $( "<div class='blackout'></div>" );
            var $alert_wrap = $( "<div class='alert-wrap'></div>" );

            $alert_wrap.append( $alert_svg );
            $bg.append( $alert_wrap );

            $bg.click( function () {

                $bg.remove();

            });

            $( "body" ).append( $bg );
            $bg.css( 'visibility', 'visible' );

        };

        $.get( '/static/svg/alert.svg', drawAlert );

    }

    function clearAlerts () {

        var $bgs = $( ".blackout" );
        $bgs.remove();

    }


    t.socket.on( "alert", function ( data ) {

        // allow screens to handle alerts their own way
        if ( alertCallbacks.length > 0 ) {

            _.each( alertCallbacks, function ( e ) {
                e( data );
            } );

            return;

        }

        // TODO: Handle "alert: data=yellow"
        switch ( data ) {

            case 'red':
                displayRedAlert();
                break;

            case 'clear':
                clearAlerts();
                break;

            case 'blue':
                break;

            case 'yellow':
                break;
        }

    });


    // Battle damage

    t.screenName = "";

    function registerDisplay ( screenName ) {

        // set the screenName var
        t.screenName = screenName;

    }

    t.registerDisplay = registerDisplay;

    function clearBlastDamage () {

        var $damageOverlays = $( ".damageOverlay" );
        _.each( $damageOverlays, function ( e ) { e.remove(); } );

    }

    function displayBlastDamage () {

        // don't show damage if it's already there
        var $damageOverlay = $( ".damageOverlay" );
        if ( $damageOverlay.length > 0 ) { return false; }

        var $overlay = $( "<div class='damageOverlay overlay'></div>" );
        var $crack = $( "<img src='static/textures/broken-glass0.png' />" );

        $overlay.append( $crack );

        document.cookie = "cracked=true";

        $( "body" ).append( $overlay );

        return true;

    }

    t.socket.on( "Display", function( data ) {

        console.log( data );

        args = data.split(":");

        switch ( args[0] ) {

            case "Blast Damage":
                if ( args[1] == "All" || args[1] == t.screenName ) {

                    if ( displayBlastDamage() ) { t.playConsoleBlast(); }

                }
                break;

            case "Repair":
                if ( args[1] == "All" || args[1] == screenName ) {

                    clearBlastDamage();
                    document.cookie = "cracked=false";

                }
                break;
        }

    } );

    t.checkBlastDamage = function () {

        // catch people trying to reset their window
        var crackedCookie = document.cookie.replace(/(?:(?:^|.*;\s*)cracked\s*\=\s*([^;]*).*$)|^.*$/, "$1");
        if ( crackedCookie == 'true' ) { displayBlastDamage(); }

    };


    // Audio
    function playAudio ( path, loop ) {

        var sound = document.createElement( "audio" );
        sound.setAttribute( "autoplay", "" );
        if ( arguments.length == 2 && loop ) {

            sound.setAttribute( "loop", "" );

        }
        sound.src = path;

    }

    t.playTheme = function () { playAudio( "static/sound/theme.mp3" ); };
    t.playBridgeSound = function () { playAudio( "static/sound/bridge.mp3", true ); };
    t.playKlaxon = function () { playAudio( "static/sound/redalert.mp3" ); };
    t.playAlarm = function () { playAudio( "static/sound/critical.mp3" ); };
    t.playTorpedo = function () { playAudio( "static/sound/fire_torpedo.mp3" ); };
    t.playPhaser = function () { playAudio( "static/sound/phaser1.mp3" ); };
    t.playTransporter = function () { playAudio( "static/sound/transporter.mp3" ); };
    t.playShipHit = function () { playAudio( "static/sound/damage1.mp3" ); };
    t.playHail = function () { playAudio( "static/sound/hailing.mp3" ); };
    t.playConsoleBlast = function () {

        var coin = Math.random() > 0.5;
        var sound = coin ? "static/sound/console_explo_01.mp3" : "static/sound/console_explo_02.mp3";
        playAudio( sound );

    };


    // Draw Fancy Types
    function displayRed ( message, callback ) {

        var $bg = $( "<div class='blackout'></div>" );
        var $errorWrap = $( "<div class='errorWrap red'></div>" );

        $errorWrap.html( message );
        $bg.append( $errorWrap );

        $bg.click( function( c ) {

            $bg.remove();

            if ( typeof callback !== undefined ) {

                callback();

            }

        } );

        $( "body" ).append( $bg );
        $bg.css( 'visibility', 'visible' );

    }
    t.displayRed = displayRed;


    function confirm ( message, callback ) {

        var $bg = $( "<div class='blackout'></div>" );
        var $errorWrap = $( "<div class='errorWrap red'></div>" );

        $errorWrap.html( message );

        var $div = $( "<div></div>" );
        var $confirm = $( "<button class='confirmation'>Override</button>" );
        var $cancel = $( "<button class='confirmation'>Cancel</button>" );

        $confirm.click( function () {
            callback();
            $bg.remove() } );

        $cancel.click( function () { $bg.remove(); } );

        $errorWrap.append( $div.append($confirm ).append( $cancel ) );
        $bg.append( $errorWrap );

        $( "body" ).append( $bg );
        $bg.css( "visibility", "visible" );

    }
    t.confirm = confirm;


    // Game Over
    function displayGameOver () {

        $.get( '/static/svg/gameover.svg', function( svg ) {

            var $go_svg = $( svg.children[0] );
            var $bg = $( "<div class='blackout'></div>" );
            var $alert_wrap = $( "<div class='alert-wrap'></div>" );

            $alert_wrap.append( $go_svg );
            $bg.append( $alert_wrap );
            $( "body" ).append( $bg );
            $bg.css( 'visibility', 'visible' );

        });

    }

    t.socket.on("gameover", function( data ) {

        if ( alertCallbacks.length > 0 ) {
            return;
        }

        // check score, and see if you won
        displayGameOver();

    });


    // API Wrapper
    function apiError( jqXHR, textStatus, errorThrown ) {

        console.log( jqXHR );
        // Display the error results and strip the stack
        var message = jqXHR.responseText.split( '\n' )[ 0 ];
        displayRed( message );

    }


    t.api = function( api_name, data, method, callback ) {

        // function( api, [[data, [method,]] callback] )
        switch ( arguments.length ) {
            case 1:
                callback = function() { return; };
                data = {};
                method = 'GET';
                break;
            case 2:
                callback = data;
                data = {};
                method = 'GET';
                break;
            case 3:
                callback = method;
                method = 'GET';
                break;
            case 4:
                break;
        }

        processData = true;
        if ( method != 'GET' ) {
            data = JSON.stringify( data );
            processData = false;
        }

        $.ajax({
            type: method,
            url: '/api/' + api_name,
            data: data,
            success: callback,
            processData: processData,
            contentType: 'application/json',
            error: apiError
        });


    };


    // Utility
    t.prettyDistanceKM = function ( meters ) {

        var x = Math.round( parseInt( meters ) / 1000 );
        var rgx = /(\d+)(\d{3})/;
        x = x.toString();
        while ( rgx.test( x ) ) {
            x = x.replace( rgx, '$1' + ',' + '$2' );
        }
        return x + "km";

    };


    t.prettyDistanceAU = function ( meters ) {

        var au = Math.round( meters / 149597870700 );
        if (au < 1) {
            return t.prettyDistanceKM( meters );
        } else {
            return au += "AU";
        }

    };


    t.prettyBearing = function ( bearing ) {

        var x = Math.round( bearing * 1000 );
        return x.toString();

    };


    t.prettyMark = function ( mark ) {

        var x = Math.round( mark * 1000 );
        return x.toString();

    };


    t.secondsToMinuteString = function ( seconds ) {

        var minutes = Math.floor( seconds/60 );
        var secondRemaining = Math.round( seconds % 60 );
        minutes = minutes.toString();
        return minutes + ":" + secondRemaining;

    };


    t.parseQueryString = function () {

        var qs = window.location.search.substr(1);
        if ( qs === "" ){ return {}; }

        var a = qs.split( '&' );
        var b = {};
        for ( var i = 0; i < a.length; ++i ){
            var p=a[ i ].split( '=' );

            if ( p.length != 2 ) continue;

            b[p[0]] = decodeURIComponent( p[1].replace( /\+/g, " " ) );
        }
        return b;

    };

    return t;

}(jQuery, _, Mustache, io));
